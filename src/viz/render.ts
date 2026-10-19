import { baseName, BRANCH_COLOR, initials, inkFor, world } from '../model/history.ts'
import type { Selection } from '../model/types.ts'
import type { Camera, View } from './camera.ts'
import { worldToScreen } from './camera.ts'
import type { SceneLabels } from '../i18n/text.ts'
import { selectionEmphasis, type Frame } from './frame.ts'

const FACE =
  '"IBM Plex Mono", "PingFang TC", "Noto Sans CJK TC", "Noto Sans TC", "Microsoft JhengHei", "WenQuanYi Micro Hei", "Droid Sans Fallback", sans-serif'

export type SafeRect = {
  left: number
  top: number
  right: number
  bottom: number
}

export type RenderOptions = {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  dpr: number
  camera: Camera
  view: View
  frame: Frame
  playbackIndex: number
  selection: Selection | null
  hover: Selection | null
  reducedMotion: boolean
  time: number
  safe: SafeRect
  labels: SceneLabels
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath()
  ctx.roundRect(x, y, w, h, r)
}

function label(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  ctx.font = `500 11px ${FACE}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const width = ctx.measureText(text).width
  ctx.fillStyle = 'rgba(7, 8, 12, 0.78)'
  roundRect(ctx, x - width / 2 - 5, y - 8, width + 10, 16, 4)
  ctx.fill()
  ctx.fillStyle = color
  ctx.fillText(text, x, y + 0.5)
}

/**
 * Nudge a centered label into the area the HUD does not cover.
 * Labels that would have to travel far — usually because their node is off screen — are omitted.
 */
function clampLabel(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  safe: SafeRect,
): { x: number; y: number } | null {
  const half = ctx.measureText(text).width / 2 + 4
  const nextX = Math.min(safe.right - half, Math.max(safe.left + half, x))
  const nextY = Math.min(safe.bottom - 8, Math.max(safe.top + 8, y))
  if (Math.hypot(nextX - x, nextY - y) > 28) return null
  return { x: nextX, y: nextY }
}

export function renderScene(options: RenderOptions) {
  const { ctx, width, height, dpr, camera, view, frame, selection, hover, safe, labels } = options
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, width, height)

  const nodeByPath = new Map(frame.nodes.map((node) => [node.path, node]))
  const zoom = camera.zoom

  ctx.lineCap = 'round'
  for (const node of frame.nodes) {
    if (node.path === '') continue
    const parent = nodeByPath.get(node.parent)
    if (!parent) continue
    const a = worldToScreen(parent, camera, view)
    const b = worldToScreen(node, camera, view)
    const branch = node.branch ?? parent.branch ?? 'arithmetic'
    const color = BRANCH_COLOR[branch] ?? '#f4efe6'
    const age = Math.max(0, options.playbackIndex - node.born)
    const recent = Math.exp(-age / 16)
    const emphasis = selectionEmphasis(node.path, selection)
    const alpha = (0.16 + recent * 0.72) * emphasis
    ctx.strokeStyle = color
    ctx.globalAlpha = alpha
    ctx.lineWidth = node.kind === 'file' ? 1 : 1.35
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
  }
  ctx.globalAlpha = 1

  const takenLabels: { x: number; y: number; w: number; h: number }[] = []
  const labelFits = (x: number, y: number, w: number, h: number) =>
    !takenLabels.some(
      (box) => Math.abs(box.x - x) < (box.w + w) / 2 + 2 && Math.abs(box.y - y) < (box.h + h) / 2 + 2,
    )

  const root = nodeByPath.get('')
  if (root) {
    const p = worldToScreen(root, camera, view)
    ctx.globalAlpha = selection ? selectionEmphasis('', selection) : 1
    ctx.strokeStyle = 'rgba(244, 239, 230, 0.85)'
    ctx.lineWidth = 1.4
    ctx.beginPath()
    ctx.arc(p.x, p.y, 15, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2)
    ctx.fillStyle = '#f4efe6'
    ctx.fill()
    ctx.font = `500 11px ${FACE}`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'
    ctx.fillStyle = 'rgba(244, 239, 230, 0.78)'
    ctx.fillText(labels.root, p.x, p.y + 20)
    ctx.globalAlpha = 1
    takenLabels.push({ x: p.x, y: p.y + 26, w: ctx.measureText(labels.root).width, h: 14 })
  }

  for (const node of frame.nodes) {
    if (node.kind !== 'dir') continue
    const p = worldToScreen(node, camera, view)
    const color = BRANCH_COLOR[node.branch ?? ''] ?? '#f4efe6'
    const emphasis = selectionEmphasis(node.path, selection)
    ctx.globalAlpha = (0.75 + 0.25 * Math.exp(-(options.playbackIndex - node.born) / 18)) * emphasis
    ctx.fillStyle = '#07080c'
    ctx.strokeStyle = color
    ctx.lineWidth = 1.5
    ctx.beginPath()
    ctx.arc(p.x, p.y, node.depth === 1 ? 5.5 : 3.6, 0, Math.PI * 2)
    ctx.fill()
    ctx.stroke()
    const showName =
      node.depth === 1 ||
      (zoom > 0.85 && node.depth === 2) ||
      (selection?.kind === 'dir' && selection.path === node.path) ||
      (hover?.kind === 'dir' && hover.path === node.path)
    if (showName && emphasis > 0.4) {
      const root = nodeByPath.get('')
      const rootScreen = root ? worldToScreen(root, camera, view) : null
      let dist = node.depth === 1 ? 20 : 12
      let lx = p.x + Math.cos(node.angle) * dist
      let ly = p.y + Math.sin(node.angle) * dist
      if (rootScreen && node.depth === 1) {
        while (Math.hypot(lx - rootScreen.x, ly - rootScreen.y) < 62 && dist < 78) {
          dist += 6
          lx = p.x + Math.cos(node.angle) * dist
          ly = p.y + Math.sin(node.angle) * dist
        }
      }
      ctx.font = node.depth === 1 ? `500 12px ${FACE}` : `400 10px ${FACE}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = color
      ctx.globalAlpha = emphasis
      const name = labels.dir(node.path.split('/').pop() ?? node.path)
      const width = ctx.measureText(name).width
      let placed = clampLabel(ctx, name, lx, ly, safe)
      let guard = 0
      while (placed && !labelFits(placed.x, placed.y, width, 14) && guard < 5) {
        dist += 14
        lx = p.x + Math.cos(node.angle) * dist
        ly = p.y + Math.sin(node.angle) * dist
        placed = clampLabel(ctx, name, lx, ly, safe)
        guard += 1
      }
      if (!placed || !labelFits(placed.x, placed.y, width, 14)) continue
      takenLabels.push({ x: placed.x, y: placed.y, w: width, h: 14 })
      ctx.fillText(name, placed.x, placed.y)
    }
  }
  ctx.globalAlpha = 1

  for (const node of frame.nodes) {
    if (node.kind !== 'file') continue
    const p = worldToScreen(node, camera, view)
    const color = BRANCH_COLOR[node.branch ?? ''] ?? '#f4efe6'
    const emphasis = selectionEmphasis(node.path, selection)
    const active = frame.activePaths.has(node.path)
    const selected = selection?.kind === 'file' && selection.path === node.path
    const size = Math.max(4, Math.min(16, (selected ? 14 : active ? 11 : 7) * node.scale))
    ctx.globalAlpha = (active ? 1 : 0.86) * emphasis
    ctx.fillStyle = color
    ctx.strokeStyle = color
    ctx.lineWidth = 1.4
    if (node.ext === 'conj') {
      roundRect(ctx, p.x - size / 2, p.y - size / 2, size, size, 1.5)
      ctx.stroke()
    } else if (node.ext === 'ax') {
      ctx.beginPath()
      ctx.moveTo(p.x, p.y - size / 2)
      ctx.lineTo(p.x + size / 2, p.y)
      ctx.lineTo(p.x, p.y + size / 2)
      ctx.lineTo(p.x - size / 2, p.y)
      ctx.closePath()
      ctx.fill()
    } else if (node.ext === 'def') {
      ctx.beginPath()
      ctx.arc(p.x, p.y, size / 2, 0, Math.PI * 2)
      ctx.fill()
    } else {
      roundRect(ctx, p.x - size / 2, p.y - size / 2, size, size, 1.6)
      ctx.fill()
    }
    if (node.flash > 0.04 && !options.reducedMotion) {
      ctx.globalAlpha = node.flash * 0.45 * emphasis
      ctx.strokeStyle = color
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.arc(p.x, p.y, size + 10 * node.flash, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
  ctx.globalAlpha = 1

  for (const beam of frame.beams) {
    const a = worldToScreen({ x: beam.x1, y: beam.y1 }, camera, view)
    const b = worldToScreen({ x: beam.x2, y: beam.y2 }, camera, view)
    ctx.strokeStyle = beam.color
    ctx.globalAlpha = 0.35 + 0.55 * (1 - Math.abs(beam.travel - 0.5) * 0.3)
    ctx.lineWidth = 1.4
    ctx.beginPath()
    ctx.moveTo(a.x, a.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
    const px = a.x + (b.x - a.x) * beam.travel
    const py = a.y + (b.y - a.y) * beam.travel
    ctx.globalAlpha = 0.95
    ctx.fillStyle = '#f4efe6'
    ctx.beginPath()
    ctx.arc(px, py, 2.4, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  for (const author of frame.authors) {
    const p = worldToScreen(author, camera, view)
    const selected = selection?.kind === 'author' && selection.id === author.id
    const radius = selected ? 16 : author.active ? 14 : 11
    ctx.globalAlpha = author.alpha * (selection?.kind === 'author' && !selected ? 0.35 : 1)
    ctx.fillStyle = author.color
    ctx.beginPath()
    ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.lineWidth = 1
    ctx.strokeStyle = 'rgba(7, 8, 12, 0.45)'
    ctx.stroke()
    const person = world.authorById.get(author.id)
    const mark = initials(person?.name ?? author.id)
    ctx.fillStyle = inkFor(author.color)
    ctx.font = `600 ${radius > 13 ? 11 : 9}px "Fraunces", Palatino, serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(mark.slice(0, 2), p.x, p.y + 0.5)
    if (author.active || selected) {
      ctx.globalAlpha = author.alpha
      const name = labels.author(author.id, person?.name ?? author.id)
      ctx.font = `500 11px ${FACE}`
      const placed = clampLabel(ctx, name, p.x, p.y + radius + 12, safe)
      if (placed) label(ctx, name, placed.x, placed.y, '#f4efe6')
    }
  }
  ctx.globalAlpha = 1

  const captions = new Set<string>()
  if (hover?.kind === 'file') captions.add(hover.path)
  if (selection?.kind === 'file') captions.add(selection.path)
  for (const path of captions) {
    const node = nodeByPath.get(path)
    if (!node) continue
    const p = worldToScreen(node, camera, view)
    const name = baseName(path)
    ctx.font = `500 11px ${FACE}`
    const placed = clampLabel(ctx, name, p.x, p.y - 18, safe)
    if (placed) label(ctx, name, placed.x, placed.y, '#f4efe6')
  }
}

export function hitTest(
  screenX: number,
  screenY: number,
  camera: Camera,
  view: View,
  frame: Frame,
): Selection | null {
  const best: { selection: Selection | null; dist: number } = { selection: null, dist: Infinity }
  const consider = (selection: Selection, x: number, y: number, radius: number) => {
    const dx = screenX - x
    const dy = screenY - y
    const dist = Math.hypot(dx, dy)
    if (dist > radius || dist >= best.dist) return
    best.selection = selection
    best.dist = dist
  }

  for (const author of frame.authors) {
    const p = worldToScreen(author, camera, view)
    consider({ kind: 'author', id: author.id }, p.x, p.y, author.active ? 22 : 16)
  }
  for (const node of frame.nodes) {
    if (node.kind === 'root') continue
    const p = worldToScreen(node, camera, view)
    if (node.kind === 'file') {
      consider({ kind: 'file', path: node.path }, p.x, p.y, 16)
    } else if (node.depth === 1) {
      consider({ kind: 'dir', path: node.path }, p.x, p.y, 14)
    }
  }
  const root = frame.nodes.find((node) => node.path === '')
  if (root) {
    const p = worldToScreen(root, camera, view)
    consider({ kind: 'dir', path: '' }, p.x, p.y, 16)
  }
  return best.selection
}
