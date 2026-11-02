// Game keys (WASD/arrows) must never be stolen from a text field: chat, contact form, etc.
export function isTypingTarget(
  target: { closest?: (sel: string) => unknown } | null
): boolean {
  return !!target?.closest?.(
    'input, textarea, select, [contenteditable]:not([contenteditable="false"])'
  )
}
