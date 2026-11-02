import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { useCrt, type Crt } from './useCrt'
import { Avatar } from './Avatar'

type Action = 'projects' | 'music' | 'contact' | 'about'

type DeskSceneProps = {
  paused: boolean
  onHover: (label: string | null) => void
  onAction: (action: Action) => void
}

const C = {
  deskTop: '#201829',
  deskLeg: '#15101f',
  body: '#120e18',
  bezel: '#1d1629',
  plastic: '#2c2239',
  dark: '#0c0812',
  purple: '#9B76D3',
  light: '#e6d9f7',
  book1: '#332748',
  book2: '#5c4188',
  book3: '#a98fd0',
  pot: '#33254a',
  leaf: '#3f6350',
  metal: '#241d31',
  shade: '#43305f',
  wall: '#1a1422',
  wall2: '#151019',
  floor: '#0f0d12',
  rug: '#251c33',
}

function useMaterials() {
  return useMemo(() => {
    const mat = (color: string, roughness = 0.75, metalness = 0.05) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness })

    return {
      deskTop: mat(C.deskTop, 0.68),
      deskLeg: mat(C.deskLeg, 0.85),
      body: mat(C.body, 0.5, 0.12),
      bezel: mat(C.bezel, 0.55, 0.15),
      plastic: mat(C.plastic, 0.6, 0.08),
      dark: mat(C.dark, 0.72),
      purple: mat(C.purple, 0.42, 0.15),
      light: mat(C.light, 0.62),
      book1: mat(C.book1, 0.85),
      book2: mat(C.book2, 0.8),
      book3: mat(C.book3, 0.8),
      pot: mat(C.pot, 0.85),
      leaf: mat(C.leaf, 0.85),
      metal: mat(C.metal, 0.38, 0.65),
      shade: new THREE.MeshStandardMaterial({
        color: C.shade,
        roughness: 0.62,
        metalness: 0.18,
        side: THREE.DoubleSide,
      }),
      wall: mat(C.wall, 0.95),
      wall2: mat(C.wall2, 0.95),
      floor: mat(C.floor, 1),
      rug: mat(C.rug, 1),
      bulb: new THREE.MeshStandardMaterial({
        color: '#ffd9a8',
        emissive: '#ffb877',
        emissiveIntensity: 2.6,
      }),
      coffee: mat('#33210f', 0.4),
      skin: mat('#9c6b4e', 0.72),
      hair: mat('#15100e', 0.9),
      hoodie: mat('#1a1524', 0.95),
      glass: mat('#0a0810', 0.3, 0.2),
      frame: mat('#7a6a92', 0.45, 0.3),
      cord: mat('#9B76D3', 0.7),
      pocket: mat('#241d30', 0.9),
    }
  }, [])
}

type Mats = ReturnType<typeof useMaterials>

function useRounded(w: number, h: number, d: number, r = 0.04) {
  return useMemo(() => new RoundedBoxGeometry(w, h, d, 3, r), [w, h, d, r])
}

const RBox: React.FC<{
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

/* ---------------------------------- room ---------------------------------- */

function Room({ m }: { m: Mats }) {
  return (
    <>
      <mesh position={[0, 2.6, -4.4]} material={m.wall} receiveShadow>
        <planeGeometry args={[22, 12]} />
      </mesh>
      <mesh position={[-6.6, 2.6, -4.4]} rotation={[0, Math.PI / 2, 0]} material={m.wall2} receiveShadow>
        <planeGeometry args={[12, 12]} />
      </mesh>
      <mesh position={[0, -2.75, -1]} rotation={[-Math.PI / 2, 0, 0]} material={m.floor} receiveShadow>
        <planeGeometry args={[24, 18]} />
      </mesh>
      <mesh position={[0.2, -2.73, 0.6]} rotation={[-Math.PI / 2, 0, 0]} scale={[1, 0.72, 1]} material={m.rug} receiveShadow>
        <circleGeometry args={[5.2, 48]} />
      </mesh>
    </>
  )
}

function Poster({ m }: { m: Mats }) {
  const tex = useMemo(() => {
    const cv = document.createElement('canvas')
    cv.width = 300
    cv.height = 400
    const ctx = cv.getContext('2d')
    if (!ctx) return null
    ctx.fillStyle = '#0d0a12'
    ctx.fillRect(0, 0, 300, 400)
    ctx.strokeStyle = '#9B76D3'
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.arc(150, 170, 62, 0, Math.PI * 2)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(150, 170, 28, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = '#9B76D3'
    ctx.fillRect(60, 300, 180, 4)
    ctx.fillStyle = '#5b4780'
    ctx.fillRect(60, 320, 120, 4)
    const t = new THREE.CanvasTexture(cv)
    t.colorSpace = THREE.SRGBColorSpace
    return t
  }, [])

  const posterMat = useMemo(
    () => new THREE.MeshStandardMaterial({ map: tex, roughness: 0.9 }),
    [tex]
  )

  return (
    <>
      <RBox size={[0.12, 3.0, 2.3]} radius={0.02} material={m.metal} position={[-6.5, 2.5, -1.0]} />
      <mesh position={[-6.43, 2.5, -1.0]} rotation={[0, Math.PI / 2, 0]} material={posterMat}>
        <planeGeometry args={[2.05, 2.72]} />
      </mesh>
    </>
  )
}

/* ---------------------------------- desk ---------------------------------- */

function Desk({ m }: { m: Mats }) {
  return (
    <>
      <RBox size={[8.4, 0.3, 4.0]} radius={0.05} material={m.deskTop} position={[0, -0.15, 0.35]} />
      {[
        [-3.6, -1.35],
        [3.6, -1.35],
        [-3.6, 1.85],
        [3.6, 1.85],
      ].map(([x, z], i) => (
        <RBox key={i} size={[0.18, 2.4, 0.18]} radius={0.02} material={m.deskLeg} position={[x, -1.5, z]} />
      ))}
      <RBox size={[7.8, 0.26, 0.14]} radius={0.02} material={m.deskLeg} position={[0, -0.45, -1.5]} />
    </>
  )
}

/* --------------------------------- monitor -------------------------------- */

function Monitor({ m, crt, onHover }: { m: Mats; crt: Crt; onHover: (l: string | null) => void }) {
  const screenMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#060409',
        emissive: '#ffffff',
        emissiveIntensity: 1.3,
        emissiveMap: crt.texture,
        map: crt.texture,
        roughness: 0.35,
      }),
    [crt.texture]
  )

  return (
    <group position={[-1.7, 0.02, -0.75]} rotation={[0, 0.28, 0]}>
      <RBox size={[1.4, 0.08, 0.84]} radius={0.05} material={m.bezel} position={[0, 0.04, 0.1]} />
      <RBox size={[0.22, 0.78, 0.18]} radius={0.03} material={m.metal} position={[0, 0.45, 0]} />
      <group position={[0, 1.86, 0]} rotation={[-0.05, 0, 0]}>
        <RBox size={[3.5, 2.24, 0.22]} radius={0.07} material={m.body} />
        <RBox size={[3.27, 2.0, 0.05]} radius={0.04} material={m.dark} position={[0, 0, 0.13]} />
        <mesh
          position={[0, 0, 0.17]}
          material={screenMat}
          onPointerOver={(e) => {
            e.stopPropagation()
            onHover(crt.screenLabel)
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            onHover(null)
          }}
          onClick={(e) => {
            e.stopPropagation()
            crt.screenClick()
          }}
        >
          <planeGeometry args={[3.06, 1.79]} />
        </mesh>
      </group>
    </group>
  )
}

function Dial({ m, crt, onHover }: { m: Mats; crt: Crt; onHover: (l: string | null) => void }) {
  return (
    <group position={[0.55, 0.02, -0.35]}>
      <mesh position={[0, 0.03, 0]} material={m.metal} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.06, 20]} />
      </mesh>
      <group rotation={[0, crt.channel * (Math.PI / 2), 0]}>
        <mesh
          position={[0, 0.085, 0]}
          material={m.purple}
          castShadow
          onPointerOver={(e) => {
            e.stopPropagation()
            onHover('Next channel')
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            onHover(null)
          }}
          onClick={(e) => {
            e.stopPropagation()
            crt.knobClick()
          }}
        >
          <cylinderGeometry args={[0.11, 0.11, 0.05, 20]} />
        </mesh>
        <mesh position={[0, 0.115, -0.06]} material={m.light}>
          <boxGeometry args={[0.02, 0.015, 0.05]} />
        </mesh>
      </group>
    </group>
  )
}

/* -------------------------------- peripherals ----------------------------- */

function Keyboard({ m }: { m: Mats }) {
  const keyGeo = useMemo(() => new RoundedBoxGeometry(0.18, 0.05, 0.15, 2, 0.015), [])
  const keys = useMemo(() => {
    const out: [number, number, number][] = []
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 12; c++) out.push([-1.23 + c * 0.224, 0.13, -0.3 + r * 0.2])
    return out
  }, [])

  return (
    <group position={[-1.4, 0.02, 1.15]} rotation={[0, 0.1, 0]}>
      <RBox size={[2.9, 0.12, 0.95]} radius={0.05} material={m.plastic} position={[0, 0.06, 0]} />
      {keys.map((p, i) => (
        <mesh key={i} geometry={keyGeo} material={m.dark} position={p} castShadow />
      ))}
    </group>
  )
}

function Mouse({ m }: { m: Mats }) {
  return (
    <group position={[0.45, 0.02, 1.35]} rotation={[0, -0.2, 0]}>
      <RBox size={[0.38, 0.14, 0.58]} radius={0.11} material={m.plastic} position={[0, 0.07, 0]} />
      <RBox size={[0.016, 0.02, 0.24]} radius={0.008} material={m.purple} position={[0, 0.14, -0.05]} />
    </group>
  )
}

function Mug({ m }: { m: Mats }) {
  return (
    <group position={[1.45, 0.02, 1.55]}>
      <mesh position={[0, 0.25, 0]} material={m.light} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.26, 0.48, 24]} />
      </mesh>
      <mesh position={[0.31, 0.28, 0]} rotation={[0, Math.PI / 2, 0]} material={m.light}>
        <torusGeometry args={[0.14, 0.04, 10, 22]} />
      </mesh>
      <mesh position={[0, 0.5, 0]} material={m.coffee}>
        <cylinderGeometry args={[0.27, 0.27, 0.012, 24]} />
      </mesh>
      <mesh position={[0, 0.49, 0]} rotation={[Math.PI / 2, 0, 0]} material={m.light}>
        <torusGeometry args={[0.292, 0.014, 8, 28]} />
      </mesh>
    </group>
  )
}

function Headphones({ m }: { m: Mats }) {
  return (
    <group position={[2.95, 0.02, 0.6]} rotation={[0, 0.35, 0]}>
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m.plastic} castShadow>
        <torusGeometry args={[0.5, 0.085, 14, 32, Math.PI]} />
      </mesh>
      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m.purple}>
        <torusGeometry args={[0.5, 0.028, 10, 32, Math.PI]} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh position={[0.5 * s, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} material={m.plastic} castShadow>
            <cylinderGeometry args={[0.24, 0.24, 0.16, 22]} />
          </mesh>
          <mesh position={[0.5 * s, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} material={m.purple}>
            <cylinderGeometry args={[0.17, 0.17, 0.18, 22]} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Gamepad({ m }: { m: Mats }) {
  return (
    <group position={[0.15, 0.02, 0.95]} rotation={[0, -0.5, 0]}>
      <RBox size={[0.86, 0.17, 0.4]} radius={0.13} material={m.plastic} position={[0, 0.1, 0]} />
      {[-1, 1].map((s) => (
        <RBox
          key={s}
          size={[0.26, 0.2, 0.46]}
          radius={0.11}
          material={m.plastic}
          position={[0.36 * s, 0.08, 0.14]}
          rotation={[0, -0.35 * s, 0]}
        />
      ))}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[0.14 * s, 0.2, 0]} material={m.purple}>
          <cylinderGeometry args={[0.062, 0.062, 0.08, 16]} />
        </mesh>
      ))}
      <RBox size={[0.46, 0.014, 0.09]} radius={0.007} material={m.purple} position={[0, 0.19, 0.15]} />
    </group>
  )
}

function Books({ m }: { m: Mats }) {
  const mats = [m.book1, m.book2, m.book3]
  return (
    <group position={[3.35, 0.02, -1.15]} rotation={[0, 0.3, 0]}>
      {mats.map((mat, i) => (
        <RBox
          key={i}
          size={[1.15 - i * 0.06, 0.15, 0.82 - i * 0.05]}
          radius={0.02}
          material={mat}
          position={[0, 0.08 + i * 0.16, 0]}
          rotation={[0, i * 0.09, 0]}
        />
      ))}
    </group>
  )
}

function Plant({ m }: { m: Mats }) {
  const leaves = useMemo(() => {
    const out: { p: [number, number, number]; s: [number, number, number]; r: [number, number, number] }[] = []
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2
      const rad = 0.15 + (i % 2) * 0.06
      out.push({
        p: [Math.cos(a) * rad, 0.56 + (i % 4) * 0.09, Math.sin(a) * rad],
        s: [0.8, 1.5 + (i % 3) * 0.2, 0.45],
        r: [0.2, a, 0.15],
      })
    }
    return out
  }, [])

  return (
    <group position={[3.55, 0.02, 0.05]}>
      <mesh position={[0, 0.21, 0]} material={m.pot} castShadow receiveShadow>
        <cylinderGeometry args={[0.29, 0.22, 0.4, 20]} />
      </mesh>
      {leaves.map((l, i) => (
        <mesh key={i} position={l.p} scale={l.s} rotation={l.r} material={m.leaf} castShadow>
          <sphereGeometry args={[0.19, 10, 8]} />
        </mesh>
      ))}
    </group>
  )
}

function Lamp({ m }: { m: Mats }) {
  return (
    <group position={[-4.25, 0.02, 0.05]}>
      <mesh position={[0, 0.05, 0]} material={m.metal} castShadow>
        <cylinderGeometry args={[0.3, 0.34, 0.08, 22]} />
      </mesh>
      <mesh position={[0, 0.85, 0]} material={m.metal} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.6, 12]} />
      </mesh>
      <mesh position={[0, 1.65, 0]} material={m.metal}>
        <sphereGeometry args={[0.085, 12, 10]} />
      </mesh>
      <mesh position={[0.42, 1.65, 0]} rotation={[0, 0, Math.PI / 2]} material={m.metal} castShadow>
        <cylinderGeometry args={[0.045, 0.045, 0.9, 12]} />
      </mesh>
      <mesh position={[0.85, 1.52, 0]} material={m.shade} castShadow>
        <cylinderGeometry args={[0.15, 0.44, 0.38, 24, 1, true]} />
      </mesh>
      <mesh position={[0.85, 1.42, 0]} material={m.bulb}>
        <sphereGeometry args={[0.1, 12, 10]} />
      </mesh>
      <pointLight position={[0.85, 1.35, 0]} color="#ffb877" intensity={9} distance={8} decay={2} />
    </group>
  )
}

/* -------------------------------- interaction ------------------------------ */

const Interactive: React.FC<{
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

/* --------------------------------- camera --------------------------------- */

function CameraRig({ paused }: { paused: boolean }) {
  const { camera, size, pointer } = useThree()
  const base = useRef(new THREE.Vector3(9, 6.4, 12))
  const target = useRef(new THREE.Vector3(0, 0.6, 0))

  useEffect(() => {
    const ortho = camera as THREE.OrthographicCamera
    const aspect = size.width / size.height
    const height = aspect < 1 ? 17 : 11.4
    ortho.top = height / 2
    ortho.bottom = -height / 2
    ortho.left = (-height / 2) * aspect
    ortho.right = (height / 2) * aspect
    ortho.updateProjectionMatrix()
  }, [camera, size])

  useEffect(() => {
    camera.position.copy(base.current)
    camera.lookAt(target.current)
  }, [camera])

  useFrame(() => {
    if (paused) return
    const p = pointer
    const ortho = camera as THREE.OrthographicCamera
    const aspect = size.width / size.height
    const height = aspect < 1 ? 17 : 11.4
    const dx = p.x * height * 0.018
    const dy = -p.y * height * 0.012
    ortho.position.set(base.current.x + dx, base.current.y + dy, base.current.z)
    ortho.lookAt(target.current)
  })

  return null
}

/* ---------------------------------- scene --------------------------------- */

function Scene({ paused, onHover, onAction }: DeskSceneProps) {
  const m = useMaterials()
  const crt = useCrt(paused, onAction)
  useFrame((_, delta) => crt.tick(delta))

  return (
    <>
      <CameraRig paused={paused} />
      <ambientLight color="#4d4162" intensity={0.7} />
      <directionalLight
        color="#fff2e0"
        intensity={2.4}
        position={[6, 9, 8]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.0006}
      />
      <directionalLight color="#9B76D3" intensity={1.2} position={[-9, 4, -6]} />

      <Room m={m} />
      <Poster m={m} />
      <Desk m={m} />
      <Lamp m={m} />
      <Keyboard m={m} />
      <Mouse m={m} />
      <Books m={m} />
      <Plant m={m} />
      <Avatar m={m} onHover={onHover} onClick={() => onAction('about')} />

      <Monitor m={m} crt={crt} onHover={onHover} />
      <Dial m={m} crt={crt} onHover={onHover} />
      <Interactive label="AURORA on repeat ↗" onHover={onHover} onClick={() => onAction('music')}>
        <Headphones m={m} />
      </Interactive>
      <Interactive label="Say hi" onHover={onHover} onClick={() => onAction('contact')}>
        <Mug m={m} />
      </Interactive>
      <Interactive label="The Last of Us · Assassin's Creed" onHover={onHover}>
        <Gamepad m={m} />
      </Interactive>
    </>
  )
}

export default function DeskScene({ paused, onHover, onAction }: DeskSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      frameloop={paused ? 'never' : 'always'}
      camera={{ position: [9, 6.4, 12], near: 0.1, far: 100 }}
      orthographic
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
      }}
    >
      <Scene paused={paused} onHover={onHover} onAction={onAction} />
    </Canvas>
  )
}
