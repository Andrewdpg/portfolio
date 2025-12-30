import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

type SubSectionProps = {
  title: string
  className?: string
  children: React.ReactNode
}

export const SubSection: React.FC<SubSectionProps> = ({
  title,
  className = '',
  children,
}) => {
  const [opened, setOpened] = React.useState(false)

  return (
    <div
      className={`flex flex-col rounded-3xl border border-current/10 bg-current/[0.03] overflow-hidden transition-all duration-500 ${opened ? 'shadow-inner' : 'hover:bg-current/[0.05]'} ${className}`}
    >
      <button
        className="flex items-center justify-between px-8 py-5 w-full text-left transition-all"
        onClick={() => setOpened(!opened)}
      >
        <span className="text-xl font-black uppercase tracking-tighter">
          {title}
        </span>
        <motion.div
          animate={{ rotate: opened ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="opacity-20"
        >
          <ChevronDown size={22} />
        </motion.div>
      </button>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-8 pb-8 pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
