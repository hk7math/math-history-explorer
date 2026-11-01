import { describe, expect, it } from 'vitest'
import { formatYear, validateHistory, world } from './history.ts'
import {
  approachAngle,
  commitGeo,
  resolveGlobeTarget,
  shortestDeltaLon,
  siteForAuthor,
  TRADITION_GEO,
} from './geography.ts'
import { buildFrame } from '../viz/frame.ts'
import { geodesicCircle, greatCircleArc, rotateLatLon } from '../viz/globe.ts'
import { commitTouches, fileVisible, initialPlayback, introStep, tick, togglePlay, type Playback } from '../viz/playback.ts'

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

  it('hides a file until its contributor touches it', () => {
    const approach = { index: 4, step: 0, phase: 'approach' as const, t: 0.2, playing: true, ended: false }
    expect(fileVisible(4, approach)).toBe(false)
    expect(fileVisible(3, approach)).toBe(true)
    const touched = tick(approach, 10, 1, world.commits, false)
    expect(touched.phase === 'touch' || touched.phase === 'hold').toBe(true)
  })

  it('lets each contributor add files one at a time', () => {
    const commit = world.commits[3]
    expect(commit?.files.length).toBeGreaterThan(1)
    const touches = commitTouches(commit)
    expect(touches).toHaveLength(commit?.files.length)
    expect(new Set(touches.map((touch) => touch.authorId)).size).toBe(1)

    const first = commit?.files[0]?.path ?? ''
    const second = commit?.files[1]?.path ?? ''
    let playback: Playback = { index: 3, step: 0, phase: 'approach', t: 0, playing: true, ended: false }
    for (let i = 0; i < 20 && playback.phase !== 'touch'; i++) {
      playback = tick(playback, 0.2, 1, world.commits, false)
    }
    expect(playback.step).toBe(0)
    expect(playback.phase).toBe('touch')
    expect(fileVisible(3, playback, introStep(commit, first))).toBe(true)
    expect(fileVisible(3, playback, introStep(commit, second))).toBe(false)

    const rsa = world.commits.findIndex((item) => item.id === 'rsa')
    const shared = world.commits[rsa]
    expect(commitTouches(shared).map((touch) => touch.authorId)).toEqual(['rivest', 'shamir', 'adleman'])
    const opening = buildFrame({ index: rsa, step: 0, phase: 'approach', t: 0.4, playing: true, ended: false })
    expect(opening.authors.filter((author) => author.active).map((author) => author.id)).toEqual(['rivest'])
    const next = buildFrame({ index: rsa, step: 1, phase: 'touch', t: 0.2, playing: true, ended: false })
    expect(next.authors.filter((author) => author.active).map((author) => author.id)).toEqual(['shamir'])
    expect(next.beams).toHaveLength(1)
  })
})

describe('3d earth geography synchronization', () => {
  it('maps every author tradition and commit to valid coordinates and localized area names', () => {
    for (const author of world.authors) {
      expect(TRADITION_GEO[author.tradition], `tradition ${author.tradition}`).toBeDefined()
      const site = siteForAuthor(author)
      expect(site.lat).toBeGreaterThanOrEqual(-90)
      expect(site.lat).toBeLessThanOrEqual(90)
      expect(site.lon).toBeGreaterThanOrEqual(-180)
      expect(site.lon).toBeLessThanOrEqual(180)
      expect(site.radius).toBeGreaterThan(0)
      expect(site.en.length).toBeGreaterThan(0)
      expect(site.zh.length).toBeGreaterThan(0)
    }

    for (const commit of world.commits) {
      const geo = commitGeo(commit)
      expect(geo.sites.length).toBe(commit.authors.length)
      expect(Number.isFinite(geo.primary.lat)).toBe(true)
      expect(Number.isFinite(geo.primary.lon)).toBe(true)
    }
  })

  it('rotates the 3D globe to face the active commit location and interpolates across the antimeridian', () => {
    const firstTarget = resolveGlobeTarget(initialPlayback(), null, 'en')
    expect(firstTarget.label).toContain('Uruk')
    const projected = rotateLatLon(firstTarget.lat, firstTarget.lon, {
      lat: firstTarget.lat,
      lon: firstTarget.lon,
      radius: firstTarget.radius,
    })
    expect(projected.z).toBeGreaterThan(0.99)

    // Multi-author commit across continents (Green at Cambridge, Tao at UCLA)
    const greenTaoIndex = world.commits.findIndex((c) => c.id === 'green-tao')
    const step0 = resolveGlobeTarget(
      { index: greenTaoIndex, step: 0, phase: 'touch', t: 0.5, playing: true, ended: false },
      null,
      'en',
    )
    const step1 = resolveGlobeTarget(
      { index: greenTaoIndex, step: 1, phase: 'touch', t: 0.5, playing: true, ended: false },
      null,
      'en',
    )
    expect(step0.label).toContain('Cambridge')
    expect(step1.label).toContain('UCLA')
    expect(step1.coSites.length).toBe(2)

    // Shortest angular path across 180° meridian
    expect(shortestDeltaLon(170, -170)).toBeCloseTo(20, 5)
    expect(shortestDeltaLon(-170, 170)).toBeCloseTo(-20, 5)
    const steppedLon = approachAngle(170, -170, 0.1, 10)
    expect(steppedLon).toBeGreaterThan(170)

    const circle = geodesicCircle(firstTarget.lat, firstTarget.lon, firstTarget.radius, 16)
    expect(circle).toHaveLength(17)
    const arc = greatCircleArc(step0.activeSite, step1.activeSite, 12)
    expect(arc).toHaveLength(13)
    expect(arc[6]?.lift).toBeGreaterThan(1)
  })
})
