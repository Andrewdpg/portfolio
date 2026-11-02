import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { useContactModal } from '../../context/ContactModalContext'
import type { Action } from './DeskScene'
import { LanguageStamps } from './LanguageStamps'
import { PitchModal } from './PitchModal'
import { AboutModal } from './AboutModal'
import Partner from '../../components/Partner'

const DeskScene = React.lazy(() => import('./DeskScene'))

const SPOTIFY = 'https://open.spotify.com/user/31w5iqswuv7kfmzrkeqeeba4gvea'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

// Camera tour only on desktop with motion allowed; phones and reduced-motion get a static room.
const TOUR_QUERY =
  '(min-width: 768px) and (prefers-reduced-motion: no-preference)'

function useTourEnabled() {
  const [on, setOn] = useState(() => window.matchMedia(TOUR_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(TOUR_QUERY)
    const update = () => setOn(mq.matches)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return on
}

export const HomeSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hover, setHover] = useState<string | null>(null)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [cvState, setCvState] = useState<'idle' | 'loading' | 'error'>('idle')
  const [pitchOpen, setPitchOpen] = useState(false)
  const [stopLabel, setStopLabel] = useState<string | null>(null)
  const tour = useTourEnabled()
  const progress = useRef(0)
  const { openContactModal } = useContactModal()

  // Scroll progress through the pinned hero, kept in a ref so the camera reads it per frame without re-renders.
  useEffect(() => {
    const el = ref.current
    const container = document.querySelector('.hero-scroll-container')
    if (!el || !container || !tour) {
      progress.current = 0
      return
    }
    const onScroll = () => {
      const span = el.offsetHeight - container.clientHeight
      progress.current =
        span > 0 ? (container.scrollTop - el.offsetTop) / span : 0
    }
    onScroll()
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [tour])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const root = document.querySelector('.hero-scroll-container')
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting && !mounted) {
          window.setTimeout(() => setMounted(true), 350)
        }
      },
      { root, rootMargin: '200px 0px', threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [mounted])

  const onAction = useCallback(
    (action: Action) => {
      if (typeof action === 'object') {
        document
          .getElementById(action.section)
          ?.scrollIntoView({ behavior: 'smooth' })
        return
      }
      if (action === 'projects' || action === 'skills') {
        document.getElementById(action)?.scrollIntoView({ behavior: 'smooth' })
      }
      if (action === 'pitch') {
        setPitchOpen(true)
      }
      if (action === 'music') {
        window.open(SPOTIFY, '_blank', 'noopener,noreferrer')
      }
      if (action === 'contact') {
        openContactModal()
      }
      if (action === 'about') {
        setAboutOpen(true)
      }
    },
    [openContactModal]
  )

  const downloadCv = async () => {
    setCvState('loading')
    try {
      const res = await fetch(`${API_URL}/api/andres/cv`)
      if (!res.ok) throw new Error('fetch failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Andres_Parra-CV.pdf'
      a.click()
      URL.revokeObjectURL(url)
      setCvState('idle')
    } catch {
      setCvState('error')
      window.setTimeout(() => setCvState('idle'), 3000)
    }
  }

  return (
    <section
      ref={ref}
      className={`relative w-full bg-[#141414] text-[#E8E4F0] ${tour ? 'h-[400dvh]' : 'h-[100dvh]'}`}
    >
      {/* pinned viewport: the camera tours the room while the section scrolls past */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 95% at 60% 30%, #2a1f3d 0%, #191320 45%, #111111 80%)',
          }}
        />

        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            mounted ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {mounted && (
            <Suspense fallback={null}>
              <DeskScene
                paused={!visible}
                onHover={setHover}
                onAction={onAction}
                progress={progress}
                onStop={setStopLabel}
              />
            </Suspense>
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 p-6 md:p-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-app-main">
            Software engineer · Cali, Colombia
          </p>
          <h1 className="mt-2 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl">
            Andrés Parra
          </h1>
          <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-white/75">
            Software engineer building backend systems, full-stack apps and
            data-driven platforms. Currently a software developer at Universidad
            ICESI and leading platform development at Methodus.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 z-10 flex flex-wrap items-center gap-3 p-6 pb-28 md:pb-10 md:pl-28 md:pr-10 md:pt-10">
          <button
            onClick={openContactModal}
            className="rounded-full bg-app-main px-6 py-3 text-sm font-bold text-black transition-all hover:scale-105 hover:bg-app-main/85 active:scale-95"
          >
            Contact
          </button>
          <button
            onClick={downloadCv}
            disabled={cvState === 'loading'}
            className={`rounded-full border-2 px-6 py-3 text-sm font-bold transition-all hover:scale-105 active:scale-95 disabled:opacity-60 ${
              cvState === 'error'
                ? 'border-red-500 text-red-400'
                : 'border-white/25 text-white/80 hover:border-app-main hover:text-app-main'
            }`}
          >
            {cvState === 'loading'
              ? 'Downloading…'
              : cvState === 'error'
                ? 'Try again'
                : 'Resume'}
          </button>
          {/* the room's avatar and monitor are mouse-only; these give keyboard and screen readers the same content */}
          <button
            onClick={() => setAboutOpen(true)}
            className="rounded-full px-3 py-3 text-xs font-semibold text-white/70 underline-offset-4 transition-colors hover:text-app-main hover:underline focus-visible:text-app-main focus-visible:underline"
          >
            About me
          </button>
          <button
            onClick={() => setPitchOpen(true)}
            className="rounded-full px-3 py-3 text-xs font-semibold text-white/70 underline-offset-4 transition-colors hover:text-app-main hover:underline focus-visible:text-app-main focus-visible:underline"
          >
            Watch pitch
          </button>
          <LanguageStamps className="ml-1 hidden scale-75 md:flex" />
          <div className="hidden lg:block">
            <Partner />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-44 z-10 md:bottom-6 flex flex-col items-center gap-3 px-6">
          <span
            className={`rounded-full border border-app-main/30 bg-black/40 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-app-main backdrop-blur-sm transition-opacity duration-300 ${
              hover || stopLabel ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {hover ?? stopLabel ?? ''}
          </span>
        </div>

        {aboutOpen && <AboutModal onClose={() => setAboutOpen(false)} />}

        {pitchOpen && <PitchModal onClose={() => setPitchOpen(false)} />}
      </div>
    </section>
  )
}
