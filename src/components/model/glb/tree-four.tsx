/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.16 -t -T -o src/components/model/model.tsx public/objects/tree/4/scene.gltf 
Files: public/objects/tree/4/scene.gltf [4.71KB] > /home/marceloek/github.com/marceloek/CG-2019.2N-T1/src/components/model/scene-transformed.glb [18.66KB] (-296%)
Author: BitGem (https://sketchfab.com/bitgem)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/pine-tree-proto-series-free-08014e92a59244c992884091218230b8
Title: Pine Tree - Proto Series - Free
*/

import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    tree_pine_SC_04_pine_tree_red_mat_0: THREE.Mesh
  }
  materials: {
    pine_tree_red_mat: THREE.MeshStandardMaterial
  }
  // animations: GLTFAction[]
}

// type ContextType = Record<
//   string,
//   React.ForwardRefExoticComponent<JSX.IntrinsicElements['mesh']>
// >

export function TreeFour(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/glb/tree-four.glb') as GLTFResult

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.tree_pine_SC_04_pine_tree_red_mat_0.geometry}
        material={materials.pine_tree_red_mat}
      />
    </group>
  )
}

useGLTF.preload('/glb/tree-four.glb')