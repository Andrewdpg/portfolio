import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const Popup: React.FC = () => {
  const { isOpen, content, closePopup } = usePopup()

  if (!isOpen || !content) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-app-secondary/60 backdrop-blur-md flex items-center justify-center z-[500] p-4 md:p-8"
          onClick={closePopup}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="flex flex-col bg-white rounded-[40px] shadow-2xl relative w-full max-w-4xl max-h-full overflow-hidden border border-white/20"
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header / Close Button */}
            <div className="absolute top-8 right-8 z-[110]">
              <button
                className="w-12 h-12 rounded-full bg-app-main/10 text-app-main hover:bg-app-main hover:text-white flex items-center justify-center transition-all active:scale-90"
                onClick={closePopup}
              >
                <X size={24} />
              </button>
            </div>

            <div className="overflow-y-auto no-scrollbar p-8 md:p-16">
              {content.title && (
                <div className="mb-10">
                  <span className="text-xs font-mono uppercase tracking-[0.4em] text-app-main/60 block mb-2">
                    Project Details
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-app-secondary leading-none">
                    {content.title}
                  </h2>
                  <div className="h-1.5 w-20 bg-app-main rounded-full mt-6" />
                </div>
              )}
              <div className="text-app-secondary/80 leading-relaxed">
                {content.body}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { usePopup } from '../context/PopupContext'
export default Popup
