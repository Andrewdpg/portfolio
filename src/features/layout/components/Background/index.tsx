import React from 'react'
import { Sparkles } from './components/Sparkles'
import { FloatingComponent } from '../../../../components/FloatingComponent'
import { Bot, Cpu, Monitor } from 'lucide-react'
import { CustomCursor } from '../../../../components/CustomCursor'

type BackgroundProps = {
  children: React.ReactNode
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="h-full flex min-h-screen w-full flex-col bg-white -z-1 relative">
      {/* Film Grain / Noise Effect */}
      <div className="fixed inset-0 z-[50] pointer-events-none opacity-[0.03] contrast-150 brightness-100 mix-blend-multiply">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.65" 
              numOctaves="3" 
              stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <CustomCursor />
      <Sparkles />
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
