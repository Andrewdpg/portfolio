import React from 'react'

type CardProps = {
  children?: React.ReactNode
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`w-full h-full bg-black/70 rounded-lg justify-around shadow-md ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
