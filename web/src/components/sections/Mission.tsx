"use client";

import { Reveal } from "@/components/animations/Reveal";
import type { PortfolioContent } from "@/types/content";

const NEURAL = "/assets/hero_neural.png";

/** Escena 02 — La obsesión. Editorial con imagen neural de fondo. */
export function Mission({ content }: { content: PortfolioContent }) {
  const { mission } = content;

  return (
    <section id="mission" className="relative overflow-hidden scene-glow-violet" aria-label="Misión">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage: `url(${NEURAL})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: 0.2,
          mixBlendMode: "screen",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 42%)",
          maskImage: "linear-gradient(to right, transparent 0%, #000 42%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
        <Reveal>
          <p className="font-mono-token mb-4 flex items-center gap-4 text-xs tracking-[0.35em] text-muted">
            <span className="inline-block h-px w-12 bg-line-strong" />
            {mission.kicker}
          </p>
        </Reveal>

        <div className="max-w-3xl lg:max-w-2xl">
          <Reveal delay={80}>
            <h2 className="font-display text-3xl leading-[1.12] font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
              {mission.headingLead}{" "}
              <span className="text-gradient-magenta">{mission.headingAccent}</span>
            </h2>
          </Reveal>

          <div className="mt-5 space-y-4">
            {mission.paragraphs.map((p, i) => (
              <Reveal key={i} delay={140 + i * 80}>
                <p className="text-base leading-relaxed text-muted sm:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          {/* Ficha operativa */}
          <Reveal delay={320}>
            <dl className="mt-8 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {mission.facts.map((fact) => (
                <div
                  key={fact.key}
                  className="group bg-base px-4 py-5 transition-colors duration-300 hover:bg-surface-raised"
                >
                  <dt className="font-mono-token text-[10px] font-medium uppercase tracking-widest text-faint">
                    {fact.key}
                  </dt>
                  <dd className="mt-2 text-sm font-semibold text-[#ff7a18]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
