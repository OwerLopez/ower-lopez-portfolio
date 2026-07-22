import type { AboutContent } from "@/types/content";
import { Reveal } from "@/components/animations/Reveal";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function About({ content }: { content: AboutContent }) {
  return (
    <section
      id="about"
      className="relative z-[2] mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)] py-[clamp(90px,12vw,150px)]"
    >
      <Reveal>
        <Eyebrow className="mb-7">{content.eyebrow}</Eyebrow>
      </Reveal>

      <div className="grid grid-cols-1 items-start gap-[clamp(32px,6vw,90px)] lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Reveal as="h2" className="max-w-[20ch] text-[clamp(1.7rem,3.4vw,2.9rem)] font-semibold leading-[1.18] tracking-[-0.025em]">
            {content.heading}
          </Reveal>

          {content.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={120 + index * 60}>
              <p className="mt-6 max-w-[56ch] text-[1.08rem] leading-[1.7] text-[var(--color-muted)]">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="glass-panel rounded-[18px] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="font-mono-token mb-6 text-[11px] tracking-[0.15em] text-[var(--color-faint)]">
              {content.panelTitle}
            </div>
            <dl className="flex flex-col gap-5">
              {content.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="mb-0.5 text-[0.8rem] text-[var(--color-faint)]">
                    {fact.label}
                  </dt>
                  <dd className="text-base font-medium">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
