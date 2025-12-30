import { ExternalLink } from 'lucide-react'
import React from 'react'
import partner_logo from '../assets/svg/hacker-female.svg'

const Partner: React.FC = () => {
  return (
    <div
      className="relative group w-fit h-fit flex items-center gap-3 cursor-pointer p-2 rounded-xl border border-black/0 hover:border-black/5 hover:bg-black/5 transition-all duration-300"
      onClick={() =>
        window.open(
          'https://www.linkedin.com/in/maria-alejandra-mantilla/',
          '_blank'
        )
      }
    >
      <img
        src={partner_logo}
        alt="partner"
        className="w-8 h-8 md:w-10 md:h-10 grayscale hover:grayscale-0 transition-all duration-500"
      />
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold">
          Creative Partner
        </span>
        <p className="text-xs font-mono flex items-center gap-1.5 text-black/80">
          Duo Profile <ExternalLink size={12} className="opacity-40" />
        </p>
      </div>

      {/* Tooltip-like popup on hover */}
      <div className="absolute opacity-0 -bottom-1 left-1/2 -translate-x-1/2 translate-y-full px-3 py-2 bg-black text-white text-[10px] uppercase tracking-widest font-bold rounded-lg pointer-events-none transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:bottom-[-8px] shadow-xl z-50 whitespace-nowrap">
        Visit LinkedIn Profile
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-black" />
      </div>
    </div>
  )
}

export default Partner
