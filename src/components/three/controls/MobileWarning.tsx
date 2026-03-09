"use client";

// CURRENTLY UNUSED COMPONENT
// Mobile warning is not needed at this time.
// Kept for potential future use.

import { useMediaQuery } from "react-responsive";
import { useState } from "react";

export default function MobileWarning() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [visible, setVisible] = useState(true);

  if (!isMobile || !visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-75 rounded-xl border border-main/30 bg-black/80 p-4 shadow-lg backdrop-blur">
      <div className="flex items-start gap-3">
        <span className="text-xl text-main">⚠</span>

        <div className="text-sm leading-snug">
          <p className="font-semibold text-main">Not optimized for mobile</p>
          <p className="mt-1 text-secondary">
            For the best experience, please use a desktop device.
          </p>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="ml-auto text-main/60 hover:text-main transition"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
