"use client";

import { motion } from "framer-motion";
import { Cpu, Terminal, Zap, ShieldCheck, Database, Layers } from "lucide-react";

interface StoryCard {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  tech: string[];
}

const STORIES: StoryCard[] = [
  {
    step: "01 — ARQUITECTURA DE DATOS",
    title: "Ingesta & Pipeline ETL",
    subtitle: "Procesamiento de datos relacionales y NoSQL",
    description:
      "Diseño de tuberías de extracción, limpieza y transformación masiva con Python, SQL avanzado y consultas optimizadas para evitar cuellos de botella.",
    metric: "< 50 ms",
    metricLabel: "TIEMPO DE INGESTA",
    tech: ["Python", "PostgreSQL", "Pandas", "SQL Server"],
  },
  {
    step: "02 — MODELADO DE IA EMBEBIDA",
    title: "Inferencia In-Process ONNX",
    subtitle: "ML corriendo donde residen los datos",
    description:
      "Integración directa de modelos Random Forest exportados a ONNX Runtime ejecutados en el mismo proceso Spring Boot sin sobrecosto de red.",
    metric: "20 ms P99",
    metricLabel: "LATENCIA INFERENCIA",
    tech: ["Java 17", "Spring Boot", "ONNX Runtime", "Random Forest"],
  },
  {
    step: "03 — SEGURIDAD & ESCALABILIDAD",
    title: "Zero-Downtime APIs",
    subtitle: "Autenticación JWT & Monitoreo Telemétrico",
    description:
      "Servicios REST contenerizados con Docker, control de acceso granular JWT, migraciones declarativas y documentación OpenAPI.",
    metric: "99.9%",
    metricLabel: "DISPONIBILIDAD SLA",
    tech: ["Docker", "JWT", "Swagger", "Oracle Cloud"],
  },
];

export function ScrollStorytelling() {
  return (
    <section className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-24 sm:py-32">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="font-mono text-xs text-amber-400 font-semibold uppercase tracking-widest mb-3">
          SECUENCIA DE INGENIERÍA
        </div>
        <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
          Fases de Construcción de Sistemas
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {STORIES.map((story, idx) => (
          <motion.div
            key={story.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="rounded-3xl border border-white/10 bg-[#09080d]/80 p-8 backdrop-blur-xl flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6 font-mono text-xs text-amber-400">
                <span>{story.step}</span>
                <span className="text-zinc-500">FASE 0{idx + 1}</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-2">
                {story.title}
              </h3>
              <h4 className="font-mono text-xs text-cyan-400 uppercase tracking-widest mb-4">
                {story.subtitle}
              </h4>

              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {story.description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 mb-4">
                <div className="font-mono text-xl font-bold text-amber-400">
                  {story.metric}
                </div>
                <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
                  {story.metricLabel}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {story.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
