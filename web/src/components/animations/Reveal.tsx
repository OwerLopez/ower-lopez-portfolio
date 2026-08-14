"use client";

import { motion, useReducedMotion, type Target, type TargetAndTransition } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — entrada cinematográfica sobria.
 * Sube 18px con fade mientras aparece la sección (whileInView).
 */
type RevealVariant = "line" | "block" | "soft";

interface RevealProps {
  children: ReactNode;
  /** Retardo del grupo (ms). Default 0. */
  delay?: number;
  /**
   * `soft` usa fade puro (para imágenes y fondos);
   * `line` eleva textos; `block` eleva tarjetas con escala sutil.
   */
  variant?: RevealVariant;
  className?: string;
  /** Desactiva la entrada al preferir reduced-motion. */
  respectMotion?: boolean;
}

type RevealVariants = {
  hidden: Target;
  visible: TargetAndTransition;
};

const variants: Record<RevealVariant, RevealVariants> = {
  line: {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  },
  block: {
    hidden: { opacity: 0, y: 22, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  },
  soft: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.1, ease: "easeOut" } },
  },
};

export function Reveal({ children, delay = 0, variant = "line", className, respectMotion = true }: RevealProps) {
  const reduce = useReducedMotion();
  const disabled = respectMotion && reduce;

  // Al preferir reduced-motion, la entrada se desactiva: parte visible y sin animación.
  const initial = disabled ? undefined : variants[variant].hidden;
  const whileInView = disabled ? undefined : variants[variant].visible;

  return (
    <motion.div
      {...(initial ? { initial } : {})}
      {...(whileInView ? { whileInView } : {})}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={delay ? { delay: delay / 1000 } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container para grupos de tarjetas */
interface StaggerProps {
  children: ReactNode;
  /** Espaciado entre hijos (s). Default 0.08. */
  stagger?: number;
  className?: string;
}

export function Stagger({ children, stagger = 0.08, className }: StaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={reduce ? undefined : { duration: 0.9, ease: "easeOut", staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}
