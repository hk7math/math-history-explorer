import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { sceneLabels } from '../i18n/text.ts'
import type { Locale } from '../i18n/locale.tsx'
import { approachAngle, commitGeo, resolveGlobeTarget } from '../model/geography.ts'
import type { Selection } from '../model/types.ts'
import { world } from '../model/history.ts'
import {
  fitCamera,
  screenToWorld,
  type Camera,
  type CameraMode,
  type View,
} from '../viz/camera.ts'
import { buildFrame } from '../viz/frame.ts'
import type { GlobePose } from '../viz/globe.ts'
import { commitTouches } from '../viz/playback.ts'
import { hitTest, renderScene, type SafeRect } from '../viz/render.ts'
import {
  initialPlayback,
  seekTo,
  stepBy,
  tick,
  togglePlay,
  type Playback,
} from '../viz/playback.ts'

export type StageSnapshot = {
  index: number
  playing: boolean
  ended: boolean
  speed: number
  cameraMode: CameraMode
  selection: Selection | null
}

type Sim = {
  playback: Playback
  camera: Camera
  globePose: GlobePose
  mode: CameraMode
  speed: number
  selection: Selection | null
  hover: Selection | null
  reduced: boolean
}

function selectionKey(selection: Selection | null): string {
  if (!selection) return ''
  if (selection.kind === 'author') return `author:${selection.id}`
  return `${selection.kind}:${selection.path}`
}

function snapshotOf(sim: Sim): StageSnapshot {
  return {
    index: sim.playback.index,
    playing: sim.playback.playing,
    ended: sim.playback.ended,
    speed: sim.speed,
    cameraMode: sim.mode,
    selection: sim.selection,
  }
}

function sameSnap(a: StageSnapshot, b: StageSnapshot): boolean {
  return (
    a.index === b.index &&
    a.playing === b.playing &&
    a.ended === b.ended &&
    a.speed === b.speed &&
    a.cameraMode === b.cameraMode &&
    selectionKey(a.selection) === selectionKey(b.selection)
  )
}

function approach(current: number, target: number, dt: number, sharp: number): number {
  const k = 1 - Math.exp(-sharp * dt)
  return current + (target - current) * k
}

export function useStage(
  topRef: RefObject<HTMLElement | null>,
  bottomRef: RefObject<HTMLElement | null>,
  locale: Locale,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const localeRef = useRef(locale)
  useEffect(() => {
    localeRef.current = locale
  }, [locale])
  const blockedRef = useRef(false)
  const initialGeo = commitGeo(world.commits[0]!)
  const simRef = useRef<Sim>({
    playback: initialPlayback(),
    camera: { x: 0, y: 0, zoom: 1 },
    globePose: {
      lat: initialGeo.primary.lat,
      lon: initialGeo.primary.lon,
      radius: initialGeo.primary.radius,
    },
    mode: 'track',
    speed: 1,
    selection: null,
    hover: null,
    reduced: false,
  })
  const [snap, setSnap] = useState<StageSnapshot>({
    index: 0,
    playing: false,
    ended: false,
    speed: 1,
    cameraMode: 'track',
    selection: null,
  })

  const publish = useCallback(() => {
    const next = snapshotOf(simRef.current)
    setSnap((prev) => (sameSnap(prev, next) ? prev : next))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const sim = simRef.current
    sim.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let view: View = { width: 1, height: 1, cx: 0, cy: 0 }
    let safe: SafeRect = { left: 8, top: 8, right: 8, bottom: 8 }
    let innerW = 1
    let innerH = 1
    let raf = 0
    let last = performance.now()
    const pointers = new Map<number, { x: number; y: number }>()
    let pinch: { dist: number; zoom: number } | null = null
    let travel = 0

    const measure = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, rect.width)
      const height = Math.max(1, rect.height)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      const top = topRef.current?.getBoundingClientRect().height ?? 0
      const bottom = bottomRef.current?.getBoundingClientRect().height ?? 0
      const wide = window.matchMedia('(min-width: 1024px)').matches
      const left = wide ? 340 : 0
      innerW = Math.max(48, width - left - 24)
      innerH = Math.max(48, height - top - bottom - 28)
      view = {
        width,
        height,
        cx: left + 12 + innerW / 2,
        cy: top + 8 + innerH / 2,
      }
      safe = {
        left: left + 10,
        top: top + 4,
        right: width - 10,
        bottom: height - bottom - 4,
      }
      return { width, height, dpr }
    }

    const desiredCamera = () => {
      const frame = buildFrame(sim.playback)
      if (sim.mode === 'overview') {
        const points = frame.nodes.map((node) => ({ x: node.x, y: node.y }))
        return fitCamera(points, innerW, innerH, { min: 0.08, max: 1.7 })
      }
      const spot = world.spots[sim.playback.index]
      const points: { x: number; y: number }[] = []
      const following = sim.playback.phase !== 'hold' && !sim.playback.ended
      if (following) {
        for (const author of frame.authors) {
          if (author.active) points.push(author)
        }
        const touch = commitTouches(world.commits[sim.playback.index])[sim.playback.step]
        const target = touch ? world.layout.nodes.get(touch.path) : undefined
        if (target) points.push(target)
        if (points.length > 0) {
          return fitCamera(points, innerW * 0.62, innerH * 0.56, { min: 0.72, max: 1.5 })
        }
      }
      if (spot) {
        points.push(spot.focus)
        for (const author of spot.authors) points.push(author)
      }
      for (const node of frame.nodes) {
        if (node.kind === 'file' && frame.activePaths.has(node.path)) {
          points.push(node)
          const parent = frame.nodes.find((item) => item.path === node.parent)
          if (parent) points.push(parent)
        }
      }
      if (points.length === 0) {
        for (const node of frame.nodes) {
          if (node.kind === 'file') points.push(node)
        }
      }
      const withRoot = [...points, { x: 0, y: 0 }]
      const framed = fitCamera(withRoot, innerW * 0.88, innerH * 0.74, { min: 0.22, max: 1.05 })
      if (framed.zoom >= 0.48) return framed
      const cluster = fitCamera(points, innerW * 0.86, innerH * 0.74, { min: 0.42, max: 1.15 })
      return { x: cluster.x * 0.72, y: cluster.y * 0.72, zoom: cluster.zoom }
    }

    const zoomAt = (sx: number, sy: number, nextZoom: number) => {
      const zoom = Math.max(0.08, Math.min(3.6, nextZoom))
      const before = screenToWorld({ x: sx, y: sy }, sim.camera, view)
      sim.camera.zoom = zoom
      const after = screenToWorld({ x: sx, y: sy }, sim.camera, view)
      sim.camera.x += before.x - after.x
      sim.camera.y += before.y - after.y
    }

    let size = measure()
    sim.camera = desiredCamera()

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const before = snapshotOf(sim)
      const wasEnded = sim.playback.ended
      sim.playback = tick(sim.playback, dt, sim.speed, world.commits, sim.reduced)
      if (!wasEnded && sim.playback.ended) sim.mode = 'overview'
      if (sim.mode !== 'free') {
        const target = desiredCamera()
        const sharp = sim.reduced ? 40 : sim.playback.playing ? 2.6 : 7
        sim.camera = {
          x: approach(sim.camera.x, target.x, dt, sharp),
          y: approach(sim.camera.y, target.y, dt, sharp),
          zoom: approach(sim.camera.zoom, target.zoom, dt, sharp),
        }
      }
      const globeTarget = resolveGlobeTarget(sim.playback, sim.selection, localeRef.current)
      const globeSharp = sim.reduced ? 40 : sim.playback.playing ? 3.2 : 5.6
      sim.globePose = {
        lat: approach(sim.globePose.lat, globeTarget.lat, dt, globeSharp),
        lon: approachAngle(sim.globePose.lon, globeTarget.lon, dt, globeSharp),
        radius: approach(sim.globePose.radius, globeTarget.radius, dt, globeSharp),
      }
      const scene = buildFrame(sim.playback)
      renderScene({
        ctx: context,
        width: size.width,
        height: size.height,
        dpr: size.dpr,
        camera: sim.camera,
        view,
        frame: scene,
        playbackIndex: sim.playback.index,
        selection: sim.selection,
        hover: sim.hover,
        reducedMotion: sim.reduced,
        time: now / 1000,
        safe,
        labels: sceneLabels(localeRef.current),
        globe: {
          pose: sim.globePose,
          target: globeTarget,
        },
      })
      const after = snapshotOf(sim)
      if (!sameSnap(before, after)) setSnap(after)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    const localPoint = (event: { clientX: number; clientY: number }) => {
      const rect = canvas.getBoundingClientRect()
      return { x: event.clientX - rect.left, y: event.clientY - rect.top }
    }

    const onPointerDown = (event: PointerEvent) => {
      try {
        canvas.setPointerCapture(event.pointerId)
      } catch {
        // A pointer that is already gone should still be able to select a node.
      }
      const point = localPoint(event)
      pointers.set(event.pointerId, point)
      travel = 0
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()]
        if (a && b) pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y), zoom: sim.camera.zoom }
      }
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!pointers.has(event.pointerId)) {
        const point = localPoint(event)
        const scene = buildFrame(sim.playback)
        sim.hover = hitTest(point.x, point.y, sim.camera, view, scene)
        return
      }
      const previous = pointers.get(event.pointerId)
      const point = localPoint(event)
      pointers.set(event.pointerId, point)
      if (!previous) return
      travel += Math.hypot(point.x - previous.x, point.y - previous.y)
      if (pointers.size === 2 && pinch) {
        const [a, b] = [...pointers.values()]
        if (!a || !b) return
        const dist = Math.hypot(a.x - b.x, a.y - b.y)
        if (pinch.dist > 0) {
          sim.mode = 'free'
          zoomAt((a.x + b.x) / 2, (a.y + b.y) / 2, pinch.zoom * (dist / pinch.dist))
          publish()
        }
        return
      }
      if (pointers.size === 1 && travel > 6) {
        sim.mode = 'free'
        sim.camera.x -= (point.x - previous.x) / sim.camera.zoom
        sim.camera.y -= (point.y - previous.y) / sim.camera.zoom
        publish()
      }
    }

    const onPointerUp = (event: PointerEvent) => {
      const point = pointers.get(event.pointerId) ?? localPoint(event)
      pointers.delete(event.pointerId)
      if (pointers.size < 2) pinch = null
      if (travel < 8 && pointers.size === 0) {
        const scene = buildFrame(sim.playback)
        const hit = hitTest(point.x, point.y, sim.camera, view, scene)
        sim.selection = hit
        if (hit) sim.playback = { ...sim.playback, playing: false }
        publish()
      }
      travel = 0
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      sim.mode = 'free'
      const point = localPoint(event)
      zoomAt(point.x, point.y, sim.camera.zoom * Math.exp(-event.deltaY * 0.0011))
      publish()
    }

    const onKey = (event: KeyboardEvent) => {
      if (blockedRef.current) return
      const target = event.target
      if (target instanceof HTMLElement) {
        const tag = target.tagName
        if (tag === 'INPUT' || tag === 'TEXTAREA' || target.isContentEditable) return
      }
      if (event.code === 'Space') {
        event.preventDefault()
        sim.playback = togglePlay(sim.playback, world.commits.length)
        if (sim.playback.playing && sim.mode === 'free') sim.mode = 'track'
        publish()
      } else if (event.key === 'ArrowRight') {
        sim.playback = stepBy(sim.playback, 1, world.commits.length)
        publish()
      } else if (event.key === 'ArrowLeft') {
        sim.playback = stepBy(sim.playback, -1, world.commits.length)
        publish()
      } else if (event.key === 'Home') {
        sim.playback = seekTo(0, world.commits.length)
        publish()
      } else if (event.key === 'End') {
        sim.playback = seekTo(world.commits.length - 1, world.commits.length)
        publish()
      } else if (event.key === 'f') {
        sim.mode = 'overview'
        publish()
      } else if (event.key === 't') {
        sim.mode = 'track'
        if (sim.playback.ended) sim.playback = { ...sim.playback, ended: false }
        publish()
      }
    }

    const onResize = () => {
      size = measure()
    }

    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(canvas)
    if (topRef.current) resizeObserver.observe(topRef.current)
    if (bottomRef.current) resizeObserver.observe(bottomRef.current)

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointercancel', onPointerUp)
    canvas.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      resizeObserver.disconnect()
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointercancel', onPointerUp)
      canvas.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [bottomRef, publish, topRef])

  const toggle = useCallback(() => {
    const sim = simRef.current
    sim.playback = togglePlay(sim.playback, world.commits.length)
    if (sim.playback.playing && sim.mode === 'free') sim.mode = 'track'
    publish()
  }, [publish])

  const seek = useCallback(
    (index: number) => {
      simRef.current.playback = seekTo(index, world.commits.length)
      publish()
    },
    [publish],
  )

  const step = useCallback(
    (direction: -1 | 1) => {
      simRef.current.playback = stepBy(simRef.current.playback, direction, world.commits.length)
      publish()
    },
    [publish],
  )

  const setSpeed = useCallback(
    (speed: number) => {
      simRef.current.speed = speed
      publish()
    },
    [publish],
  )

  const setMode = useCallback(
    (mode: CameraMode) => {
      const sim = simRef.current
      sim.mode = mode
      if (mode === 'track' && sim.playback.ended) sim.playback = { ...sim.playback, ended: false }
      publish()
    },
    [publish],
  )

  const select = useCallback(
    (selection: Selection, index?: number) => {
      const sim = simRef.current
      sim.selection = selection
      if (index !== undefined) sim.playback = seekTo(index, world.commits.length)
      else sim.playback = { ...sim.playback, playing: false }
      publish()
    },
    [publish],
  )

  const clearSelection = useCallback(() => {
    simRef.current.selection = null
    publish()
  }, [publish])

  const setBlocked = useCallback((blocked: boolean) => {
    blockedRef.current = blocked
  }, [])

  return {
    canvasRef,
    snap,
    toggle,
    seek,
    step,
    setSpeed,
    setMode,
    select,
    clearSelection,
    setBlocked,
  }
}
