import React from 'react'

type FlowStep = {
  id: string
  step: string
  emoji: string
  label: string
  role: string
  description: string
  color: string
  bg: string
  link?: string
  connector?: string
}

const steps: FlowStep[] = [
  {
    id: 'you',
    step: '01',
    emoji: '⚡',
    label: 'Me',
    role: 'Orchestrator',
    description:
      'Define intent, set constraints, review and accept output. The human always leads — AI executes.',
    color: '#9B76D3',
    bg: '#2d1f4e',
    connector: 'loads context from memory via',
  },
  {
    id: 'engram',
    step: '02',
    emoji: '🧠',
    label: 'Engram',
    role: 'Persistent Memory',
    description:
      'Recovers prior decisions, bug fixes, and architecture conventions across sessions. Agents never start blind.',
    color: '#3b82f6',
    bg: '#001638',
    link: 'https://github.com/Gentleman-Programming/engram',
    connector: 'enriches prompt with live docs via',
  },
  {
    id: 'ctx7',
    step: '03',
    emoji: '📚',
    label: 'Context7',
    role: 'Live Docs',
    description:
      'Injects up-to-date library documentation into agent context. Eliminates hallucinated or stale APIs.',
    color: '#10b981',
    bg: '#002e18',
    link: 'https://github.com/upstash/context7',
    connector: 'executes via',
  },
  {
    id: 'claude',
    step: '04',
    emoji: '🤖',
    label: 'Claude Code',
    role: 'Primary Agent',
    description:
      'Handles architecture decisions, writes code, runs bash, and orchestrates parallel sub-agents when the task demands it.',
    color: '#f97316',
    bg: '#2e1500',
    link: 'https://github.com/anthropics/claude-code',
    connector: 'output blocked until tests pass by',
  },
  {
    id: 'tdd',
    step: '05',
    emoji: '🛡️',
    label: 'TDD Guard',
    role: 'Test Enforcer',
    description:
      'Pre-commit hook that enforces test-first discipline. No implementation ships without a prior failing test.',
    color: '#ec4899',
    bg: '#2e0020',
    link: 'https://github.com/nizos/tdd-guard',
    connector: 'efficiency optimized throughout by',
  },
  {
    id: 'rtk',
    step: '06',
    emoji: '⚡',
    label: 'RTK + CodeGraph',
    role: 'Token Optimizer',
    description:
      '−80% token consumption via CLI output proxy. −94% agent tool calls via pre-indexed semantic code graph.',
    color: '#f2cc60',
    bg: '#2e2500',
    link: 'https://github.com/rtk-ai/rtk',
    connector: 'background tasks automated by',
  },
  {
    id: 'openclaw',
    step: '07',
    emoji: '🐾',
    label: 'OpenClaw',
    role: 'Background Automation',
    description:
      'Daemon agent that monitors Jira, enriches tasks with Confluence context, and maintains a persistent task filesystem.',
    color: '#a855f7',
    bg: '#220f3e',
    link: 'https://github.com/openclaw/openclaw',
  },
]

export const WorkflowGraph: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col">
      {steps.map((step, i) => (
        <React.Fragment key={step.id}>
          <div
            className={`flex items-start gap-4 p-5 rounded-2xl border-l-2 border border-white/5 transition-all duration-300 ${step.link ? 'cursor-pointer hover:border-white/10' : ''}`}
            style={{
              background: step.bg,
              borderLeftColor: step.color,
            }}
            onClick={() => step.link && window.open(step.link, '_blank')}
          >
            <span
              className="text-[10px] font-black font-mono tracking-widest mt-1.5 shrink-0 w-5 text-right"
              style={{ color: `${step.color}55` }}
            >
              {step.step}
            </span>

            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
              style={{ background: `${step.color}18` }}
            >
              {step.emoji}
            </div>

            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-sm font-black text-white">
                  {step.label}
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: step.color }}
                >
                  {step.role}
                </span>
              </div>
              <p className="text-xs text-white/45 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>

          {i < steps.length - 1 && (
            <div className="flex items-center gap-3 py-1.5 pl-[76px]">
              <span className="text-white/15 text-base leading-none">↓</span>
              {step.connector && (
                <span className="text-[10px] font-mono text-white/20 italic">
                  {step.connector}
                </span>
              )}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
