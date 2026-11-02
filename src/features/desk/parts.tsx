import React, { useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

export function useRounded(w: number, h: number, d: number, r = 0.04) {
  return useMemo(() => new RoundedBoxGeometry(w, h, d, 3, r), [w, h, d, r])
}

export const RBox: React.FC<{
  size: [number, number, number]
  radius?: number
  material: THREE.Material
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: [number, number, number]
}> = ({ size, radius = 0.04, material, position, rotation, scale }) => {
  const geo = useRounded(size[0], size[1], size[2], radius)
  return (
    <mesh
      geometry={geo}
      material={material}
      position={position}
      rotation={rotation}
      scale={scale}
      castShadow
      receiveShadow
    />
  )
}

export const Interactive: React.FC<{
  label: string
  onClick?: () => void
  onHover: (label: string | null) => void
  children: React.ReactNode
  lift?: number
}> = ({ label, onClick, onHover, children, lift = 0.03 }) => {
  const ref = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(() => {
    if (!ref.current) return
    const target = hovered ? 1.025 : 1
    ref.current.scale.lerp(new THREE.Vector3(target, target, target), 0.18)
    const y = hovered ? lift : 0
    ref.current.position.y += (y - ref.current.position.y) * 0.18
  })

  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        onHover(label)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(false)
        onHover(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick?.()
      }}
    >
      {children}
    </group>
  )
}
