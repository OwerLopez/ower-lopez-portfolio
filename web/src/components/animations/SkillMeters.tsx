"use client";

import { motion } from "framer-motion";

interface Meter {
  label: string;
  /** Nivel 0–100 (autoevaluacion orientada a data engineering). */
  level: number;
  tag: string;
}

const METERS: Meter[] = [
  { label: "SQL Avanzado", level: 92, tag: "CTEs · Window Fns · Tuning" },
  { label: "Python · Pandas", level: 86, tag: "ETL · NumPy · Análisis" },
  { label: "Java · Spring Boot", level: 88, tag: "APIs REST · JPA" },
  { label: "Data Pipelines", level: 82, tag: "Batch · Ingesta · Modelado" },
  { label: "Cloud (OCI/AWS/GCP)", level: 78, tag: "EC2 · S3 · Foundations" },
  { label: "Machine Learning", level: 74, tag: "ONNX · Random Forest · XAI" },
];

/**
 * Barras de competencia animadas (data-viz on-brand): se llenan al entrar al
 * viewport. Refuerza el enfoque en Data Engineering de un vistazo.
 */
export function SkillMeters({ className }: { className?: string }) {

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
        {METERS.map((m, i) => (
          <div key={m.label}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <span className="text-[0.95rem] font-medium text-[var(--color-ink)]">
                {m.label}
              </span>
              <span className="font-mono-token tabular-nums text-[11px] text-[var(--color-accent-2)]">
                {m.level}%
              </span>
            </div>
            <div className="relative h-[6px] overflow-hidden rounded-full bg-white/[0.06]">
              <motion.span
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[var(--color-accent-deep)] via-[var(--color-accent)] to-[var(--color-accent-cyan)] shadow-[0_0_12px_rgba(255, 171, 56,0.5)]"
                initial={{ width: 0 }}
                whileInView={{ width: `${m.level}%` }}
                viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                transition={{
                  duration: 1.1,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.1 + i * 0.08,
                }}
              />
            </div>
            <div className="font-mono-token mt-1.5 text-[10px] tracking-[0.06em] text-[var(--color-faint)]">
              {m.tag}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
