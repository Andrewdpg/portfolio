import React from 'react'
import { useDialog } from './useDialog'

const SPOTIFY = 'https://open.spotify.com/user/31w5iqswuv7kfmzrkeqeeba4gvea'

export const AboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const ref = useDialog(onClose)
  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Off the clock"
      className="absolute inset-0 z-20 flex items-end justify-center p-4 md:items-center md:justify-end md:p-10 md:pr-40"
    >
      <button
        aria-label="Close"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
      />
      <div className="relative w-full max-w-md rounded-3xl border border-app-main/25 bg-[#100b18]/95 p-6 text-[#E8E4F0] shadow-2xl md:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-app-main">
              Off the clock
            </p>
            <h3 className="mt-1 font-display text-3xl font-black uppercase leading-none tracking-tight">
              Beyond the code
            </h3>
          </div>
          <button
            data-autofocus
            aria-label="Close"
            onClick={onClose}
            className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:border-app-main hover:text-app-main"
          >
            Esc
          </button>
        </div>

        <div className="mt-5 flex flex-col gap-4 text-sm font-light leading-relaxed text-white/65">
          <p>
            I&apos;m not the loudest person in the room, I&apos;d rather listen
            than fill silence. Give me people I trust, though, and I open up
            completely — sarcasm included.
          </p>
          <p>
            Music says more about me than I usually do out loud. AURORA&apos;s
            been a constant for years, and turns out I&apos;m a bit of a
            romantic underneath it all. When I&apos;m not building something,
            I&apos;m deep into some anime or show, or losing a weekend to The
            Last of Us or Assassin&apos;s Creed.
          </p>
          <p>
            Honesty and follow-through matter more to me than almost anything.
            And most of what I build comes down to the same thing: staying
            curious, and wanting it to actually matter.
          </p>
        </div>

        <a
          href={SPOTIFY}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-app-main/40 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-app-main transition-colors hover:bg-app-main hover:text-black"
        >
          AURORA on Spotify ↗
        </a>
      </div>
    </div>
  )
}
