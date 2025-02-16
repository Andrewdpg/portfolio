import React from 'react'
import { Sparkles } from './components/Sparkles'
import { FloatingComponent } from '../../../../components/FloatingComponent'
import { Bot, Cpu } from 'lucide-react'
import { MouseGlow } from './components/MouseGlow'

export const Background = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-app-secondary">
      <div
        className="absolute bg-app-main/10 rounded-full blur-xl w-full"
        style={{
          top: '85%',
          height: '90vw',
        }}
      />
      <div className="relative z-10">
        <FloatingComponent count={3}>
          <Bot size={50} className="text-app-main" />
        </FloatingComponent>
        <FloatingComponent count={3}>
          <Cpu size={50} className="text-app-contrast" />
        </FloatingComponent>
      </div>
      <div className="h-full w-full absolute inset-0 z-0">
        <Sparkles />
      </div>
      <MouseGlow />
    </div>
  )
}
