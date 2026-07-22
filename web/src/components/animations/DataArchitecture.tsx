"use client";

import { motion } from "framer-motion";
import { Database, Filter, Boxes, BrainCircuit, Rocket } from "lucide-react";
import type { ComponentType } from "react";
import type { ArchitectureContent } from "@/types/content";

const ICONS: ComponentType<{ className?: string }>[] = [
  Database,
  Filter,
  Boxes,
  BrainCircuit,
  Rocket,
];

/**
 * Diagrama de arquitectura de datos: capas conectadas por una tuberia vertical
 * con paquetes que descienden. Cada capa aparece en cascada al hacer scroll.
 */
export function DataArchitecture({ content }: { content: ArchitectureContent }) {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", `${(x / rect.width) * 100}%`);
    card.style.setProperty("--my", `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--mx", "50%");
    card.style.setProperty("--my", "0%");
  };

  return (
    <div>
      <div className="relative pl-[52px]">
        {/* Tuberia vertical con flujo animado */}
        <div className="absolute bottom-3 left-[21px] top-3 w-px overflow-visible">
          <div className="absolute inset-0 bg-white/[0.08]" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-accent)]/50 via-[var(--color-accent-cyan)]/40 to-transparent" />
          <span className="absolute left-[-2px] h-2 w-2 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_10px_var(--color-accent-cyan)] motion-safe:animate-[travel-y_3s_linear_infinite]" />
          <span className="absolute left-[-2px] h-2 w-2 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)] motion-safe:animate-[travel-y_3s_linear_infinite_1.5s]" />
        </div>

        <div className="flex flex-col gap-4">
          {content.layers.map((layer, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.12,
                }}
                className="group relative"
              >
                {/* Nodo sobre la tuberia */}
                <span className="absolute left-[-52px] top-4 grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-[rgba(15, 13, 20,0.85)] text-[var(--color-accent-2)] shadow-[0_0_20px_rgba(240, 112, 13,0.18)] transition-colors duration-300 group-hover:border-[var(--color-accent)]/60">
                  <Icon className="h-5 w-5" />
                </span>

                <div
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="card-spotlight relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors duration-300 hover:border-[var(--color-accent)]/30"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-[1.15rem] font-semibold tracking-[-0.01em]">
                      {layer.label}
                    </h3>
                    <span className="font-mono-token text-[10.5px] tracking-[0.12em] text-[var(--color-accent-2)]">
                      {String(i + 1).padStart(2, "0")} / {String(content.layers.length).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[0.92rem] text-[var(--color-muted)]">
                    {layer.detail}
                  </p>
                  <div className="font-mono-token mt-3 text-[11px] leading-relaxed tracking-[0.03em] text-[var(--color-faint)]">
                    {layer.tech}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/[0.05] p-5">
        <span className="mt-1.5 h-2 w-2 flex-none rotate-45 bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]" />
        <p className="text-[0.95rem] leading-[1.6] text-[var(--color-muted)]">
          {content.note}
        </p>
      </div>
    </div>
  );
}
