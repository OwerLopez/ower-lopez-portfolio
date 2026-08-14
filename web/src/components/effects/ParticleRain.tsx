"use client";

import { useEffect, useRef } from "react";

/**
 * Lluvia de chispas: partículas que caen con estela y brillan al final.
 * Colores: ámbar → naranja → magenta (paleta Aurora de Fuego).
 */
export function ParticleRain({
  count = 24,
  accent = "#ff7a18",
  mid = "#fbbf24",
}: {
  count?: number;
  accent?: string;
  mid?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    interface Spark {
      x: number;
      y: number;
      vy: number;
      vx: number;
      len: number;
      life: number;
      max: number;
      size: number;
      hue: 0 | 1;
    }

    const sparks: Spark[] = Array.from({ length: count }, () => ({
      x: Math.random() * 2000,
      y: Math.random() * -2000,
      vy: 0.35 + Math.random() * 0.9,
      vx: -0.15 + Math.random() * 0.3,
      len: 14 + Math.random() * 26,
      life: Math.random() * 300,
      max: 300 + Math.random() * 300,
      size: 0.5 + Math.random() * 1.2,
      hue: Math.random() > 0.5 ? 0 : 1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of sparks) {
        s.y += s.vy;
        s.x += s.vx + Math.sin(s.life * 0.02) * 0.25;
        s.life += 1;
        if (s.y > h + s.len || s.life > s.max) {
          s.y = -s.len - Math.random() * 40;
          s.x = Math.random() * w;
          s.life = 0;
          s.hue = Math.random() > 0.5 ? 0 : 1;
        }
        const t = Math.min(s.life / 60, 1);
        const color = s.hue === 0 ? accent : mid;
        // Estela
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 6, s.y - s.len);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.12 * t;
        ctx.lineWidth = s.size * 0.5;
        ctx.stroke();
        // Cabeza brillante
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.45 * t;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, accent, mid]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
