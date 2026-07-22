"use client";

import { type ElementType, createElement, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MaskTextProps {
  /** Cada string es una línea independiente que se revela por máscara. */
  lines: string[];
  as?: ElementType;
  className?: string;
  /** Clases por línea (índice), p.ej. para italic/gradiente en una línea concreta. Serializable (RSC-safe). */
  lineClassNames?: (string | undefined)[];
  /** Retraso base antes de la primera línea (s). */
  delay?: number;
  /** Separación entre líneas (s). */
  stagger?: number;
  /** "mount" revela al montar; "view" al entrar en viewport. */
  trigger?: "mount" | "view";
}

/**
 * Revelado editorial por máscara: cada línea vive en un contenedor
 * `overflow-hidden` y su interior asciende desde abajo. Respeta reduced-motion
 * (framer degrada la animación vía MotionConfig del layout).
 */
export function MaskText({
  lines,
  as = "span",
  className,
  lineClassNames,
  delay = 0,
  stagger = 0.09,
  trigger = "view",
}: MaskTextProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const active = trigger === "mount" ? true : inView;

  return createElement(
    as,
    { ref, className },
    lines.map((line, i) => (
      <span
        key={`${i}-${line}`}
        className="block overflow-hidden pb-[0.12em]"
        style={{ lineHeight: 0.98 }}
      >
        <motion.span
          className={`block will-change-transform ${lineClassNames?.[i] ?? ""}`}
          initial={{ y: "115%" }}
          animate={active ? { y: "0%" } : { y: "115%" }}
          transition={{
            duration: 1.05,
            ease: [0.16, 1, 0.3, 1],
            delay: delay + i * stagger,
          }}
        >
          {line}
        </motion.span>
      </span>
    )),
  );
}
