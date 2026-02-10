import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export default function Stage() {
  const { nodes } = useGLTF("/models/stage.glb");

  const ghostScene = useMemo(() => {
    const sceneCopy = nodes.stage.clone();

    sceneCopy.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: "#444444",
          transparent: true,
          opacity: 0.3,
          depthWrite: false,
        });
      }
    });

    return sceneCopy;
  }, [nodes.stage]);

  return <primitive object={ghostScene} />;
}
