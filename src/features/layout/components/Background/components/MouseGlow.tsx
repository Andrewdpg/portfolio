import React, { useEffect, useState } from 'react'

export const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener('mousemove', updateMousePosition)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
    }
  }, [])

  return (
    <div
      className="glow-effect"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        background:
          'radial-gradient(circle, rgba(155, 118, 211, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
      }}
    />
  )
}
