import React, { useEffect, useRef, useState } from 'react'

type P = {
  d: string
  stroke: string
  dashed?: boolean
  label?: string
  lx?: number
  ly?: number
  anchor?: 'middle' | 'start' | 'end'
  vertical?: boolean
  marker: 'white' | 'pink' | 'green' | 'purple'
}

const C = {
  white: 'rgba(255,255,255,0.22)',
  pink: '#ec4899',
  green: '#10b981',
  purple: '#9B76D3',
}

export const WorkflowGraph: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const iRef = useRef<HTMLDivElement>(null)
  const eRef = useRef<HTMLDivElement>(null)
  const tRef = useRef<HTMLDivElement>(null)
  const wRef = useRef<HTMLDivElement>(null)
  const rvRef = useRef<HTMLDivElement>(null)
  const dRef = useRef<HTMLDivElement>(null)
  const [paths, setPaths] = useState<P[]>([])

  const compute = () => {
    const wrap = wrapRef.current
    if (!wrap) return
    const wr = wrap.getBoundingClientRect()
    const g = (ref: React.RefObject<HTMLDivElement | null>) => {
      const el = ref.current
      if (!el) return null
      const r = el.getBoundingClientRect()
      return {
        cx: r.left + r.width / 2 - wr.left,
        cy: r.top + r.height / 2 - wr.top,
        t: r.top - wr.top,
        b: r.bottom - wr.top,
        l: r.left - wr.left,
        r: r.right - wr.left,
      }
    }

    const I = g(iRef),
      E = g(eRef),
      T = g(tRef)
    const W = g(wRef),
      Rv = g(rvRef),
      D = g(dRef)
    if (!I || !E || !T || !W || !Rv || !D) return

    // All main-flow nodes share the same cx (same grid column width).
    // I.cx = E.cx = T.cx = Rv.cx = D.cx → all vertical arrows are perfectly straight.
    setPaths([
      // ── main flow, straight down ──────────────────────────────────────────
      {
        d: `M ${I.cx},${I.b} L ${E.cx},${E.t}`,
        stroke: C.white,
        marker: 'white',
      },
      {
        d: `M ${E.cx},${E.b} L ${T.cx},${T.t}`,
        stroke: C.white,
        marker: 'white',
      },

      // ── TDD → WriteTest  (fail path, horizontal dashed) ──────────────────
      {
        d: `M ${T.r},${T.cy} L ${W.l},${W.cy}`,
        stroke: C.pink,
        dashed: true,
        label: 'no failing test found',
        lx: (T.r + W.l) / 2,
        ly: T.cy - 12,
        anchor: 'middle',
        marker: 'pink',
      },

      // ── WriteTest → Execute  (retry — right-side arc, stays clear of nodes)
      {
        d: `M ${W.r},${W.cy} C ${W.r + 40},${W.cy} ${W.r + 40},${E.cy} ${E.r},${E.cy}`,
        stroke: C.pink,
        marker: 'pink',
      },

      // ── TDD → Review  (pass path) ─────────────────────────────────────────
      {
        d: `M ${T.cx},${T.b} L ${Rv.cx},${Rv.t}`,
        stroke: C.white,
        label: 'all tests green',
        lx: T.cx + 8,
        ly: (T.b + Rv.t) / 2,
        anchor: 'start',
        marker: 'white',
      },

      // ── Review → Done  (I approve, green) ────────────────────────────────
      {
        d: `M ${Rv.cx},${Rv.b} L ${D.cx},${D.t}`,
        stroke: C.green,
        label: 'I approve',
        lx: Rv.cx + 8,
        ly: (Rv.b + D.t) / 2,
        anchor: 'start',
        marker: 'green',
      },

      // ── Review → Intent  (I give feedback — left-side arc, full outer loop)
      {
        d: `M ${Rv.l},${Rv.cy} C ${Rv.l - 55},${Rv.cy} ${I.l - 55},${I.cy} ${I.l},${I.cy}`,
        stroke: C.purple,
        label: 'I give feedback',
        // Rotated text sits along the left arc, inside the buffer column
        lx: I.l - 42,
        ly: (Rv.cy + I.cy) / 2,
        anchor: 'middle',
        vertical: true,
        marker: 'purple',
      },
    ])
  }

  useEffect(() => {
    const t = setTimeout(compute, 150)
    window.addEventListener('resize', compute)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', compute)
    }
  }, [])

  const alwaysOn = [
    { e: '🧠', l: 'Engram', c: '#3b82f6' },
    { e: '📚', l: 'Context7', c: '#10b981' },
    { e: '⚡', l: 'RTK + CodeGraph', c: '#f2cc60' },
  ]

  // ── JSX ──────────────────────────────────────────────────────────────────
  // Grid: 3 explicit columns
  //   col 0  (88px)  — left buffer for the redirect-loop arc
  //   col 1  (1fr)   — main flow; all flow nodes live here → same width → straight arrows
  //   col 2  (215px) — WriteTest + right buffer for retry arc
  // gap-x-6 (24px) gives the TDD→WriteTest arrow visible space

  const node = (
    color: string,
    bg: string,
    emoji: string,
    title: string,
    sub: string,
    ref: React.RefObject<HTMLDivElement | null>
  ) => (
    <div
      ref={ref}
      className="flex items-center gap-3 px-5 py-4 rounded-2xl border-l-2 border border-white/[0.06]"
      style={{ borderLeftColor: color, background: bg }}
    >
      <span className="text-lg shrink-0">{emoji}</span>
      <div>
        <div className="text-sm font-black text-white">{title}</div>
        <div className="text-[10px] font-mono text-white/30">{sub}</div>
      </div>
    </div>
  )

  return (
    <div ref={wrapRef} className="relative w-full max-w-2xl mx-auto">
      {/* SVG overlay — arrows rendered above everything */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{ width: '100%', height: '100%', zIndex: 10 }}
      >
        <defs>
          {(['white', 'pink', 'green', 'purple'] as const).map((k) => (
            <marker
              key={k}
              id={`wfm-${k}`}
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3.5"
              orient="auto"
            >
              <path d="M 0 0 L 6 3.5 L 0 7 Z" fill={C[k]} />
            </marker>
          ))}
        </defs>

        {paths.map((p, i) => (
          <g key={i}>
            <path
              d={p.d}
              stroke={p.stroke}
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={p.dashed ? '5 4' : undefined}
              markerEnd={`url(#wfm-${p.marker})`}
            />
            {p.label && p.lx !== undefined && p.ly !== undefined && (
              <g
                transform={
                  p.vertical ? `rotate(-90, ${p.lx}, ${p.ly})` : undefined
                }
              >
                {/* Dark pill behind the text so it's readable over the arc line */}
                <rect
                  x={(p.lx ?? 0) - 42}
                  y={(p.ly ?? 0) - 6}
                  width={84}
                  height={12}
                  fill="rgba(0,0,0,0.72)"
                  rx={3}
                />
                <text
                  x={p.lx}
                  y={p.ly}
                  fill={p.stroke}
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor={p.anchor ?? 'middle'}
                  dominantBaseline="middle"
                  className="select-none"
                >
                  {p.label}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>

      {/* ── Layout grid ───────────────────────────────────────────────────── */}
      <div
        className="grid gap-x-6 gap-y-5"
        style={{ gridTemplateColumns: '88px 1fr 215px' }}
      >
        {/* Always-on tools — spans full width */}
        <div className="col-span-3 flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.03]">
          <span className="text-[9px] font-mono text-white/25 uppercase tracking-wider shrink-0">
            Active throughout
          </span>
          {alwaysOn.map((t) => (
            <span
              key={t.l}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border border-white/8 bg-black/20"
              style={{ color: t.c }}
            >
              {t.e} {t.l}
            </span>
          ))}
        </div>

        {/* I — Define Intent */}
        <div />
        {/* buffer col */}
        {node(
          '#9B76D3',
          '#2d1f4e',
          '⚡',
          'I — Define Intent',
          'describe the goal · set constraints · steer direction',
          iRef
        )}
        <div />

        {/* Claude Code — Execute */}
        <div />
        {node(
          '#f97316',
          '#2e1500',
          '🤖',
          'Claude Code — Execute',
          'write code · run tools · spawn agents as needed',
          eRef
        )}
        <div />

        {/* TDD Guard  |  WriteTest (same row — grid stretches both to same height) */}
        <div />
        {node(
          '#ec4899',
          '#2e0020',
          '🛡️',
          'TDD Guard — Validate',
          'blocks any commit without a prior failing test',
          tRef
        )}
        {/* Wrapper stretches to row height; inner div is flex-centered → W.cy = T.cy */}
        <div className="flex items-center">
          <div
            ref={wRef}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed"
            style={{ borderColor: '#ec489950', background: '#ec489908' }}
          >
            <span>✍️</span>
            <div>
              <div className="text-xs font-black" style={{ color: '#ec4899' }}>
                Write failing test
              </div>
              <div className="text-[9px] font-mono text-white/25">
                define expected behavior first
              </div>
            </div>
          </div>
        </div>

        {/* I — Review Output */}
        <div />
        {node(
          '#9B76D3',
          '#2d1f4e',
          '⚡',
          'I — Review Output',
          'validate it meets the intent · approve or give feedback',
          rvRef
        )}
        <div />

        {/* Shipped */}
        <div />
        {node('#10b981', '#002e18', '✓', 'Shipped', 'commit · PR · done', dRef)}
        <div />

        {/* OpenClaw — independent background daemon, spans full width */}
        <div
          className="col-span-3 flex items-center gap-3 px-4 py-3 rounded-xl border"
          style={{ borderColor: '#a855f720', background: '#a855f708' }}
        >
          <span>🐾</span>
          <div className="min-w-0">
            <span className="text-xs font-black" style={{ color: '#a855f7' }}>
              OpenClaw
            </span>
            <span className="text-[10px] font-mono text-white/25 ml-2">
              Background daemon · Jira · Confluence · task filesystem · runs
              independently
            </span>
          </div>
          <span
            className="ml-auto text-[9px] font-mono uppercase tracking-wider shrink-0"
            style={{ color: '#a855f730' }}
          >
            always running
          </span>
        </div>
      </div>
    </div>
  )
}
