"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/animations/Counter";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Puntos del sparkline de throughput (valores esteticos, forma realista). */
const SPARK = [18, 30, 24, 42, 38, 55, 48, 70, 62, 84, 78, 96];

function sparkPath(points: number[], w: number, h: number): string {
  const max = Math.max(...points);
  const step = w / (points.length - 1);
  return points
    .map((p, i) => {
      const x = i * step;
      const y = h - (p / max) * (h - 6) - 3;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

/**
 * Panel de observabilidad animado: carrera de latencia (2000ms -> 20ms),
 * gauge radial de recall, sparkline de throughput y contadores.
 * Etiquetas tecnicas universales (sin i18n), estilo Grafana premium.
 */
export function MetricsDashboard({ className }: { className?: string }) {
  const R = 42;
  const CIRC = 2 * Math.PI * R;
  const line = sparkPath(SPARK, 220, 64);
  const area = `${line} L 220 64 L 0 64 Z`;

  return (
    <div
      className={`grid grid-cols-1 gap-3.5 sm:grid-cols-2 ${className ?? ""}`}
    >
      {/* Carrera de latencia */}
      <div className="rounded-[16px] border border-white/10 bg-[rgba(15, 13, 20,0.6)] p-5 sm:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono-token text-[10px] tracking-[0.15em] text-[var(--color-faint)]">
            INFERENCE LATENCY — BEFORE / AFTER
          </span>
          <span className="font-mono-token rounded-full border border-[#4ade80]/30 bg-[#4ade80]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#4ade80]">
            −99%
          </span>
        </div>

        {[
          { label: "REST EXTERNO", value: "2000 ms", pct: 100, tone: "bg-[var(--color-peru-red)]/70" },
          { label: "ONNX EMBEBIDO", value: "20 ms", pct: 4, tone: "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-cyan)]" },
        ].map((bar, i) => (
          <div key={bar.label} className={i === 0 ? "mb-3.5" : ""}>
            <div className="mb-1.5 flex justify-between">
              <span className="font-mono-token text-[10.5px] text-[var(--color-muted)]">
                {bar.label}
              </span>
              <span className="font-mono-token tabular-nums text-[11px] font-semibold text-[var(--color-ink)]">
                {bar.value}
              </span>
            </div>
            <div className="h-[7px] overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className={`h-full rounded-full ${bar.tone} shadow-[0_0_10px_rgba(255, 171, 56,0.4)]`}
                initial={{ width: "0%" }}
                whileInView={{ width: `${bar.pct}%` }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.15 + i * 0.25 }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Gauge radial: recall */}
      <div className="flex items-center gap-5 rounded-[16px] border border-white/10 bg-[rgba(15, 13, 20,0.6)] p-5">
        <svg viewBox="0 0 100 100" className="h-[92px] w-[92px] flex-none -rotate-90">
          <circle cx="50" cy="50" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="8" />
          <motion.circle
            cx="50"
            cy="50"
            r={R}
            fill="none"
            stroke="url(#gaugeGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={{ strokeDashoffset: CIRC }}
            whileInView={{ strokeDashoffset: CIRC * (1 - 0.96) }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          />
          <defs>
            <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--color-accent-deep)" />
              <stop offset="100%" stopColor="var(--color-accent-cyan)" />
            </linearGradient>
          </defs>
        </svg>
        <div>
          <div className="tabular-nums text-[2rem] font-bold leading-none tracking-[-0.02em]">
            <Counter value={96} suffix="%" />
          </div>
          <div className="font-mono-token mt-1.5 text-[10px] tracking-[0.14em] text-[var(--color-faint)]">
            MODEL RECALL
          </div>
          <div className="font-mono-token mt-0.5 text-[9.5px] text-[var(--color-faint)]/70">
            random_forest · XAI
          </div>
        </div>
      </div>

      {/* Sparkline throughput */}
      <div className="rounded-[16px] border border-white/10 bg-[rgba(15, 13, 20,0.6)] p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-mono-token text-[10px] tracking-[0.15em] text-[var(--color-faint)]">
            PIPELINE THROUGHPUT
          </span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-70" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
          </span>
        </div>
        <svg viewBox="0 0 220 64" className="w-full" aria-hidden="true">
          <defs>
            <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 171, 56,0.35)" />
              <stop offset="100%" stopColor="rgba(255, 171, 56,0)" />
            </linearGradient>
          </defs>
          <motion.path
            d={area}
            fill="url(#sparkFill)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.9 }}
          />
          <motion.path
            d={line}
            fill="none"
            stroke="var(--color-accent-2)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
          />
        </svg>
        <div className="font-mono-token mt-2 flex justify-between text-[9.5px] text-[var(--color-faint)]/70">
          <span>batch · etl</span>
          <span className="text-[#4ade80]">▲ scaling</span>
        </div>
      </div>
    </div>
  );
}
