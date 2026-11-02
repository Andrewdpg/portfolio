import { test } from 'node:test'
import assert from 'node:assert/strict'
import { createElement } from 'react'
import { FaReact } from 'react-icons/fa'
import { iconSource } from './iconSource.ts'

test('iconSource returns the src of an <img> icon', () => {
  const icon = createElement('img', { src: '/icons/devicon/nestjs.svg' })
  assert.equal(iconSource(icon, '#fff'), '/icons/devicon/nestjs.svg')
})

test('iconSource renders a component icon to an svg data url', () => {
  const src = iconSource(createElement(FaReact), '#61dafb')
  assert.ok(src?.startsWith('data:image/svg+xml'))
  assert.ok(decodeURIComponent(src!).includes('<svg'))
})

test('iconSource returns null for non-elements', () => {
  assert.equal(iconSource('text', '#fff'), null)
})
