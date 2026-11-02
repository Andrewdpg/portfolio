import React, { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { useCrt, type Crt } from './useCrt'
import { Avatar } from './Avatar'
import { RBox, Interactive } from './parts'
import { SkillShelf } from './SkillShelf'

export type Action = 'projects' | 'skills' | 'music' | 'contact' | 'about'

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

/* ---------------------------------- room ---------------------------------- */

// Where the informative props live; camera tour stops aim at these too.
export const LAYOUT = {
  posterWall: [3.7, 2.9, -4.4] as [number, number, number],
  shelf: [6.5, -2.75, 0.3] as [number, number, number],
  brand: [-6.6, 1.3, -1.2] as [number, number, number],
}

// Room is far wider than any viewport so ultra-wide screens see more room, never an edge.
const ROOM = { minX: -6.6, maxX: 30, backZ: -4.4, maxZ: 14, floorY: -2.75 }

function Room({ m }: { m: Mats }) {
  const w = ROOM.maxX - ROOM.minX
  const d = ROOM.maxZ - ROOM.backZ
  const cx = (ROOM.maxX + ROOM.minX) / 2
  const cz = (ROOM.maxZ + ROOM.backZ) / 2
  return (
    <>
      <mesh position={[cx, 4.25, ROOM.backZ]} material={m.wall} receiveShadow>
        <planeGeometry args={[w, 14]} />
      </mesh>
      <mesh
        position={[ROOM.minX, 4.25, cz]}
        rotation={[0, Math.PI / 2, 0]}
        material={m.wall2}
        receiveShadow
      >
        <planeGeometry args={[d, 14]} />
      </mesh>
      <mesh
        position={[cx, ROOM.floorY, cz]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={m.floor}
        receiveShadow
      >
        <planeGeometry args={[w, d]} />
      </mesh>
      {/* baseboards */}
      <mesh
        position={[cx, ROOM.floorY + 0.12, ROOM.backZ + 0.03]}
        material={m.deskLeg}
      >
        <boxGeometry args={[w, 0.24, 0.06]} />
      </mesh>
      <mesh
        position={[ROOM.minX + 0.03, ROOM.floorY + 0.12, cz]}
        material={m.deskLeg}
      >
        <boxGeometry args={[0.06, 0.24, d]} />
      </mesh>
      <mesh
        position={[0.2, -2.73, 0.6]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1, 0.72, 1]}
        material={m.rug}
        receiveShadow
      >
        <circleGeometry args={[5.2, 48]} />
      </mesh>
    </>
  )
}

// Filler for wide screens: a low bookcase against the back wall, right of the posters.
function Bookcase({ m }: { m: Mats }) {
  const spines = useMemo(() => {
    const mats = [m.book1, m.book2, m.book3, m.book1, m.book2]
    const out: { x: number; y: number; h: number; mat: THREE.Material }[] = []
    for (let shelf = 0; shelf < 3; shelf++)
      for (let i = 0; i < 9; i++) {
        if ((i + shelf * 2) % 7 === 6) continue
        out.push({
          x: -1.15 + i * 0.27,
          y: -2.15 + shelf * 1.05,
          h: 0.6 + ((i * 7 + shelf) % 4) * 0.08,
          mat: mats[(i + shelf) % 5],
        })
      }
    return out
  }, [m])
  return (
    <group position={[9.6, 0, -3.95]}>
      <RBox
        size={[2.8, 3.4, 0.8]}
        radius={0.04}
        material={m.deskLeg}
        position={[0, -1.05, 0]}
      />
      {[0, 1, 2].map((i) => (
        <RBox
          key={i}
          size={[2.6, 0.06, 0.7]}
          radius={0.01}
          material={m.deskTop}
          position={[0, -2.5 + i * 1.05, 0.06]}
        />
      ))}
      {spines.map((b, i) => (
        <RBox
          key={i}
          size={[0.22, b.h, 0.55]}
          radius={0.02}
          material={b.mat}
          position={[b.x, b.y + b.h / 2 - 0.28, 0.08]}
        />
      ))}
    </group>
  )
}

/* ---------------------------------- desk ---------------------------------- */

function Desk({ m }: { m: Mats }) {
  return (
    <>
      <RBox
        size={[8.4, 0.3, 4.0]}
        radius={0.05}
        material={m.deskTop}
        position={[0, -0.15, 0.35]}
      />
      {[
        [-3.6, -1.35],
        [3.6, -1.35],
        [-3.6, 1.85],
        [3.6, 1.85],
      ].map(([x, z], i) => (
        <RBox
          key={i}
          size={[0.18, 2.4, 0.18]}
          radius={0.02}
          material={m.deskLeg}
          position={[x, -1.5, z]}
        />
      ))}
      <RBox
        size={[7.8, 0.26, 0.14]}
        radius={0.02}
        material={m.deskLeg}
        position={[0, -0.45, -1.5]}
      />
    </>
  )
}

/* --------------------------------- monitor -------------------------------- */

function Monitor({
  m,
  crt,
  onHover,
}: {
  m: Mats
  crt: Crt
  onHover: (l: string | null) => void
}) {
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
      <RBox
        size={[1.4, 0.08, 0.84]}
        radius={0.05}
        material={m.bezel}
        position={[0, 0.04, 0.1]}
      />
      <RBox
        size={[0.22, 0.78, 0.18]}
        radius={0.03}
        material={m.metal}
        position={[0, 0.45, 0]}
      />
      <group position={[0, 1.86, 0]} rotation={[-0.05, 0, 0]}>
        <RBox size={[3.5, 2.24, 0.22]} radius={0.07} material={m.body} />
        <RBox
          size={[3.27, 2.0, 0.05]}
          radius={0.04}
          material={m.dark}
          position={[0, 0, 0.13]}
        />
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

function Dial({
  m,
  crt,
  onHover,
}: {
  m: Mats
  crt: Crt
  onHover: (l: string | null) => void
}) {
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
  const keyGeo = useMemo(
    () => new RoundedBoxGeometry(0.18, 0.05, 0.15, 2, 0.015),
    []
  )
  const keys = useMemo(() => {
    const out: [number, number, number][] = []
    for (let r = 0; r < 4; r++)
      for (let c = 0; c < 12; c++)
        out.push([-1.23 + c * 0.224, 0.13, -0.3 + r * 0.2])
    return out
  }, [])

  return (
    <group position={[-1.4, 0.02, 1.15]} rotation={[0, 0.1, 0]}>
      <RBox
        size={[2.9, 0.12, 0.95]}
        radius={0.05}
        material={m.plastic}
        position={[0, 0.06, 0]}
      />
      {keys.map((p, i) => (
        <mesh
          key={i}
          geometry={keyGeo}
          material={m.dark}
          position={p}
          castShadow
        />
      ))}
    </group>
  )
}

function Mouse({ m }: { m: Mats }) {
  return (
    <group position={[0.45, 0.02, 1.35]} rotation={[0, -0.2, 0]}>
      <RBox
        size={[0.38, 0.14, 0.58]}
        radius={0.11}
        material={m.plastic}
        position={[0, 0.07, 0]}
      />
      <RBox
        size={[0.016, 0.02, 0.24]}
        radius={0.008}
        material={m.purple}
        position={[0, 0.14, -0.05]}
      />
    </group>
  )
}

function Headphones({ m }: { m: Mats }) {
  return (
    <group position={[2.95, 0.02, 0.6]} rotation={[0, 0.35, 0]}>
      <mesh
        position={[0, 0.1, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={m.plastic}
        castShadow
      >
        <torusGeometry args={[0.5, 0.085, 14, 32, Math.PI]} />
      </mesh>
      <mesh
        position={[0, 0.16, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={m.purple}
      >
        <torusGeometry args={[0.5, 0.028, 10, 32, Math.PI]} />
      </mesh>
      {[-1, 1].map((s) => (
        <group key={s}>
          <mesh
            position={[0.5 * s, 0.1, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={m.plastic}
            castShadow
          >
            <cylinderGeometry args={[0.24, 0.24, 0.16, 22]} />
          </mesh>
          <mesh
            position={[0.5 * s, 0.1, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={m.purple}
          >
            <cylinderGeometry args={[0.17, 0.17, 0.18, 22]} />
          </mesh>
        </group>
      ))}
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
    const out: {
      p: [number, number, number]
      s: [number, number, number]
      r: [number, number, number]
    }[] = []
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
        <mesh
          key={i}
          position={l.p}
          scale={l.s}
          rotation={l.r}
          material={m.leaf}
          castShadow
        >
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
      <mesh
        position={[0.42, 1.65, 0]}
        rotation={[0, 0, Math.PI / 2]}
        material={m.metal}
        castShadow
      >
        <cylinderGeometry args={[0.045, 0.045, 0.9, 12]} />
      </mesh>
      <mesh position={[0.85, 1.52, 0]} material={m.shade} castShadow>
        <cylinderGeometry args={[0.15, 0.44, 0.38, 24, 1, true]} />
      </mesh>
      <mesh position={[0.85, 1.42, 0]} material={m.bulb}>
        <sphereGeometry args={[0.1, 12, 10]} />
      </mesh>
      <pointLight
        position={[0.85, 1.35, 0]}
        color="#ffb877"
        intensity={9}
        distance={8}
        decay={2}
      />
    </group>
  )
}

/* -------------------------------- interaction ------------------------------ */

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
      <ambientLight color="#5a4d70" intensity={1.0} />
      {/* soft wash over the poster wall so the informative props read first */}
      <pointLight
        position={[LAYOUT.posterWall[0], 5.6, -1.6]}
        color="#e6d9f7"
        intensity={14}
        distance={11}
        decay={1.6}
      />
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
      <directionalLight
        color="#9B76D3"
        intensity={1.2}
        position={[-9, 4, -6]}
      />

      <Room m={m} />
      <Bookcase m={m} />
      <SkillShelf
        position={LAYOUT.shelf}
        onHover={onHover}
        onSelect={() => onAction('skills')}
      />
      <Desk m={m} />
      <Lamp m={m} />
      <Keyboard m={m} />
      <Mouse m={m} />
      <Books m={m} />
      <Plant m={m} />
      <Avatar m={m} onHover={onHover} onClick={() => onAction('about')} />

      <Monitor m={m} crt={crt} onHover={onHover} />
      <Dial m={m} crt={crt} onHover={onHover} />
      <Interactive
        label="AURORA on repeat ↗"
        onHover={onHover}
        onClick={() => onAction('music')}
      >
        <Headphones m={m} />
      </Interactive>
    </>
  )
}

export default function DeskScene({
  paused,
  onHover,
  onAction,
}: DeskSceneProps) {
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
