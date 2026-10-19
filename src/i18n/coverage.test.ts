import { describe, expect, it } from 'vitest'
import { searchHistory, world } from '../model/history.ts'
import { searchView, yearText, zhCommits } from './text.ts'
import { zhAuthors } from './zh-tw-authors.ts'

describe('zh-TW', () => {
  it('names every contributor and every commit', () => {
    for (const author of world.authors) {
      expect(zhAuthors[author.id]?.name, author.id).toBeTruthy()
      expect(zhAuthors[author.id]?.blurb, author.id).toBeTruthy()
    }
    for (const commit of world.commits) {
      expect(zhCommits[commit.id]?.message, commit.id).toBeTruthy()
      expect(zhCommits[commit.id]?.body, commit.id).toBeTruthy()
    }
  })

  it('formats years in Traditional Chinese order', () => {
    expect(yearText(-3200, true, 'zh-TW')).toBe('約公元前3,200年')
    expect(yearText(499, false, 'zh-TW')).toBe('公元499年')
    expect(yearText(1995, false, 'zh-TW')).toBe('1995年')
  })

  it('finds Euler from a Traditional Chinese query', () => {
    const hits = searchHistory('歐拉', world, searchView('zh-TW'))
    expect(hits.some((hit) => hit.title.includes('歐拉'))).toBe(true)
  })
})
