import React, { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { skills } from '../../services/dataService'
import { pickFeatured } from './featured'
import { iconSource } from './iconSource'
import { Interactive } from './parts'

const FACE = '#a59ab6' // muted lavender card: icons stay legible without out-glowing the room
const SIDE = '#3a2d4f'
const SIZE = 0.72
const GAP = 0.05
const ROWS = [4, 3, 3, 2] // bottom → top; pyramid of up to 12

function iconTexture(src: string | null, accent: string) {
  const cv = document.createElement('canvas')
  cv.width = cv.height = 256
  const ctx = cv.getContext('2d')!
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  const paint = (img?: HTMLImageElement) => {
    ctx.fillStyle = FACE
    ctx.fillRect(0, 0, 256, 256)
    ctx.strokeStyle = accent
    ctx.globalAlpha = 0.3
    ctx.lineWidth = 6
    ctx.strokeRect(14, 14, 228, 228)
    ctx.globalAlpha = 1
    if (img) ctx.drawImage(img, 48, 48, 160, 160)
    tex.needsUpdate = true
  }
  paint()
  if (src) {
    const img = new Image()
    img.onload = () => paint(img)
    img.src = src
  }
  return tex
}

export const SkillShelf: React.FC<{
  position: [number, number, number]
  onHover: (label: string | null) => void
  onSelect: () => void
}> = ({ position, onHover, onSelect }) => {
  const geo = useMemo(
    () => new RoundedBoxGeometry(SIZE, SIZE, SIZE, 3, 0.06),
    []
  )
  const side = useMemo(
    () => new THREE.MeshStandardMaterial({ color: SIDE, roughness: 0.6 }),
    []
  )

  const cubes = useMemo(() => {
    const picked = pickFeatured(skills, 12)
    const out: {
      title: string
      pos: [number, number, number]
      rotY: number
      mats: THREE.Material[]
    }[] = []
    let k = 0
    ROWS.forEach((count, row) => {
      for (let i = 0; i < count && k < picked.length; i++, k++) {
        const s = picked[k]
        const face = new THREE.MeshStandardMaterial({
          map: iconTexture(iconSource(s.icon, s.color), s.color),
          roughness: 0.78,
        })
        const step = SIZE + GAP
        out.push({
          title: s.title,
          pos: [
            (i - (count - 1) / 2) * step,
            SIZE / 2 + row * SIZE,
            (k % 3) * 0.04,
          ],
          rotY: (((k * 37) % 9) - 4) * 0.025, // tiny hand-stacked jitter
          // box face order: +x, -x, +y, -y, +z, -z → icon on front and top
          mats: [side, side, face, side, face, side],
        })
      }
    })
    return out
  }, [side])

  useEffect(
    () => () => {
      geo.dispose()
      cubes.forEach((c) => c.mats.forEach((m) => m !== side && m.dispose()))
    },
    [geo, cubes, side]
  )

  return (
    // Turned toward the camera so the icon faces read straight on.
    <group position={position} rotation={[0, 0.55, 0]}>
      {cubes.map((c) => (
        <Interactive
          key={c.title}
          label={c.title}
          onHover={onHover}
          onClick={onSelect}
          lift={0.12}
        >
          <mesh
            geometry={geo}
            material={c.mats}
            position={c.pos}
            rotation={[0, c.rotY, 0]}
            castShadow
            receiveShadow
          />
        </Interactive>
      ))}
    </group>
  )
}
