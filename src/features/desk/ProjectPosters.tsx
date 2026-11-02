import React, { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { projects } from '../../services/dataService'
import { pickFeatured } from './featured'
import { Interactive, RBox } from './parts'

const W = 340
const H = 460
const POSTER: [number, number] = [1.7, 2.3]
const SPACING = 2.15

function fitLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  max: number,
  lines: number
) {
  const words = text.split(' ')
  const out: string[] = []
  let cur = ''
  for (const w of words) {
    const next = cur ? `${cur} ${w}` : w
    if (ctx.measureText(next).width > max && cur) {
      out.push(cur)
      cur = w
    } else cur = next
  }
  out.push(cur)
  if (out.length > lines) {
    out.length = lines
    out[lines - 1] = out[lines - 1].replace(/\s*\S*$/, '…')
  }
  return out
}

function posterTexture(
  title: string,
  subtitle: string,
  year: number,
  image?: string
) {
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const ctx = cv.getContext('2d')!
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4

  const paint = (img?: HTMLImageElement) => {
    ctx.fillStyle = '#0d0a12'
    ctx.fillRect(0, 0, W, H)
    const ih = Math.round(H * 0.6)
    if (img) {
      // cover-crop into the top area
      const s = Math.max(W / img.width, ih / img.height)
      const sw = W / s
      const sh = ih / s
      ctx.drawImage(img, (img.width - sw) / 2, 0, sw, sh, 0, 0, W, ih)
    } else {
      ctx.fillStyle = '#1d1629'
      ctx.fillRect(0, 0, W, ih)
    }
    ctx.fillStyle = '#9B76D3'
    ctx.fillRect(22, ih + 22, 46, 5)
    ctx.textBaseline = 'top'
    ctx.fillStyle = '#e6d9f7'
    ctx.font =
      '900 34px "Big Shoulders Display", "Plus Jakarta Sans", sans-serif'
    fitLines(ctx, title.toUpperCase(), W - 44, 1).forEach((l, i) =>
      ctx.fillText(l, 22, ih + 40 + i * 36)
    )
    ctx.fillStyle = 'rgba(230,217,247,0.62)'
    ctx.font = '400 17px "Plus Jakarta Sans", sans-serif'
    fitLines(ctx, subtitle, W - 44, 3).forEach((l, i) =>
      ctx.fillText(l, 22, ih + 86 + i * 23)
    )
    ctx.fillStyle = '#9B76D3'
    ctx.font = '700 13px monospace'
    ctx.fillText(String(year), 22, H - 30)
    tex.needsUpdate = true
  }
  paint()
  if (image) {
    const img = new Image()
    img.onload = () => paint(img)
    img.src = image
  }
  return tex
}

export const ProjectPosters: React.FC<{
  position: [number, number, number]
  frame: THREE.Material
  onHover: (label: string | null) => void
  onSelect: () => void
}> = ({ position, frame, onHover, onSelect }) => {
  const posters = useMemo(
    () =>
      pickFeatured(projects, 3).map((p, i, all) => ({
        title: p.title,
        x: (i - (all.length - 1) / 2) * SPACING,
        tilt: [0.018, -0.012, 0.022][i % 3], // hung by hand, not by grid
        mat: new THREE.MeshStandardMaterial({
          map: posterTexture(p.title, p.subtitle, p.year, p.images[0]),
          roughness: 0.85,
        }),
      })),
    []
  )
  useEffect(() => () => posters.forEach((p) => p.mat.dispose()), [posters])

  return (
    <group position={position}>
      {posters.map((p) => (
        <Interactive
          key={p.title}
          label={`${p.title} ↗`}
          onHover={onHover}
          onClick={onSelect}
          lift={0.08}
        >
          <group position={[p.x, 0, 0.06]} rotation={[0, 0, p.tilt]}>
            <RBox
              size={[POSTER[0] + 0.14, POSTER[1] + 0.14, 0.06]}
              radius={0.02}
              material={frame}
            />
            <mesh position={[0, 0, 0.035]} material={p.mat}>
              <planeGeometry args={POSTER} />
            </mesh>
          </group>
        </Interactive>
      ))}
    </group>
  )
}
