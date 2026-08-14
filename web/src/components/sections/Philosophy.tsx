"use client";

import { Reveal, Stagger } from "@/components/animations/Reveal";
import type { PortfolioContent } from "@/types/content";

const NEURAL = "/assets/hero_neural.png";

export function Philosophy({ content }: { content: PortfolioContent }) {
  const { philosophy } = content;

  return (
    <section id="philosophy" className="relative overflow-hidden" aria-label="Filosofía">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage: `url(${NEURAL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.15,
          mixBlendMode: "screen",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base via-base/85 to-base" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <Reveal>
          <p className="font-mono-token mb-4 flex items-center gap-4 text-xs tracking-[0.35em] text-muted">
            <span className="inline-block h-px w-12 bg-line-strong" />
            {philosophy.kicker}
          </p>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <h2 className="font-display text-3xl leading-[1.12] font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
                {philosophy.headingLead}{" "}
                <span className="text-gradient-flame">{philosophy.headingAccent}</span>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">{philosophy.description}</p>
            </Reveal>

            <div className="mt-8 space-y-px border border-line bg-line">
              <Stagger stagger={0.07}>
                {philosophy.principles.map((p, i) => (
                  <Reveal key={p.index} delay={i * 70} variant="block">
                    <div className="group bg-surface px-6 py-6 transition-colors duration-300 hover:bg-surface-raised">
                      <div className="flex items-baseline gap-5">
                        <span className="font-mono-token text-sm font-bold text-[#e11d74]">{p.index}</span>
                        <div>
                          <h3 className="text-lg font-bold tracking-tight text-ink">{p.title}</h3>
                          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted">{p.detail}</p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </Stagger>
            </div>
          </div>

          {/* Ficha personal */}
          <div className="lg:col-span-5">
            <Reveal delay={120} variant="block">
              <div className="border-gradient sticky top-24 rounded-2xl bg-surface-raised/80 p-7 backdrop-blur-xl">
                <p className="font-mono-token text-[10px] tracking-[0.3em] text-faint">{philosophy.panelTitle}</p>
                <dl className="mt-5 divide-y divide-line/60 border-t border-line">
                  {philosophy.facts.map((fact) => (
                    <div key={fact.key} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="font-mono-token text-xs text-faint">{fact.key}</dt>
                      <dd className="text-right text-sm text-muted">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="font-mono-token text-xs text-faint">{philosophy.panelFooter.left}</span>
                  <span className="font-mono-token text-xs text-[#ff7a18]">{philosophy.panelFooter.right}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
