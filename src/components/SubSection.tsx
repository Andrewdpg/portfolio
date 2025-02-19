import React from 'react'

import { Button } from './Button'
import { motion, AnimatePresence } from 'framer-motion'
import Body from './Body'

type SubSectionProps = {
  title: string
  className?: string
  children: React.ReactNode
}

export const SubSection: React.FC<SubSectionProps> = ({
  title,
  className,
  children,
}) => {
  const [opened, setOpened] = React.useState(false)

  return (
    <div
      className={`flex flex-col justify-center gap-4 ${className} w-full ${!opened ? 'max-w-min' : ''} overflow-visible`}
    >
      <Button
        variant="tab"
        className={`flex items-center text-center flex-row ${opened ? 'border-app-main border-solid' : ''}`}
        onClick={() => setOpened(!opened)}
      >
        <Body className={`text-xl text-nowrap font-bold mb-2 text-center`}>
          {title}
        </Body>
      </Button>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
