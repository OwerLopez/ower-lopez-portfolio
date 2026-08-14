"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PortfolioContent } from "@/types/content";
import { WorkCarousel } from "@/components/sections/WorkCarousel";

/**
 * Proyectos como carrusel horizontal de misiones: la pieza principal y el
 * registro de misiones se deslizan como cartas de una baraja; debajo queda
 * la matriz comparativa como tabla de datos crudos.
 */
export function Work({ content }: { content: PortfolioContent }) {
  const { work } = content;
  const reduce = useReducedMotion();

  return (
    <section id="work" className="relative py-8 sm:py-12" aria-label="Proyectos">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 max-w-2xl"
        >
          <p className="font-mono-token flex items-center gap-4 text-xs tracking-[0.35em] text-[#a9a8b8]">
            <span className="inline-block h-px w-12 bg-[#2e2e42]" />
            {work.kicker}
          </p>
          <h2 className="mt-3 text-3xl leading-[1.12] font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            {work.heading}
          </h2>
          <p className="mt-3 text-base text-[#a9a8b8]">{work.description}</p>
        </motion.div>

        <WorkCarousel content={work} />

        {/* Matriz de comparación */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 overflow-x-auto"
        >
          <h3 className="font-mono-token mb-6 text-xs tracking-[0.3em] text-[#6a6978]">{work.matrixTitle}</h3>
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#2e2e42] font-mono-token text-[10px] uppercase tracking-[0.2em] text-[#6a6978]">
                <th className="py-4 pr-5 text-left font-medium">{work.matrixHeaders.project}</th>
                <th className="py-4 pr-5 text-left font-medium">{work.matrixHeaders.domain}</th>
                <th className="py-4 pr-5 text-left font-medium">{work.matrixHeaders.stack}</th>
                <th className="py-4 pr-5 text-left font-medium">{work.matrixHeaders.result}</th>
                <th className="py-4 pr-5 text-left font-medium">{work.matrixHeaders.role}</th>
                <th className="py-4 text-left font-medium">{work.matrixHeaders.year}</th>
              </tr>
            </thead>
            <tbody>
              {work.matrix.map((row) => (
                <tr
                  key={row.project}
                  className="border-b border-[#1e1e2e]/60 transition-colors duration-300 last:border-b-0 hover:bg-[#0c0c14]/60"
                >
                  <td className="py-4 pr-5 font-semibold text-ink">{row.project}</td>
                  <td className="py-4 pr-5 text-[#a9a8b8]">{row.domain}</td>
                  <td className="font-mono-token py-4 pr-5 text-xs text-[#a9a8b8]">{row.stack}</td>
                  <td className="py-4 pr-5 text-[#ff7a18]">{row.result}</td>
                  <td className="py-4 pr-5 text-[#a9a8b8]">{row.role}</td>
                  <td className="font-mono-token py-4 tabular-nums text-[#6a6978]">{row.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
