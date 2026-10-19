import {
  authorColor,
  branchOf,
  world,
  type World,
} from '../model/history.ts'
import type { Selection } from '../model/types.ts'
import type { LayoutNode } from './layout.ts'
import {
  easeInOut,
  easeOutBack,
  fileVisible,
  type Playback,
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

export function buildFrame(playback: Playback, source: World = world): Frame {
  const nodes: DrawnNode[] = []
  const visibleDirs = new Set<string>([''])

  for (const [path, node] of source.layout.nodes) {
    if (node.kind !== 'file') continue
    const born = source.fileBorn.get(path)
    if (born === undefined || !fileVisible(born, playback)) continue
    let cursor = parentOf(path)
    while (cursor !== '') {
      visibleDirs.add(cursor)
      cursor = parentOf(cursor)
    }
    const appearing = born === playback.index && playback.phase === 'burst'
    const scale = appearing ? easeOutBack(playback.t) : 1
    const flash =
      born === playback.index && (playback.phase === 'burst' || playback.phase === 'hold')
        ? playback.phase === 'burst'
          ? 1 - playback.t * 0.35
          : 0.65 * (1 - playback.t)
        : 0
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
  const commit = source.commits[playback.index]
  const spot = source.spots[playback.index]
  const activeIds = new Set(commit?.authors ?? [])

  for (const author of source.authors) {
    const appearances = source.authorCommits.get(author.id)
    if (!appearances || appearances.length === 0) continue
    const past = appearances.filter((index) => index < playback.index)
    const onStage = activeIds.has(author.id)
    const lastSettled = past.length > 0 ? past[past.length - 1] : undefined
    if (!onStage && lastSettled === undefined) continue
    const age = onStage ? 0 : playback.index - (lastSettled ?? playback.index)
    if (!onStage && age > IDLE_COMMITS) continue

    const currentSpot = spot?.authors.find((entry) => entry.id === author.id)
    const previous =
      lastSettled !== undefined ? source.spots[lastSettled]?.authors.find((entry) => entry.id === author.id) : undefined
    let x = previous?.x ?? 0
    let y = previous?.y ?? 0
    if (onStage && currentSpot) {
      if (playback.phase === 'approach') {
        const fromX = previous ? previous.x : currentSpot.x * 0.22
        const fromY = previous ? previous.y : currentSpot.y * 0.22
        const e = easeInOut(playback.t)
        x = fromX + (currentSpot.x - fromX) * e
        y = fromY + (currentSpot.y - fromY) * e
      } else {
        x = currentSpot.x
        y = currentSpot.y
      }
    } else if (previous) {
      x = previous.x
      y = previous.y
    }

    const index = source.authorIndex.get(author.id) ?? 0
    authors.push({
      id: author.id,
      x,
      y,
      alpha: onStage ? 1 : Math.max(0, 1 - age / (IDLE_COMMITS + 0.4)),
      active: onStage,
      color: authorColor(index),
    })
  }

  const beams: DrawnBeam[] = []
  const activePaths = new Set<string>()
  const showBeams =
    playback.phase === 'burst' || (playback.phase === 'hold' && playback.t < 0.7 && playback.playing)
  if (commit && showBeams) {
    for (const file of commit.files) activePaths.add(file.path)
    const travel = playback.phase === 'burst' ? playback.t : 1
    for (const author of authors) {
      if (!author.active) continue
      for (const file of commit.files) {
        const node = source.layout.nodes.get(file.path)
        if (!node) continue
        beams.push({
          x1: author.x,
          y1: author.y,
          x2: node.x,
          y2: node.y,
          color: author.color,
          travel,
        })
      }
    }
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
