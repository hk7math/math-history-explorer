export type Camera = {
  x: number
  y: number
  zoom: number
}

export type View = {
  width: number
  height: number
  cx: number
  cy: number
}

export type CameraMode = 'track' | 'overview' | 'free'

export function worldToScreen(point: { x: number; y: number }, camera: Camera, view: View) {
  return {
    x: view.cx + (point.x - camera.x) * camera.zoom,
    y: view.cy + (point.y - camera.y) * camera.zoom,
  }
}

export function screenToWorld(point: { x: number; y: number }, camera: Camera, view: View) {
  return {
    x: camera.x + (point.x - view.cx) / camera.zoom,
    y: camera.y + (point.y - view.cy) / camera.zoom,
  }
}

export function fitCamera(
  points: { x: number; y: number }[],
  innerW: number,
  innerH: number,
  limits: { min: number; max: number },
): Camera {
  if (points.length === 0) return { x: 0, y: 0, zoom: 1 }
  let minX = Infinity
  let minY = Infinity
  let maxX = -Infinity
  let maxY = -Infinity
  for (const point of points) {
    minX = Math.min(minX, point.x)
    minY = Math.min(minY, point.y)
    maxX = Math.max(maxX, point.x)
    maxY = Math.max(maxY, point.y)
  }
  const cx = (minX + maxX) / 2
  const cy = (minY + maxY) / 2
  const spanX = Math.max(90, maxX - minX + 80)
  const spanY = Math.max(90, maxY - minY + 80)
  const zoom = Math.min(innerW / spanX, innerH / spanY)
  return {
    x: cx,
    y: cy,
    zoom: Math.max(limits.min, Math.min(limits.max, zoom)),
  }
}
