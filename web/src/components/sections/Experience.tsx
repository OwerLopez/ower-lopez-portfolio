import type { ExperienceContent, TimelineItem } from "@/types/content";
import { Reveal } from "@/components/animations/Reveal";
import { TimelineLine } from "@/components/animations/TimelineLine";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cn } from "@/lib/utils";

function Node({ tone }: { tone: TimelineItem["tone"] }) {
  return (
    <span className="absolute left-[-34px] top-[6px] h-[13px] w-[13px]">
      {tone === "accent" && (
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
      )}
      <span
        className={cn(
          "absolute inset-0 rounded-full",
          tone === "accent" &&
            "bg-[var(--color-accent)] shadow-[0_0_0_5px_rgba(255, 171, 56,0.15),0_0_16px_var(--color-accent)]",
          tone === "outline" && "border-2 border-[var(--color-accent)]/70 bg-[#100d16]",
          tone === "muted" && "border-2 border-white/20 bg-[#100d16]",
        )}
      />
    </span>
  );
}

export function Experience({ content }: { content: ExperienceContent }) {
  return (
    <section
      id="experience"
      className="relative z-[2] mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)] py-[clamp(40px,7vw,90px)]"
    >
      <Reveal>
        <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" className="text-[clamp(1.9rem,4vw,3.2rem)] font-bold tracking-[-0.03em]">
        {content.heading}
      </Reveal>
      <Reveal delay={100}>
        <p className="mt-4 max-w-[52ch] text-[1.05rem] text-[var(--color-muted)]">
          {content.description}
        </p>
      </Reveal>

      <div className="relative mt-14 pl-[34px]">
        <TimelineLine />

        {content.items.map((exp, index) => (
          <Reveal
            key={exp.title}
            delay={index * 80}
            className={cn("relative", index < content.items.length - 1 && "mb-11")}
          >
            <Node tone={exp.tone} />
            <div className="font-mono-token text-xs tracking-[0.05em] text-[var(--color-accent-2)]">
              {exp.period}
            </div>
            <h3 className="mt-1.5 text-[1.3rem] font-semibold tracking-[-0.01em]">
              {exp.title}
            </h3>
            <p className="mt-1.5 max-w-[60ch] text-base leading-relaxed text-[var(--color-muted)]">
              {exp.description}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
