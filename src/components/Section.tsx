import React from 'react'
import Subtitle from './Subtitle'
import { ChevronDown } from 'lucide-react'
import { Button } from './Button'
import { motion, AnimatePresence } from 'framer-motion'

type SectionProps = {
  title: string
  className?: string
  children: React.ReactNode
}

export const Section: React.FC<SectionProps> = ({
  title,
  className,
  children,
}) => {
  const [opened, setOpened] = React.useState(false)

  return (
    <div
      className={`flex flex-col justify-center w-full gap-4 overflow-visible`}
    >
      <Button
        variant="text"
        className="flex items-center text-center flex-row gap-2"
        onClick={() => setOpened(!opened)}
      >
        <ChevronDown
          className={`h-12 w-12 transform ${opened ? 'rotate-180' : ''} transition-all duration-300`}
        />
        <Subtitle className="text-nowrap">{title}</Subtitle>
      </Button>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
