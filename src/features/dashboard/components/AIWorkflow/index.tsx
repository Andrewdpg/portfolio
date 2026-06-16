import React from 'react'
import { WorkflowGraph } from './WorkflowGraph'

const metrics = [
  {
    value: '−80%',
    label: 'token consumption',
    sublabel: 'via RTK proxy',
    color: '#f2cc60',
  },
  {
    value: '−94%',
    label: 'agent tool calls',
    sublabel: 'via CodeGraph index',
    color: '#10b981',
  },
  {
    value: '∞',
    label: 'cross-session memory',
    sublabel: 'via Engram SQLite',
    color: '#3b82f6',
  },
]

export const AIWorkflow: React.FC = () => {
  return (
    <div className="flex flex-col items-center gap-16 w-full">
      <div className="flex flex-col items-center gap-4 text-center max-w-xl">
        <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">
          I don&apos;t write code alone.
          <br />
          <span className="text-app-main">I design systems that think.</span>
        </h2>
        <p className="text-base text-white/45 leading-relaxed max-w-md">
          A layered pipeline of specialized agents — each with a defined role
          and a clear handoff to the next.
        </p>
      </div>

      <WorkflowGraph />

      <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-2xl border border-white/5 bg-white/3 p-5 text-center flex flex-col gap-1"
          >
            <span className="text-3xl font-black" style={{ color: m.color }}>
              {m.value}
            </span>
            <span className="text-xs text-white/60 font-semibold">
              {m.label}
            </span>
            <span className="text-[10px] text-white/25 font-mono">
              {m.sublabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
