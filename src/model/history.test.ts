import { describe, expect, it } from 'vitest'
import { formatYear, validateHistory, world } from './history.ts'
import { fileVisible, initialPlayback, tick, togglePlay } from '../viz/playback.ts'

describe('history', () => {
  it('is a chronological log with valid paths', () => {
    expect(validateHistory()).toEqual([])
  })

  it('formats years for the date lock', () => {
    expect(formatYear(-3200, true)).toBe('c. 3,200 BCE')
    expect(formatYear(499)).toBe('499 CE')
    expect(formatYear(1995)).toBe('1995')
  })

  it('gives every file a finite place in the tree', () => {
    const files = [...world.layout.nodes.values()].filter((node) => node.kind === 'file')
    expect(files.length).toBeGreaterThan(100)
    for (const file of files) {
      expect(Number.isFinite(file.x)).toBe(true)
      expect(Number.isFinite(file.y)).toBe(true)
    }
    const root = world.layout.nodes.get('')
    expect(root?.x).toBe(0)
    expect(root?.y).toBe(0)
  })

  it('keeps neighboring files from landing on the same point', () => {
    const files = [...world.layout.nodes.values()].filter((node) => node.kind === 'file')
    let min = Infinity
    for (let i = 0; i < files.length; i++) {
      for (let j = i + 1; j < files.length; j++) {
        const a = files[i]
        const b = files[j]
        if (!a || !b) continue
        min = Math.min(min, Math.hypot(a.x - b.x, a.y - b.y))
      }
    }
    expect(min).toBeGreaterThan(12)
  })
})

describe('playback', () => {
  it('advances from the opening hold into the next commit', () => {
    const started = togglePlay(initialPlayback(), world.commits.length)
    expect(started.index).toBe(1)
    expect(started.phase).toBe('approach')
    expect(started.playing).toBe(true)
  })

  it('hides a file until its commit bursts', () => {
    const approach = { index: 4, phase: 'approach' as const, t: 0.2, playing: true, ended: false }
    expect(fileVisible(4, approach)).toBe(false)
    expect(fileVisible(3, approach)).toBe(true)
    const burst = tick(approach, 10, 1, world.commits.length, false)
    expect(burst.phase === 'burst' || burst.phase === 'hold').toBe(true)
  })
})
