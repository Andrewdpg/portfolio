import React from 'react'

type HeadingProps = {
  children: React.ReactNode
}

const Heading: React.FC<HeadingProps> = ({ children }) => {
  return <h1 className="text-2xl font-bold text-white text-center">{children}</h1>
}

export default Heading
