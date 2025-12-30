import React from 'react'

type SubtitleProps = {
  children: React.ReactNode
  className?: string
}

const Subtitle: React.FC<SubtitleProps> = ({ children, className = '' }) => {
  return (
    <p
      className={`text-xl md:text-2xl font-light text-app-main/80 uppercase tracking-[0.3em] ${className}`}
    >
      {children}
    </p>
  )
}

export default Subtitle
