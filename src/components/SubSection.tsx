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
      className={`flex flex-col rounded-lg justify-center ${className} ${!opened ? 'bg-app-main/20 hover:bg-app-main/30' : 'bg-white/10'} overflow-visible transition-all duration-300  `}
    >
      <Button
        variant="text"
        className={`flex items-center justify-center text-center flex-row ${opened ? 'border-app-main border-solid' : ' w-fit'} h-full`}
        onClick={() => setOpened(!opened)}
      >
        <Body
          className={`text-xl text-nowrap font-bold ${opened ? 'mb-1' : ''} text-center`}
        >
          {title}
        </Body>
      </Button>

      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'min-content', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pb-4 px-4 w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
