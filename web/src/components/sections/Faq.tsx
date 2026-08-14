"use client";

import { useState } from "react";
import { Reveal } from "@/components/animations/Reveal";
import type { PortfolioContent } from "@/types/content";

function FaqItem({ item }: { item: NonNullable<PortfolioContent["faq"]["items"]>[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <li className="border-b border-line/60 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-baseline gap-4 py-5 text-left transition-colors duration-300 hover:bg-surface"
      >
        <span className="font-mono-token text-[10px] tracking-[0.25em] text-faint">{item.index}</span>
        <span className="flex-1 text-sm font-semibold text-ink sm:text-base">{item.question}</span>
        <span className="font-mono-token text-xs text-[#ff7a18]">{open ? "−" : "+"}</span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-10 pb-5 text-sm leading-relaxed text-muted">{item.answer}</p>
          {item.questions && item.questions.length > 0 && (
            <ul className="space-y-3 px-10 pb-6">
              {item.questions.map((q) => (
                <li key={q.question} className="border-l-2 border-[#8b5cf6]/50 pl-4">
                  <p className="text-xs font-semibold text-ink">{q.question}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{q.answer}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}

export function Faq({ content }: { content: PortfolioContent }) {
  const { faq } = content;

  return (
    <section id="faq" className="relative z-10 mx-auto max-w-3xl px-5 py-24 sm:px-6 md:py-32" aria-label="Preguntas frecuentes">
      <Reveal>
        <p className="font-mono-token mb-8 flex items-center gap-4 text-xs tracking-[0.35em] text-muted">
          <span className="inline-block h-px w-12 bg-line-strong" />
          {faq.kicker}
        </p>
      </Reveal>

      <Reveal delay={80}>
        <h2 className="font-display text-3xl leading-[1.12] font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
          {faq.heading}
        </h2>
      </Reveal>
      <Reveal delay={140}>
        <p className="mt-4 text-base text-muted">{faq.description}</p>
      </Reveal>

      <Reveal delay={200} variant="block">
        <ul className="mt-10 rounded-2xl border border-line bg-surface px-6 sm:px-8">
          {faq.items.map((item) => (
            <FaqItem key={item.index} item={item} />
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
