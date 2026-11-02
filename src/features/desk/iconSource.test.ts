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

test('elementToSvg serializes a react-icons element without react-dom/server', async () => {
  const { elementToSvg } = await import('./iconSource.ts')
  const svg = elementToSvg(
    createElement(FaReact, { size: 128, color: '#61dafb' })
  )
  assert.ok(svg.startsWith('<svg'))
  assert.ok(svg.includes('width="128"'))
  assert.ok(svg.includes('<path'))
  assert.ok(svg.includes('stroke-width="0"'))
  assert.ok(svg.includes('color:#61dafb'))
})
