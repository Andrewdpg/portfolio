import React from 'react'

type HeadingProps = {
  children: React.ReactNode
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return (
    <h1 className="text-6xl sm:text-8xl font-bold text-white">{children}</h1>
  )
}

export default Heading
