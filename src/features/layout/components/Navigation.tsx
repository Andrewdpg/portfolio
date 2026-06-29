import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronRight,
  Home,
  Briefcase,
  Code,
  Cpu,
  Sun,
  Moon,
} from 'lucide-react'
import { useTheme } from '../../../context/ThemeContext'

export type NavSection = {
  id: string
  label: string
}

type NavigationProps = {
  sections: NavSection[]
}

export const Navigation: React.FC<NavigationProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)
  const { isDark, toggle } = useTheme()

  useEffect(() => {
    const observerOptions = {
      root: document.querySelector('.hero-scroll-container'),
      threshold: 0.5,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getIcon = (id: string) => {
    if (id === 'intro') return <Home size={18} />
    if (id.startsWith('exp')) return <Briefcase size={18} />
    if (id === 'projects') return <Code size={18} />
    if (id === 'skills') return <Cpu size={18} />
    return <ChevronRight size={18} />
  }

  return (
    <>
      {/* Desktop Navigation (Right Side) */}
      <div
        className="hidden md:flex fixed right-0 top-1/2 -translate-y-1/2 z-[150] flex-col gap-6 items-end p-4 rounded-3xl rounded-r-none bg-black/40 backdrop-blur-md border border-white/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {sections.map((section) => {
          const isActive = activeSection === section.id
          if (!isHovered && !isActive) return null
          return (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="group flex items-center gap-4 transition-all duration-500 outline-none"
            >
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.span
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={`text-[10px] font-black uppercase tracking-[0.2em] shadow-sm ${isActive ? 'text-app-main' : 'text-white'} pr-2`}
                  >
                    {section.label}
                  </motion.span>
                )}
              </AnimatePresence>
              <div
                className={`w-3 h-3 rounded-full transition-all duration-500 border-2 ${
                  isActive
                    ? 'bg-app-main border-app-main scale-150 shadow-[0_0_15px_rgba(155,118,211,0.5)]'
                    : 'bg-white/20 border-white/40 group-hover:border-app-main group-hover:bg-app-main/20 group-hover:scale-125'
                }`}
              />
            </button>
          )
        })}

        {/* Theme toggle */}
        {isHovered && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex items-center gap-4 transition-all duration-300 outline-none group"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 pr-2">
              {isDark ? 'Light' : 'Dark'}
            </span>
            <div className="w-3 h-3 flex items-center justify-center text-white/40 group-hover:text-app-main transition-colors">
              {isDark ? <Sun size={12} /> : <Moon size={12} />}
            </div>
          </motion.button>
        )}
      </div>

      {/* Mobile Navigation (Bottom Floating Pill) */}
      <div
        className="md:hidden fixed left-1/2 -translate-x-1/2 z-[200] max-w-[360px]"
        style={{ bottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="bg-app-secondary/95 backdrop-blur-2xl border border-white/10 rounded-full p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
          {sections.map((section) => {
            const isActive = activeSection === section.id
            return (
              <button
                key={section.id}
                aria-label={section.label}
                onClick={() => scrollToSection(section.id)}
                className={`flex items-center justify-center p-3.5 rounded-full transition-all duration-300 relative min-w-[44px] min-h-[44px] ${
                  isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-app-main rounded-full z-[-1]"
                    transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
                  />
                )}
                {getIcon(section.id)}
              </button>
            )
          })}
          <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="flex items-center justify-center p-3.5 rounded-full transition-all duration-300 text-white/40 hover:text-white/70 min-w-[44px] min-h-[44px]"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </>
  )
}
