import React from 'react'
import { FloatingComponent } from '../../../../components/FloatingComponent'
import { Bot, Cpu, Monitor } from 'lucide-react'
import { CustomCursor } from '../../../../components/CustomCursor'

type BackgroundProps = {
  children: React.ReactNode
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="h-full flex min-h-screen w-full flex-col bg-white -z-1 relative">
      <CustomCursor />
      <div className="absolute w-full">
        <FloatingComponent count={2}>
          <Monitor size={50} className="text-black/5" />
        </FloatingComponent>
        <FloatingComponent count={2}>
          <Cpu size={50} className="text-black/5" />
        </FloatingComponent>
        <FloatingComponent count={2}>
          <Bot size={50} className="text-black/5" />
        </FloatingComponent>
      </div>
      <div className="z-0">{children}</div>
    </div>
  )
}
