import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { isTypingTarget } from './keys'

export type CrtAction = 'pitch' | 'music'

type Dir = { x: number; y: number }
type Game = {
  snake: { x: number; y: number }[]
  dir: Dir
  next: Dir
  food: { x: number; y: number }
  alive: boolean
  score: number
  acc: number
}

const W = 384
const H = 224
const CELL = 21
const COLS = 18
const ROWS = 9
const PLAY_Y = 26

const COL = {
  bg: '#0a0710',
  panel: '#120c1a',
  purple: '#9B76D3',
  light: '#e6d9f7',
  dim: '#4a3a66',
  grid: '#241a33',
  green: '#7fe0b0',
}

const LABELS = [
  'Watch pitch ▶',
  'AURORA on Spotify ↗',
  'Play Snake',
  'Arrows to move',
]

function resetGame(): Game {
  return {
    snake: [
      { x: 7, y: 6 },
      { x: 6, y: 6 },
      { x: 5, y: 6 },
    ],
    dir: { x: 1, y: 0 },
    next: { x: 1, y: 0 },
    food: { x: 16, y: 6 },
    alive: true,
    score: 0,
    acc: 0,
  }
}

function newFood(g: Game) {
  for (let i = 0; i < 200; i++) {
    const p = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    }
    if (!g.snake.some((s) => s.x === p.x && s.y === p.y)) return p
  }
  return { x: 0, y: 0 }
}

function chrome(ctx: CanvasRenderingContext2D, ch: number) {
  ctx.fillStyle = COL.bg
  ctx.fillRect(0, 0, W, H)
  ctx.fillStyle = COL.panel
  ctx.fillRect(0, 0, W, 22)

  ctx.font = 'bold 10px monospace'
  ctx.textBaseline = 'middle'
  ctx.textAlign = 'left'
  ctx.fillStyle = COL.purple
  ctx.fillText(`CH 0${ch + 1}`, 12, 11)
  ctx.textAlign = 'right'
  ctx.fillStyle = COL.dim
  ctx.fillText('SIGNAL OK', W - 12, 11)

  ctx.globalAlpha = 0.05
  ctx.fillStyle = COL.purple
  for (let y = 0; y < H; y += 3) ctx.fillRect(0, y, W, 1)
  ctx.globalAlpha = 1
}

// Channel 1: the pitch video that used to live in the About section.
function drawPitch(ctx: CanvasRenderingContext2D) {
  chrome(ctx, 0)
  ctx.textAlign = 'left'
  ctx.fillStyle = COL.light
  ctx.font = 'bold 30px monospace'
  ctx.fillText('MEET ANDRÉS', 18, 70)
  ctx.fillStyle = COL.dim
  ctx.font = '12px monospace'
  ctx.fillText('A SHORT PITCH, IN HIS OWN WORDS', 20, 94)

  const cx = W - 92
  const cy = 136
  ctx.strokeStyle = COL.purple
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.arc(cx, cy, 44, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = COL.purple
  ctx.beginPath()
  ctx.moveTo(cx - 14, cy - 22)
  ctx.lineTo(cx + 24, cy)
  ctx.lineTo(cx - 14, cy + 22)
  ctx.closePath()
  ctx.fill()

  ctx.fillStyle = COL.grid
  for (let i = 0; i < 4; i++) ctx.fillRect(20, 124 + i * 16, 150 - i * 28, 6)
  ctx.fillStyle = COL.purple
  ctx.font = 'bold 11px monospace'
  ctx.fillText('CLICK TO PLAY ▶', 20, 216)
}

function drawMusic(ctx: CanvasRenderingContext2D, t: number) {
  chrome(ctx, 1)
  ctx.textAlign = 'left'
  ctx.fillStyle = COL.purple
  ctx.font = 'bold 40px monospace'
  ctx.fillText('AURORA', 18, 78)
  ctx.fillStyle = COL.dim
  ctx.font = '12px monospace'
  ctx.fillText('ON REPEAT FOR YEARS', 20, 100)

  const bars = 14
  const base = 200
  for (let i = 0; i < bars; i++) {
    const h = 10 + Math.abs(Math.sin(t * 2.2 + i * 0.55)) * 46
    ctx.fillStyle = i % 3 === 0 ? COL.light : COL.purple
    ctx.globalAlpha = 0.85
    ctx.fillRect(20 + i * 16, base - h, 9, h)
  }
  ctx.globalAlpha = 1
  ctx.fillStyle = COL.purple
  ctx.font = 'bold 11px monospace'
  ctx.fillText('CLICK FOR SPOTIFY ↗', 20, 216)
}

function drawGames(ctx: CanvasRenderingContext2D) {
  chrome(ctx, 2)
  ctx.textAlign = 'left'
  ctx.fillStyle = COL.purple
  ctx.font = 'bold 13px monospace'
  ctx.fillText('PLAYING', 18, 54)
  ctx.fillStyle = COL.light
  ctx.font = 'bold 26px monospace'
  ctx.fillText('THE LAST OF US', 18, 88)
  ctx.fillStyle = COL.dim
  ctx.font = 'bold 18px monospace'
  ctx.fillText("ASSASSIN'S CREED", 18, 124)

  ctx.fillStyle = COL.purple
  ctx.font = 'bold 11px monospace'
  ctx.fillText('CLICK TO PLAY SNAKE', 18, 176)
  ctx.fillStyle = COL.dim
  ctx.font = '10px monospace'
  ctx.fillText('ARROWS / WASD TO MOVE', 18, 196)
}

function drawSnake(ctx: CanvasRenderingContext2D, g: Game) {
  chrome(ctx, 3)

  ctx.strokeStyle = COL.grid
  ctx.lineWidth = 1
  for (let x = 0; x <= COLS; x++) {
    ctx.beginPath()
    ctx.moveTo(x * CELL, PLAY_Y)
    ctx.lineTo(x * CELL, PLAY_Y + ROWS * CELL)
    ctx.stroke()
  }
  for (let y = 0; y <= ROWS; y++) {
    ctx.beginPath()
    ctx.moveTo(0, PLAY_Y + y * CELL)
    ctx.lineTo(W, PLAY_Y + y * CELL)
    ctx.stroke()
  }

  g.snake.forEach((s, i) => {
    ctx.fillStyle = i === 0 ? COL.light : '#b9a4dc'
    ctx.fillRect(s.x * CELL + 2, PLAY_Y + s.y * CELL + 2, CELL - 4, CELL - 4)
  })

  ctx.globalAlpha = 0.25
  ctx.fillStyle = COL.purple
  ctx.beginPath()
  ctx.arc(
    g.food.x * CELL + CELL / 2,
    PLAY_Y + g.food.y * CELL + CELL / 2,
    CELL / 2,
    0,
    Math.PI * 2
  )
  ctx.fill()
  ctx.globalAlpha = 1
  ctx.fillRect(
    g.food.x * CELL + 5,
    PLAY_Y + g.food.y * CELL + 5,
    CELL - 10,
    CELL - 10
  )

  ctx.textAlign = 'right'
  ctx.fillStyle = COL.purple
  ctx.font = 'bold 10px monospace'
  ctx.fillText(`SCORE ${String(g.score).padStart(3, '0')}`, W - 12, 11)

  if (!g.alive) {
    ctx.fillStyle = 'rgba(10,7,16,0.82)'
    ctx.fillRect(0, PLAY_Y, W, H - PLAY_Y)
    ctx.textAlign = 'center'
    ctx.fillStyle = COL.purple
    ctx.font = 'bold 26px monospace'
    ctx.fillText('GAME OVER', W / 2, PLAY_Y + 76)
    ctx.fillStyle = COL.dim
    ctx.font = '11px monospace'
    ctx.fillText(`SCORE ${g.score}`, W / 2, PLAY_Y + 104)
    ctx.fillStyle = COL.light
    ctx.fillText('CLICK TO RETRY', W / 2, PLAY_Y + 132)
  }
}

function step(g: Game) {
  g.dir = g.next
  const head = g.snake[0]
  const nx = head.x + g.dir.x
  const ny = head.y + g.dir.y

  if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) {
    g.alive = false
    return
  }
  if (g.snake.some((s) => s.x === nx && s.y === ny)) {
    g.alive = false
    return
  }

  g.snake.unshift({ x: nx, y: ny })
  if (nx === g.food.x && ny === g.food.y) {
    g.score += 1
    g.food = newFood(g)
  } else {
    g.snake.pop()
  }
}

export function useCrt(paused: boolean, onAction: (a: CrtAction) => void) {
  const canvas = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = W
    c.height = H
    return c
  }, [])
  const ctx = useMemo(() => canvas.getContext('2d'), [canvas])

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 4
    return t
  }, [canvas])

  const [channel, setChannel] = useState(0)
  const game = useRef<Game>(resetGame())
  const clock = useRef(0)
  const last = useRef(0)

  const draw = useCallback(
    (ch: number) => {
      if (!ctx) return
      if (ch === 0) drawPitch(ctx)
      else if (ch === 1) drawMusic(ctx, performance.now() / 1000)
      else if (ch === 2) drawGames(ctx)
      else drawSnake(ctx, game.current)
      texture.needsUpdate = true
    },
    [ctx, texture]
  )

  const goTo = useCallback((n: number) => {
    const next = (n + 4) % 4
    if (next === 3) game.current = resetGame()
    setChannel(next)
  }, [])

  useEffect(() => {
    draw(channel)
  }, [channel, draw])

  useEffect(() => {
    return () => texture.dispose()
  }, [texture])

  useEffect(() => {
    if (channel !== 3 || paused) return

    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target as Element | null)) return
      const k = e.key.toLowerCase()
      const map: Record<string, Dir> = {
        arrowup: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        arrowleft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
      }
      const d = map[k]
      if (!d) return
      e.preventDefault()
      const cur = game.current.dir
      if (cur.x + d.x === 0 && cur.y + d.y === 0) return
      game.current.next = d
    }

    window.addEventListener('keydown', onKey, { passive: false })
    return () => window.removeEventListener('keydown', onKey)
  }, [channel, paused])

  const tick = useCallback(
    (delta: number) => {
      if (paused || !ctx) return

      if (channel === 3) {
        const g = game.current
        if (!g.alive) return
        g.acc += delta * 1000
        if (g.acc >= 160) {
          g.acc = 0
          step(g)
          drawSnake(ctx, g)
          texture.needsUpdate = true
        }
      } else if (channel === 1) {
        clock.current += delta
        if (clock.current - last.current > 0.06) {
          last.current = clock.current
          drawMusic(ctx, clock.current)
          texture.needsUpdate = true
        }
      }
    },
    [channel, ctx, paused, texture]
  )

  const screenClick = useCallback(() => {
    if (channel === 0) onAction('pitch')
    else if (channel === 1) onAction('music')
    else if (channel === 2) {
      game.current = resetGame()
      setChannel(3)
    } else if (channel === 3 && !game.current.alive) {
      game.current = resetGame()
      drawSnake(ctx as CanvasRenderingContext2D, game.current)
      texture.needsUpdate = true
    }
  }, [channel, ctx, onAction, texture])

  return {
    texture,
    channel,
    tick,
    screenClick,
    knobClick: () => goTo(channel + 1),
    screenLabel: LABELS[channel],
  }
}

export type Crt = ReturnType<typeof useCrt>
