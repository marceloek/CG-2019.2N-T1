import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { Loader } from './components/loader'
import { Sun } from './components/model/sun'

export function App() {
  return (
    <Canvas>
      <Suspense fallback={<Loader />}>
        <fog args={[0xadc8f0, 15, 10000]} />

        <color args={[0x87ceeb]} />

        <perspectiveCamera
          args={[40, window.innerWidth / window.innerHeight, 1, 15000]}
          position={[0, 4000, 2500]}
        />

        <ambientLight args={[0xaaaaaa]} />

        <directionalLight
          args={[0xdfebff, 2.5]}
          position={[-4750, 5000, -3500]}
        />

        <Sun />

        <OrbitControls />
      </Suspense>
    </Canvas>
  )
}
