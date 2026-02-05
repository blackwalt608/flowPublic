"use client";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { useFlowStore } from "@/store/store";
import gsap from "gsap";
import Stage from "./Stage";
import PartCompiler from "./parts/PartCompiler";
import CameraControls from "./controls/CameraControls";

export default function Scene() {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasPos = useFlowStore((s) => s.canvasPos);
  const setCanvasPos = useFlowStore((s) => s.setCanvasPos);
  

  const isInView = useInView(canvasWrapperRef, { amount: 0.95 });

  useEffect(() => {
    if (isInView && canvasPos === 1) {
      setCanvasPos(2);
    }
  }, [isInView, canvasPos, setCanvasPos]);

  const scrollYRef = useRef(0);
  useEffect(() => {
    if (!canvasWrapperRef.current) return;

    const wrapper = canvasWrapperRef.current;

    if (canvasPos === 2) {
      scrollYRef.current = window.scrollY;
      gsap.set(wrapper, {
        position: "fixed",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 10,
      });
      document.body.style.overflow = "hidden";
    }
    if (canvasPos === 3) {
      document.body.style.overflow = "";
      gsap.set(wrapper, {
        position: "relative",
        width: "100vw",
        height: "100vh",
        top: "auto",
        left: "auto",
        zIndex: 10,
      });
      window.scrollTo(0, scrollYRef.current);
    }
  }, [canvasPos]);

  return (
    <div
      ref={canvasWrapperRef}
      className="w-screen h-screen overflow-hidden bg-black"
    >
      <Canvas shadows camera={{ fov: 45, position: [8, 5, 8] }}>
        <CameraControls />
        <Stage />
        <PartCompiler />
      </Canvas>
    </div>
  );
}
