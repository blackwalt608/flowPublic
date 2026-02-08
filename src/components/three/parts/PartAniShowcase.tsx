"use client";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFlowStore } from "@/store/store";

export default function PartAniShowcase({
  name,
  aniKey,
}: {
  name: string;
  aniKey: string;
}) {
  const { animations, nodes } = useGLTF("/models/stage.glb");
  const cameraPos = useFlowStore((s) => s.cameraPos);
  const isActive = cameraPos === aniKey;
  const group = useRef<THREE.Group>(null);

  const { original, ghost } = useMemo(() => {
    const target = nodes[name];
    if (!target) return { original: null, ghost: null };

    // Her ikisini de klonla
    const originalCopy = target.clone(true);

    const ghostCopy = target.clone(true);
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
  }, [name, nodes]);

  // Animation
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (!actions) return;

    const allActions = Object.values(actions);

    if (isActive) {
      allActions.forEach((action) => {
        if (action) {
          action.reset().setLoop(THREE.LoopOnce, 1).fadeIn(0.5).play();
          action.clampWhenFinished = true;
        }
      });
    } else {
      allActions.forEach((action) => {
        action?.fadeOut(0.5);
      });
    }

    return () => {
      allActions.forEach((action) => action?.stop());
    };
  }, [isActive, actions]);

  if (!original || !ghost) return null;

  return (
    <group ref={group} dispose={null} position={[0, 0, 0]}>
      <primitive object={original} visible={isActive} name={name} />
      <primitive object={ghost} visible={!isActive} />
    </group>
  );
}
