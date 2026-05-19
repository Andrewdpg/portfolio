// src/features/dashboard/components/AIWorkflow/WorkflowDrawerContent.tsx
import React from 'react'

type PipeStep = {
  emoji: string
  label: string
  tool: string
  color: string
  borderColor: string
  textColor: string
}

const steps: PipeStep[] = [
  {
    emoji: '⚡',
    label: 'Intent',
    tool: 'Andrés',
    color: 'rgba(167,139,250,0.1)',
    borderColor: 'rgba(167,139,250,0.3)',
    textColor: '#c4b5fd',
  },
  {
    emoji: '🧠',
    label: 'Context',
    tool: 'Engram',
    color: 'rgba(59,130,246,0.1)',
    borderColor: 'rgba(59,130,246,0.3)',
    textColor: '#93c5fd',
  },
  {
    emoji: '📚',
    label: 'Docs',
    tool: 'Context7',
    color: 'rgba(16,185,129,0.1)',
    borderColor: 'rgba(16,185,129,0.3)',
    textColor: '#6ee7b7',
  },
  {
    emoji: '🤖',
    label: 'Execute',
    tool: 'Claude Code',
    color: 'rgba(249,115,22,0.1)',
    borderColor: 'rgba(249,115,22,0.3)',
    textColor: '#fdba74',
  },
  {
    emoji: '🛡️',
    label: 'Validate',
    tool: 'TDD Guard',
    color: 'rgba(236,72,153,0.1)',
    borderColor: 'rgba(236,72,153,0.3)',
    textColor: '#f9a8d4',
  },
  {
    emoji: '⚡',
    label: 'Optimize',
    tool: 'RTK + CG',
    color: 'rgba(242,204,96,0.1)',
    borderColor: 'rgba(242,204,96,0.3)',
    textColor: '#fde68a',
  },
  {
    emoji: '🐾',
    label: 'Automate',
    tool: 'Coco',
    color: 'rgba(168,85,247,0.1)',
    borderColor: 'rgba(168,85,247,0.3)',
    textColor: '#d8b4fe',
  },
]

type Stat = { value: string; label: string; color: string }

const stats: Stat[] = [
  { value: '−80%', label: 'token consumption via RTK proxy', color: '#f2cc60' },
  {
    value: '−94%',
    label: 'agent tool calls with CodeGraph index',
    color: '#10b981',
  },
  {
    value: '∞',
    label: 'cross-session memory via Engram SQLite',
    color: '#3b82f6',
  },
]

export const WorkflowDrawerContent: React.FC = () => {
  return (
    <div className="flex flex-col gap-10 pb-4">
      {/* Pipeline */}
      <div>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-app-main/60 block mb-6">
          Technical Pipeline
        </span>
        <div className="flex flex-wrap items-start gap-2">
          {steps.map((step, i) => (
            <React.Fragment key={step.tool}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="px-4 py-2 rounded-xl text-sm font-bold border"
                  style={{
                    background: step.color,
                    borderColor: step.borderColor,
                    color: step.textColor,
                  }}
                >
                  {step.emoji} {step.label}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-app-secondary/30 font-bold">
                  {step.tool}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span className="text-app-secondary/20 text-lg mt-2">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div>
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-app-main/60 block mb-4">
          By the numbers
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-app-secondary/8 bg-app-secondary/3 p-5 text-center"
            >
              <div
                className="text-3xl font-black mb-2"
                style={{ color: stat.color }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-app-secondary/50 leading-relaxed">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
