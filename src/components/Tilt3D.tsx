import React from 'react'

type Tilt3DProps = {
  children: React.ReactNode
  className?: string
}

// ponytail: simplified from 3D tilt — profile photo doesn't benefit from 10deg rotation
export const Tilt3D: React.FC<Tilt3DProps> = ({ children, className = '' }) => {
  return <div className={`relative w-full h-full ${className}`}>{children}</div>
}
