"use client";

import { useEffect, useRef } from "react";

/** Glifos que "llueven": tokens de SQL/datos, no katakana generica. */
const GLYPHS = "01{}[]<>=|;$#%&SELECTJOINETLSQLAVGSUM".split("");

/**
 * Lluvia de datos estilo terminal sobre <canvas>, muy tenue, para fondos
 * cinematograficos. Pausa fuera de viewport y respeta reduced-motion
 * (renderiza un fotograma estatico).
 */
export function DataRain({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const FONT = 13;
    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let raf = 0;
    let running = true;
    let last = 0;

    const build = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? 600;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(width / FONT);
      drops = Array.from({ length: cols }, () => Math.random() * -60);
      ctx.fillStyle = "rgba(8, 7, 10,1)";
      ctx.fillRect(0, 0, width, height);
    };

    const step = (now: number) => {
      // ~18 fps: estetica terminal y menos CPU
      if (now - last > 55) {
        last = now;
        ctx.fillStyle = "rgba(8, 7, 10,0.16)";
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${FONT}px ui-monospace, monospace`;

        for (let i = 0; i < drops.length; i++) {
          const glyph = GLYPHS[(Math.random() * GLYPHS.length) | 0]!;
          const x = i * FONT;
          const y = drops[i]! * FONT;

          // Cabeza brillante + estela azul; 2% rojo peruano
          const head = Math.random() < 0.02;
          ctx.fillStyle = head
            ? "rgba(225,29,42,0.75)"
            : "rgba(255, 171, 56,0.55)";
          ctx.fillText(glyph, x, y);

          if (y > height && Math.random() > 0.976) drops[i] = 0;
          else drops[i] = drops[i]! + 1;
        }
      }
      if (running) raf = requestAnimationFrame(step);
    };

    build();

    if (reduced) {
      // Fotograma estatico: siembra algunas columnas fijas.
      ctx.font = `${FONT}px ui-monospace, monospace`;
      for (let i = 0; i < drops.length; i += 3) {
        const len = 4 + ((Math.random() * 10) | 0);
        const startY = Math.random() * height;
        for (let j = 0; j < len; j++) {
          ctx.fillStyle = `rgba(255, 171, 56,${0.4 - j * 0.035})`;
          ctx.fillText(
            GLYPHS[(Math.random() * GLYPHS.length) | 0]!,
            i * FONT,
            startY + j * FONT,
          );
        }
      }
      running = false;
    } else {
      raf = requestAnimationFrame(step);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (reduced || !entry) return;
        if (entry.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(step);
        } else if (!entry.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onResize = () => build();
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
