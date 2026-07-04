import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Heading from '../../../../components/Heading'
import Body from '../../../../components/Body'
import me from '../../../../assets/img/me.webp'
import { TitleCard } from './Components/TitleCard'
import {
  Download,
  Play,
  X,
  Loader2,
  AlertCircle,
  Mail,
  Coffee,
  ArrowLeft,
} from 'lucide-react'
import Partner from '../../../../components/Partner'
import { LanguageStamps } from './Components/LanguageStamps'
import { useContactModal } from '../../../../context/ContactModalContext'

export const Presentation = () => {
  const [showVideo, setShowVideo] = useState(false)
  const [showPersonal, setShowPersonal] = useState(false)
  const [hasClickedOffClock, setHasClickedOffClock] = useState(false)
  const [downloadState, setDownloadState] = useState<
    'idle' | 'loading' | 'error'
  >('idle')
  const { openContactModal } = useContactModal()

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between p-6 md:p-16 gap-8 md:gap-12 min-h-screen relative overflow-y-auto no-scrollbar bg-white dark:bg-[#141414]">
      <div className="w-full md:w-[45%] flex justify-center max-w-[320px] md:max-w-[500px] order-1 md:order-2 shrink-0">
        <div className="relative w-full transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_32px_80px_rgba(155,118,211,0.2)]">
          <div className="relative w-full aspect-square overflow-hidden bg-app-main/10 rounded-[32px] md:rounded-[40px] shadow-2xl group border-[8px] md:border-[12px] border-white dark:border-app-secondary ring-1 ring-black/5 dark:ring-white/5">
            {!showVideo ? (
              <div
                role="button"
                aria-label="Watch pitch video"
                tabIndex={0}
                className="cursor-pointer"
                onClick={() => setShowVideo(true)}
                onKeyDown={(e) => e.key === 'Enter' && setShowVideo(true)}
              >
                <img
                  src={me}
                  alt="Andrew Parra"
                  width={400}
                  height={400}
                  fetchPriority="high"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-app-main/20 to-transparent pointer-events-none" />

                {/* Play Button Overlay */}
                <button
                  aria-label="Play pitch video"
                  className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 transform scale-90 group-hover:scale-100 transition-transform duration-500">
                    <Play size={40} className="fill-white translate-x-1" />
                  </div>
                </button>
                <motion.span
                  initial={{ opacity: 0.6, y: 10 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 transform -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-white bg-app-main/80 px-4 py-1.5 rounded-full backdrop-blur-sm"
                >
                  Watch Pitch
                </motion.span>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black">
                <iframe
                  src="https://www.youtube.com/embed/MKu16mOYshE?autoplay=1"
                  title="Pitch Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  aria-label="Close video"
                  onClick={() => setShowVideo(false)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors z-10"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 order-2 md:order-1 max-w-2xl overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {!showPersonal ? (
            <motion.div
              key="front"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex flex-col gap-6 md:gap-8 justify-center items-center text-center md:items-start md:text-start"
            >
              <div className="flex flex-col md:flex-row items-center gap-4 scale-90 md:scale-100 w-full">
                <TitleCard title="Andrés" subTitle="Software Developer" />
                <LanguageStamps className="flex" />
              </div>

              <Heading className="text-app-secondary dark:text-[#E8E4F0] !text-4xl sm:!text-5xl md:!text-7xl">
                Andrés Parra
              </Heading>

              <Body className="text-app-secondary/70 dark:text-[#E8E4F0]/70 max-w-xl text-base md:text-lg px-4 md:px-0">
                Software engineer with experience building backend systems,
                full-stack applications, and data-driven platforms. Interested
                in backend architecture, distributed systems, data engineering,
                and applied machine learning. Currently building fintech
                infrastructure at Swiset and leading platform development at
                Methodus.
              </Body>

              <div className="relative inline-block">
                <button
                  aria-label="Meet the person behind the code"
                  title="Meet the person behind the code"
                  onClick={() => {
                    setShowPersonal(true)
                    setHasClickedOffClock(true)
                  }}
                  className="group flex items-center gap-2 pl-3 pr-4 h-10 rounded-full border-2 border-app-main text-app-main bg-app-main/5 shadow-md shadow-app-main/10 hover:bg-app-main hover:text-white transition-all hover:scale-105 active:scale-95"
                >
                  <Coffee size={15} />
                  <span className="text-[11px] font-black uppercase tracking-widest">
                    Off the clock
                  </span>
                </button>

                {!hasClickedOffClock && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, -3, 0] }}
                    transition={{
                      opacity: { duration: 0.4, delay: 0.6 },
                      y: {
                        duration: 1.6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                      },
                    }}
                    className="hidden md:flex absolute -top-12 left-4 flex-col items-center pointer-events-none select-none"
                  >
                    <span className="italic text-xs font-bold text-app-main -rotate-3 whitespace-nowrap mb-0.5">
                      click me
                    </span>
                    <svg
                      width="24"
                      height="26"
                      viewBox="0 0 24 26"
                      fill="none"
                      className="text-app-main"
                    >
                      <path
                        d="M19 2C13 4 6 9 4 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9 19L4 24L2 16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>

              <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start scale-90 md:scale-100">
                <button
                  onClick={() => {
                    window.open(
                      'https://github.com/Andrewdpg/portfolio',
                      '_blank'
                    )
                  }}
                  className="px-6 md:px-8 py-3 md:py-4 bg-app-main text-white rounded-full font-bold hover:bg-app-main/80 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-app-main/20"
                >
                  Source Code
                </button>
                <button
                  disabled={downloadState === 'loading'}
                  onClick={async () => {
                    setDownloadState('loading')
                    try {
                      const res = await fetch(
                        `${import.meta.env.VITE_API_URL ?? 'http://localhost:3001'}/api/andres/cv`
                      )
                      if (!res.ok) throw new Error('fetch failed')
                      const blob = await res.blob()
                      const url = URL.createObjectURL(blob)
                      const a = document.createElement('a')
                      a.href = url
                      a.download = 'Andres_Parra-CV.pdf'
                      a.click()
                      URL.revokeObjectURL(url)
                      setDownloadState('idle')
                    } catch {
                      setDownloadState('error')
                      setTimeout(() => setDownloadState('idle'), 3000)
                    }
                  }}
                  className={`flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 rounded-full font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                    downloadState === 'error'
                      ? 'border-red-500 text-red-500'
                      : 'border-app-main text-app-main hover:bg-app-main hover:text-white'
                  }`}
                >
                  {downloadState === 'loading' && (
                    <Loader2 size={20} className="animate-spin" />
                  )}
                  {downloadState === 'error' && <AlertCircle size={20} />}
                  {downloadState === 'idle' && <Download size={20} />}
                  {downloadState === 'loading'
                    ? 'Downloading…'
                    : downloadState === 'error'
                      ? 'Failed — try again'
                      : 'Resume'}
                </button>
                <button
                  onClick={openContactModal}
                  className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-app-secondary/20 dark:border-white/20 text-app-secondary dark:text-white rounded-full font-bold hover:border-app-main hover:text-app-main transition-all hover:scale-105 active:scale-95"
                >
                  <Mail size={20} />
                  Contact
                </button>
              </div>

              <div className="pt-4 border-t border-app-main/10 dark:border-app-main/5 w-full hidden md:block">
                <Partner />
              </div>

              {/* Mobile Partner (different positioning if needed, or just smaller) */}
              <div className="md:hidden pt-2 pb-2">
                <Partner />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex flex-col gap-5 md:gap-6 justify-center items-center text-center md:items-start md:text-start"
            >
              <button
                aria-label="Back to the resume"
                onClick={() => setShowPersonal(false)}
                className="group flex items-center gap-2 shrink-0 pl-3 pr-4 h-9 rounded-full border-2 border-app-main text-app-main bg-app-main/5 shadow-md shadow-app-main/10 hover:bg-app-main hover:text-white transition-all hover:scale-105 active:scale-95"
              >
                <ArrowLeft size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  Back to the resume
                </span>
              </button>

              <Heading className="text-app-secondary dark:text-[#E8E4F0] !text-3xl sm:!text-4xl md:!text-5xl">
                Beyond the code
              </Heading>

              <Body className="text-app-secondary/70 dark:text-[#E8E4F0]/70 max-w-xl text-base md:text-lg px-4 md:px-0">
                I&apos;m not the loudest person in the room, I&apos;d rather
                listen than fill silence. Give me people I trust, though, and I
                open up completely — sarcasm included.
              </Body>

              <Body className="text-app-secondary/70 dark:text-[#E8E4F0]/70 max-w-xl text-base md:text-lg px-4 md:px-0">
                Music says more about me than I usually do out loud,
                AURORA&apos;s been a constant for years, and turns out I&apos;m
                a bit of a romantic underneath it all. When I&apos;m not
                building something, I&apos;m probably deep into some anime or
                show, just enjoying the story.
              </Body>

              <Body className="text-app-secondary/70 dark:text-[#E8E4F0]/70 max-w-xl text-base md:text-lg px-4 md:px-0">
                Honesty and follow-through matter more to me than almost
                anything. And most of what I build comes down to the same thing:
                staying curious, and wanting it to actually matter.
              </Body>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
