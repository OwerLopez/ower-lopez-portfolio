"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: ({ stagger, startDelay }: { stagger: number; startDelay: number }) => ({
    transition: { staggerChildren: stagger, delayChildren: startDelay },
  }),
};

const wordVariant: Variants = {
  hidden: { opacity: 0, y: "0.55em", filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const tags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

type SplitTag = keyof typeof tags;

interface SplitTextProps {
  text: string;
  className?: string;
  /** Clase aplicada a cada palabra (ej. gradiente de acento). */
  wordClassName?: string;
  as?: SplitTag;
  /** Separacion entre palabras en segundos. */
  stagger?: number;
  /** Retraso inicial antes de la primera palabra (segundos). */
  startDelay?: number;
  /** Anima al entrar al viewport (por defecto) o inmediatamente. */
  trigger?: "view" | "mount";
}

/**
 * Titular animado palabra por palabra (aparicion con desenfoque + ascenso).
 * Respeta `prefers-reduced-motion` renderizando el texto plano.
 */
export function SplitText({
  text,
  className,
  wordClassName,
  as = "span",
  stagger = 0.045,
  startDelay = 0.05,
  trigger = "view",
}: SplitTextProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const reducedHook = useReducedMotion();
  const reduced = isMounted && reducedHook;
  const MotionTag = tags[as];
  const words = text.split(" ");

  if (reduced) {
    const Plain = as;
    return <Plain className={cn(className, wordClassName)}>{text}</Plain>;
  }

  const activation =
    trigger === "view"
      ? {
          whileInView: "visible" as const,
          viewport: { once: true, margin: "0px 0px -12% 0px" },
        }
      : { animate: "visible" as const };

  return (
    <MotionTag
      className={className}
      variants={container}
      custom={{ stagger, startDelay }}
      initial="hidden"
      {...activation}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block whitespace-nowrap"
          style={{ willChange: "transform, filter, opacity" }}
        >
          <motion.span
            variants={wordVariant}
            className={cn("inline-block", wordClassName)}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </MotionTag>
  );
}
