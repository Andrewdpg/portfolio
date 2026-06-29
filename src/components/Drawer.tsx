import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useDrawer } from '../context/DrawerContext'

const Drawer: React.FC = () => {
  const { isOpen, content, closeDrawer } = useDrawer()

  return (
    <AnimatePresence>
      {isOpen && content && (
        <>
          <motion.div
            className="fixed inset-0 bg-app-secondary/70 dark:bg-black/70 z-[500]"
            onClick={closeDrawer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#110E1A] rounded-t-[28px] z-[600] max-h-[85vh] flex flex-col shadow-2xl"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="flex justify-center pt-4 pb-2 cursor-pointer shrink-0"
              onClick={closeDrawer}
            >
              <div className="w-10 h-1 rounded-full bg-app-secondary/15 dark:bg-white/15" />
            </div>

            <div className="absolute top-4 right-6">
              <button
                className="w-10 h-10 rounded-full bg-app-main/10 text-app-main hover:bg-app-main hover:text-white flex items-center justify-center transition-all active:scale-90"
                onClick={closeDrawer}
              >
                <X size={20} />
              </button>
            </div>

            {content.title && (
              <div className="px-8 pb-4 shrink-0">
                <span className="text-xs font-mono uppercase tracking-[0.4em] text-app-main/60 block mb-1">
                  Project Details
                </span>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-app-secondary dark:text-[#E8E4F0] leading-none">
                  {content.title}
                </h2>
                <div className="h-1.5 w-16 bg-app-main rounded-full mt-4" />
              </div>
            )}

            <div className="overflow-y-auto no-scrollbar px-8 pb-10 flex-1 text-app-secondary dark:text-[#E8E4F0]">
              {content.body}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Drawer
