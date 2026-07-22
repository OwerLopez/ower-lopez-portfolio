import type { ArchitectureContent } from "@/types/content";
import { Reveal } from "@/components/animations/Reveal";
import { DataArchitecture } from "@/components/animations/DataArchitecture";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Architecture({ content }: { content: ArchitectureContent }) {
  return (
    <section
      id="architecture"
      className="relative z-[2] mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)] py-[clamp(60px,9vw,120px)]"
    >
      <Reveal>
        <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" className="text-[clamp(1.9rem,4vw,3.2rem)] font-bold tracking-[-0.03em]">
        {content.heading}
      </Reveal>
      <Reveal delay={100}>
        <p className="mb-14 mt-3 max-w-[56ch] text-[1.05rem] text-[var(--color-muted)]">
          {content.description}
        </p>
      </Reveal>

      <div className="mx-auto max-w-[720px]">
        <DataArchitecture content={content} />
      </div>
    </section>
  );
}
