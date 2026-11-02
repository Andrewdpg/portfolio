import { useEffect, useRef } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'

// Modal basics for the hero dialogs: Esc closes, focus moves in, Tab stays inside, focus returns on close.
export function useDialog(onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  const close = useRef(onClose)
  close.current = onClose

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null
    const box = ref.current
    box?.querySelector<HTMLElement>('[data-autofocus]')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return close.current()
      if (e.key !== 'Tab' || !box) return
      const items = [...box.querySelectorAll<HTMLElement>(FOCUSABLE)]
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      opener?.focus?.()
    }
  }, [])

  return ref
}
