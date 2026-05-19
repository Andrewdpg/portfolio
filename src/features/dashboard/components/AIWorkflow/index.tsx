// src/features/dashboard/components/AIWorkflow/index.tsx
import React from 'react'
import { WorkflowGraph } from './WorkflowGraph'
import { WorkflowDrawerContent } from './WorkflowDrawerContent'
import { useDrawer } from '../../../../context/DrawerContext'
import { ChevronUp } from 'lucide-react'

export const AIWorkflow: React.FC = () => {
  const { openDrawer } = useDrawer()

  const handleOpenPipeline = () => {
    openDrawer({
      body: <WorkflowDrawerContent />,
    })
  }

  return (
    <div className="flex flex-col items-center gap-16 w-full">
      {/* Headline */}
      <div className="flex flex-col items-center gap-4 text-center max-w-xl">
        <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">
          I don&apos;t write code alone.
          <br />
          <span className="text-app-main">I design systems that think.</span>
        </h2>
        <p className="text-base text-white/45 leading-relaxed max-w-md">
          A network of specialized agents and optimization tools — each with a
          defined role.
        </p>
      </div>

      {/* Graph */}
      <div className="w-full max-w-2xl">
        <WorkflowGraph />
      </div>

      {/* Drawer trigger */}
      <button
        onClick={handleOpenPipeline}
        className="flex flex-col items-center gap-2 group"
      >
        <span className="text-xs font-bold tracking-[0.1em] uppercase text-white/30 group-hover:text-white/50 transition-colors">
          How it works
        </span>
        <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/4 text-white/50 text-sm font-semibold group-hover:border-app-main/40 group-hover:bg-app-main/8 group-hover:text-app-main transition-all duration-300">
          See the pipeline
          <ChevronUp size={16} />
        </div>
      </button>
    </div>
  )
}
