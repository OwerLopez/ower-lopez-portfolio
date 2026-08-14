"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PortfolioContent } from "@/types/content";
import { StackRadar } from "@/components/sections/StackRadar";

/**
 * Stack como radar de dominio: diagrama SVG interactivo que reemplaza
 * la grilla estática. Cada dominio enciende su eje y revela el stack
 * técnico en el panel lateral.
 */
export function Stack({ content }: { content: PortfolioContent }) {
  const { stack } = content;
  const reduce = useReducedMotion();

  return (
    <section id="stack" className="relative py-8 sm:py-12" aria-label="Stack">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <p className="font-mono-token flex items-center gap-4 text-xs tracking-[0.35em] text-[#a9a8b8]">
            <span className="inline-block h-px w-12 bg-[#2e2e42]" />
            {stack.kicker}
          </p>
          <h2 className="mt-3 text-3xl leading-[1.12] font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            {stack.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-base text-[#a9a8b8]">{stack.description}</p>
        </motion.div>

        <StackRadar groups={stack.groups} note={stack.note} />
      </div>
    </section>
  );
}
