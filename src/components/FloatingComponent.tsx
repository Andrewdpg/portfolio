import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type FloatingComponent = {
  children?: React.ReactNode
  count?: number
}

export const FloatingComponent: React.FC<FloatingComponent> = ({
  count = 1,
  children,
}) => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative w-full h-full">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: [
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
              Math.random() * dimensions.width,
            ],
            y: [
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
              Math.random() * dimensions.height,
            ],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 50 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: 'mirror',
            ease: 'linear',
          }}
        >
          {children}
        </motion.div>
      ))}
    </div>
  )
}
