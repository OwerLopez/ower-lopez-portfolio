"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ConstellationGroup } from "@/types/content";

const GLOW_COLOR: Record<ConstellationGroup["glow"], string> = {
  flame: "#ff7a18",
  magenta: "#e11d74",
  violet: "#8b5cf6",
  amber: "#fbbf24",
};

const GLOW_SOFT: Record<ConstellationGroup["glow"], string> = {
  flame: "rgba(255,122,24,0.28)",
  magenta: "rgba(225,29,116,0.28)",
  violet: "rgba(139,92,246,0.28)",
  amber: "rgba(251,191,36,0.28)",
};

const AXES = ["Backend", "Datos", "IA / ML", "Cloud", "DevOps", "Ingeniería"];
const VALUES = [0.92, 0.85, 0.78, 0.8, 0.72, 0.88];

const SIZE = 420;
const CX = SIZE / 2;
const CY = SIZE / 2;
const R = 150;

function polar(angle: number, radius: number) {
  const a = (angle - 90) * (Math.PI / 180);
  return { x: CX + radius * Math.cos(a), y: CY + radius * Math.sin(a) };
}

function polygonPoints(values: number[], radius: number) {
  return values
    .map((v, i) => {
      const p = polar((360 / values.length) * i, radius * v);
      return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    })
    .join(" ");
}

/**
 * Radar de dominio: diagrama SVG interactivo donde el dominio seleccionado
 * enciende su eje y revela el tech-stack en el lado derecho.
 */
export function StackRadar({
  groups,
  note,
}: {
  groups: ConstellationGroup[];
  note: string;
}) {
  const [selected, setSelected] = useState(0);
  const reduced = useReducedMotion();
  const group = groups[selected] ?? groups[0];
  const color = GLOW_COLOR[group?.glow ?? "flame"];
  const soft = GLOW_SOFT[group?.glow ?? "flame"];

  const rings = useMemo(
    () =>
      [0.25, 0.5, 0.75, 1].map((f) =>
        AXES.map((_, i) => {
          const a = polar((360 / AXES.length) * i, R * f);
          return a;
        })
      ),
    []
  );

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)]">
      <div className="relative mx-auto w-full max-w-[460px]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="w-full" role="img" aria-label="Radar de dominio técnico">
          {/* Anillos concéntricos */}
          {rings.map((ring, ri) => (
            <polygon
              key={ri}
              points={ring.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")}
              fill="none"
              stroke="#1e1e2e"
              strokeWidth="1"
            />
          ))}
          {/* Ejes */}
          {AXES.map((_, i) => {
            const p = polar((360 / AXES.length) * i, R);
            return (
              <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#2e2e42" strokeWidth="1" />
            );
          })}
          {/* Polígono de dominio */}
          <motion.polygon
            points={polygonPoints(VALUES, R)}
            fill={soft}
            stroke={color}
            strokeWidth="1.5"
            initial={reduced ? undefined : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          />
          {/* Puntos de eje */}
          {AXES.map((label, i) => {
            const v = VALUES[i] ?? 0.5;
            const p = polar((360 / AXES.length) * i, R * v);
            return (
              <circle key={i} cx={p.x} cy={p.y} r="4" fill={color}>
                {!reduced && (
                  <animate attributeName="r" values="3.5;5;3.5" dur="2.4s" begin={`${i * 0.35}s`} repeatCount="indefinite" />
                )}
              </circle>
            );
          })}
          {/* Etiquetas de eje */}
          {AXES.map((label, i) => {
            const p = polar((360 / AXES.length) * i, R + 34);
            const anchor = p.x < CX - 10 ? "end" : p.x > CX + 10 ? "start" : "middle";
            return (
              <g key={label} className="cursor-pointer" onClick={() => setSelected(i)}>
                <text
                  x={p.x}
                  y={p.y}
                  textAnchor={anchor}
                  dominantBaseline="middle"
                  className="fill-[#a9a8b8] text-[12px] transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontWeight: i === selected ? 700 : 400,
                    fill: i === selected ? color : "#a9a8b8",
                  }}
                >
                  {label}
                  {i === selected && (
                    <tspan dx="4" fill={color} fontSize="10">
                      {Math.round((VALUES[i] ?? 0.5) * 100)}%
                    </tspan>
                  )}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Selector circular de domínios (debajo del radar) */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {groups.map((g, i) => {
            const isActive = i === selected;
            const c = GLOW_COLOR[g.glow];
            return (
              <button
                key={g.name}
                type="button"
                onClick={() => setSelected(i)}
                className={`rounded-full border px-3.5 py-1.5 text-[11px] font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "border-transparent text-white"
                    : "border-[#1e1e2e] text-[#a9a8b8] hover:border-[#2e2e42] hover:text-ink"
                }`}
                style={
                  isActive
                    ? { background: `linear-gradient(110deg, ${c}, ${GLOW_COLOR[(groups[(i + 1) % groups.length] as ConstellationGroup).glow]})` }
                    : undefined
                }
              >
                {g.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Panel de tech del dominio seleccionado */}
      <motion.div
        key={selected}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden rounded-2xl border border-[#1e1e2e] bg-[#0c0c14]/70 p-7 backdrop-blur"
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
        <p className="font-mono-token text-[10px] uppercase tracking-[0.25em] text-[#6a6978]">
          Dominio {String(selected + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-2 text-2xl font-bold tracking-tight text-ink">{group?.name ?? ""}</h3>
        <ul className="mt-6 space-y-2.5">
          {group?.items.map((item, i) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="flex items-center gap-3"
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ background: color, boxShadow: `0 0 8px ${color}` }}
              />
              <span className="font-mono-token text-sm text-[#e8e7e4]">{item}</span>
            </motion.li>
          ))}
        </ul>
        <p className="mt-6 border-t border-[#1e1e2e] pt-4 font-mono-token text-[11px] leading-relaxed text-[#6a6978]">
          {note}
        </p>
      </motion.div>
    </div>
  );
}
