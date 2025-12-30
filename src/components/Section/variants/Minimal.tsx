import React from 'react'
import { motion } from 'framer-motion'
import { SectionProps } from '../types'

export const MinimalVariant: React.FC<SectionProps> = ({
  title,
  subtitle,
  className = '',
  children,
  containerStyle,
}) => {
  return (
    <div
      className="section-container flex flex-col items-center justify-center p-8 md:p-16 text-center"
      style={{ ...containerStyle }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">{title}</h2>
        {subtitle && (
          <p className="text-xl md:text-2xl opacity-80 mb-6">{subtitle}</p>
        )}
      </motion.div>
      <div className={`w-full max-w-4xl ${className}`}>{children}</div>
    </div>
  )
}
