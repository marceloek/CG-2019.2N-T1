import { MeshProps, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'

import { baseRepo } from '../../utils'

export function Sun(props: MeshProps) {
  const colorMap = useLoader(
    TextureLoader,
    `${baseRepo}/textures/sun/angry-emoji.svg`,
  )

  return (
    <mesh {...props}>
      <sphereGeometry args={[1, 80, 80]} />

      <meshPhongMaterial map={colorMap} />
    </mesh>
  )
}
