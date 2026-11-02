import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react'

const kebab = (k: string) => k.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase())
const esc = (v: unknown) =>
  String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// ponytail: a tiny static serializer for icon trees (svg/path/g, function components, context
// consumers). Avoids shipping react-dom/server (~90 KB gz) just to rasterize 12 icons.
// Ceiling: no hooks inside icon components; fine for react-icons' GenIcon/IconBase.
export function elementToSvg(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (Array.isArray(node)) return node.map(elementToSvg).join('')
  if (!isValidElement(node)) return esc(node)
  const { type } = node
  const props = (node.props ?? {}) as Record<string, unknown>
  if (typeof type === 'function')
    return elementToSvg((type as (p: unknown) => ReactNode)(props))
  if (typeof type !== 'string') {
    // context consumer (react-icons wraps IconBase in IconContext.Consumer): render with defaults
    const render = props.children
    return typeof render === 'function'
      ? elementToSvg(render({}))
      : elementToSvg(render as ReactNode)
  }
  let attrs = ''
  for (const [k, v] of Object.entries(props)) {
    if (k === 'children' || v == null || v === false || typeof v === 'function')
      continue
    if (k === 'style') {
      const css = Object.entries(v as Record<string, unknown>)
        .filter(([, sv]) => sv != null)
        .map(([sk, sv]) => `${kebab(sk)}:${sv}`)
        .join(';')
      if (css) attrs += ` style="${esc(css)}"`
      continue
    }
    const name =
      k === 'className'
        ? 'class'
        : k === 'viewBox' || k.startsWith('data')
          ? k
          : kebab(k)
    attrs += ` ${name}="${esc(v)}"`
  }
  return `<${type}${attrs}>${elementToSvg(props.children as ReactNode)}</${type}>`
}

// Skill icons in dataService are either <img src> or react-icons components; turn either into an image URL.
export function iconSource(icon: ReactNode, color: string): string | null {
  if (!isValidElement(icon)) return null
  const props = icon.props as { src?: string }
  if (icon.type === 'img') return props.src ?? null
  const svg = elementToSvg(
    cloneElement(icon as ReactElement<{ color?: string; size?: number }>, {
      color,
      size: 128,
    })
  )
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg)
}
