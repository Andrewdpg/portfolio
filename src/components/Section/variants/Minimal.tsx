import React from 'react'
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
      <div>
        <h2 className="font-display text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xl md:text-2xl opacity-80 mb-6">{subtitle}</p>
        )}
      </div>
      <div className={`w-full max-w-4xl ${className}`}>{children}</div>
    </div>
  )
}
