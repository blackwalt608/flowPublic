import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import { useFlowStore } from "@/store/store";

export default function PartShowCase({ name }: { name: string }) {
  const { nodes } = useGLTF("/models/stage.glb");
  const cameraPos = useFlowStore((s) => s.cameraPos);
  const isActive = cameraPos === name;

  // Copying original and creating 2 different object
  const { original, ghost } = useMemo(() => {
    const target = nodes[name];
    if (!target) return { original: null, ghost: null };

    const originalCopy = target.clone();
    originalCopy.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const oldMat = child.material as THREE.MeshStandardMaterial;

        child.material = new THREE.MeshStandardMaterial({
          map: oldMat.map,
          color: oldMat.color.clone().multiplyScalar(0.1),

          side: THREE.DoubleSide,
        });

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    const ghostCopy = target.clone();
    ghostCopy.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial({
          color: "#444444",
          transparent: true,
          opacity: 0.3,
          depthWrite: false,
        });
      }
    });

    return { original: originalCopy, ghost: ghostCopy };
  }, [nodes, name]);

  if (!original || !ghost) return null;

  return (
    <group>
      <primitive object={original} visible={isActive} />
      <primitive object={ghost} visible={!isActive} />
    </group>
  );
}
