import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isTypingTarget } from './keys.ts'

const el = (match: boolean) => ({ closest: () => (match ? {} : null) })

test('keys typed into inputs, textareas or contenteditable belong to the field', () => {
  assert.equal(isTypingTarget(el(true)), true)
})

test('keys on the page body can drive the game', () => {
  assert.equal(isTypingTarget(el(false)), false)
  assert.equal(isTypingTarget(null), false)
})
