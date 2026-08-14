"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Energía de fuego: líneas SVG verticales con gradiente flame→magenta
 * que conectan las escenas del portafolio, con flujo animado (dashoffset)
 * y pulsos que viajan hacia abajo como si la página fuera un circuito vivo.
 */
const LINES = [
  { left: "6%", color: "flame", height: "42%", top: "12%", opacity: 0.5, delay: 0 },
  { left: "12%", color: "magenta", height: "30%", top: "26%", opacity: 0.35, delay: 0.8 },
  { left: "88%", color: "flame", height: "36%", top: "18%", opacity: 0.5, delay: 0.4 },
  { left: "94%", color: "violet", height: "44%", top: "32%", opacity: 0.35, delay: 1.2 },
  { left: "4%", color: "violet", height: "28%", top: "58%", opacity: 0.4, delay: 2.0 },
  { left: "92%", color: "magenta", height: "32%", top: "62%", opacity: 0.4, delay: 1.6 },
  { left: "8%", color: "amber", height: "22%", top: "74%", opacity: 0.3, delay: 2.6 },
  { left: "96%", color: "amber", height: "20%", top: "80%", opacity: 0.3, delay: 3.0 },
];

const COLOR_MAP: Record<string, string> = {
  flame: "#ff7a18",
  magenta: "#e11d74",
  violet: "#8b5cf6",
  amber: "#fbbf24",
};

export function EnergyLines() {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {LINES.map((line, i) => (
        <div
          key={i}
          className="absolute top-0 h-full"
          style={{ left: line.left, opacity: line.opacity }}
        >
          <svg
            className="absolute left-0 top-0 block w-px overflow-visible"
            style={{ top: line.top, height: line.height }}
            preserveAspectRatio="none"
            viewBox="0 0 1 100"
            width="1"
            height="100%"
          >
            <defs>
              <linearGradient id={`el-grad-${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="20%" stopColor={COLOR_MAP[line.color]} />
                <stop offset="80%" stopColor={COLOR_MAP[line.color]} />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <line
              x1="0.5"
              y1="0"
              x2="0.5"
              y2="100"
              stroke={`url(#el-grad-${i})`}
              strokeWidth="0.3"
            />
            {!reduced && (
              <motion.line
                x1="0.5"
                y1="0"
                x2="0.5"
                y2="100"
                stroke={COLOR_MAP[line.color]}
                strokeWidth="0.8"
                strokeDasharray="14 46"
                initial={{ strokeDashoffset: 60 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{
                  duration: 6,
                  delay: line.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
            {!reduced && (
              <motion.circle
                r="1.2"
                fill={COLOR_MAP[line.color]}
                initial={{ y: -2, opacity: 0 }}
                animate={{ y: 102, opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 7,
                  delay: line.delay + 1,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </svg>
        </div>
      ))}
    </div>
  );
}
