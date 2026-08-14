"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { PortfolioContent } from "@/types/content";
import { HorizontalJourney } from "@/components/sections/HorizontalJourney";

/**
 * Trayectoria como línea de fuego horizontal: hitos deslizables en lugar
 * del timeline vertical clásico.
 */
export function Journey({ content }: { content: PortfolioContent }) {
  const { journey } = content;
  const reduce = useReducedMotion();

  return (
    <section id="journey" className="relative py-8 sm:py-12" aria-label="Trayectoria">
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
            {journey.kicker}
          </p>
          <h2 className="mt-3 text-3xl leading-[1.12] font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            {journey.heading}
          </h2>
          <p className="mt-3 text-base text-[#a9a8b8]">{journey.description}</p>
        </motion.div>

        <HorizontalJourney items={journey.items} />
      </div>
    </section>
  );
}
