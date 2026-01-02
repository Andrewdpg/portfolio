import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export const CustomCursor: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  // Smooth springs for the follower
  const springConfig = { damping: 25, stiffness: 200 }
  const followerX = useSpring(mouseX, springConfig)
  const followerY = useSpring(mouseY, springConfig)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || ('ontouchstart' in window))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('.cursor-pointer') ||
        target.tagName.toLowerCase() === 'input' ||
        target.tagName.toLowerCase() === 'textarea'

      setIsHovering(!!isInteractive)
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
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Follower Ring */}
      <motion.div
        className="fixed w-8 h-8 border border-app-main/30 rounded-full"
        animate={{
          scale: isClicking ? 0.8 : (isHovering ? 1.8 : 1),
          backgroundColor: isHovering ? "rgba(155, 118, 211, 0.1)" : "rgba(155, 118, 211, 0)",
          borderColor: isHovering ? "rgba(155, 118, 211, 0.6)" : "rgba(155, 118, 211, 0.3)",
        }}
        style={{
          x: followerX,
          y: followerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </div>
  )
}
