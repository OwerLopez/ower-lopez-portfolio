"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PortfolioContent } from "@/types/content";
import { FlowDiagram } from "@/components/sections/FlowDiagram";

/**
 * Arquitectura como diagrama de circuito vivo: nodos E1→E5 conectados
 * por líneas con flujo de energía animado; las fichas se iluminan al hover.
 */
export function Architecture({ content }: { content: PortfolioContent }) {
  const { architecture } = content;
  const reduce = useReducedMotion();

  return (
    <section id="architecture" className="relative py-28" aria-label="Arquitectura">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 max-w-3xl"
        >
          <p className="font-mono-token flex items-center gap-4 text-xs tracking-[0.35em] text-[#a9a8b8]">
            <span className="inline-block h-px w-12 bg-[#2e2e42]" />
            {architecture.kicker}
          </p>
          <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            {architecture.headingLead}{" "}
            <span className="text-gradient-flame">{architecture.headingAccent}</span>
          </h2>
          <p className="mt-4 text-base text-[#a9a8b8]">{architecture.description}</p>
          <p className="mt-8 border-l-2 border-[#8b5cf6]/60 pl-4 text-sm leading-relaxed text-[#a9a8b8]">
            {architecture.note}
          </p>
        </motion.div>

        <FlowDiagram stages={architecture.stages} note={architecture.note} />
      </div>
    </section>
  );
}
