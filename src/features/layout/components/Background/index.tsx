import React from 'react'
import { Sparkles } from './components/Sparkles'
import { FloatingComponent } from '../../../../components/FloatingComponent'
import { Bot, Cpu, Monitor } from 'lucide-react'
import { MouseGlow } from './components/MouseGlow'

type BackgroundProps = {
  children: React.ReactNode
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="h-full flex min-h-screen w-full flex-col bg-white -z-1">
      <Sparkles />
      <MouseGlow />
      <div className="absolute w-full">
        <FloatingComponent count={5}>
          <Monitor size={50} className="text-black/5" />
        </FloatingComponent>
        <FloatingComponent count={5}>
          <Cpu size={50} className="text-black/5" />
        </FloatingComponent>
        <FloatingComponent count={5}>
          <Bot size={50} className="text-black/5" />
        </FloatingComponent>
      </div>
      <div className="z-0">{children}</div>
    </div>
  )
}
