type V3 = [number, number, number]

export type CameraStop = {
  id: string
  position: V3
  target: V3
  zoom: number
  label?: string
}

// Where the informative props live. Kept here (plain data, no React) so the tour and its tests share it.
export const LAYOUT = {
  posterWall: [3.7, 2.9, -4.4] as V3,
  shelf: [6.5, -2.75, 0.3] as V3,
  brand: [-6.6, 1.3, -1.2] as V3,
}

// Iso direction of the camera; every stop keeps it and only moves + zooms.
const OFFSET: V3 = [9, 5.8, 12]
// Screen-right in world space for that direction; `shift` slides the subject right of the copy column.
const RIGHT: V3 = [0.8, 0, -0.6]
const stop = (
  id: string,
  subject: V3,
  zoom: number,
  label?: string,
  shift = 0
): CameraStop => {
  const target: V3 = [
    subject[0] - RIGHT[0] * shift,
    subject[1],
    subject[2] - RIGHT[2] * shift,
  ]
  return {
    id,
    target,
    position: [
      target[0] + OFFSET[0],
      target[1] + OFFSET[1],
      target[2] + OFFSET[2],
    ],
    zoom,
    label,
  }
}

// Data, not scroll math: a later "canvas behind the whole page" version can reuse these stops.
export const STOPS: CameraStop[] = [
  stop('overview', [0, 0.6, 0], 1),
  stop(
    'posters',
    [LAYOUT.posterWall[0], LAYOUT.posterWall[1] - 0.2, LAYOUT.posterWall[2]],
    2.1,
    'Selected projects',
    1.5
  ),
  stop(
    'shelf',
    [LAYOUT.shelf[0], LAYOUT.shelf[1] + 1.5, LAYOUT.shelf[2]],
    2.3,
    'Daily stack',
    0.8
  ),
  stop(
    'brand',
    [LAYOUT.brand[0] + 0.4, LAYOUT.brand[1], LAYOUT.brand[2]],
    2.4,
    'Now at ICESI',
    0.8
  ),
]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const lerp3 = (a: V3, b: V3, t: number): V3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
]

export function sampleTour(stops: CameraStop[], progress: number) {
  const p = Math.min(1, Math.max(0, progress))
  const t = p * (stops.length - 1)
  const i = Math.min(Math.floor(t), Math.max(0, stops.length - 2))
  const a = stops[i]
  const b = stops[Math.min(i + 1, stops.length - 1)]
  const f = t - i
  const e = f * f * (3 - 2 * f) // smoothstep: ease into and out of each stop
  return {
    position: lerp3(a.position, b.position, e),
    target: lerp3(a.target, b.target, e),
    zoom: lerp(a.zoom, b.zoom, e),
    activeId: stops[Math.round(t)].id,
  }
}
