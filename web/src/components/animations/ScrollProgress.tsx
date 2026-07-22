"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Barra superior que refleja el progreso de scroll de la pagina. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-white/5">
      <motion.div
        style={{ scaleX }}
        className="h-full origin-left bg-gradient-to-r from-[var(--color-accent-deep)] to-[var(--color-accent-2)] shadow-[0_0_12px_var(--color-accent)]"
      />
    </div>
  );
}
