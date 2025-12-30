import React from 'react'
import { motion } from 'framer-motion'
import { SectionProps } from '../types'

export const SplitVariant: React.FC<SectionProps> = ({
  title,
  subtitle,
  className = '',
  children,
  containerStyle,
  heroImage,
  align = 'left',
}) => {
  const isLeft = align === 'left'

  return (
    <div
      className={`relative min-h-screen flex flex-col md:flex-row overflow-hidden`}
      style={{ ...containerStyle }}
    >
      {/* Background Color Side (Skewed) */}
      <div
        className={`absolute inset-0 z-0 bg-current transition-colors duration-500`}
        style={{
          clipPath: isLeft
            ? 'polygon(0 0, 75% 0, 65% 100%, 0 100%)'
            : 'polygon(25% 0, 100% 0, 100% 100%, 35% 100%)',
          backgroundColor: containerStyle?.backgroundColor,
        }}
      />

      <div
        className={`relative z-10 flex-1 flex flex-col justify-center p-8 md:p-24 ${isLeft ? '' : 'items-end text-right'}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-tighter leading-none">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl md:text-2xl font-light opacity-80 uppercase tracking-widest mb-8">
              {subtitle}
            </p>
          )}
          <div
            className={`w-full ${className} text-lg md:text-xl font-light leading-relaxed`}
          >
            {children}
          </div>
        </motion.div>
      </div>

      {heroImage && (
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="relative flex-1 min-h-[40vh] md:min-h-screen z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${heroImage})`,
              clipPath: isLeft
                ? 'polygon(25% 0, 100% 0, 100% 100%, 15% 100%)'
                : 'polygon(0 0, 75% 0, 85% 100%, 0 100%)',
            }}
          />
          {/* Accent Line */}
          <div
            className="absolute inset-0 border-r-4 border-app-main pointer-events-none"
            style={{
              clipPath: isLeft
                ? 'polygon(25% 0, 26% 0, 16% 100%, 15% 100%)'
                : 'polygon(74% 0, 75% 0, 85% 100%, 84% 100%)',
            }}
          />
        </motion.div>
      )}
    </div>
  )
}
