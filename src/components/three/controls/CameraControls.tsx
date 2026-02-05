import { useFlowStore } from "@/store/store";
import { useGLTF, useHelper } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ShowPartArray } from "@/store/store";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
export default function CameraControls() {
  // Camera Ref
  const spotLightRef = useRef<THREE.SpotLight>(null!);
  useHelper(spotLightRef, THREE.SpotLightHelper, "cyan");

  //Store
  const setCameraPos = useFlowStore((s) => s.setCameraPos);
  const cameraPos = useFlowStore((s) => s.cameraPos);
  const canvasPos = useFlowStore((s) => s.canvasPos);
  const setCanvasPos = useFlowStore((s) => s.setCanvasPos);
  const cameraAniAvailability = useFlowStore((s) => s.cameraAniAvailability);
  const setCameraAniAvailability = useFlowStore(
    (s) => s.setCameraAniAvailability,
  );

  useEffect(() => {
    if (canvasPos !== 2) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 25) return;

      const { cameraPos, setCameraPos } = useFlowStore.getState();

      const index = ShowPartArray.indexOf(cameraPos);
      if (index === -1) return;

      if (e.deltaY > 0) {
        if (index === ShowPartArray.length - 1) {
          setCanvasPos(3);
          setCameraPos("idle");
          return;
        }
        setCameraPos(ShowPartArray[index + 1]);
      } else {
        if (index === 0) {
          setCanvasPos(1);
          setCameraPos("idle");
          return;
        }
        setCameraPos(ShowPartArray[index - 1]);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [canvasPos, setCanvasPos]);

  // Camera Animation
  const { camera } = useThree();
  const cameraRefTarget = useRef(new THREE.Vector3(0, 0, 0));
  const { nodes } = useGLTF("/models/stage.glb");

  useEffect(() => {
    if (cameraPos === "idle") {
      gsap.to(camera.position, {
        x: -0.7,
        y: 80,
        z: -170,
        ease: "power2.inOut",
        onComplete: () => {
          setCameraAniAvailability(true);
        },
      });
      gsap.to(cameraRefTarget.current, { x: -0.7, y: 25, z: 0 });
    }
    if (cameraPos === "focused") {
      gsap.to(camera.position, {
        x: -0.7,
        y: 40,
        z: -120,
        ease: "power2.inOut",
        onComplete: () => {
          setCameraAniAvailability(true);
        },
      });
      gsap.to(cameraRefTarget.current, { x: -0.7, y: 25, z: 0 });
    }
  }, [cameraPos, canvasPos, cameraAniAvailability]);

  useFrame((state, delta) => {
    camera.lookAt(cameraRefTarget.current);
  });

  return (
    <>
      <ambientLight intensity={0.7} />
      <spotLight
        ref={spotLightRef}
        position={[-30, 15, -30]}
        intensity={10000}
        angle={0.5}
        penumbra={1}
        castShadow
        shadow-bias={-0.0002}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={500}
      />
    </>
  );
}
