import { cloneElement, isValidElement, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

// Skill icons in dataService are either <img src> or react-icons components; turn either into an image URL.
export function iconSource(icon: ReactNode, color: string): string | null {
  if (!isValidElement(icon)) return null
  const props = icon.props as { src?: string }
  if (icon.type === 'img') return props.src ?? null
  const svg = renderToStaticMarkup(
    cloneElement(
      icon as React.ReactElement<{ color?: string; size?: number }>,
      { color, size: 128 }
    )
  )
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}
