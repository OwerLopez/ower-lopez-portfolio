"use client";

import React, { useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { playHover } from "@/lib/audio";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
  enableSound?: boolean;
}

/**
 * TiltCard — 3D Spotlight Tilt Glass Component.
 * Features gyroscopic 3D perspective physics, cursor-following spotlight glow,
 * and holographic border reflections that harmonize with the water background.
 */
export function TiltCard({
  children,
  className = "",
  glowColor = "rgba(59, 130, 246, 0.16)",
  maxTilt = 6,
  enableSound = true,
  ...rest
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduce || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const px = (clientX / rect.width) * 2 - 1; // -1 to 1
      const py = (clientY / rect.height) * 2 - 1; // -1 to 1

      setTilt({
        x: -py * maxTilt,
        y: px * maxTilt,
      });

      setSpotlight({
        x: clientX,
        y: clientY,
        opacity: 1,
      });
    },
    [maxTilt, reduce]
  );

  const handlePointerEnter = useCallback(() => {
    if (enableSound) {
      playHover();
    }
  }, [enableSound]);

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: reduce
          ? undefined
          : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1, 1, 1)`,
        transition: "transform 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 240ms ease",
      }}
      className={`relative overflow-hidden ${className}`}
      {...rest}
    >
      {/* 3D Spotlight Radial Light Cone */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(circle 380px at ${spotlight.x}px ${spotlight.y}px, ${glowColor}, transparent 75%)`,
        }}
      />

      {/* Holographic Border Shine */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity * 0.7,
          background: `radial-gradient(circle 280px at ${spotlight.x}px ${spotlight.y}px, rgba(255, 255, 255, 0.18), transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
}
