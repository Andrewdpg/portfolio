import { test } from 'node:test'
import assert from 'node:assert/strict'
import { sampleTour, type CameraStop } from './tour.ts'

const s: CameraStop[] = [
  { id: 'a', position: [0, 0, 0], target: [0, 0, 0], zoom: 1 },
  { id: 'b', position: [10, 0, 0], target: [1, 0, 0], zoom: 2 },
  { id: 'c', position: [20, 0, 0], target: [2, 0, 0], zoom: 3 },
]

test('progress 0 is the first stop', () => {
  const r = sampleTour(s, 0)
  assert.deepEqual(r.position, [0, 0, 0])
  assert.equal(r.zoom, 1)
  assert.equal(r.activeId, 'a')
})

test('progress 1 is the last stop', () => {
  const r = sampleTour(s, 1)
  assert.deepEqual(r.position, [20, 0, 0])
  assert.equal(r.zoom, 3)
  assert.equal(r.activeId, 'c')
})

test('progress 0.5 lands on the middle stop', () => {
  const r = sampleTour(s, 0.5)
  assert.equal(r.position[0], 10)
  assert.equal(r.activeId, 'b')
})

test('progress is clamped (overscroll / rubber-banding)', () => {
  assert.deepEqual(sampleTour(s, -0.3), sampleTour(s, 0))
  assert.deepEqual(sampleTour(s, 1.4), sampleTour(s, 1))
})

test('a single stop is returned as-is', () => {
  const r = sampleTour([s[1]], 0.7)
  assert.deepEqual(r.position, [10, 0, 0])
  assert.equal(r.activeId, 'b')
})
