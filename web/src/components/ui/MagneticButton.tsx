"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  /** Intensidad del efecto magnetico (0–1). */
  strength?: number;
  external?: boolean;
  ariaLabel?: string;
}

/**
 * Enlace con efecto magnetico: se desplaza suavemente hacia el cursor.
 * Se degrada a un enlace estatico cuando el puntero no es fino.
 */
export function MagneticButton({
  href,
  children,
  className,
  strength = 0.32,
  external = false,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

  const handleMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength * 1.3);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex items-center justify-center", className)}
    >
      {children}
    </motion.a>
  );
}
