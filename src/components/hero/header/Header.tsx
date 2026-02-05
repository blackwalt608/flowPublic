"use client";

import { motion } from "framer-motion";

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-1.25 mt-10">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 + i * 0.14, duration: 0.4 }}
        >
          <motion.div
            animate={{ opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.25 }}
            className="w-1.5 h-1.5 rounded-full bg-white"
          />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.9, duration: 0.4 }}
        className="mt-1"
      >
        <motion.svg
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          width="14"
          height="20"
          viewBox="0 0 14 20"
          fill="none"
        >
          <motion.path
            d="M7 0 V14 M1 9 L7 15 L13 9"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 2.1, duration: 0.5 }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
export default function Header() {
  return (
    <div className="h-2/3 flex flex-col items-center pt-20 px-4  relative  mb-20 ">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-white text-center uppercase tracking-[0.2em] leading-[1.2]"
        style={{
          fontSize: "clamp(32px, 6vw, 72px)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        Premium
        <br />
        <span className="font-light opacity-90">Stage Productions</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="mt-8 max-w-150 text-center text-white/50 text-xs sm:text-[13px] leading-relaxed tracking-[0.15em] font-light"
      >
        The talent brings the light,
        <span className="text-main">we provide the ground.</span>
        <br className="hidden sm:block" />
        Expert stage architecture and technical rigging designed for <br />
        <span className="text-main italic"> seamless performance.</span>
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="mt-10"
      >
        <button className="px-8 py-3 border border-white/20 text-white text-[10px] uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 cursor-pointer backdrop-blur-sm">
          See Our Work
        </button>
      </motion.div>

      <ScrollIndicator />
    </div>
  );
}
