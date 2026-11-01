export type NodeKind = 'root' | 'dir' | 'file'

export type LayoutNode = {
  path: string
  name: string
  kind: NodeKind
  depth: number
  branch: string | null
  ext: string | null
  x: number
  y: number
  angle: number
  span: number
  radius: number
}

export type Layout = {
  nodes: Map<string, LayoutNode>
  children: Map<string, string[]>
}

const DIR_GAP = 118
const FILE_GAP = 72
const FILE_RING = 22
const MIN_SPACING = 16

function ensure(map: Map<string, LayoutNode>, path: string, kind: NodeKind): LayoutNode {
  const existing = map.get(path)
  if (existing) return existing
  const slash = path.lastIndexOf('/')
  const name = slash === -1 ? path : path.slice(slash + 1)
  const dot = name.lastIndexOf('.')
  const node: LayoutNode = {
    path,
    name,
    kind,
    depth: path === '' ? 0 : path.split('/').length,
    branch: path === '' ? null : (path.split('/')[0] ?? null),
    ext: kind === 'file' && dot !== -1 ? name.slice(dot + 1) : null,
    x: 0,
    y: 0,
    angle: -Math.PI / 2,
    span: Math.PI * 2,
    radius: 0,
  }
  map.set(path, node)
  return node
}

export function layoutTree(filePaths: readonly string[]): Layout {
  const nodes = new Map<string, LayoutNode>()
  const children = new Map<string, string[]>()
  const dirGap = Math.max(DIR_GAP, Math.round(filePaths.length * 0.72))
  const minSpacing = Math.max(MIN_SPACING, 18)
  ensure(nodes, '', 'root')
  children.set('', [])

  const addChild = (parent: string, child: string) => {
    const list = children.get(parent)
    if (!list) children.set(parent, [child])
    else if (!list.includes(child)) list.push(child)
  }

  for (const filePath of filePaths) {
    const parts = filePath.split('/')
    let parent = ''
    for (let i = 0; i < parts.length; i++) {
      const path = parts.slice(0, i + 1).join('/')
      const kind: NodeKind = i === parts.length - 1 ? 'file' : 'dir'
      ensure(nodes, path, kind)
      addChild(parent, path)
      if (!children.has(path)) children.set(path, [])
      parent = path
    }
  }

  const place = (path: string, angle0: number, span: number, parentRadius: number) => {
    const node = nodes.get(path)
    if (!node) return
    const mid = angle0 + span / 2
    node.angle = mid
    node.span = span
    if (path === '') {
      node.radius = 0
      node.x = 0
      node.y = 0
    } else if (node.kind === 'dir') {
      const radius = Math.max(dirGap, parentRadius + dirGap)
      node.radius = radius
      node.x = Math.cos(mid) * radius
      node.y = Math.sin(mid) * radius
    }

    const kids = children.get(path) ?? []
    const dirs = kids.filter((kid) => nodes.get(kid)?.kind === 'dir')
    const files = kids.filter((kid) => nodes.get(kid)?.kind === 'file')

    if (dirs.length > 0) {
      const weights = dirs.map((dir) => leafCount(dir))
      const total = weights.reduce((sum, weight) => sum + weight, 0) || 1
      let cursor = angle0
      dirs.forEach((dir, index) => {
        const sub = span * ((weights[index] ?? 1) / total)
        place(dir, cursor, sub, node.radius)
        cursor += sub
      })
    }

    if (files.length > 0) {
      placeFiles(files, angle0, span, node.kind === 'root' ? 0 : node.radius)
    }
  }

  const leafCount = (path: string): number => {
    const node = nodes.get(path)
    if (!node) return 1
    if (node.kind === 'file') return 1
    const kids = children.get(path) ?? []
    if (kids.length === 0) return 1
    return kids.reduce((sum, kid) => sum + leafCount(kid), 0)
  }

  const placeFiles = (files: string[], angle0: number, span: number, parentRadius: number) => {
    const pad = Math.min(span * 0.14, 0.12)
    const usable = Math.max(span - pad * 2, span * 0.55)
    const start = angle0 + (span - usable) / 2
    let rest = files.slice()
    let ring = 0
    while (rest.length > 0) {
      const radius = parentRadius + FILE_GAP + ring * FILE_RING
      const capacity = Math.max(1, Math.floor((radius * usable) / minSpacing))
      const batch = rest.splice(0, capacity)
      const count = batch.length
      batch.forEach((file, index) => {
        const node = nodes.get(file)
        if (!node) return
        const angle = start + ((index + 0.5) * usable) / count
        node.angle = angle
        node.span = usable / count
        node.radius = radius
        node.x = Math.cos(angle) * radius
        node.y = Math.sin(angle) * radius
      })
      ring += 1
    }
  }

  place('', -Math.PI / 2, Math.PI * 2, 0)
  return { nodes, children }
}
