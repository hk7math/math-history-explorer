import {
  authorColor,
  branchOf,
  world,
  type World,
} from '../model/history.ts'
import type { Selection } from '../model/types.ts'
import type { LayoutNode } from './layout.ts'
import {
  commitTouches,
  easeInOut,
  easeOutBack,
  fileVisible,
  perchNear,
  type Playback,
  type Touch,
} from './playback.ts'

export type DrawnNode = {
  path: string
  kind: LayoutNode['kind']
  branch: string | null
  ext: string | null
  x: number
  y: number
  angle: number
  depth: number
  born: number
  scale: number
  flash: number
  parent: string
}

export type DrawnAuthor = {
  id: string
  x: number
  y: number
  alpha: number
  active: boolean
  color: string
}

export type DrawnBeam = {
  x1: number
  y1: number
  x2: number
  y2: number
  color: string
  travel: number
}

export type Frame = {
  nodes: DrawnNode[]
  authors: DrawnAuthor[]
  beams: DrawnBeam[]
  activePaths: Set<string>
}

const IDLE_COMMITS = 7

function parentOf(path: string): string {
  const slash = path.lastIndexOf('/')
  return slash === -1 ? '' : path.slice(0, slash)
}

function latestTouch(touches: Touch[], authorId: string, through: number): Touch | undefined {
  let found: Touch | undefined
  for (let i = 0; i <= through; i++) {
    const touch = touches[i]
    if (touch?.authorId === authorId) found = touch
  }
  return found
}

export function buildFrame(playback: Playback, source: World = world): Frame {
  const nodes: DrawnNode[] = []
  const visibleDirs = new Set<string>([''])
  const commit = source.commits[playback.index]
  const touches = commitTouches(commit)
  const settled = playback.phase === 'hold' || playback.ended
  const step = settled ? Math.max(0, touches.length - 1) : Math.min(playback.step, Math.max(0, touches.length - 1))
  const current = touches[step]

  for (const [path, node] of source.layout.nodes) {
    if (node.kind !== 'file') continue
    const born = source.fileBorn.get(path)
    const intro = touches.findIndex((touch) => touch.path === path)
    if (born === undefined || !fileVisible(born, playback, intro === -1 ? 0 : intro)) continue
    let cursor = parentOf(path)
    while (cursor !== '') {
      visibleDirs.add(cursor)
      cursor = parentOf(cursor)
    }
    const appearing = born === playback.index && intro === playback.step && playback.phase === 'touch'
    const scale = appearing ? easeOutBack(playback.t) : 1
    const touchedNow = current?.path === path && playback.phase === 'touch'
    const landed = commit?.files.some((file) => file.path === path) && playback.phase === 'hold'
    const flash = touchedNow ? 1 - playback.t * 0.35 : landed ? 0.45 * (1 - playback.t) : 0
    nodes.push({
      path,
      kind: 'file',
      branch: node.branch,
      ext: node.ext,
      x: node.x,
      y: node.y,
      angle: node.angle,
      depth: node.depth,
      born,
      scale,
      flash,
      parent: parentOf(path),
    })
  }

  for (const path of visibleDirs) {
    const node = source.layout.nodes.get(path)
    if (!node) continue
    let born = 0
    if (path !== '') {
      born = Number.POSITIVE_INFINITY
      for (const [file, at] of source.fileBorn) {
        if (file === path || file.startsWith(`${path}/`)) born = Math.min(born, at)
      }
      if (!Number.isFinite(born)) born = 0
    }
    nodes.push({
      path,
      kind: node.kind,
      branch: node.branch,
      ext: null,
      x: node.x,
      y: node.y,
      angle: node.angle,
      depth: node.depth,
      born,
      scale: 1,
      flash: 0,
      parent: parentOf(path),
    })
  }

  const authors: DrawnAuthor[] = []
  const spot = source.spots[playback.index]
  const cast = commit?.authors.length ?? 1

  const standAt = (authorId: string, path: string) => {
    const node = source.layout.nodes.get(path)
    const slot = Math.max(0, commit?.authors.indexOf(authorId) ?? 0)
    return node ? perchNear(node.x, node.y, slot, cast) : { x: 0, y: 0 }
  }

  for (const author of source.authors) {
    const appearances = source.authorCommits.get(author.id)
    if (!appearances || appearances.length === 0) continue
    const past = appearances.filter((index) => index < playback.index)
    const lastSettled = past.length > 0 ? past[past.length - 1] : undefined
    const credited = commit?.authors.includes(author.id) ?? false
    const acted = credited && (settled || touches.slice(0, step + 1).some((touch) => touch.authorId === author.id))
    if (!acted && lastSettled === undefined) continue
    const age = acted ? 0 : playback.index - (lastSettled ?? playback.index)
    if (!acted && age > IDLE_COMMITS) continue

    const previous =
      lastSettled !== undefined ? source.spots[lastSettled]?.authors.find((entry) => entry.id === author.id) : undefined
    const resting = spot?.authors.find((entry) => entry.id === author.id)
    let x = previous?.x ?? resting?.x ?? 0
    let y = previous?.y ?? resting?.y ?? 0
    const acting = !settled && current?.authorId === author.id

    if (acting && current && playback.phase === 'approach') {
      const target = standAt(author.id, current.path)
      const earlier = latestTouch(touches, author.id, step - 1)
      const from = earlier
        ? standAt(author.id, earlier.path)
        : previous
          ? { x: previous.x, y: previous.y }
          : { x: target.x * 0.22, y: target.y * 0.22 }
      const e = easeInOut(playback.t)
      x = from.x + (target.x - from.x) * e
      y = from.y + (target.y - from.y) * e
    } else if (acted) {
      const touch = latestTouch(touches, author.id, settled ? touches.length - 1 : step)
      const place = touch ? standAt(author.id, touch.path) : resting
      if (place) {
        x = place.x
        y = place.y
      }
    }

    const index = source.authorIndex.get(author.id) ?? 0
    authors.push({
      id: author.id,
      x,
      y,
      alpha: acted ? 1 : Math.max(0, 1 - age / (IDLE_COMMITS + 0.4)),
      active: acting || (settled && credited),
      color: authorColor(index),
    })
  }

  const beams: DrawnBeam[] = []
  const activePaths = new Set<string>()
  if (current && playback.phase === 'touch') {
    activePaths.add(current.path)
    const actor = authors.find((author) => author.id === current.authorId)
    const node = source.layout.nodes.get(current.path)
    if (actor && node) {
      beams.push({
        x1: actor.x,
        y1: actor.y,
        x2: node.x,
        y2: node.y,
        color: actor.color,
        travel: playback.t,
      })
    }
  } else if (settled && commit && playback.t < 0.85) {
    for (const file of commit.files) activePaths.add(file.path)
  }

  return { nodes, authors, beams, activePaths }
}

export function touchedByAuthor(id: string, source: World = world): Set<string> {
  return new Set(source.authorFiles.get(id) ?? [])
}

export function selectionEmphasis(path: string, selection: Selection | null, source: World = world): number {
  if (!selection) return 1
  if (selection.kind === 'author') {
    const files = touchedByAuthor(selection.id, source)
    if (path === '' || files.has(path)) return 1
    for (const file of files) {
      if (file.startsWith(`${path}/`)) return 1
    }
    return 0.14
  }
  if (selection.kind === 'file') {
    if (path === selection.path) return 1
    if (path !== '' && (selection.path === path || selection.path.startsWith(`${path}/`))) return 1
    if (path.startsWith(`${selection.path}/`)) return 1
    return 0.16
  }
  if (path === selection.path) return 1
  if (selection.path === '' ) return 1
  if (path.startsWith(`${selection.path}/`)) return 1
  if (selection.path.startsWith(`${path}/`) || path === '') return 1
  if (branchOf(path) === selection.path) return 1
  return 0.16
}
