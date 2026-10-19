import { authors } from './authors.ts'
import { commits } from './commits.ts'
import type { Author, Commit, Selection } from './types.ts'
import { layoutTree, type Layout } from '../viz/layout.ts'

export const BRANCH_COLOR: Record<string, string> = {
  arithmetic: '#e8a317',
  geometry: '#3ec6e0',
  algebra: '#ff6a3d',
  'number-theory': '#b388ff',
  calculus: '#3dbe7a',
  analysis: '#2ec4b6',
  combinatorics: '#e85d9a',
  probability: '#5b8def',
  logic: '#ff5d73',
  'set-theory': '#d4cfc6',
  topology: '#7c8cff',
  computation: '#b6e354',
  applied: '#f0923c',
}

export const BRANCH_NAME: Record<string, string> = {
  arithmetic: 'arithmetic',
  geometry: 'geometry',
  algebra: 'algebra',
  'number-theory': 'number theory',
  calculus: 'calculus',
  analysis: 'analysis',
  combinatorics: 'combinatorics',
  probability: 'probability',
  logic: 'logic',
  'set-theory': 'set theory',
  topology: 'topology',
  computation: 'computation',
  applied: 'applied',
}

export const EXTENSIONS: Record<string, string> = {
  thm: 'theorem',
  ax: 'axiom',
  def: 'definition',
  alg: 'algorithm',
  conj: 'conjecture',
  not: 'notation',
}

export const ERAS: { id: string; label: string; year: number }[] = [
  { id: 'tablets', label: 'Tablets', year: -3200 },
  { id: 'classical', label: 'Classical', year: -600 },
  { id: 'scholars', label: 'Scholars', year: 100 },
  { id: 'algebra', label: 'Algebra', year: 820 },
  { id: 'calculus', label: 'Calculus', year: 1666 },
  { id: 'rigor', label: 'Rigor', year: 1817 },
  { id: 'modern', label: 'Modern', year: 1900 },
  { id: 'living', label: 'Living', year: 1970 },
]

const AUTHOR_PALETTE = [
  '#f2d2a2',
  '#9ad7ee',
  '#f0a48a',
  '#c6b4f2',
  '#8ed1b0',
  '#f0c36a',
  '#f2a3c2',
  '#a8c0f0',
  '#e7e2d6',
  '#d6ec8a',
  '#f0b07a',
  '#8fd0d0',
]

export type Spot = { id: string; x: number; y: number }

export type CommitSpot = {
  focus: { x: number; y: number }
  authors: Spot[]
}

export type World = {
  authors: Author[]
  authorById: Map<string, Author>
  authorIndex: Map<string, number>
  commits: Commit[]
  layout: Layout
  fileBorn: Map<string, number>
  fileTouches: Map<string, number[]>
  authorCommits: Map<string, number[]>
  authorFiles: Map<string, string[]>
  spots: CommitSpot[]
  branchOrder: string[]
}

export function branchOf(path: string): string {
  return path.split('/')[0] ?? ''
}

export function extensionOf(path: string): string {
  const dot = path.lastIndexOf('.')
  return dot === -1 ? '' : path.slice(dot + 1)
}

export function baseName(path: string): string {
  const slash = path.lastIndexOf('/')
  return slash === -1 ? path : path.slice(slash + 1)
}

export function parentPath(path: string): string {
  const slash = path.lastIndexOf('/')
  return slash === -1 ? '' : path.slice(0, slash)
}

export function formatYear(year: number, approx = false): string {
  const abs = Math.abs(year).toLocaleString('en-US')
  const prefix = approx ? 'c. ' : ''
  if (year < 0) return `${prefix}${abs} BCE`
  if (year < 1000) return `${prefix}${abs} CE`
  return `${prefix}${year}`
}

export function shortHash(id: string): string {
  let h = 2166136261
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7)
}

export function authorColor(index: number): string {
  return AUTHOR_PALETTE[index % AUTHOR_PALETTE.length] ?? '#f4efe6'
}

export function inkFor(hex: string): string {
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)
  const y = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return y > 150 ? '#1a140e' : '#f4efe6'
}

export function initials(name: string): string {
  const skip = new Set(['of', 'the', 'de', 'la', 'von', 'van', 'ibn'])
  const parts = name
    .replace(/\(.*?\)/g, '')
    .split(/\s+/)
    .map((part) => part.replace(/^al-/i, '').replace(/[^A-Za-zÀ-ÿ]/g, ''))
    .filter((part) => part.length > 0 && !skip.has(part.toLowerCase()))
  if (parts.length === 0) return '?'
  if (parts.length === 1) {
    const word = parts[0] ?? '?'
    return word.slice(0, 2)
  }
  const first = parts[0]?.[0] ?? ''
  const last = parts[parts.length - 1]?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

export function eraForYear(year: number): (typeof ERAS)[number] {
  let current = ERAS[0]!
  for (const era of ERAS) {
    if (era.year <= year) current = era
  }
  return current
}

export function firstCommitAtOrAfter(list: Commit[], year: number): number {
  const index = list.findIndex((commit) => commit.year >= year)
  return index === -1 ? list.length - 1 : index
}

function collectPaths(list: Commit[]): string[] {
  const seen = new Set<string>()
  const out: string[] = []
  for (const commit of list) {
    for (const file of commit.files) {
      if (seen.has(file.path)) continue
      seen.add(file.path)
      out.push(file.path)
    }
  }
  return out
}

function buildSpots(list: Commit[], tree: Layout): CommitSpot[] {
  return list.map((commit) => {
    let x = 0
    let y = 0
    for (const file of commit.files) {
      const node = tree.nodes.get(file.path)
      if (!node) continue
      x += node.x
      y += node.y
    }
    const n = Math.max(1, commit.files.length)
    x /= n
    y /= n
    const angle = Math.atan2(y, x)
    const radius = Math.hypot(x, y)
    const base = radius + 46
    const count = commit.authors.length
    const authorsAt = commit.authors.map((id, index) => {
      const spread = (index - (count - 1) / 2) * 34
      const tx = Math.cos(angle) * base - Math.sin(angle) * spread
      const ty = Math.sin(angle) * base + Math.cos(angle) * spread
      return { id, x: tx, y: ty }
    })
    return { focus: { x, y }, authors: authorsAt }
  })
}

export function buildWorld(): World {
  const authorById = new Map(authors.map((author) => [author.id, author]))
  const authorIndex = new Map(authors.map((author, index) => [author.id, index]))
  const tree = layoutTree(collectPaths(commits))
  const fileBorn = new Map<string, number>()
  const fileTouches = new Map<string, number[]>()
  const authorCommits = new Map<string, number[]>()
  const authorFiles = new Map<string, string[]>()
  const branchOrder: string[] = []
  const seenBranches = new Set<string>()

  commits.forEach((commit, index) => {
    for (const file of commit.files) {
      if (!fileBorn.has(file.path)) fileBorn.set(file.path, index)
      const touches = fileTouches.get(file.path)
      if (touches) touches.push(index)
      else fileTouches.set(file.path, [index])
      const branch = branchOf(file.path)
      if (!seenBranches.has(branch)) {
        seenBranches.add(branch)
        branchOrder.push(branch)
      }
    }
    for (const id of commit.authors) {
      const list = authorCommits.get(id)
      if (list) list.push(index)
      else authorCommits.set(id, [index])
      const owned = authorFiles.get(id) ?? []
      for (const file of commit.files) {
        if (!owned.includes(file.path)) owned.push(file.path)
      }
      authorFiles.set(id, owned)
    }
  })

  return {
    authors,
    authorById,
    authorIndex,
    commits,
    layout: tree,
    fileBorn,
    fileTouches,
    authorCommits,
    authorFiles,
    spots: buildSpots(commits, tree),
    branchOrder,
  }
}

export const world = buildWorld()

export type SearchHit = {
  key: string
  title: string
  subtitle: string
  index: number
  selection: Selection
}

export type SearchView = {
  authorTitle: (author: Author) => string
  authorSubtitle: (author: Author) => string
  authorHay: (author: Author) => string
  commitTitle: (commit: Commit) => string
  commitSubtitle: (commit: Commit) => string
  commitHay: (commit: Commit) => string
  fileYear: (year: number, approx?: boolean) => string
}

export function searchHistory(query: string, source: World = world, view?: SearchView): SearchHit[] {
  const needle = query.trim().toLowerCase()
  if (needle.length < 2) return []
  const hits: SearchHit[] = []

  for (const author of source.authors) {
    const hay = (view ? view.authorHay(author) : `${author.name} ${author.tradition} ${author.blurb}`).toLowerCase()
    if (!hay.includes(needle)) continue
    const index = source.authorCommits.get(author.id)?.[0] ?? 0
    hits.push({
      key: `author:${author.id}`,
      title: view ? view.authorTitle(author) : author.name,
      subtitle: view ? view.authorSubtitle(author) : `${author.tradition} · ${author.years}`,
      index,
      selection: { kind: 'author', id: author.id },
    })
    if (hits.length >= 40) return hits
  }

  for (const [path, born] of source.fileBorn) {
    if (!path.toLowerCase().includes(needle) && !baseName(path).replaceAll('-', ' ').includes(needle)) {
      continue
    }
    const commit = source.commits[born]
    hits.push({
      key: `file:${path}`,
      title: path,
      subtitle: view
        ? view.fileYear(commit?.year ?? 0, commit?.approx)
        : formatYear(commit?.year ?? 0, commit?.approx),
      index: born,
      selection: { kind: 'file', path },
    })
    if (hits.length >= 40) return hits
  }

  source.commits.forEach((commit, index) => {
    const hay = (view ? view.commitHay(commit) : `${commit.message} ${commit.body}`).toLowerCase()
    if (!hay.includes(needle)) return
    hits.push({
      key: `commit:${commit.id}`,
      title: view ? view.commitTitle(commit) : commit.message,
      subtitle: view
        ? view.commitSubtitle(commit)
        : `${formatYear(commit.year, commit.approx)} · ${commit.authors.join(', ')}`,
      index,
      selection: {
        kind: 'file',
        path: commit.files[0]?.path ?? '',
      },
    })
  })

  return hits.slice(0, 40)
}

export function validateHistory(source: World = world): string[] {
  const errors: string[] = []
  const ids = new Set<string>()
  for (const author of source.authors) {
    if (ids.has(author.id)) errors.push(`duplicate author ${author.id}`)
    ids.add(author.id)
  }
  const pathRe =
    /^[a-z0-9-]+\/[a-z0-9-]+\/[a-z0-9-]+\.(thm|ax|def|alg|conj|not)$/
  const seen = new Set<string>()
  const commitIds = new Set<string>()
  let previous = -Infinity
  source.commits.forEach((commit) => {
    if (commitIds.has(commit.id)) errors.push(`duplicate commit ${commit.id}`)
    commitIds.add(commit.id)
    if (commit.year < previous) errors.push(`year moved backward at ${commit.id}`)
    previous = commit.year
    if (commit.authors.length === 0) errors.push(`no authors on ${commit.id}`)
    for (const id of commit.authors) {
      if (!ids.has(id)) errors.push(`unknown author ${id} on ${commit.id}`)
    }
    if (commit.files.length === 0) errors.push(`no files on ${commit.id}`)
    for (const file of commit.files) {
      if (!pathRe.test(file.path)) errors.push(`bad path ${file.path} on ${commit.id}`)
      const branch = branchOf(file.path)
      if (!BRANCH_COLOR[branch]) errors.push(`unknown branch ${branch} on ${commit.id}`)
      if (file.action === 'A') {
        if (seen.has(file.path)) errors.push(`added twice: ${file.path}`)
        seen.add(file.path)
      } else if (!seen.has(file.path)) {
        errors.push(`modified before add: ${file.path} on ${commit.id}`)
      }
    }
  })
  return errors
}
