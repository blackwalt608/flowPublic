import CameraPosSidebar from "@/components/three/controls/CameraPosSidebar";
import Scene from "@/components/three/Scene";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Scene />
      <CameraPosSidebar />
    </div>
  );
}
