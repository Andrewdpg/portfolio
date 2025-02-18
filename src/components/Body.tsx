import React from 'react'

type BodyProps = {
  children: React.ReactNode
  className?: string
}

const Body: React.FC<BodyProps> = ({ children, className }) => {
  return <h1 className={`text-lg text-white ${className}`}>{children}</h1>
}

export default Body
