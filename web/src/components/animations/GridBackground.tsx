"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Ambient Grid & Particle Glow Background.
 * Gives deep cybernetic engineering atmosphere to the entire page.
 */
export function GridBackground() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* Precision Tech Grid with radial mask */}
      <div
        className="absolute inset-0 bg-tech-grid opacity-30"
        style={{
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 15%, #000 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 15%, #000 20%, transparent 85%)",
        }}
      />

      {/* Hero Ambient Glow Orb 1 (Electric Blue / Cyan - Top Left) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, 30, -20, 0],
                y: [0, -20, 20, 0],
                scale: [1, 1.1, 0.95, 1],
              }
        }
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="glow-orb-blue absolute -top-32 -left-32 h-[550px] w-[550px] rounded-full opacity-60"
      />

      {/* Hero Ambient Glow Orb 2 (Violet / Indigo - Top Right) */}
      <motion.div
        animate={
          shouldReduceMotion
            ? undefined
            : {
                x: [0, -40, 20, 0],
                y: [0, 30, -20, 0],
                scale: [1, 0.9, 1.1, 1],
              }
        }
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="glow-orb-purple absolute top-10 right-0 sm:right-10 h-[500px] w-[500px] rounded-full opacity-40"
      />

      {/* Mid-page Ambient Glow Orb 3 (Deep Cyan - Center / Work Section) */}
      <div
        className="glow-orb-blue absolute top-[35%] left-[20%] h-[600px] w-[600px] rounded-full opacity-20"
      />

      {/* Trophy Section Ambient Glow Orb 4 (Warm Amber - Trophies / Experience) */}
      <div
        className="glow-orb-amber absolute top-[65%] right-[10%] h-[500px] w-[500px] rounded-full opacity-25"
      />

      {/* Subtle Scanline Overlay */}
      <div className="absolute inset-0 bg-dot-grid opacity-15" />
    </div>
  );
}
