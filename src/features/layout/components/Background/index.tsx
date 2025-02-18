import React from 'react'
import { Sparkles } from './components/Sparkles'
import { FloatingComponent } from '../../../../components/FloatingComponent'
import { Bot, Cpu } from 'lucide-react'
import { MouseGlow } from './components/MouseGlow'

type BackgroundProps = {
  children: React.ReactNode
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="h-full flex min-h-screen w-full flex-col bg-app-secondary -z-1">
      <Sparkles />
      <MouseGlow />
      <div className="absolute w-full">
        <FloatingComponent count={3}>
          <Bot size={50} className="text-app-main" />
        </FloatingComponent>
        <FloatingComponent count={3}>
          <Cpu size={50} className="text-app-contrast" />
        </FloatingComponent>
      </div>
      <div className="z-0">{children}</div>
    </div>
  )
}
