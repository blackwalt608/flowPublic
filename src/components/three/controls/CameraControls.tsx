import { useFlowStore } from "@/store/store";
import { useGLTF, useHelper } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ShowPartArray } from "@/store/store";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
export default function CameraControls() {
  //Store
  const setCameraPos = useFlowStore((s) => s.setCameraPos);
  const cameraPos = useFlowStore((s) => s.cameraPos);
  const canvasPos = useFlowStore((s) => s.canvasPos);
  const setCanvasPos = useFlowStore((s) => s.setCanvasPos);
  const setInViewLock = useFlowStore((s) => s.setInViewLock);
  const isCameraAnimating = useRef(false);

  useEffect(() => {
    if (canvasPos !== 2) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 50) return;
      if (isCameraAnimating.current) return;

      const { cameraPos, setCameraPos } = useFlowStore.getState();

      const index = ShowPartArray.indexOf(cameraPos);
      if (index === -1) return;

      if (e.deltaY > 0) {
        if (index === ShowPartArray.length - 1) {
          setInViewLock(true);
          setCanvasPos(3);
          window.setTimeout(() => setInViewLock(false), 700);
          setCameraPos("idle");
          isCameraAnimating.current = true;
          return;
        }
        setCameraPos(ShowPartArray[index + 1]);
        isCameraAnimating.current = true;
      } else {
        if (index === 1) {
          setInViewLock(true);
          setCanvasPos(1);
          window.setTimeout(() => setInViewLock(false), 700);
          setCameraPos("idle");
          isCameraAnimating.current = true;

          return;
        }
        setCameraPos(ShowPartArray[index - 1]);
        isCameraAnimating.current = true;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [canvasPos, setCanvasPos, setInViewLock]);

  // Camera Animation
  const { camera } = useThree();
  const cameraRefTarget = useRef(new THREE.Vector3(-0.7, 25, 0));

  const { nodes } = useGLTF("/models/stage.glb");

  // Light Ref
  const spotLightRef = useRef<THREE.SpotLight>(null!);
  const ambientLightRef = useRef<THREE.AmbientLight>(null!);
  // useHelper(spotLightRef, THREE.SpotLightHelper, "cyan");

  type AnimateShowcasePositionParams = {
    cameraPos: THREE.Vector3;
    cameraTarget: THREE.Vector3;
    lightPosition: THREE.Vector3;
    lightTarget: THREE.Vector3;
    ambientIntensity: number;
  };

  const animateShowcasePosition = ({
    cameraPos,
    cameraTarget,
    lightPosition,
    lightTarget,
    ambientIntensity,
  }: AnimateShowcasePositionParams) => {
    isCameraAnimating.current = true;

    const tl = gsap.timeline({
      defaults: {
        duration: 1.25,
        ease: "power2.inOut",
      },
      onComplete: () => {
        isCameraAnimating.current = false;
      },
    });

    tl.to(
      camera.position,
      {
        x: cameraPos.x,
        y: cameraPos.y,
        z: cameraPos.z,
      },
      0,
    );

    tl.to(
      cameraRefTarget.current,
      {
        x: cameraTarget.x,
        y: cameraTarget.y,
        z: cameraTarget.z,
      },
      0,
    );

    tl.to(
      spotLightRef.current!.position,
      {
        x: lightPosition.x,
        y: lightPosition.y,
        z: lightPosition.z,
      },
      0,
    );

    tl.set(
      spotLightRef.current!.target.position,
      {
        x: lightTarget.x,
        y: lightTarget.y,
        z: lightTarget.z,
      },
      0,
    );

    tl.to(
      ambientLightRef.current,
      {
        intensity: ambientIntensity,
        duration: 1,
        ease: "power2.out",
      },
      0,
    );

    spotLightRef.current!.target.updateMatrixWorld();
  };

  useEffect(() => {
    if (cameraPos === "idle") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(-0.6, 60, -140),
        cameraTarget: new THREE.Vector3(-0.6, 17, 0),
        lightPosition: new THREE.Vector3(0, 0, 0),
        lightTarget: new THREE.Vector3(0, 0, 0),
        ambientIntensity: 0,
      });
    }
    if (cameraPos === "focused") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(-0.6, 40, -120),
        cameraTarget: new THREE.Vector3(-0.6, 25, 0),
        lightPosition: new THREE.Vector3(0, 0, 0),
        lightTarget: new THREE.Vector3(0, 0, 0),
        ambientIntensity: 0,
      });
    }
    if (cameraPos === "truss") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(-65, 55, -60),
        cameraTarget: new THREE.Vector3(-35, 35, 0),
        lightPosition: new THREE.Vector3(-80, 35, -5),
        lightTarget: new THREE.Vector3(0, 0, 10),
        ambientIntensity: 2,
      });
    }
    if (cameraPos === "lineSpeaker") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(-45, 55, -50),
        cameraTarget: new THREE.Vector3(-50, 40, 0),
        lightPosition: new THREE.Vector3(-80, 35, -15),
        lightTarget: new THREE.Vector3(0, 0, 10),
        ambientIntensity: 2,
      });
    }
    if (cameraPos === "lights") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(35, 50, -25),
        cameraTarget: new THREE.Vector3(20, 50, 0),
        lightPosition: new THREE.Vector3(10, 40, -5),
        lightTarget: new THREE.Vector3(20, 50, 0),
        ambientIntensity: 2,
      });
    }
    if (cameraPos === "fogMachine") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(-50, 15, 20),
        cameraTarget: new THREE.Vector3(0, 0, 50),
        lightPosition: new THREE.Vector3(-65, 15, 20),
        lightTarget: new THREE.Vector3(0, 0, 50),
        ambientIntensity: 0.2,
      });
    }
    if (cameraPos === "subwoofer") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(35, 10, -25),
        cameraTarget: new THREE.Vector3(30, 8, 0),
        lightPosition: new THREE.Vector3(45, 15, -15),
        lightTarget: new THREE.Vector3(0, 0, 0),
        ambientIntensity: 2,
      });
    }
    if (cameraPos === "mainScreen") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(0, 30, -20),
        cameraTarget: new THREE.Vector3(0, 30, -10),
        lightPosition: new THREE.Vector3(0, 30, -20),
        lightTarget: new THREE.Vector3(0, 30, -10),
        ambientIntensity: 2,
      });
    }
    if (cameraPos === "police") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(-30, 10, -40),
        cameraTarget: new THREE.Vector3(-30, 10, -30),
        lightPosition: new THREE.Vector3(-30, 10, -40),
        lightTarget: new THREE.Vector3(-30, 10, -30),
        ambientIntensity: 0.5,
      });
    }
    if (cameraPos === "delayTower") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(-25, 40, -280),
        cameraTarget: new THREE.Vector3(-0.7, 35, -200),
        lightPosition: new THREE.Vector3(-0.7, 40, -300),
        lightTarget: new THREE.Vector3(-0.7, 25, 0),
        ambientIntensity: 0.5,
      });
    }
    if (cameraPos === "frontFillSpeaker") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(20, 15, -20),
        cameraTarget: new THREE.Vector3(10, 8, 0),
        lightPosition: new THREE.Vector3(25, 20, -15),
        lightTarget: new THREE.Vector3(0, 0, -10),
        ambientIntensity: 2,
      });
    }
    if (cameraPos === "stageMonitor") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(41, 15, -7),
        cameraTarget: new THREE.Vector3(39, 8, 5),
        lightPosition: new THREE.Vector3(55, 20, -15),
        lightTarget: new THREE.Vector3(30, 0, -10),
        ambientIntensity: 2,
      });
    }
    if (cameraPos === "enstrumants") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(-15, 30, -10),
        cameraTarget: new THREE.Vector3(-10, 25, 0),
        lightPosition: new THREE.Vector3(-25, 30, 10),
        lightTarget: new THREE.Vector3(-10, 25, 0),
        ambientIntensity: 0.5,
      });
    }
    if (cameraPos === "sideScreen") {
      animateShowcasePosition({
        cameraPos: new THREE.Vector3(-15, 30, -10),
        cameraTarget: new THREE.Vector3(-10, 25, 0),
        lightPosition: new THREE.Vector3(-25, 30, 10),
        lightTarget: new THREE.Vector3(-10, 25, 0),
        ambientIntensity: 2,
      });
    }
  }, [cameraPos, canvasPos]);

  useFrame((state, delta) => {
    camera.lookAt(cameraRefTarget.current);
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} intensity={0} />
      <spotLight
        ref={spotLightRef}
        position={[-30, 15, -30]}
        intensity={5000}
        angle={2}
        penumbra={1}
        castShadow
        shadow-bias={-0.001}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={500}
      />
    </>
  );
}
