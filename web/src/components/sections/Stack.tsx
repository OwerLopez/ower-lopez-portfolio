import type { StackContent } from "@/types/content";
import { Reveal } from "@/components/animations/Reveal";
import { SkillMeters } from "@/components/animations/SkillMeters";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Stack({ content }: { content: StackContent }) {
  return (
    <section
      id="stack"
      className="relative z-[2] mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)] py-[clamp(60px,9vw,120px)]"
    >
      <Reveal>
        <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" className="text-[clamp(1.9rem,4vw,3.2rem)] font-bold tracking-[-0.03em]">
        {content.heading}
      </Reveal>
      <Reveal delay={100}>
        <p className="mb-12 mt-3 max-w-[52ch] text-[1.05rem] text-[var(--color-muted)]">
          {content.description}
        </p>
      </Reveal>

      {/* Barras de competencia (enfoque data engineering) */}
      <Reveal delay={120}>
        <SkillMeters className="mb-14 rounded-[20px] border border-white/[0.07] bg-white/[0.015] p-[clamp(24px,4vw,44px)]" />
      </Reveal>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[20px] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
        {content.groups.map((group, index) => (
          <Reveal key={group.label} delay={(index % 3) * 60} className="bg-[var(--color-surface)]">
            <div className="group relative h-full overflow-hidden p-[30px] transition-colors duration-300 hover:bg-white/[0.02]">
              <span className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-gradient-to-b from-[var(--color-accent)] to-[var(--color-accent-cyan)] transition-transform duration-400 ease-out group-hover:scale-y-100" />
              <div className="font-mono-token mb-[18px] text-[11px] tracking-[0.15em] text-[var(--color-accent-2)]">
                {group.label}
              </div>
              <div className="flex flex-col gap-[11px] text-base text-[#d8d2c8]">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="transition-colors duration-200 hover:text-[var(--color-ink)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
