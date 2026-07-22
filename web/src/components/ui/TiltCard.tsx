"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Inclinacion maxima en grados. */
  max?: number;
  /** Entrada al viewport. */
  delay?: number;
  as?: "div" | "article";
}

/**
 * Tarjeta con inclinacion 3D en respuesta al cursor y foco radial que lo sigue.
 * En puntero grueso o con reduced-motion se comporta como una tarjeta estatica.
 */
export function TiltCard({
  children,
  className,
  max = 7,
  delay = 0,
  as = "div",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const reduced = useReducedMotion();
  const isReduced = isMounted && reduced;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const springCfg = { stiffness: 150, damping: 18, mass: 0.4 };
  const sx = useSpring(px, springCfg);
  const sy = useSpring(py, springCfg);

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced || !window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    px.set(nx);
    py.set(ny);
    ref.current?.style.setProperty("--mx", `${nx * 100}%`);
    ref.current?.style.setProperty("--my", `${ny * 100}%`);
  };

  const reset = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const MotionTag = as === "article" ? motion.article : motion.div;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay / 1000 }}
      style={
        isReduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 1000,
              transformStyle: "preserve-3d",
            }
      }
      className={cn("card-spotlight relative", className)}
    >
      {children}
    </MotionTag>
  );
}
