"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CircuitStage } from "@/types/content";

const STAGE_COLORS = ["#ff7a18", "#e11d74", "#8b5cf6", "#fbbf24", "#34d399"];

/**
 * Diagrama de flujo del circuito de datos: nodos E1→E5 conectados con líneas
 * animadas (dashoffset) y pulsos de energía que viajan entre etapas.
 * Al pasar el cursor por un nodo se ilumina su ficha técnica.
 */
export function FlowDiagram({ stages, note }: { stages: CircuitStage[]; note: string }) {
  const [active, setActive] = useState<number | null>(0);
  const reduced = useReducedMotion();

  // Geometría: 5 nodos en zigzag para dar sensación de circuito
  const points: { x: number; y: number }[] = stages.map((_, i) => ({
    x: 90 + i * 180,
    y: i % 2 === 0 ? 110 : 210,
  }));

  const segments: { from: { x: number; y: number }; to: { x: number; y: number } }[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    segments.push({
      from: points[i] as { x: number; y: number },
      to: points[i + 1] as { x: number; y: number },
    });
  }

  const pathFrom = (a: { x: number; y: number }, b: { x: number; y: number }) =>
    `M ${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y}, ${(a.x + b.x) / 2} ${b.y}, ${b.x} ${b.y}`;

  return (
    <div className="relative">
      <div className="relative overflow-x-auto pb-2">
        <svg
          viewBox="0 0 1000 330"
          className="w-full min-w-[760px]"
          role="img"
          aria-label="Diagrama del circuito de datos"
        >
          {/* Líneas de conexión */}
          {segments.map((seg, i) => (
            <g key={i}>
              <path d={pathFrom(seg.from, seg.to)} fill="none" stroke="#2e2e42" strokeWidth="2" />
              {!reduced && (
                <motion.path
                  d={pathFrom(seg.from, seg.to)}
                  fill="none"
                  stroke={STAGE_COLORS[i]}
                  strokeWidth="2"
                  strokeDasharray="18 62"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.4, delay: i * 0.5, repeat: Infinity, ease: "linear" }}
                />
              )}
            </g>
          ))}

          {/* Nodos */}
          {stages.map((stage, i) => {
            const color = STAGE_COLORS[i];
            const isActive = active === i;
            const pt = points[i] as { x: number; y: number };
            return (
              <g
                key={stage.index}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="cursor-pointer"
              >
                {/* Halo */}
                <circle cx={pt.x} cy={pt.y} r="58" fill={`${color}14`} />
                <circle cx={pt.x} cy={pt.y} r="46" fill={`${color}22`} />
                {/* Borde del nodo */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="38"
                  fill="#0c0c14"
                  stroke={color}
                  strokeWidth={isActive ? 2.5 : 1.5}
                />
                {!reduced && (
                  <circle cx={pt.x} cy={pt.y} r="38" fill="none" stroke={color} strokeWidth="1">
                    <animate attributeName="r" values="38;46;38" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.6;0;0.6" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                  </circle>
                )}
                <text
                  x={pt.x}
                  y={pt.y - 6}
                  textAnchor="middle"
                  className="font-mono-token"
                  fill={color}
                  fontSize="15"
                  fontWeight="700"
                  style={{ fontFamily: "var(--font-jetbrains)" }}
                >
                  {stage.index}
                </text>
                <text
                  x={pt.x}
                  y={pt.y + 12}
                  textAnchor="middle"
                  fill="#f6f5f4"
                  fontSize="11.5"
                  fontWeight="600"
                >
                  {stage.label}
                </text>
                {/* Etiqueta superior con power */}
                <text
                  x={pt.x}
                  y={pt.y - 62}
                  textAnchor="middle"
                  className="font-mono-token"
                  fill={isActive ? color : "#6a6978"}
                  fontSize="10"
                  style={{ fontFamily: "var(--font-jetbrains)", letterSpacing: "0.12em" }}
                >
                  {stage.power}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Ficha técnica del nodo activo */}
      <div className="mt-2 grid gap-3 sm:grid-cols-5">
        {stages.map((stage, i) => {
          const color = STAGE_COLORS[i];
          const isActive = active === i || (active === null && i === 0);
          return (
            <motion.div
              key={stage.index}
              animate={{
                borderColor: isActive ? `${color}66` : "#1e1e2e",
                background: isActive ? "#131321" : "#0c0c14",
              }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="cursor-default rounded-xl border bg-[#0c0c14] p-4"
            >
              <p className="font-mono-token text-[9px] uppercase tracking-[0.2em] text-[#6a6978]">
                Etapa {stage.index}
              </p>
              <p className="mt-1 text-sm font-semibold text-ink">{stage.label}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#a9a8b8]">{stage.detail}</p>
              <p className="font-mono-token mt-3 border-t border-[#1e1e2e] pt-2.5 text-[10px] leading-relaxed text-[#6a6978]">
                {stage.tech}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
