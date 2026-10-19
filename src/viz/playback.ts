export type Phase = 'approach' | 'burst' | 'hold'

export type Playback = {
  index: number
  phase: Phase
  /** Progress within the current phase, from 0 to 1. */
  t: number
  playing: boolean
  ended: boolean
}

export const PHASE_SECONDS: Record<Phase, number> = {
  approach: 0.82,
  burst: 0.46,
  hold: 0.78,
}

export function initialPlayback(): Playback {
  return { index: 0, phase: 'hold', t: 1, playing: false, ended: false }
}

function clampIndex(index: number, count: number): number {
  return Math.max(0, Math.min(count - 1, index))
}

export function tick(
  playback: Playback,
  dt: number,
  speed: number,
  count: number,
  reducedMotion: boolean,
): Playback {
  if (!playback.playing || playback.ended) return playback
  let next = playback
  if (reducedMotion && next.phase !== 'hold') {
    next = { ...next, phase: 'hold', t: 0 }
  }
  const duration = PHASE_SECONDS[next.phase] / Math.max(0.25, speed)
  const t = next.t + dt / duration
  if (t < 1) return { ...next, t }
  if (next.phase === 'approach') return { ...next, phase: 'burst', t: 0 }
  if (next.phase === 'burst') return { ...next, phase: 'hold', t: 0 }
  if (next.index >= count - 1) {
    return { ...next, t: 1, playing: false, ended: true }
  }
  return {
    index: next.index + 1,
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
    return { index: 0, phase: 'approach', t: 0, playing: true, ended: false }
  }
  if (playback.playing) return { ...playback, playing: false }
  if (playback.phase === 'hold' && playback.index < count - 1) {
    return {
      index: playback.index + 1,
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
    phase: 'hold',
    t: 1,
    playing: false,
    ended: false,
  }
}

export function stepBy(playback: Playback, direction: -1 | 1, count: number): Playback {
  return seekTo(playback.index + direction, count)
}

export function fileVisible(born: number, playback: Playback): boolean {
  if (born < playback.index) return true
  if (born > playback.index) return false
  return playback.phase === 'burst' || playback.phase === 'hold' || playback.ended
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
