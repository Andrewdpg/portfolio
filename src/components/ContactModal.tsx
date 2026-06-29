import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { sendContactMessage } from '../services/chatService'

const TENANT = 'andres'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) setTimeout(() => nameRef.current?.focus(), 150)
  }, [isOpen])

  function reset() {
    setName('')
    setEmail('')
    setMessage('')
    setStatus('idle')
    setErrorMsg('')
  }

  function handleClose() {
    onClose()
    setTimeout(reset, 300)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (status === 'loading') return
    setStatus('loading')
    try {
      await sendContactMessage(
        TENANT,
        name.trim(),
        email.trim(),
        message.trim()
      )
      setStatus('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full rounded-xl px-4 py-3 text-sm text-white bg-white/5 border border-white/10 outline-none placeholder-white/25 focus:border-app-main/60 transition-colors'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[700]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
          />

          <motion.div
            className="fixed inset-0 z-[800] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md rounded-[28px] overflow-hidden shadow-2xl"
              style={{
                backgroundColor: '#1A1128',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="px-7 pt-7 pb-5 flex items-start justify-between"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div>
                  <p className="text-base font-black uppercase tracking-tighter text-white leading-tight">
                    Let&apos;s talk
                  </p>
                  <p
                    className="text-[10px] font-mono uppercase tracking-[0.25em] mt-0.5"
                    style={{ color: '#9B76D3' }}
                  >
                    I&apos;ll get back to you shortly
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:bg-white/10 active:scale-90"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="px-7 py-6">
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-col items-center gap-4 py-6 text-center"
                    >
                      <CheckCircle2 size={40} style={{ color: '#28EA96' }} />
                      <div>
                        <p className="text-sm font-black uppercase tracking-tight text-white">
                          Message sent!
                        </p>
                        <p className="text-xs text-white/40 mt-1">
                          I&apos;ll reach out to {email} soon.
                        </p>
                      </div>
                      <button
                        onClick={handleClose}
                        className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors"
                      >
                        Close
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
                      <input
                        ref={nameRef}
                        type="text"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        disabled={status === 'loading'}
                        className={inputClass}
                      />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={status === 'loading'}
                        className={inputClass}
                      />
                      <textarea
                        placeholder="What's on your mind?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={4}
                        disabled={status === 'loading'}
                        className={`${inputClass} resize-none`}
                      />

                      {status === 'error' && (
                        <p className="text-[11px] text-red-400/80">
                          {errorMsg}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={
                          status === 'loading' ||
                          !name.trim() ||
                          !email.trim() ||
                          !message.trim()
                        }
                        className="mt-1 flex items-center justify-center gap-2 w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all disabled:opacity-30 active:scale-[0.98]"
                        style={{ backgroundColor: '#9B76D3' }}
                      >
                        {status === 'loading' ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <>
                            <Send size={13} />
                            Send message
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
