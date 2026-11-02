import React, { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { experienceGroups } from '../../services/dataService'
import { currentEmployer } from './featured'
import { Interactive, RBox } from './parts'

// ponytail: one employer today; add an entry when the "Present" job changes.
const LOGOS: Record<string, string> = {
  'ICESI University': '/img/logos/icesi.svg',
}

const W = 512
const H = 256
const SIZE: [number, number] = [2.3, 1.15]

function signTexture(place: string, logo?: string) {
  const cv = document.createElement('canvas')
  cv.width = W
  cv.height = H
  const ctx = cv.getContext('2d')!
  const tex = new THREE.CanvasTexture(cv)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  const paint = (img?: HTMLImageElement) => {
    ctx.fillStyle = '#f3f0fa'
    ctx.fillRect(0, 0, W, H)
    ctx.fillStyle = '#5354ED'
    ctx.font = '700 18px monospace'
    ctx.textBaseline = 'top'
    ctx.fillText('NOW BUILDING AT', 36, 28)
    if (img) {
      const h = 140
      const w = (img.width / img.height) * h
      ctx.drawImage(img, 36, 70, Math.min(w, W - 72), h)
    } else {
      ctx.font = '900 64px sans-serif'
      ctx.fillText(place, 36, 100)
    }
    tex.needsUpdate = true
  }
  paint()
  if (logo) {
    const img = new Image()
    img.onload = () => paint(img)
    img.src = logo
  }
  return tex
}

export const EmployerBadge: React.FC<{
  position: [number, number, number]
  frame: THREE.Material
  onHover: (label: string | null) => void
  onSelect: (sectionId: string) => void
}> = ({ position, frame, onHover, onSelect }) => {
  const place = currentEmployer(experienceGroups)
  const mat = useMemo(
    () =>
      place
        ? new THREE.MeshStandardMaterial({
            map: signTexture(place, LOGOS[place]),
            roughness: 0.7,
          })
        : null,
    [place]
  )
  useEffect(() => () => mat?.dispose(), [mat])
  if (!place || !mat) return null

  const idx = experienceGroups.findIndex((g) => g.place === place)
  return (
    // Hung on the left wall, facing into the room (+x).
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      <Interactive
        label={`Now at ${place} ↗`}
        onHover={onHover}
        onClick={() => onSelect(`exp-${idx}`)}
        lift={0.06}
      >
        <group position={[0, 0, 0.06]} rotation={[0, 0, -0.015]}>
          <RBox
            size={[SIZE[0] + 0.12, SIZE[1] + 0.12, 0.06]}
            radius={0.02}
            material={frame}
          />
          <mesh position={[0, 0, 0.035]} material={mat}>
            <planeGeometry args={SIZE} />
          </mesh>
        </group>
      </Interactive>
    </group>
  )
}
