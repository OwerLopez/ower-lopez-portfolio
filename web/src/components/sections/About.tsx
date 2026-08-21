"use client";

import React, { useMemo } from "react";
import { PortfolioContent } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { useReducedMotion } from "framer-motion";

export interface AboutProps {
  content: PortfolioContent;
}

export function About({ content }: AboutProps) {
  const { philosophy, faq } = content;
  const shouldReduceMotion = useReducedMotion();

  const accordionItems = useMemo(() => {
    const flatItems: Array<{ id: string; question: string; answer: string }> = [];

    faq.items.forEach((item, index) => {
      if (item.questions && item.questions.length > 0) {
        item.questions.forEach((q, qIndex) => {
          flatItems.push({
            id: `faq-${index}-${qIndex}`,
            question: q.question,
            answer: q.answer,
          });
        });
      } else {
        flatItems.push({
          id: `faq-${index}`,
          question: item.question,
          answer: item.answer,
        });
      }
    });

    return flatItems;
  }, [faq.items]);

  return (
    <div aria-label="About and FAQ" className="w-full">
      <SectionHeader
        kicker={philosophy.kicker}
        heading={`${philosophy.headingLead} ${philosophy.headingAccent}`}
        description={philosophy.description}
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {philosophy.principles.map((principle, idx) => (
          <Reveal key={principle.index} delay={shouldReduceMotion ? 0 : idx * 0.1}>
            <div className="card p-6 h-full flex flex-col gap-3">
              <div className="mono-label text-[var(--color-accent-warm)]">
                {principle.index}
              </div>
              <h3 className="text-xl font-bold text-[var(--color-ink)]">
                {principle.title}
              </h3>
              <p className="text-[var(--color-muted)] leading-relaxed text-sm">
                {principle.detail}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="card overflow-hidden">
          <div className="p-6 border-b border-[var(--color-border)] bg-[var(--color-base-raised)]">
            <h4 className="font-bold text-[var(--color-ink)]">{philosophy.panelTitle}</h4>
          </div>
          <div className="p-6">
            <dl className="space-y-4">
              {philosophy.facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0 pb-4 last:pb-2"
                >
                  <dt className="text-sm font-medium text-[var(--color-muted)]">{fact.key}</dt>
                  <dd className="text-sm font-bold text-[var(--color-ink)] text-left sm:text-right mt-1 sm:mt-0 font-mono">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          {philosophy.panelFooter && (
            <div className="p-4 border-t border-[var(--color-border)] flex justify-between items-center bg-[var(--color-base-raised)] text-xs font-mono text-[var(--color-muted)]">
              <div>{philosophy.panelFooter.left}</div>
              <div>{philosophy.panelFooter.right}</div>
            </div>
          )}
        </div>
      </Reveal>

      <hr className="my-16 border-[var(--color-border)]" />

      <Reveal>
        <div className="mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-ink)] mb-3">
            {faq.heading}
          </h3>
          <p className="text-base text-[var(--color-muted)] max-w-2xl">{faq.description}</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="max-w-3xl">
          <Accordion items={accordionItems} className="w-full" />
        </div>
      </Reveal>
    </div>
  );
}
