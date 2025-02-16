import React from 'react'

interface FlipCardProps {
  front: React.ReactNode
  back: React.ReactNode
  className?: string
}

const FlipCard: React.FC<FlipCardProps> = ({ front, back, className }) => {
  return (
    <div className={`flip-card perspective-1000 ${className}`}>
      <div className="flip-card-inner relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d">
        <div className="flip-card-front absolute w-full h-full backface-hidden">
          {front}
        </div>
        <div className="flip-card-back absolute w-full h-full backface-hidden transform rotate-y-180">
          {back}
        </div>
      </div>
    </div>
  )
}

export default FlipCard
