import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pickFeatured, currentEmployer } from './featured.ts'

test('pickFeatured keeps only featured items in source order', () => {
  const out = pickFeatured(
    [{ featured: true, id: 1 }, { id: 2 }, { featured: true, id: 3 }],
    5
  )
  assert.deepEqual(
    out.map((i) => i.id),
    [1, 3]
  )
})

test('pickFeatured caps at max', () => {
  const many = Array.from({ length: 15 }, (_, id) => ({ id, featured: true }))
  assert.equal(pickFeatured(many, 12).length, 12)
})

test('pickFeatured returns empty when nothing is featured', () => {
  assert.deepEqual(pickFeatured([{ id: 1 }], 3), [])
})

test('currentEmployer finds the group with a Present item', () => {
  const groups = [
    { place: 'Academic Foundation', items: [{ subtitle: '2019 – 2024' }] },
    {
      place: 'ICESI University',
      items: [{ subtitle: 'Aug 2026 – Present · Full-time' }],
    },
  ]
  assert.equal(currentEmployer(groups), 'ICESI University')
})

test('currentEmployer returns null with no groups', () => {
  assert.equal(currentEmployer([]), null)
})
