import { ExternalLink } from 'lucide-react'
import React from 'react'
import partner_logo from '../assets/svg/hacker-female.svg'

const Partner: React.FC = () => {
  return (
    <div
      className="relative group w-fit h-fit justify-center items-center cursor-pointer"
      onClick={() =>
        window.open(
          'https://www.linkedin.com/in/maria-alejandra-mantilla/',
          '_blank'
        )
      }
    >
      <img src={partner_logo} alt="partner" className="w-12 h-12" />
      <div className="absolute opacity-0 top-0  group-hover:top-12 transform text-white text-sm py-1 px-2 rounded pointer-events-none transition-all duration-300 ease-in-out group-hover:opacity-100 flex flex-col items-center gap-2">
        <p className="text-xs text-white text-center text-nowrap flex flex-row items-center gap-2">
          Visit my duo <ExternalLink className="w-4 h-4" />{' '}
        </p>
      </div>
    </div>
  )
}

export default Partner
