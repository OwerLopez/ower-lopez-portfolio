"use client";

import { useRef, useState } from "react";

interface LightBeamCardProps {
  children: React.ReactNode;
  className?: string;
}

export function LightBeamCard({ children, className = "" }: LightBeamCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPos({ x, y });
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#09080d]/80 backdrop-blur-xl transition-all duration-300 ${className}`}
    >
      {/* Light Beam Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${pos.x}% ${pos.y}%, rgba(255, 184, 0, 0.18), rgba(0, 242, 254, 0.08) 40%, transparent 80%)`,
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
