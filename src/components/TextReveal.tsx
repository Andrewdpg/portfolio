import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

type TextRevealProps = {
  text: string
  className?: string
  once?: boolean
  delay?: number
  stagger?: number
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  text, 
  className = "", 
  once = true, 
  delay = 0,
  stagger = 0.02
}) => {
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
  })

  const words = text.split(" ")

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }

  const wordVars = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(4px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      }
    },
  }

  return (
    <motion.div
      ref={ref}
      variants={containerVars}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`inline-block overflow-hidden ${className}`}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
          <motion.span
            variants={wordVars}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  )
}
