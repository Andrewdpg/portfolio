import React from 'react'
import { usePopup } from '../context/PopupContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'
import { Close } from '@mui/icons-material'

const Popup: React.FC = () => {
  const { isOpen, content, closePopup } = usePopup()

  if (!isOpen || !content) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closePopup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col bg-app-secondary/90 rounded-xl shadow-lg relative items-center max-w-prose m-4 text-app-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="text"
              className="absolute top-2 right-2"
              onClick={closePopup}
            >
              <Close />
            </Button>
            {content.title && (
              <h2 className="mt-4 font-bold text-2xl">{content.title}</h2>
            )}
            <div className="p-4">{content.body}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Popup
