import type { WorkContent } from "@/types/content";
import { Reveal } from "@/components/animations/Reveal";
import { DataPipeline } from "@/components/animations/DataPipeline";
import { ProjectComparison } from "@/components/animations/ProjectComparison";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TechTag } from "@/components/ui/TechTag";
import { TiltCard } from "@/components/ui/TiltCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { cn } from "@/lib/utils";

export function Work({ content }: { content: WorkContent }) {
  const { featured } = content;

  return (
    <section
      id="work"
      className="relative z-[2] mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)] py-[clamp(90px,12vw,150px)]"
    >
      <Reveal>
        <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" className="text-[clamp(1.9rem,4vw,3.2rem)] font-bold tracking-[-0.03em]">
        {content.heading}
      </Reveal>
      <Reveal delay={100}>
        <p className="mb-14 mt-3 max-w-[56ch] text-[1.1rem] text-[var(--color-muted)]">
          {content.description}
        </p>
      </Reveal>

      {/* Case study destacado */}
      <TiltCard
        as="article"
        max={4}
        className="group overflow-hidden rounded-[24px] border border-white/[0.09] bg-[linear-gradient(160deg,rgba(255, 171, 56,0.06),rgba(255,255,255,0.015))] shadow-[0_30px_80px_rgba(0,0,0,0.4)] backdrop-blur-md"
      >
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="p-[clamp(28px,4vw,52px)]">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="font-mono-token rounded-full border border-[var(--color-accent)]/35 bg-[var(--color-accent)]/[0.08] px-3 py-1.5 text-[11px] tracking-[0.15em] text-[var(--color-accent-2)]">
                  {featured.flag}
                </span>
                <span className="font-mono-token text-[11px] tracking-[0.1em] text-[var(--color-faint)]">
                  {featured.category}
                </span>
              </div>

              <h3 className="text-[clamp(2rem,3.6vw,2.9rem)] font-bold leading-none tracking-[-0.03em]">
                {featured.title}
              </h3>

              <p className="mt-4 max-w-[46ch] text-[1.06rem] leading-[1.65] text-[var(--color-muted)]">
                {featured.summary}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {featured.tags.map((tag) => (
                  <TechTag key={tag}>{tag}</TechTag>
                ))}
              </div>

              <p className="mt-6 max-w-[48ch] border-l-2 border-[var(--color-accent)]/40 pl-4 text-[0.95rem] leading-[1.7] text-[var(--color-faint)]">
                {featured.note}
              </p>
            </div>

            {/* Panel de metricas */}
            <div className="relative flex flex-col justify-center border-t border-white/[0.07] p-[clamp(24px,3vw,40px)] lg:border-l lg:border-t-0 [background:repeating-linear-gradient(135deg,rgba(255,255,255,0.025)_0_2px,transparent_2px_11px)]">
              <div className="font-mono-token absolute right-4 top-4 text-[10px] tracking-[0.15em] text-[var(--color-faint)]">
                [ arquitectura ]
              </div>

              {/* Pipeline de datos animado: fuente → proceso → modelo → servicio */}
              <DataPipeline className="mb-7 mt-2" />

              <div className="grid grid-cols-2 gap-3.5">
                {featured.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-[14px] border border-white/10 bg-[rgba(15, 13, 20,0.6)] p-5 backdrop-blur-sm"
                  >
                    <div
                      className={cn(
                        "font-bold tracking-[-0.02em]",
                        metric.highlight
                          ? "text-[clamp(1.4rem,2.4vw,2rem)] text-[var(--color-accent-2)]"
                          : "text-[clamp(1.8rem,3vw,2.6rem)] text-white",
                      )}
                    >
                      {metric.value}
                    </div>
                    <div className="font-mono-token mt-1 text-[10px] tracking-[0.1em] text-[var(--color-faint)]">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>

      {/* Proyectos secundarios */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {content.secondary.map((project, index) => (
          <ProjectCard key={project.title} project={project} delay={index * 100} />
        ))}
      </div>

      {/* Tabla comparativa de proyectos */}
      <Reveal delay={80} className="mt-14">
        <ProjectComparison
          comparisonTitle={content.comparisonTitle}
          comparisonHeaders={content.comparisonHeaders}
          comparison={content.comparison}
        />
      </Reveal>
    </section>
  );
}
