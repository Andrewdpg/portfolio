import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'

type AvatarMats = {
  skin: THREE.Material
  hair: THREE.Material
  hoodie: THREE.Material
  glass: THREE.Material
  frame: THREE.Material
  cord: THREE.Material
  pocket: THREE.Material
}

function Limb({
  a,
  b,
  r,
  material,
}: {
  a: [number, number, number]
  b: [number, number, number]
  r: number
  material: THREE.Material
}) {
  const { pos, quat, len } = useMemo(() => {
    const A = new THREE.Vector3(...a)
    const B = new THREE.Vector3(...b)
    const dir = new THREE.Vector3().subVectors(B, A)
    const length = dir.length()
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      dir.clone().normalize()
    )
    return { pos: A.clone().add(B).multiplyScalar(0.5), quat: q, len: length }
  }, [a, b])

  return (
    <mesh position={pos} quaternion={quat} material={material} castShadow>
      <capsuleGeometry args={[r, len, 4, 10]} />
    </mesh>
  )
}

const CURLS: [number, number, number][] = [
  [0, 0.54, 0],
  [-0.22, 0.5, 0.02],
  [0.22, 0.5, 0.02],
  [-0.32, 0.36, -0.04],
  [0.32, 0.36, -0.04],
  [-0.18, 0.58, -0.18],
  [0.18, 0.58, -0.18],
  [0, 0.44, -0.3],
  [-0.3, 0.22, -0.2],
  [0.3, 0.22, -0.2],
  [0, 0.58, 0.06],
]

export const Avatar: React.FC<{
  m: AvatarMats
  onHover: (label: string | null) => void
  onClick: () => void
}> = ({ m, onHover, onClick }) => {
  const head = useRef<THREE.Group>(null)
  const torso = useRef<THREE.Group>(null)

  const headGeo = useMemo(() => new THREE.SphereGeometry(0.42, 24, 20), [])
  const curlGeo = useMemo(() => new THREE.SphereGeometry(0.15, 12, 10), [])
  const earGeo = useMemo(() => new THREE.SphereGeometry(0.08, 10, 8), [])
  const handGeo = useMemo(() => new THREE.SphereGeometry(0.12, 14, 10), [])
  const torsoGeo = useMemo(() => new RoundedBoxGeometry(1.2, 1.2, 0.72, 4, 0.24), [])
  const shoulderGeo = useMemo(() => new THREE.SphereGeometry(0.26, 16, 12), [])
  const lensGeo = useMemo(() => new RoundedBoxGeometry(0.19, 0.14, 0.05, 2, 0.022), [])
  const frameGeo = useMemo(() => new RoundedBoxGeometry(0.24, 0.185, 0.045, 2, 0.03), [])

  useFrame(({ clock, pointer }) => {
    const t = clock.elapsedTime
    if (head.current) {
      head.current.rotation.y = pointer.x * 0.16 + Math.sin(t * 0.6) * 0.03
      head.current.rotation.x = -pointer.y * 0.07
    }
    if (torso.current) {
      torso.current.position.y = Math.sin(t * 1.5) * 0.012
    }
  })

  return (
    <group
      position={[1.35, 0.02, -1.6]}
      rotation={[0, -0.12, 0]}
      onPointerOver={(e) => {
        e.stopPropagation()
        onHover('Off the clock')
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        onHover(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      <group ref={torso}>
        <mesh geometry={torsoGeo} material={m.hoodie} position={[0, 0.72, 0]} castShadow receiveShadow />
        {[-1, 1].map((s) => (
          <mesh key={s} geometry={shoulderGeo} material={m.hoodie} position={[0.5 * s, 1.2, 0]} castShadow />
        ))}

        <mesh position={[0, 1.32, 0.02]} rotation={[Math.PI / 2, 0, 0]} material={m.hoodie} castShadow>
          <torusGeometry args={[0.26, 0.07, 10, 22]} />
        </mesh>
        <mesh position={[0, 1.34, -0.18]} rotation={[-0.5, 0, 0]} material={m.hoodie} castShadow>
          <torusGeometry args={[0.3, 0.12, 10, 20, Math.PI]} />
        </mesh>

        <mesh position={[0, 1.42, 0]} material={m.skin} castShadow>
          <cylinderGeometry args={[0.15, 0.17, 0.3, 16]} />
        </mesh>

        {[-1, 1].map((s) => (
          <mesh key={s} position={[0.12 * s, 1.02, 0.37]} material={m.cord}>
            <cylinderGeometry args={[0.012, 0.012, 0.34, 6]} />
          </mesh>
        ))}
        <mesh position={[0, 0.52, 0.37]} material={m.pocket}>
          <boxGeometry args={[0.5, 0.03, 0.02]} />
        </mesh>

        <Limb a={[-0.56, 1.18, 0.02]} b={[-0.62, 0.12, 0.5]} r={0.15} material={m.hoodie} />
        <Limb a={[0.56, 1.18, 0.02]} b={[0.66, 0.12, 0.42]} r={0.15} material={m.hoodie} />
        {[
          [-0.64, 0.56],
          [0.68, 0.48],
        ].map(([x, z], i) => (
          <mesh key={i} geometry={handGeo} material={m.skin} position={[x, 0.08, z]} castShadow />
        ))}
      </group>

      <group ref={head} position={[0, 1.62, 0.02]}>
        <mesh geometry={headGeo} material={m.skin} position={[0, 0.16, 0]} scale={[0.94, 1.04, 0.95]} castShadow />
        {[-1, 1].map((s) => (
          <mesh key={s} geometry={earGeo} material={m.skin} position={[0.38 * s, 0.14, 0]} />
        ))}
        {CURLS.map((p, i) => (
          <mesh key={i} geometry={curlGeo} material={m.hair} position={p} castShadow />
        ))}

        {[-1, 1].map((s) => (
          <group key={s} position={[0.19 * s, 0.24, 0.365]} rotation={[0, 0.1 * s, 0]}>
            <mesh geometry={frameGeo} material={m.frame} />
            <mesh geometry={lensGeo} material={m.glass} position={[0, 0, 0.007]} />
          </group>
        ))}
        <mesh position={[0, 0.25, 0.39]} material={m.frame}>
          <boxGeometry args={[0.09, 0.03, 0.035]} />
        </mesh>
        {[-1, 1].map((s) => (
          <mesh key={s} position={[0.31 * s, 0.25, 0.24]} rotation={[0, 0.22 * s, 0]} material={m.frame}>
            <boxGeometry args={[0.035, 0.028, 0.26]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}
