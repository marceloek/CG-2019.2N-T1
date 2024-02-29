/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 -t -T -o src/components/model/model.tsx public/objects/tree/1/scene.gltf 
Files: public/objects/tree/1/scene.gltf [4.39KB] > /home/marceloek/github.com/marceloek/CG-2019.2N-T1/src/components/model/scene-transformed.glb [292.45KB] (-6562%)
Author: Raid (https://sketchfab.com/raid)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/models/b5041d5648984ac2b833e2bde96fae85
Title: Tree
*/

import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    mesh_0: THREE.Mesh
  }
  materials: {
    tree: THREE.MeshStandardMaterial
  }
  // animations: GLTFAction[]
}

// type ContextType = Record<
//   string,
//   React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>
// >

export function TreeOne(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/glb/tree-one.glb') as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.mesh_0.geometry}
        material={materials.tree}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/glb/tree-one.glb')