"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 30 },
  down: { x: 0, y: -30 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
  none: { x: 0, y: 0 },
};

/** Componentes de movimiento predefinidos (evita recrear tipos en cada render). */
const tags = {
  div: motion.div,
  section: motion.section,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  li: motion.li,
  span: motion.span,
} as const;

type RevealTag = keyof typeof tags;

interface RevealProps {
  children: ReactNode;
  /** Retraso en milisegundos, coherente con el diseno original. */
  delay?: number;
  className?: string;
  as?: RevealTag;
  /** Direccion de entrada. */
  from?: Direction;
  /** Anade un ligero desenfoque de entrada para mayor profundidad. */
  blur?: boolean;
}

/**
 * Envuelve contenido con una animacion de aparicion al entrar en viewport
 * (ascenso + fundido, con desenfoque y direccion opcionales).
 * Se dispara una sola vez y respeta `prefers-reduced-motion`.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  from = "up",
  blur = false,
}: RevealProps) {
  const MotionTag = tags[as];
  const { x, y } = offset[from];

  const variants: Variants = {
    hidden: { opacity: 0, x, y, filter: blur ? "blur(10px)" : "blur(0px)" },
    visible: (d: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: d },
    }),
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      custom={delay / 1000}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}
