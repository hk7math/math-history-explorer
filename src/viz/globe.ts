import { commitGeo, type GeoSite, type GlobeTarget } from '../model/geography.ts'
import { world, type World } from '../model/history.ts'
import type { Camera, View } from './camera.ts'
import { WORLD_LAND_RINGS } from './worldLand.ts'

const DEG = Math.PI / 180
const RAD = 180 / Math.PI

const MONO_FACE =
  '"IBM Plex Mono", "PingFang TC", "Noto Sans CJK TC", "Noto Sans TC", "Microsoft JhengHei", "WenQuanYi Micro Hei", "Droid Sans Fallback", sans-serif'

export type GlobePose = {
  /** Current smoothed latitude facing the viewer (degrees). */
  lat: number
  /** Current smoothed longitude facing the viewer (degrees). */
  lon: number
  /** Current smoothed regional highlight angular radius (degrees). */
  radius: number
}

export type Point3D = {
  x: number
  y: number
  z: number
}

export type ProjectedPoint = {
  sx: number
  sy: number
  x: number
  y: number
  z: number
  visible: boolean
}

/**
 * Convert (lat, lon) in degrees to a 3D unit vector rotated by the current globe pose.
 * +X is screen right, +Y is screen up, +Z is toward the viewer.
 */
export function rotateLatLon(
  latDeg: number,
  lonDeg: number,
  pose: GlobePose,
  altitude = 1,
): Point3D {
  // Frame the active target slightly above the dead center so it sits clear of the central root node.
  const viewLat = (pose.lat - 5) * DEG
  const viewLon = pose.lon * DEG
  const lat = latDeg * DEG
  const dLon = lonDeg * DEG - viewLon

  const cosLat = Math.cos(lat)
  const sinLat = Math.sin(lat)
  const x1 = cosLat * Math.sin(dLon)
  const y1 = sinLat
  const z1 = cosLat * Math.cos(dLon)

  const cosPhi = Math.cos(viewLat)
  const sinPhi = Math.sin(viewLat)
  const x2 = x1
  const y2 = y1 * cosPhi - z1 * sinPhi
  const z2 = y1 * sinPhi + z1 * cosPhi

  // Subtle orbital roll proportional to longitude for a natural 3D gimbal feel.
  const roll = Math.sin(viewLon * 0.5) * 0.055
  const cosRoll = Math.cos(roll)
  const sinRoll = Math.sin(roll)
  const x3 = x2 * cosRoll - y2 * sinRoll
  const y3 = x2 * sinRoll + y2 * cosRoll

  return {
    x: x3 * altitude,
    y: y3 * altitude,
    z: z2 * altitude,
  }
}

export function projectPoint(
  latDeg: number,
  lonDeg: number,
  pose: GlobePose,
  cx: number,
  cy: number,
  radius: number,
  altitude = 1,
): ProjectedPoint {
  const p = rotateLatLon(latDeg, lonDeg, pose, altitude)
  // Mild perspective factor so the front hemisphere bulges with true 3D depth.
  const perspective = 1 / (1 - Math.max(-0.85, Math.min(0.85, p.z)) * 0.12)
  const sx = cx + p.x * radius * perspective
  const sy = cy - p.y * radius * perspective
  return {
    sx,
    sy,
    x: p.x,
    y: p.y,
    z: p.z,
    visible: p.z >= 0,
  }
}

/**
 * Compute points on the sphere at angular radius `radiusDeg` around `(centerLat, centerLon)`.
 */
export function geodesicCircle(
  centerLat: number,
  centerLon: number,
  radiusDeg: number,
  steps = 48,
): [number, number][] {
  const lat1 = centerLat * DEG
  const lon1 = centerLon * DEG
  const d = Math.max(0.5, radiusDeg) * DEG
  const sinLat1 = Math.sin(lat1)
  const cosLat1 = Math.cos(lat1)
  const sinD = Math.sin(d)
  const cosD = Math.cos(d)
  const ring: [number, number][] = []

  for (let i = 0; i <= steps; i++) {
    const brng = (i / steps) * Math.PI * 2
    const sinLat2 = sinLat1 * cosD + cosLat1 * sinD * Math.cos(brng)
    const lat2 = Math.asin(Math.max(-1, Math.min(1, sinLat2)))
    const y = Math.sin(brng) * sinD * cosLat1
    const x = cosD - sinLat1 * sinLat2
    const lon2 = lon1 + Math.atan2(y, x)
    ring.push([lat2 * RAD, lon2 * RAD])
  }
  return ring
}

/**
 * Interpolate points along the great circle between two geographic sites.
 */
export function greatCircleArc(
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
  steps = 36,
): { lat: number; lon: number; frac: number; lift: number }[] {
  const lat1 = a.lat * DEG
  const lon1 = a.lon * DEG
  const lat2 = b.lat * DEG
  const lon2 = b.lon * DEG

  const ax = Math.cos(lat1) * Math.cos(lon1)
  const ay = Math.cos(lat1) * Math.sin(lon1)
  const az = Math.sin(lat1)

  const bx = Math.cos(lat2) * Math.cos(lon2)
  const by = Math.cos(lat2) * Math.sin(lon2)
  const bz = Math.sin(lat2)

  const dot = Math.max(-1, Math.min(1, ax * bx + ay * by + az * bz))
  const omega = Math.acos(dot)
  const sinOmega = Math.sin(omega)
  const archHeight = Math.min(0.16, (omega / Math.PI) * 0.22)

  const out: { lat: number; lon: number; frac: number; lift: number }[] = []
  for (let i = 0; i <= steps; i++) {
    const f = i / steps
    let x: number
    let y: number
    let z: number
    if (sinOmega < 1e-5) {
      x = ax + (bx - ax) * f
      y = ay + (by - ay) * f
      z = az + (bz - az) * f
    } else {
      const w1 = Math.sin((1 - f) * omega) / sinOmega
      const w2 = Math.sin(f * omega) / sinOmega
      x = w1 * ax + w2 * bx
      y = w1 * ay + w2 * by
      z = w1 * az + w2 * bz
    }
    const norm = Math.hypot(x, y, z) || 1
    const nx = x / norm
    const ny = y / norm
    const nz = z / norm
    const lat = Math.asin(Math.max(-1, Math.min(1, nz))) * RAD
    const lon = Math.atan2(ny, nx) * RAD
    const lift = 1 + Math.sin(f * Math.PI) * archHeight
    out.push({ lat, lon, frac: f, lift })
  }
  return out
}

/**
 * Clip a 3D ring to the hemisphere `z >= 0` (or `z <= 0` when `back` is true)
 * and walk the horizon limb smoothly when segments exit and re-enter.
 */
function clipRingToHemisphere(pts: Point3D[], back = false): Point3D[] {
  if (pts.length === 0) return []
  const sign = back ? -1 : 1
  const clipped: { p: Point3D; onHorizon: boolean }[] = []

  for (let i = 0; i < pts.length; i++) {
    const curr = pts[i]!
    const prev = pts[(i + pts.length - 1) % pts.length]!
    const currIn = curr.z * sign >= 0
    const prevIn = prev.z * sign >= 0

    if (currIn !== prevIn) {
      const denom = prev.z - curr.z
      const t = Math.abs(denom) < 1e-6 ? 0.5 : prev.z / denom
      const ix = prev.x + (curr.x - prev.x) * t
      const iy = prev.y + (curr.y - prev.y) * t
      const r = Math.hypot(ix, iy) || 1
      clipped.push({
        p: { x: ix / r, y: iy / r, z: 0 },
        onHorizon: true,
      })
    }
    if (currIn) {
      clipped.push({ p: curr, onHorizon: false })
    }
  }

  if (clipped.length < 3) return []

  const result: Point3D[] = []
  for (let i = 0; i < clipped.length; i++) {
    const a = clipped[i]!
    const b = clipped[(i + 1) % clipped.length]!
    result.push(a.p)
    if (a.onHorizon && b.onHorizon) {
      const a1 = Math.atan2(a.p.y, a.p.x)
      const a2 = Math.atan2(b.p.y, b.p.x)
      let da = ((a2 - a1 + Math.PI * 3) % (Math.PI * 2)) - Math.PI
      if (da === -Math.PI) da = Math.PI
      const steps = Math.max(1, Math.min(16, Math.ceil(Math.abs(da) / 0.14)))
      for (let s = 1; s < steps; s++) {
        const ang = a1 + (da * s) / steps
        result.push({ x: Math.cos(ang), y: Math.sin(ang), z: 0 })
      }
    }
  }
  return result
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '')
  if (clean.length !== 6) return `rgba(244, 239, 230, ${alpha})`
  const r = Number.parseInt(clean.slice(0, 2), 16)
  const g = Number.parseInt(clean.slice(2, 4), 16)
  const b = Number.parseInt(clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

export type RenderGlobeOptions = {
  ctx: CanvasRenderingContext2D
  view: View
  camera: Camera
  pose: GlobePose
  target: GlobeTarget
  playbackIndex: number
  time: number
  reducedMotion: boolean
  source?: World
}

export function renderGlobe(options: RenderGlobeOptions) {
  const {
    ctx,
    view,
    camera,
    pose,
    target,
    playbackIndex,
    time,
    reducedMotion,
    source = world,
  } = options

  const minDim = Math.min(view.width, view.height)
  // Scale gently with zoom while keeping the 3D Earth a commanding background presence.
  const zoomScale = Math.max(0.84, Math.min(1.18, Math.pow(camera.zoom, 0.14)))
  const radius = Math.max(135, Math.min(390, minDim * 0.41 * zoomScale))
  // Subtle parallax with camera pan so the foreground repository floats in 3D space over the globe.
  const maxParallax = radius * 0.16
  const px = Math.max(-maxParallax, Math.min(maxParallax, -camera.x * 0.055))
  const py = Math.max(-maxParallax, Math.min(maxParallax, -camera.y * 0.055))
  const cx = view.cx + px
  const cy = view.cy + py

  const project3D = (p: Point3D) => {
    const perspective = 1 / (1 - Math.max(-0.85, Math.min(0.85, p.z)) * 0.12)
    return {
      sx: cx + p.x * radius * perspective,
      sy: cy - p.y * radius * perspective,
    }
  }

  ctx.save()

  // 1. Outer atmospheric halo & branch-tinted rim aura
  const halo = ctx.createRadialGradient(cx, cy, radius * 0.78, cx, cy, radius * 1.24)
  halo.addColorStop(0, 'rgba(7, 8, 12, 0)')
  halo.addColorStop(0.62, hexToRgba(target.color, 0.055))
  halo.addColorStop(0.82, 'rgba(130, 165, 190, 0.075)')
  halo.addColorStop(1, 'rgba(7, 8, 12, 0)')
  ctx.fillStyle = halo
  ctx.beginPath()
  ctx.arc(cx, cy, radius * 1.24, 0, Math.PI * 2)
  ctx.fill()

  // 2. Outer cartographic gimbal bezel & degree ticks
  const bezelRadius = radius + 9
  ctx.strokeStyle = 'rgba(244, 239, 230, 0.09)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(cx, cy, bezelRadius, 0, Math.PI * 2)
  ctx.stroke()

  const lonOffsetRad = -pose.lon * DEG
  for (let i = 0; i < 72; i++) {
    const ang = (i / 72) * Math.PI * 2 + lonOffsetRad * 0.25
    const major = i % 6 === 0
    const inner = bezelRadius - (major ? 4.5 : 2.2)
    ctx.strokeStyle = major ? 'rgba(244, 239, 230, 0.18)' : 'rgba(244, 239, 230, 0.07)'
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(ang) * inner, cy + Math.sin(ang) * inner)
    ctx.lineTo(cx + Math.cos(ang) * bezelRadius, cy + Math.sin(ang) * bezelRadius)
    ctx.stroke()
  }

  // 3. 3D Shaded planetary sphere body
  const sphereGrad = ctx.createRadialGradient(
    cx - radius * 0.32,
    cy - radius * 0.34,
    radius * 0.06,
    cx,
    cy,
    radius,
  )
  sphereGrad.addColorStop(0, 'rgba(34, 46, 58, 0.56)')
  sphereGrad.addColorStop(0.48, 'rgba(16, 22, 30, 0.64)')
  sphereGrad.addColorStop(0.86, 'rgba(8, 11, 16, 0.78)')
  sphereGrad.addColorStop(1, 'rgba(4, 6, 10, 0.9)')
  ctx.fillStyle = sphereGrad
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()

  // Clip interior features to the sphere disc
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.clip()

  // 4. Back-hemisphere faint graticule & landmass silhouette for 3D translucency
  const rotatedRings = WORLD_LAND_RINGS.map((ring) =>
    ring.map(([lat, lon]) => rotateLatLon(lat, lon, pose)),
  )

  ctx.fillStyle = 'rgba(244, 239, 230, 0.022)'
  for (const pts of rotatedRings) {
    const backPoly = clipRingToHemisphere(pts, true)
    if (backPoly.length < 3) continue
    ctx.beginPath()
    backPoly.forEach((pt, idx) => {
      const { sx, sy } = project3D(pt)
      if (idx === 0) ctx.moveTo(sx, sy)
      else ctx.lineTo(sx, sy)
    })
    ctx.closePath()
    ctx.fill()
  }

  // Back-hemisphere meridians
  ctx.strokeStyle = 'rgba(244, 239, 230, 0.025)'
  ctx.lineWidth = 0.75
  for (let lon = -180; lon < 180; lon += 30) {
    ctx.beginPath()
    let started = false
    for (let lat = -80; lat <= 80; lat += 6) {
      const p = rotateLatLon(lat, lon, pose)
      if (p.z < 0) {
        const { sx, sy } = project3D(p)
        if (!started) {
          ctx.moveTo(sx, sy)
          started = true
        } else {
          ctx.lineTo(sx, sy)
        }
      } else {
        started = false
      }
    }
    ctx.stroke()
  }

  // 5. Front-hemisphere landmasses (fill + illuminated coastline stroke)
  const landGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius)
  landGrad.addColorStop(0, 'rgba(226, 214, 192, 0.13)')
  landGrad.addColorStop(0.55, 'rgba(182, 174, 158, 0.095)')
  landGrad.addColorStop(1, 'rgba(116, 128, 140, 0.065)')

  for (const pts of rotatedRings) {
    const frontPoly = clipRingToHemisphere(pts, false)
    if (frontPoly.length < 3) continue
    ctx.fillStyle = landGrad
    ctx.beginPath()
    frontPoly.forEach((pt, idx) => {
      const { sx, sy } = project3D(pt)
      if (idx === 0) ctx.moveTo(sx, sy)
      else ctx.lineTo(sx, sy)
    })
    ctx.closePath()
    ctx.fill()

    // Coastline stroke for visible segments
    ctx.strokeStyle = 'rgba(244, 239, 230, 0.22)'
    ctx.lineWidth = 1.05
    ctx.beginPath()
    let penDown = false
    for (let i = 0; i < pts.length; i++) {
      const pt = pts[i]!
      if (pt.z >= 0) {
        const { sx, sy } = project3D(pt)
        if (!penDown) {
          ctx.moveTo(sx, sy)
          penDown = true
        } else {
          ctx.lineTo(sx, sy)
        }
      } else {
        penDown = false
      }
    }
    ctx.stroke()
  }

  // 6. Front-hemisphere graticule (parallels & meridians)
  for (let lat = -60; lat <= 60; lat += 30) {
    const isEquator = lat === 0
    ctx.strokeStyle = isEquator ? 'rgba(244, 239, 230, 0.13)' : 'rgba(244, 239, 230, 0.065)'
    ctx.lineWidth = isEquator ? 1.1 : 0.8
    ctx.beginPath()
    let started = false
    for (let lon = -180; lon <= 180; lon += 5) {
      const p = rotateLatLon(lat, lon, pose)
      if (p.z >= 0) {
        const { sx, sy } = project3D(p)
        if (!started) {
          ctx.moveTo(sx, sy)
          started = true
        } else {
          ctx.lineTo(sx, sy)
        }
      } else {
        started = false
      }
    }
    ctx.stroke()
  }

  for (let lon = -180; lon < 180; lon += 30) {
    const isPrime = lon === 0
    ctx.strokeStyle = isPrime ? 'rgba(244, 239, 230, 0.12)' : 'rgba(244, 239, 230, 0.065)'
    ctx.lineWidth = isPrime ? 1.05 : 0.8
    ctx.beginPath()
    let started = false
    for (let lat = -80; lat <= 80; lat += 4) {
      const p = rotateLatLon(lat, lon, pose)
      if (p.z >= 0) {
        const { sx, sy } = project3D(p)
        if (!started) {
          ctx.moveTo(sx, sy)
          started = true
        } else {
          ctx.lineTo(sx, sy)
        }
      } else {
        started = false
      }
    }
    ctx.stroke()
  }

  // 7. Synchronized active latitude parallel & longitude meridian crosshairs on the sphere
  ctx.save()
  ctx.setLineDash([4, 5])
  ctx.strokeStyle = hexToRgba(target.color, 0.28)
  ctx.lineWidth = 1.05

  // Active parallel at target.activeSite.lat
  ctx.beginPath()
  let startedLat = false
  for (let lon = -180; lon <= 180; lon += 4) {
    const p = rotateLatLon(target.activeSite.lat, lon, pose)
    if (p.z >= 0) {
      const { sx, sy } = project3D(p)
      if (!startedLat) {
        ctx.moveTo(sx, sy)
        startedLat = true
      } else {
        ctx.lineTo(sx, sy)
      }
    } else {
      startedLat = false
    }
  }
  ctx.stroke()

  // Active meridian at target.activeSite.lon
  ctx.beginPath()
  let startedLon = false
  for (let lat = -82; lat <= 82; lat += 4) {
    const p = rotateLatLon(lat, target.activeSite.lon, pose)
    if (p.z >= 0) {
      const { sx, sy } = project3D(p)
      if (!startedLon) {
        ctx.moveTo(sx, sy)
        startedLon = true
      } else {
        ctx.lineTo(sx, sy)
      }
    } else {
      startedLon = false
    }
  }
  ctx.stroke()
  ctx.restore()

  // 8. Synchronized regional area spherical caps (for activeSite & any co-author sites)
  const drawSphericalArea = (site: GeoSite, isPrimary: boolean) => {
    const areaDeg = isPrimary ? pose.radius : site.radius
    const ring = geodesicCircle(site.lat, site.lon, areaDeg, 48)
    ctx.beginPath()
    let visibleCount = 0
    for (const [lat, lon] of ring) {
      const p = rotateLatLon(lat, lon, pose)
      if (p.z < -0.05) continue
      const { sx, sy } = project3D(p)
      if (visibleCount === 0) ctx.moveTo(sx, sy)
      else ctx.lineTo(sx, sy)
      visibleCount += 1
    }
    if (visibleCount > 2) {
      ctx.closePath()
      ctx.fillStyle = hexToRgba(target.color, isPrimary ? 0.16 : 0.1)
      ctx.fill()
      ctx.strokeStyle = hexToRgba(target.color, isPrimary ? 0.62 : 0.4)
      ctx.lineWidth = isPrimary ? 1.4 : 1.1
      ctx.stroke()
    }

    if (isPrimary && !reducedMotion) {
      const pulsePhase = (time * 0.55) % 1
      const pulseRing = geodesicCircle(site.lat, site.lon, areaDeg * (1 + pulsePhase * 1.35), 48)
      ctx.beginPath()
      let pulseStarted = false
      for (const [lat, lon] of pulseRing) {
        const p = rotateLatLon(lat, lon, pose)
        if (p.z >= 0) {
          const { sx, sy } = project3D(p)
          if (!pulseStarted) {
            ctx.moveTo(sx, sy)
            pulseStarted = true
          } else {
            ctx.lineTo(sx, sy)
          }
        } else {
          pulseStarted = false
        }
      }
      ctx.strokeStyle = hexToRgba(target.color, (1 - pulsePhase) * 0.42)
      ctx.lineWidth = 1.15
      ctx.stroke()
    }
  }

  for (const site of target.coSites) {
    const isPrimary =
      Math.hypot(site.lat - target.activeSite.lat, site.lon - target.activeSite.lon) < 0.25
    drawSphericalArea(site, isPrimary)
  }

  // 9. Historical commit footprint markers up through playbackIndex
  const seenCoords = new Set<string>()
  for (let i = 0; i <= playbackIndex && i < source.commits.length; i++) {
    const commit = source.commits[i]!
    const cGeo = commitGeo(commit, source)
    const age = playbackIndex - i
    const recency = Math.exp(-age / 24)
    for (const { site } of cGeo.sites) {
      const key = `${site.lat.toFixed(1)},${site.lon.toFixed(1)}`
      const p = rotateLatLon(site.lat, site.lon, pose)
      if (p.z < 0) continue
      const { sx, sy } = project3D(p)
      const depthFade = 0.25 + 0.75 * p.z
      const isFirstAtSite = !seenCoords.has(key)
      seenCoords.add(key)
      if (!isFirstAtSite && age > 10) continue
      ctx.fillStyle = hexToRgba(cGeo.color, (0.24 + recency * 0.55) * depthFade)
      ctx.beginPath()
      ctx.arc(sx, sy, age === 0 ? 3.4 : 1.9 + recency * 1.3, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // 10. 3D Great-circle trajectory arc from previous commit location to active location
  if (
    target.previousSite &&
    Math.hypot(
      target.previousSite.lat - target.activeSite.lat,
      target.previousSite.lon - target.activeSite.lon,
    ) > 0.6
  ) {
    const arcPts = greatCircleArc(target.previousSite, target.activeSite, 40)
    ctx.strokeStyle = hexToRgba(target.color, 0.42)
    ctx.lineWidth = 1.35
    ctx.beginPath()
    let started = false
    let headPt: { sx: number; sy: number } | null = null
    for (const pt of arcPts) {
      const p = rotateLatLon(pt.lat, pt.lon, pose, pt.lift)
      if (p.z >= -0.05) {
        const proj = project3D(p)
        if (!started) {
          ctx.moveTo(proj.sx, proj.sy)
          started = true
        } else {
          ctx.lineTo(proj.sx, proj.sy)
        }
        if (pt.frac <= target.travel) {
          headPt = proj
        }
      } else {
        started = false
      }
    }
    ctx.stroke()

    if (headPt && target.travel < 0.99) {
      ctx.fillStyle = '#f4efe6'
      ctx.beginPath()
      ctx.arc(headPt.sx, headPt.sy, 2.6, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Co-author great-circle collaboration arcs for multi-location commits
  if (target.coSites.length > 1) {
    for (let i = 0; i < target.coSites.length - 1; i++) {
      const a = target.coSites[i]!
      const b = target.coSites[i + 1]!
      const arcPts = greatCircleArc(a, b, 32)
      ctx.save()
      ctx.setLineDash([3, 3])
      ctx.strokeStyle = hexToRgba(target.color, 0.5)
      ctx.lineWidth = 1.2
      ctx.beginPath()
      let started = false
      for (const pt of arcPts) {
        const p = rotateLatLon(pt.lat, pt.lon, pose, pt.lift)
        if (p.z >= 0) {
          const { sx, sy } = project3D(p)
          if (!started) {
            ctx.moveTo(sx, sy)
            started = true
          } else {
            ctx.lineTo(sx, sy)
          }
        } else {
          started = false
        }
      }
      ctx.stroke()
      ctx.restore()
    }
  }

  // 11. Active target reticle on the 3D sphere
  const activeProj = projectPoint(
    target.activeSite.lat,
    target.activeSite.lon,
    pose,
    cx,
    cy,
    radius,
  )
  if (activeProj.visible) {
    const { sx, sy } = activeProj
    ctx.strokeStyle = hexToRgba(target.color, 0.85)
    ctx.lineWidth = 1.3
    ctx.beginPath()
    ctx.arc(sx, sy, 8.5, 0, Math.PI * 2)
    ctx.stroke()

    // Target crosshair ticks
    const gap = 11
    const len = 16
    ctx.beginPath()
    ctx.moveTo(sx - len, sy)
    ctx.lineTo(sx - gap, sy)
    ctx.moveTo(sx + gap, sy)
    ctx.lineTo(sx + len, sy)
    ctx.moveTo(sx, sy - len)
    ctx.lineTo(sx, sy - gap)
    ctx.moveTo(sx, sy + gap)
    ctx.lineTo(sx, sy + len)
    ctx.stroke()

    ctx.fillStyle = target.color
    ctx.beginPath()
    ctx.arc(sx, sy, 3.2, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.restore() // end sphere clip

  // 12. 3D Specular rim highlight around the sphere edge
  const rimGrad = ctx.createLinearGradient(cx - radius, cy - radius, cx + radius, cy + radius)
  rimGrad.addColorStop(0, 'rgba(244, 239, 230, 0.34)')
  rimGrad.addColorStop(0.5, hexToRgba(target.color, 0.24))
  rimGrad.addColorStop(1, 'rgba(244, 239, 230, 0.08)')
  ctx.strokeStyle = rimGrad
  ctx.lineWidth = 1.3
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.stroke()

  // 13. Cartographic telemetry caption anchored at the lower rim of the globe
  const caption = `${target.label} · ${target.coords}`
  ctx.font = `500 10.5px ${MONO_FACE}`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const textWidth = ctx.measureText(caption).width
  const pillW = textWidth + 18
  const pillH = 20
  const pillX = cx - pillW / 2
  const pillY = cy + radius - 26

  ctx.fillStyle = 'rgba(7, 8, 12, 0.76)'
  ctx.strokeStyle = hexToRgba(target.color, 0.42)
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.roundRect(pillX, pillY, pillW, pillH, 999)
  ctx.fill()
  ctx.stroke()

  ctx.fillStyle = 'rgba(244, 239, 230, 0.88)'
  ctx.fillText(caption, cx, pillY + pillH / 2 + 0.5)

  ctx.restore()
}
