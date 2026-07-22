import type { AboutContent } from "@/types/content";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function About({ content }: { content: AboutContent }) {
  return (
    <section
      id="about"
      className="relative z-[2] mx-auto max-w-[1240px] px-[clamp(20px,5vw,72px)] py-[clamp(90px,12vw,150px)]"
    >
      <Reveal>
        <Eyebrow className="mb-7">{content.eyebrow}</Eyebrow>
      </Reveal>

      <div className="grid grid-cols-1 items-start gap-[clamp(32px,6vw,80px)] lg:grid-cols-[1.55fr_1fr]">
        <div>
          <Reveal
            as="h2"
            className="max-w-[20ch] text-[clamp(1.8rem,3.6vw,3.1rem)] font-semibold leading-[1.15] tracking-[-0.028em]"
          >
            {content.heading}
          </Reveal>

          {content.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={120 + index * 60}>
              <p className="mt-6 max-w-[58ch] text-[1.08rem] leading-[1.72] text-[var(--color-muted)]">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Ficha técnica */}
        <Reveal delay={120}>
          <div className="group card-spotlight glass-panel spin-border relative overflow-hidden rounded-[20px] p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            <div className="mb-6 flex items-center justify-between border-b border-white/[0.07] pb-4">
              <span className="font-mono-token text-[11px] tracking-[0.15em] text-[var(--color-accent-2)]">
                {content.panelTitle}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]" />
            </div>
            <dl className="flex flex-col divide-y divide-white/[0.05]">
              {content.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 py-3.5 first:pt-0 last:pb-0"
                >
                  <dt className="font-mono-token text-[10.5px] uppercase tracking-[0.14em] text-[var(--color-faint)]">
                    {fact.label}
                  </dt>
                  <dd className="text-right text-[15px] font-medium text-[var(--color-ink)]">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="andean-fret mt-6 h-3 opacity-35" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
