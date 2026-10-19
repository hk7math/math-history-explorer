export type FileAction = 'A' | 'M'

export type FileChange = {
  path: string
  action: FileAction
}

export type Author = {
  id: string
  name: string
  tradition: string
  years: string
  blurb: string
}

export type Commit = {
  id: string
  /** Negative years are BCE. */
  year: number
  /** The year is a conventional or uncertain date. */
  approx?: boolean
  authors: string[]
  message: string
  body: string
  files: FileChange[]
}

export type Selection =
  | { kind: 'file'; path: string }
  | { kind: 'dir'; path: string }
  | { kind: 'author'; id: string }
