"use client";
import { motion } from "motion/react";
export default function Button({
  height,
  fs,
  text,
  href,
}: {
  height: number;
  fs: number;
  text: string;
  href: string;
}) {
  const heightRem = height / 16;
  const fontSizeRem = fs / 16;

  const handleClick = () => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      initial={{ opacity: 1 }}
      whileHover={{
        opacity: [1.0, 0.2, 0.8, 0.0, 1],
      }}
      transition={{
        duration: 0.2,
        ease: "linear",
      }}
      onClick={handleClick}
      style={{
        height: `${heightRem}rem`,
        fontSize: `${fontSizeRem}rem`,
        letterSpacing: "-0.09em",
      }}
      className="text-main flex gap-2 pr-2 justify-between items-center bg-secondary/36 hover:bg-secondary/18 transition duration-125 cursor-pointer"
    >
      <div
        style={{ width: `${heightRem / 3}rem` }}
        className="h-full bg-main"
      />
      <div>{text}</div>
    </motion.button>
  );
}
