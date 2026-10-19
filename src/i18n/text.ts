import type { Author, Commit } from '../model/types.ts'
import { formatYear as formatYearEn, world, type SearchView } from '../model/history.ts'
import { zhDirs } from './dirs.ts'
import type { Locale } from './locale.tsx'
import { copy, type Copy } from './strings.ts'
import { zhAuthors } from './zh-tw-authors.ts'
import { zhCommitsEarly } from './zh-tw-commits-early.ts'
import { zhCommitsLate } from './zh-tw-commits-late.ts'

export const zhCommits = { ...zhCommitsEarly, ...zhCommitsLate }

export function yearText(year: number, approx = false, locale: Locale = 'en'): string {
  if (locale === 'en') return formatYearEn(year, approx)
  const abs = Math.abs(year).toLocaleString('zh-Hant')
  const circa = approx ? '約' : ''
  if (year < 0) return `${circa}公元前${abs}年`
  if (year < 1000) return `${circa}公元${abs}年`
  return `${circa}${year}年`
}

export function personOf(author: Author, locale: Locale): Author {
  if (locale !== 'zh-TW') return author
  const zh = zhAuthors[author.id]
  return zh ? { ...author, ...zh } : author
}

export function noteOf(commit: Commit, locale: Locale): Commit {
  if (locale !== 'zh-TW') return commit
  const zh = zhCommits[commit.id]
  return zh ? { ...commit, message: zh.message, body: zh.body } : commit
}

export type SceneLabels = {
  root: string
  dir: (segment: string) => string
  author: (id: string, fallback: string) => string
}

export function sceneLabels(locale: Locale): SceneLabels {
  return {
    root: copy(locale).repo,
    dir: (segment) => (locale === 'zh-TW' ? (zhDirs[segment] ?? segment) : segment),
    author: (id, fallback) => (locale === 'zh-TW' ? (zhAuthors[id]?.name ?? fallback) : fallback),
  }
}

export function searchView(locale: Locale): SearchView {
  return {
    authorTitle: (author) => personOf(author, locale).name,
    authorSubtitle: (author) => {
      const shown = personOf(author, locale)
      return `${shown.tradition} · ${shown.years}`
    },
    authorHay: (author) => {
      const zh = zhAuthors[author.id]
      return `${author.name} ${author.tradition} ${author.blurb} ${zh?.name ?? ''} ${zh?.tradition ?? ''} ${zh?.blurb ?? ''}`
    },
    commitTitle: (commit) => noteOf(commit, locale).message,
    commitSubtitle: (commit) =>
      `${yearText(commit.year, commit.approx, locale)} · ${commit.authors
        .map((id) => {
          const author = world.authorById.get(id)
          return author ? personOf(author, locale).name : id
        })
        .join('、')}`,
    commitHay: (commit) => {
      const zh = zhCommits[commit.id]
      return `${commit.message} ${commit.body} ${zh?.message ?? ''} ${zh?.body ?? ''}`
    },
    fileYear: (year, approx) => yearText(year, approx, locale),
  }
}

export function ui(locale: Locale): Copy {
  return copy(locale)
}
