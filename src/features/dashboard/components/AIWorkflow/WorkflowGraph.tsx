// src/features/dashboard/components/AIWorkflow/WorkflowGraph.tsx
import React, { useEffect, useRef, useState } from 'react'

type NodeDef = {
  id: string
  emoji: string
  label: string
  sublabel: string
  color: string
  bg: string
  link?: string
  area: string
  size?: 'lg'
  tooltip: string
  badge: string
}

const nodes: NodeDef[] = [
  {
    id: 'claude',
    emoji: '🤖',
    label: 'Claude Code',
    sublabel: 'Primary Agent',
    color: '#f97316',
    bg: 'linear-gradient(135deg,#1c0900,#2e1500)',
    link: 'https://github.com/anthropics/claude-code',
    area: 'top',
    tooltip:
      'Primary coding agent. Handles architecture, writes code, runs bash, orchestrates sub-agents.',
    badge: 'Anthropic · CLI + IDE',
  },
  {
    id: 'engram',
    emoji: '🧠',
    label: 'Engram',
    sublabel: 'Persistent Memory',
    color: '#3b82f6',
    bg: 'linear-gradient(135deg,#00091c,#001638)',
    link: 'https://github.com/Gentleman-Programming/engram',
    area: 'left',
    tooltip:
      'Persistent memory that survives session resets. Agents never start blind.',
    badge: 'SQLite · MCP · Go binary',
  },
  {
    id: 'you',
    emoji: '⚡',
    label: 'Andrés',
    sublabel: 'Orchestrator',
    color: '#9B76D3',
    bg: 'linear-gradient(135deg,#1a1128,#2d1f4e)',
    area: 'center',
    size: 'lg',
    tooltip: '',
    badge: '',
  },
  {
    id: 'ctx7',
    emoji: '📚',
    label: 'Context7',
    sublabel: 'Live Docs',
    color: '#10b981',
    bg: 'linear-gradient(135deg,#001c0e,#002e18)',
    link: 'https://github.com/upstash/context7',
    area: 'right',
    tooltip:
      'Injects up-to-date library docs into agent context. Eliminates hallucinated APIs.',
    badge: 'MCP · Upstash',
  },
  {
    id: 'tdd',
    emoji: '🛡️',
    label: 'TDD Guard',
    sublabel: 'Test Enforcer',
    color: '#ec4899',
    bg: 'linear-gradient(135deg,#1c0012,#2e0020)',
    link: 'https://github.com/nizos/tdd-guard',
    area: 'bot1',
    tooltip: 'Enforces TDD. Blocks implementation without failing tests.',
    badge: 'Claude Code plugin · Hook-based',
  },
  {
    id: 'rtk',
    emoji: '⚡',
    label: 'RTK + CodeGraph',
    sublabel: 'Token Optimizer',
    color: '#f2cc60',
    bg: 'linear-gradient(135deg,#1c1700,#2e2500)',
    link: 'https://github.com/rtk-ai/rtk',
    area: 'bot2',
    tooltip:
      'RTK compresses CLI output (−80% tokens). CodeGraph pre-indexes code (−94% tool calls).',
    badge: 'Rust binary · Semantic index',
  },
  {
    id: 'coco',
    emoji: '🐾',
    label: 'Coco / OpenClaw',
    sublabel: 'General Automation',
    color: '#a855f7',
    bg: 'linear-gradient(135deg,#160a2a,#220f3e)',
    link: 'https://github.com/openclaw/openclaw',
    area: 'bot3',
    tooltip:
      'Daemon-based agent. Monitors Jira, enriches tasks with Confluence context, maintains a persistent task filesystem.',
    badge: 'Docker sandbox · Multi-API',
  },
]

type TooltipState = { node: NodeDef; x: number; y: number } | null

export const WorkflowGraph: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [edges, setEdges] = useState<
    { x1: number; y1: number; x2: number; y2: number }[]
  >([])
  const [tooltip, setTooltip] = useState<TooltipState>(null)

  const drawEdges = () => {
    const wrap = wrapRef.current
    if (!wrap) return
    const wRect = wrap.getBoundingClientRect()
    const centerEl = wrap.querySelector<HTMLElement>(
      '[data-node="you"] .node-icon'
    )
    if (!centerEl) return
    const cRect = centerEl.getBoundingClientRect()
    const cx = cRect.left + cRect.width / 2 - wRect.left
    const cy = cRect.top + cRect.height / 2 - wRect.top

    const lines: typeof edges = []
    ;['claude', 'engram', 'ctx7', 'tdd', 'rtk', 'coco'].forEach((id) => {
      const icon = wrap.querySelector<HTMLElement>(
        `[data-node="${id}"] .node-icon`
      )
      if (!icon) return
      const r = icon.getBoundingClientRect()
      lines.push({
        x1: r.left + r.width / 2 - wRect.left,
        y1: r.top + r.height / 2 - wRect.top,
        x2: cx,
        y2: cy,
      })
    })
    setEdges(lines)
  }

  useEffect(() => {
    const t = setTimeout(drawEdges, 100)
    window.addEventListener('resize', drawEdges)
    return () => {
      clearTimeout(t)
      window.removeEventListener('resize', drawEdges)
    }
  }, [])

  const handleMouseEnter = (e: React.MouseEvent, node: NodeDef) => {
    if (!node.tooltip) return
    setTooltip({ node, x: e.clientX, y: e.clientY })
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    if (tooltip)
      setTooltip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : null))
  }
  const handleMouseLeave = () => setTooltip(null)
  const handleClick = (node: NodeDef) => {
    if (node.link) window.open(node.link, '_blank')
  }

  const areaClass: Record<string, string> = {
    top: 'col-start-2 row-start-1',
    left: 'col-start-1 row-start-2',
    center: 'col-start-2 row-start-2',
    right: 'col-start-3 row-start-2',
    bot1: 'col-start-1 row-start-3',
    bot2: 'col-start-2 row-start-3',
    bot3: 'col-start-3 row-start-3',
  }

  return (
    <div
      className="relative w-full"
      ref={wrapRef}
      onMouseMove={handleMouseMove}
    >
      {/* SVG edges */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        style={{ zIndex: 0 }}
      >
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
        ))}
      </svg>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-8 relative" style={{ zIndex: 2 }}>
        {nodes.map((node) => {
          const isLg = node.size === 'lg'
          const iconSize = isLg
            ? 'w-[88px] h-[88px] rounded-[26px] text-4xl'
            : 'w-[72px] h-[72px] rounded-[20px] text-3xl'
          return (
            <div
              key={node.id}
              data-node={node.id}
              className={`${areaClass[node.area]} flex flex-col items-center gap-2.5 group ${node.link ? 'cursor-pointer' : ''}`}
              onMouseEnter={(e) => handleMouseEnter(e, node)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(node)}
            >
              <div
                className="relative"
                style={{ width: isLg ? 88 : 72, height: isLg ? 88 : 72 }}
              >
                {/* Glow ring on hover */}
                <div
                  className="absolute rounded-full border opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  style={{
                    inset: -10,
                    borderColor: node.color,
                    borderWidth: 1.5,
                  }}
                />
                <div
                  className={`node-icon ${iconSize} flex items-center justify-center border border-white/8 shadow-lg transition-shadow duration-300 group-hover:shadow-2xl`}
                  style={{ background: node.bg }}
                >
                  {node.emoji}
                </div>
              </div>
              <div
                className={`text-center ${isLg ? 'text-sm font-bold text-white' : 'text-xs font-bold text-white/85'}`}
              >
                {node.label}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-white/30 text-center">
                {node.sublabel}
              </div>
            </div>
          )
        })}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-[700] pointer-events-none bg-app-secondary border border-white/10 rounded-2xl p-4 max-w-[240px] shadow-2xl"
          style={{
            left: tooltip.x + 16,
            top: Math.min(tooltip.y - 10, window.innerHeight - 160),
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: tooltip.node.color }}
            />
            <span className="text-sm font-bold text-white">
              {tooltip.node.label}
            </span>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            {tooltip.node.tooltip}
          </p>
          <span className="inline-block mt-3 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-white/5 text-white/35">
            {tooltip.node.badge}
          </span>
        </div>
      )}
    </div>
  )
}
