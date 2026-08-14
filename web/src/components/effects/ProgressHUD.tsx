"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SCENES = [
  { id: "mission", code: "E2" },
  { id: "work", code: "E3" },
  { id: "architecture", code: "E4" },
  { id: "stack", code: "E5" },
  { id: "journey", code: "E6" },
  { id: "github", code: "E7" },
  { id: "credentials", code: "E8" },
  { id: "philosophy", code: "E9" },
  { id: "faq", code: "E10" },
  { id: "contact", code: "E11" },
];

/**
 * HUD lateral derecho: telemetría de la escena activa + porcentaje de lectura.
 * Estilo cabina de mando: ticks, códigos de escena y barra de progreso vertical.
 */
export function ProgressHUD() {
  const [active, setActive] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - doc.clientHeight;
      setProgress(total > 0 ? Math.min(100, Math.round((doc.scrollTop / total) * 100)) : 0);
      let current: string | null = null;
      for (const scene of SCENES) {
        const el = document.getElementById(scene.id);
        if (el && el.getBoundingClientRect().top <= 240) current = scene.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-5 top-1/2 z-[58] hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex"
    >
      <div className="flex flex-col items-center gap-1.5 font-mono-token">
        {SCENES.map((scene) => {
          const isActive = active === scene.id;
          return (
            <a
              key={scene.id}
              href={`#${scene.id}`}
              className="pointer-events-auto group relative flex h-5 w-5 items-center justify-center"
              aria-label={`Ir a ${scene.id}`}
            >
              <motion.span
                animate={{
                  scale: isActive ? 1.35 : 1,
                  opacity: isActive ? 1 : 0.35,
                }}
                transition={{ duration: reduced ? 0 : 0.35 }}
                className={`block h-1.5 w-1.5 rounded-full ${
                  isActive ? "bg-[#ff7a18] shadow-[0_0_8px_rgba(255,122,24,0.9)]" : "bg-[#6a6978] group-hover:bg-[#e11d74]"
                }`}
              />
              <span className="absolute right-6 whitespace-nowrap rounded border border-[#1e1e2e] bg-[#0c0c14]/95 px-1.5 py-0.5 text-[9px] tracking-[0.2em] text-[#e11d74] opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
                {scene.code}
              </span>
            </a>
          );
        })}
      </div>

      {/* Barra de progreso vertical */}
      <div className="relative mt-1 h-24 w-px overflow-hidden rounded-full bg-[#1e1e2e]">
        <div
          className="absolute inset-x-0 bottom-0 w-full bg-gradient-to-t from-[#8b5cf6] via-[#e11d74] to-[#ff7a18]"
          style={{ height: `${progress}%` }}
        />
      </div>
      <span className="font-mono-token text-[9px] tracking-[0.25em] text-[#6a6978] tabular-nums">
        {String(progress).padStart(3, "0")}
      </span>
    </div>
  );
}
