import React from 'react'

type HeadingProps = {
  children: React.ReactNode
  className?: string
}

const Heading: React.FC<HeadingProps> = ({ children, className = '' }) => {
  return (
    <h1
      className={`text-6xl sm:text-8xl font-black text-app-secondary uppercase tracking-tighter leading-none ${className}`}
    >
      {children}
    </h1>
  )
}

export default Heading
