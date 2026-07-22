"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
  as?: "div" | "article";
}

export function TiltCard({
  children,
  className,
  max = 12,
  as = "div",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rx = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 180, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;

    x.set(nx);
    y.set(ny);
    setOpacity(1);

    ref.current.style.setProperty("--mx", `${nx * 100}%`);
    ref.current.style.setProperty("--my", `${ny * 100}%`);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    setOpacity(0);
  };

  const MotionTag = as === "article" ? motion.article : motion.div;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1200,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "relative rounded-3xl border border-white/10 bg-[#09080d]/80 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40 hover:shadow-2xl overflow-hidden",
        className
      )}
    >
      {/* 3DSpecular Glare Highlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(350px circle at var(--mx, 50%) var(--my, 50%), rgba(255, 184, 0, 0.18), transparent 70%)`,
        }}
      />
      <div className="relative z-20" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
    </MotionTag>
  );
}
