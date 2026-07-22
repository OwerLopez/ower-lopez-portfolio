import type { SecondaryProject } from "@/types/content";
import { TechTag } from "./TechTag";
import { TiltCard } from "./TiltCard";
import { cn } from "@/lib/utils";

const toneStyles: Record<SecondaryProject["badgeTone"], string> = {
  gold: "text-[#fbbf24]",
  green: "text-[#4ade80]",
};

const dotStyles: Record<SecondaryProject["badgeTone"], string> = {
  gold: "bg-[#fbbf24] shadow-[0_0_10px_#fbbf24]",
  green: "bg-[#4ade80] shadow-[0_0_10px_#4ade80]",
};

export function ProjectCard({
  project,
}: {
  project: SecondaryProject;
  delay?: number;
}) {
  return (
    <TiltCard
      as="article"
      className="group glass-panel spin-border rounded-[20px] p-[clamp(24px,3vw,38px)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)]"
    >
      <div className="mb-5 flex items-center justify-between">
        <span
          className={cn(
            "font-mono-token inline-flex items-center gap-2 text-[11px] tracking-[0.12em]",
            toneStyles[project.badgeTone]
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", dotStyles[project.badgeTone])} />
          {project.badge}
        </span>
        <span className="font-mono-token text-[11px] text-[var(--color-faint)]">
          {project.meta}
        </span>
      </div>

      <h3 className="text-[1.7rem] font-bold tracking-[-0.02em]">{project.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
        {project.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <TechTag key={tag}>{tag}</TechTag>
        ))}
      </div>
    </TiltCard>
  );
}
