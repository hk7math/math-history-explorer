export type Phase = 'approach' | 'touch' | 'hold'

export type Playback = {
  index: number
  /** Which file this contributor is adding inside the current commit. */
  step: number
  phase: Phase
  /** Progress within the current phase, from 0 to 1. */
  t: number
  playing: boolean
  ended: boolean
}

export type Touch = {
  authorId: string
  path: string
}

export type CommitScript = {
  authors: readonly string[]
  files: readonly { path: string }[]
}

const APPROACH_SECONDS = 0.64
const HOP_SECONDS = 0.36
const TOUCH_SECONDS = 0.32
const HOLD_SECONDS = 0.55

export function commitTouches(commit: CommitScript | undefined): Touch[] {
  if (!commit || commit.authors.length === 0 || commit.files.length === 0) return []
  const count = Math.max(commit.files.length, commit.authors.length)
  const touches: Touch[] = []
  for (let i = 0; i < count; i++) {
    const authorId = commit.authors[i % commit.authors.length] ?? commit.authors[0]!
    const file = commit.files[i % commit.files.length] ?? commit.files[0]!
    touches.push({ authorId, path: file.path })
  }
  return touches
}

export function introStep(commit: CommitScript | undefined, path: string): number {
  const index = commitTouches(commit).findIndex((touch) => touch.path === path)
  return index === -1 ? 0 : index
}

/** Where a contributor stands while touching a file, just outside the node. */
export function perchNear(x: number, y: number, slot: number, count: number): { x: number; y: number } {
  const angle = Math.hypot(x, y) < 8 ? -Math.PI / 2 : Math.atan2(y, x)
  const base = Math.hypot(x, y) + 48
  const spread = (slot - (Math.max(1, count) - 1) / 2) * 30
  return {
    x: Math.cos(angle) * base - Math.sin(angle) * spread,
    y: Math.sin(angle) * base + Math.cos(angle) * spread,
  }
}

export function initialPlayback(): Playback {
  return { index: 0, step: 0, phase: 'hold', t: 1, playing: false, ended: false }
}

function clampIndex(index: number, count: number): number {
  return Math.max(0, Math.min(count - 1, index))
}

function phaseSeconds(playback: Playback, commits: readonly CommitScript[]): number {
  if (playback.phase === 'hold') return HOLD_SECONDS
  if (playback.phase === 'touch') return TOUCH_SECONDS
  const touches = commitTouches(commits[playback.index])
  const current = touches[playback.step]
  const previous = touches[playback.step - 1]
  if (current && previous && current.authorId === previous.authorId) return HOP_SECONDS
  return APPROACH_SECONDS
}

export function tick(
  playback: Playback,
  dt: number,
  speed: number,
  commits: readonly CommitScript[],
  reducedMotion: boolean,
): Playback {
  if (!playback.playing || playback.ended) return playback
  let next = playback
  if (reducedMotion && next.phase !== 'hold') {
    const last = Math.max(0, commitTouches(commits[next.index]).length - 1)
    next = { ...next, phase: 'hold', step: last, t: 0 }
  }
  const duration = phaseSeconds(next, commits) / Math.max(0.25, speed)
  const t = next.t + dt / duration
  if (t < 1) return { ...next, t }
  if (next.phase === 'approach') return { ...next, phase: 'touch', t: 0 }
  const touches = commitTouches(commits[next.index])
  const last = Math.max(0, touches.length - 1)
  if (next.phase === 'touch') {
    if (next.step < last) {
      return { ...next, step: next.step + 1, phase: 'approach', t: 0 }
    }
    return { ...next, step: last, phase: 'hold', t: 0 }
  }
  if (next.index >= commits.length - 1) {
    return { ...next, t: 1, playing: false, ended: true }
  }
  return {
    index: next.index + 1,
    step: 0,
    phase: 'approach',
    t: 0,
    playing: true,
    ended: false,
  }
}

export function togglePlay(playback: Playback, count: number): Playback {
  const atEnd =
    playback.ended || (playback.index === count - 1 && playback.phase === 'hold' && !playback.playing)
  if (atEnd) {
    return { index: 0, step: 0, phase: 'approach', t: 0, playing: true, ended: false }
  }
  if (playback.playing) return { ...playback, playing: false }
  if (playback.phase === 'hold' && playback.index < count - 1) {
    return {
      index: playback.index + 1,
      step: 0,
      phase: 'approach',
      t: 0,
      playing: true,
      ended: false,
    }
  }
  return { ...playback, playing: true, ended: false }
}

export function seekTo(index: number, count: number): Playback {
  return {
    index: clampIndex(index, count),
    step: 0,
    phase: 'hold',
    t: 1,
    playing: false,
    ended: false,
  }
}

export function stepBy(playback: Playback, direction: -1 | 1, count: number): Playback {
  return seekTo(playback.index + direction, count)
}

export function fileVisible(born: number, playback: Playback, intro = 0): boolean {
  if (born < playback.index) return true
  if (born > playback.index) return false
  if (playback.ended || playback.phase === 'hold') return true
  if (playback.step > intro) return true
  return playback.step === intro && playback.phase === 'touch'
}

export function easeInOut(t: number): number {
  const x = Math.max(0, Math.min(1, t))
  return x < 0.5 ? 2 * x * x : 1 - ((-2 * x + 2) ** 2) / 2
}

export function easeOutBack(t: number): number {
  const x = Math.max(0, Math.min(1, t))
  const c1 = 1.4
  const c3 = c1 + 1
  return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2
}
