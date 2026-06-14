import React, { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export const CustomCursor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const rafId = useRef<number | null>(null)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200 }
  const followerX = useSpring(mouseX, springConfig)
  const followerY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // DOM traversal throttled to once per frame
      if (rafId.current) return
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null
        const target = e.target as HTMLElement
        const isInteractive =
          target.closest('button') ||
          target.closest('a') ||
          target.closest('.cursor-pointer') ||
          target.tagName.toLowerCase() === 'input' ||
          target.tagName.toLowerCase() === 'textarea'
        setIsHovering(!!isInteractive)
      })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [mouseX, mouseY])

  if (isMobile) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Main Dot */}
      <motion.div
        className="fixed w-1.5 h-1.5 bg-app-main rounded-full"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Follower Ring */}
      <motion.div
        className="fixed w-8 h-8 rounded-full"
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
          opacity: isHovering ? 1 : 0.5,
        }}
        style={{
          x: followerX,
          y: followerY,
          translateX: '-50%',
          translateY: '-50%',
          border: '1px solid rgba(155, 118, 211, 0.6)',
          backgroundColor: 'rgba(155, 118, 211, 0.1)',
        }}
      />
    </div>
  )
}
