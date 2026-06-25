import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

// ── Types & constants ────────────────────────────────────────────────────────

type P = {
  d: string
  stroke: string
  dashed?: boolean
  label?: string
  lx?: number
  ly?: number
  anchor?: 'middle' | 'start' | 'end'
  vertical?: boolean
  marker: 'dim' | 'pink' | 'green' | 'purple' | 'violet'
}

const C = {
  dim: 'rgba(255,255,255,0.18)',
  pink: '#ec4899',
  green: '#10b981',
  purple: '#9B76D3',
  violet: '#a855f7',
}

const sources = [
  { e: '📋', l: 'Jira', c: '#4C9EFF' },
  { e: '📧', l: 'Email', c: '#EA4335' },
  { e: '🗂️', l: 'Git Repos', c: '#f97316' },
  { e: '🗄️', l: 'Databases', c: '#10b981' },
]

const alwaysOn = [
  { e: '🧠', l: 'Engram', c: '#3b82f6' },
  { e: '📚', l: 'Context7', c: '#10b981' },
  { e: '⚡', l: 'RTK + CodeGraph', c: '#f2cc60' },
]

// ── Shared node ──────────────────────────────────────────────────────────────

const NodeCard = ({
  color,
  emoji,
  title,
  sub,
  nodeRef,
}: {
  color: string
  emoji: string
  title: string
  sub: string
  nodeRef?: React.RefObject<HTMLDivElement | null>
}) => (
  <div
    ref={nodeRef}
    className="flex items-center gap-3 px-4 py-3 rounded-xl border-l-2 border border-white/[0.07] bg-white/[0.04]"
    style={{ borderLeftColor: color }}
  >
    <span className="text-base shrink-0">{emoji}</span>
    <div>
      <div className="text-sm font-black text-white leading-tight">{title}</div>
      <div className="text-[10px] font-mono text-white/55 mt-0.5">{sub}</div>
    </div>
  </div>
)

// ── Mobile layout ────────────────────────────────────────────────────────────

const Connector = ({
  color = 'rgba(255,255,255,0.12)',
  label,
}: {
  color?: string
  label?: string
}) => (
  <div className="flex flex-col items-center py-1 gap-0.5">
    <div className="w-px h-4" style={{ background: color }} />
    {label && (
      <>
        <span className="text-[9px] font-mono tracking-wide" style={{ color }}>
          {label}
        </span>
        <div className="w-px h-3" style={{ background: color }} />
      </>
    )}
  </div>
)

const MobileGraph: React.FC = () => (
  <div className="flex flex-col w-full max-w-sm mx-auto">
    {/* Always-on */}
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider w-full mb-1">
        Active throughout
      </span>
      {alwaysOn.map((t) => (
        <span
          key={t.l}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/[0.05]"
          style={{ color: t.c }}
        >
          {t.e} {t.l}
        </span>
      ))}
    </div>

    {/* reads from card */}
    <div className="px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.04]">
      <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block mb-2">
        reads from
      </span>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {sources.map((s) => (
          <span
            key={s.l}
            className="flex items-center gap-1 text-[10px] font-bold"
            style={{ color: s.c }}
          >
            {s.e} {s.l}
          </span>
        ))}
      </div>
    </div>

    {/* OpenClaw card */}
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl border-l-2 border border-white/[0.07] bg-white/[0.04]"
      style={{ borderLeftColor: '#a855f7' }}
    >
      <span className="text-base shrink-0">🐾</span>
      <div>
        <div className="text-sm font-black" style={{ color: '#a855f7' }}>
          OpenClaw
        </div>
        <div className="text-[10px] font-mono text-white/55">
          notifies · fetches context
        </div>
      </div>
    </div>

    <Connector color={C.violet} label="context ready" />

    <NodeCard
      color="#9B76D3"
      emoji="⚡"
      title="I — Define Intent"
      sub="describe the goal · set constraints · steer direction"
    />
    <Connector />
    <NodeCard
      color="#f97316"
      emoji="🤖"
      title="Claude Code — Execute"
      sub="write code · run tools · spawn agents as needed"
    />
    <Connector />
    <NodeCard
      color="#ec4899"
      emoji="🛡️"
      title="TDD Guard — Validate"
      sub="blocks any commit without a prior failing test"
    />

    {/* Write test indented sub-item */}
    <div
      className="ml-6 mt-1 flex items-center gap-2 px-3 py-2.5 rounded-lg border border-dashed border-white/[0.07] bg-white/[0.04]"
      style={{
        borderLeftColor: '#ec4899',
        borderLeftWidth: 2,
        borderLeftStyle: 'solid',
      }}
    >
      <span className="text-sm shrink-0">✍️</span>
      <div>
        <div className="text-xs font-black" style={{ color: '#ec4899' }}>
          Write failing test
        </div>
        <div className="text-[9px] font-mono text-white/55">
          define expected behavior first
        </div>
      </div>
    </div>

    <Connector color={C.dim} label="all tests green" />
    <NodeCard
      color="#9B76D3"
      emoji="⚡"
      title="I — Review Output"
      sub="validate it meets the intent · approve or give feedback"
    />
    <Connector color={C.green} label="I approve" />
    <NodeCard
      color="#10b981"
      emoji="✓"
      title="Shipped"
      sub="commit · PR · done"
    />
  </div>
)

// ── Desktop layout ────────────────────────────────────────────────────────────

const DesktopGraph: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ocRef = useRef<HTMLDivElement>(null)
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
    const OC = g(ocRef),
      I = g(iRef),
      E = g(eRef),
      T = g(tRef)
    const W = g(wRef),
      Rv = g(rvRef),
      D = g(dRef)
    if (!OC || !I || !E || !T || !W || !Rv || !D) return

    setPaths([
      // OpenClaw → I (horizontal trigger)
      {
        d: `M ${OC.r},${OC.cy} C ${OC.r + 30},${OC.cy} ${I.l - 30},${I.cy} ${I.l},${I.cy}`,
        stroke: C.violet,
        label: 'context ready',
        lx: (OC.r + I.l) / 2,
        ly: OC.cy - 14,
        anchor: 'middle',
        marker: 'violet',
      },
      // main flow down
      { d: `M ${I.cx},${I.b} L ${E.cx},${E.t}`, stroke: C.dim, marker: 'dim' },
      { d: `M ${E.cx},${E.b} L ${T.cx},${T.t}`, stroke: C.dim, marker: 'dim' },
      // TDD → WriteTest (no test found, dashed)
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
      // WriteTest → Execute (retry arc, right side)
      {
        d: `M ${W.r},${W.cy} C ${W.r + 40},${W.cy} ${W.r + 40},${E.cy} ${E.r},${E.cy}`,
        stroke: C.pink,
        marker: 'pink',
      },
      // TDD → Review (all green)
      {
        d: `M ${T.cx},${T.b} L ${Rv.cx},${Rv.t}`,
        stroke: C.dim,
        label: 'all tests green',
        lx: T.cx + 8,
        ly: (T.b + Rv.t) / 2,
        anchor: 'start',
        marker: 'dim',
      },
      // Review → Shipped
      {
        d: `M ${Rv.cx},${Rv.b} L ${D.cx},${D.t}`,
        stroke: C.green,
        label: 'I approve',
        lx: Rv.cx + 8,
        ly: (Rv.b + D.t) / 2,
        anchor: 'start',
        marker: 'green',
      },
      // Review → I (feedback loop, left arc through buffer col)
      {
        d: `M ${Rv.l},${Rv.cy} C ${Rv.l - 55},${Rv.cy} ${I.l - 55},${I.cy} ${I.l},${I.cy}`,
        stroke: C.purple,
        label: 'I give feedback',
        lx: I.l - 42,
        ly: (Rv.cy + I.cy) / 2,
        anchor: 'middle',
        vertical: true,
        marker: 'purple',
      },
    ])
  }

  // ResizeObserver fires after every real layout change — no fragile setTimeout
  useLayoutEffect(() => {
    compute()
    const ro = new ResizeObserver(compute)
    if (wrapRef.current) ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="relative w-full max-w-[900px] mx-auto">
      {/* SVG overlay — coordinates are relative to wrapRef */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        style={{ width: '100%', height: '100%', zIndex: 10 }}
      >
        <defs>
          {(['dim', 'pink', 'green', 'purple', 'violet'] as const).map((k) => (
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
                <rect
                  x={(p.lx ?? 0) - 42}
                  y={(p.ly ?? 0) - 6}
                  width={84}
                  height={12}
                  fill="rgba(0,0,0,0.8)"
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

      {/* Always-on bar — full width, above the main layout */}
      <div className="flex flex-wrap items-center gap-2 pb-4 mb-7 border-b border-white/[0.06]">
        <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider shrink-0 mr-2">
          Active throughout
        </span>
        {alwaysOn.map((t) => (
          <span
            key={t.l}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/[0.05]"
            style={{ color: t.c }}
          >
            {t.e} {t.l}
          </span>
        ))}
      </div>

      {/*
        reads from — anchored to left-col width (160px), sits above OpenClaw.
        Outside the flex row so it doesn't change OpenClaw's y position.
      */}
      <div
        style={{ width: 160 }}
        className="mb-2 px-4 py-3 rounded-xl border border-white/[0.07] bg-white/[0.04]"
      >
        <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block mb-2">
          reads from
        </span>
        <div className="flex flex-col gap-1">
          {sources.map((s) => (
            <span
              key={s.l}
              className="flex items-center gap-1.5 text-[10px] font-bold"
              style={{ color: s.c }}
            >
              {s.e} {s.l}
            </span>
          ))}
        </div>
      </div>

      {/*
        Flex row: left col (OpenClaw, 160px fixed) + right section (flex-1).
        Both start at the same y → OC.cy ≈ I.cy → trigger arrow is horizontal.
        Right section has its own 3-col grid:
          col 0  (88px)   left arc buffer for feedback loop
          col 1  (1fr)    main flow nodes
          col 2  (200px)  WriteTest + retry arc room
      */}
      <div className="flex gap-8 items-start">
        {/* Left col — OpenClaw only */}
        <div className="shrink-0" style={{ width: 160 }}>
          <div
            ref={ocRef}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border-l-2 border border-white/[0.07] bg-white/[0.04]"
            style={{ borderLeftColor: '#a855f7' }}
          >
            <span className="text-base shrink-0">🐾</span>
            <div>
              <div className="text-sm font-black" style={{ color: '#a855f7' }}>
                OpenClaw
              </div>
              <div className="text-[10px] font-mono text-white/55">
                notifies · fetches context
              </div>
            </div>
          </div>
        </div>

        {/* Right section — main flow */}
        <div
          className="flex-1 grid gap-x-8 gap-y-7"
          style={{ gridTemplateColumns: '88px 1fr 200px' }}
        >
          <div />
          <NodeCard
            color="#9B76D3"
            emoji="⚡"
            title="I — Define Intent"
            sub="describe the goal · set constraints · steer direction"
            nodeRef={iRef}
          />
          <div />

          <div />
          <NodeCard
            color="#f97316"
            emoji="🤖"
            title="Claude Code — Execute"
            sub="write code · run tools · spawn agents as needed"
            nodeRef={eRef}
          />
          <div />

          <div />
          <NodeCard
            color="#ec4899"
            emoji="🛡️"
            title="TDD Guard — Validate"
            sub="blocks any commit without a prior failing test"
            nodeRef={tRef}
          />
          <div className="flex items-center">
            <div
              ref={wRef}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-xl border border-dashed border-white/[0.07] bg-white/[0.04]"
              style={{
                borderLeftColor: '#ec4899',
                borderLeftWidth: 2,
                borderLeftStyle: 'solid',
              }}
            >
              <span className="text-sm shrink-0">✍️</span>
              <div>
                <div
                  className="text-xs font-black"
                  style={{ color: '#ec4899' }}
                >
                  Write failing test
                </div>
                <div className="text-[9px] font-mono text-white/55">
                  define expected behavior first
                </div>
              </div>
            </div>
          </div>

          <div />
          <NodeCard
            color="#9B76D3"
            emoji="⚡"
            title="I — Review Output"
            sub="validate it meets the intent · approve or give feedback"
            nodeRef={rvRef}
          />
          <div />

          <div />
          <NodeCard
            color="#10b981"
            emoji="✓"
            title="Shipped"
            sub="commit · PR · done"
            nodeRef={dRef}
          />
          <div />
        </div>
      </div>
    </div>
  )
}

// ── Root ─────────────────────────────────────────────────────────────────────

export const WorkflowGraph: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return isMobile ? <MobileGraph /> : <DesktopGraph />
}
