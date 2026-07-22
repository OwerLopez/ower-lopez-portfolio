"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Layers } from "lucide-react";
import type { FaqContent } from "@/types/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Faq({ content }: { content: FaqContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section
      id="faq"
      className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-24 sm:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column Intro */}
        <div className="lg:col-span-5 sticky top-28">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.05] mt-4">
            {content.heading}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 max-w-md">
            {content.description}
          </p>
        </div>

        {/* Right Column Interactive Accordion */}
        <div className="lg:col-span-7 space-y-4">
          {content.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="rounded-2xl border border-white/10 bg-[#09080d]/80 overflow-hidden backdrop-blur-xl transition-all duration-300 hover:border-amber-400/40"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-medium text-lg sm:text-xl text-white hover:text-amber-400 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-amber-400">
                      0{idx + 1}
                    </span>
                    <span>{item.question}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-2 border-t border-white/5 text-zinc-300 text-sm sm:text-base leading-relaxed">
                        <div className="font-mono text-[11px] text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5" />
                          <span>CATEGORÍA: {item.category}</span>
                        </div>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
