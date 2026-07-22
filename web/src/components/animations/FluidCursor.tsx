"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
}

export function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 450, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 450, damping: 28 });

  const auraX = useSpring(0, { stiffness: 120, damping: 20 });
  const auraY = useSpring(0, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const sparks: Spark[] = [];
    let animId = 0;

    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize, { passive: true });

    let lastX = 0;
    let lastY = 0;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      auraX.set(e.clientX);
      auraY.set(e.clientY);
      setVisible(true);

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Emit sparks if moving fast enough
      if (speed > 3) {
        const count = Math.min(3, Math.floor(speed / 4));
        for (let i = 0; i < count; i++) {
          sparks.push({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            alpha: 1,
            color: Math.random() > 0.5 ? "rgba(255, 184, 0, 0.8)" : "rgba(0, 242, 254, 0.8)",
            size: Math.random() * 2 + 1,
          });
        }
      }

      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") ||
          target.closest("button") ||
          target.dataset.cursorHover)
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        if (!s) continue;

        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.03; // Fade out

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color.replace("0.8", s.alpha.toFixed(2));
        ctx.shadowBlur = 4;
        ctx.shadowColor = s.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [cursorX, cursorY, auraX, auraY]);

  if (!visible) return null;

  return (
    <>
      {/* Particle Canvas mouse trail */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99] hidden lg:block"
      />

      {/* Main Cursor Dot */}
      <div className="pointer-events-none fixed inset-0 z-[100] hidden lg:block overflow-hidden">
        <motion.div
          style={{ x: auraX, y: auraY }}
          animate={{
            scale: hovered ? 2.2 : 1,
            opacity: hovered ? 0.8 : 0.4,
          }}
          className="absolute -left-6 -top-6 h-12 w-12 rounded-full bg-gradient-to-r from-amber-500/30 via-cyan-500/20 to-purple-500/20 blur-md mix-blend-screen"
        />

        <motion.div
          style={{ x: cursorX, y: cursorY }}
          animate={{
            scale: hovered ? 1.6 : 1,
          }}
          className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_12px_#fbbf24]"
        />
      </div>
    </>
  );
}
