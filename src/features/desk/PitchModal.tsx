import React, { useEffect } from 'react'

const PITCH = 'https://www.youtube.com/embed/MKu16mOYshE?autoplay=1'

export const PitchModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pitch video"
      className="absolute inset-0 z-20 flex items-center justify-center p-4 md:p-10"
    >
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />
      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-app-main/25 bg-black shadow-2xl">
        <div className="aspect-video w-full">
          <iframe
            src={PITCH}
            title="Pitch video"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <button
          aria-label="Close video"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-app-main hover:text-app-main"
        >
          Esc
        </button>
      </div>
    </div>
  )
}
