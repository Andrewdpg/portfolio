import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Loader2 } from 'lucide-react'
import { sendChatMessage } from '../../../../services/chatService'
import type { ChatMessage, ActionData } from '../../../../services/chatService'
import { ActionCards } from './ActionCards'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  actions?: ActionData[]
}

const TENANT = 'andres'

const INITIAL_MESSAGE: Message = {
  id: 'init',
  role: 'assistant',
  content:
    'Hey! Soy Andrés. Preguntame lo que quieras — proyectos, experiencia, stack… lo que sea.',
  actions: [],
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen, messages])

  const history = (): ChatMessage[] =>
    messages
      .filter((m) => m.id !== 'init')
      .map((m) => ({ role: m.role, content: m.content }))

  async function handleSend() {
    const text = input.trim()
    if (!text || isLoading) return

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: 'user', content: text },
    ])
    setInput('')
    setIsLoading(true)

    try {
      const response = await sendChatMessage(TENANT, text, history())
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: response.reply,
          actions: response.actions,
        },
      ])
    } catch (err) {
      console.error('[Chat error]', err)
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `Error: ${msg}`,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full border border-white/10 shadow-2xl"
        style={{ backgroundColor: '#1A1128' }}
        whileHover={{ scale: 1.04, borderColor: 'rgba(155,118,211,0.4)' }}
        whileTap={{ scale: 0.96 }}
        aria-label={
          isOpen ? 'Close chat' : 'Ask me anything — AI answers about Andrés'
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={16} style={{ color: '#9B76D3' }} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare size={16} style={{ color: '#9B76D3' }} />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="text-xs font-bold uppercase tracking-widest text-white/70">
          {isOpen ? 'Close' : 'Ask me'}
        </span>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-h-[540px] flex flex-col rounded-[28px] overflow-hidden shadow-2xl"
            style={{
              backgroundColor: '#1A1128',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {/* Header */}
            <div
              className="px-6 py-4 flex items-center gap-4 shrink-0"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: 'rgba(155,118,211,0.15)',
                  border: '1px solid rgba(155,118,211,0.2)',
                }}
              >
                <MessageSquare size={15} style={{ color: '#9B76D3' }} />
              </div>
              <div className="min-w-0">
                <p className="text-base font-black uppercase tracking-tighter text-white leading-tight">
                  Andrés Parra
                </p>
                <p
                  className="text-[10px] font-mono uppercase tracking-[0.25em]"
                  style={{ color: '#9B76D3' }}
                >
                  Systems Engineer · Cali
                </p>
              </div>

              {/* Live dot */}
              <div className="ml-auto flex items-center gap-1.5 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: '#28EA96' }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ backgroundColor: '#28EA96' }}
                  />
                </span>
                <span
                  className="text-[9px] font-mono uppercase tracking-widest"
                  style={{ color: '#28EA96' }}
                >
                  Online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 min-h-0">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user' ? 'rounded-br-sm' : 'rounded-bl-sm'
                    }`}
                    style={
                      msg.role === 'user'
                        ? { backgroundColor: '#9B76D3', color: '#fff' }
                        : {
                            backgroundColor: '#2D1F44',
                            color: 'rgba(255,255,255,0.85)',
                          }
                    }
                  >
                    {msg.content}
                    {msg.actions && <ActionCards actions={msg.actions} />}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-2.5 rounded-2xl rounded-bl-sm flex items-center gap-2"
                    style={{ backgroundColor: '#2D1F44' }}
                  >
                    <Loader2
                      size={12}
                      className="animate-spin"
                      style={{ color: '#9B76D3' }}
                    />
                    <span
                      className="text-xs"
                      style={{ color: 'rgba(155,118,211,0.6)' }}
                    >
                      Escribiendo...
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div
              className="px-4 py-3 shrink-0"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="flex items-center gap-2 rounded-2xl px-4 py-2.5"
                style={{
                  backgroundColor: '#2D1F44',
                  border: '1px solid rgba(155,118,211,0.15)',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Preguntame algo..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-white outline-none min-w-0"
                  style={{ color: 'white' }}
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all disabled:opacity-25"
                  style={{ backgroundColor: '#9B76D3' }}
                >
                  <Send size={13} color="white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
