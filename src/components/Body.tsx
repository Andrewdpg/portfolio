import React from 'react'

type BodyProps = {
  children: React.ReactNode
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return <h1 className="text-lg text-white">{children}</h1>
}

export default Body
