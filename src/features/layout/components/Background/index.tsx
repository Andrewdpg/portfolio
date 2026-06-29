import React from 'react'

type BackgroundProps = {
  children: React.ReactNode
}

export const Background: React.FC<BackgroundProps> = ({ children }) => {
  return (
    <div className="h-full flex min-h-screen w-full flex-col bg-white dark:bg-[#141414] relative">
      <div className="z-0">{children}</div>
    </div>
  )
}
