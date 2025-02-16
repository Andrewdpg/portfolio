import React from 'react'

type SubtitleProps = {
  children: React.ReactNode
  className?: string
}

const Subtitle: React.FC<SubtitleProps> = ({ children, className }) => {
  return (
    <h1 className={`text-5xl font-semibold text-white ${className}`}>
      {children}
    </h1>
  )
}

export default Subtitle
