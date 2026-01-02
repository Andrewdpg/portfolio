import React from 'react'
import { TextReveal } from './TextReveal'

type BodyProps = {
  children: React.ReactNode
  className?: string
}

const Body: React.FC<BodyProps> = ({ children, className = '' }) => {
  return (
    <p
      className={`text-lg text-app-secondary/80 font-light leading-relaxed ${className}`}
    >
      {typeof children === 'string' ? <TextReveal text={children} /> : children}
    </p>
  )
}

export default Body
