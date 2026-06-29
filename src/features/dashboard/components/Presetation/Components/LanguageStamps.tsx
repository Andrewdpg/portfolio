import React from 'react'
import { motion } from 'framer-motion'
import { Languages } from 'lucide-react'

const languages = [
  { name: 'English', level: 'Professional', code: 'EN' },
  { name: 'French', level: 'A2 Inter.', code: 'FR' },
]

export const LanguageStamps = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {languages.map((lang, index) => (
        <motion.div
          key={lang.code}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.08 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 22,
            delay: index * 0.08,
          }}
          className="relative flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-dashed border-app-main/40 bg-white/5 dark:bg-white/5 backdrop-blur-md cursor-default shadow-md"
        >
          <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none rounded-full overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-app-main"
            >
              <filter id="stampNoise">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.8"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
              </filter>
              <rect width="100%" height="100%" filter="url(#stampNoise)" />
            </svg>
          </div>

          <div className="flex flex-col items-center text-center px-1">
            <span className="text-[7px] font-black uppercase tracking-widest text-app-main opacity-60 leading-none">
              {lang.level}
            </span>
            <span className="text-lg font-black text-app-main leading-none my-0.5">
              {lang.code}
            </span>
            <span className="text-[6px] font-bold uppercase tracking-widest text-app-main/80 leading-none">
              {lang.name}
            </span>
          </div>

          <div className="absolute inset-1 rounded-full border border-app-main/20 pointer-events-none" />
          <Languages
            size={12}
            className="absolute -top-1 -right-1 text-app-main opacity-40"
          />
        </motion.div>
      ))}
    </div>
  )
}
