"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Linea de la trayectoria que se "dibuja" segun el progreso de scroll de la
 * seccion. Se apoya en un contenedor padre `relative`.
 */
export function TimelineLine() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="absolute bottom-[6px] left-[6px] top-[6px] w-px"
    >
      {/* Riel tenue de fondo */}
      <div className="absolute inset-0 bg-white/[0.06]" />
      {/* Trazo que avanza con el scroll */}
      <motion.div
        style={{ scaleY }}
        className="absolute inset-0 origin-top bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent)] to-[var(--color-accent-cyan)] shadow-[0_0_10px_var(--color-accent)]"
      />
    </div>
  );
}
