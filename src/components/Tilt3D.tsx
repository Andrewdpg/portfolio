import React, { useRef, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type Tilt3DProps = {
  children: React.ReactNode
  className?: string
}

export const Tilt3D: React.FC<Tilt3DProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null)
  const cachedRect = useRef<DOMRect | null>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { damping: 30, stiffness: 200 })
  const mouseYSpring = useSpring(y, { damping: 30, stiffness: 200 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  // Cache rect on mount and resize — never read it on mousemove
  useEffect(() => {
    const update = () => {
      cachedRect.current = ref.current?.getBoundingClientRect() ?? null
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleMouseEnter = useCallback(() => {
    cachedRect.current = ref.current?.getBoundingClientRect() ?? null
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = cachedRect.current
      if (!rect) return
      x.set((e.clientX - rect.left) / rect.width - 0.5)
      y.set((e.clientY - rect.top) / rect.height - 0.5)
    },
    [x, y]
  )

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative w-full h-full ${className}`}
    >
      <div
        style={{
          transform: 'translateZ(20px)',
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  )
}
