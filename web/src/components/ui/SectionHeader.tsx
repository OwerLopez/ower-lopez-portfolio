import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  kicker: string;
  heading: string;
  description?: string;
  className?: string;
}

/**
 * DRY section header pattern: kicker label + heading + optional description.
 * Server component — no client interactivity needed.
 */
export function SectionHeader({ kicker, heading, description, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      <p className="mono-label mb-3 flex items-center gap-4">
        <span className="inline-block h-px w-10 bg-[var(--color-border-strong)]" aria-hidden />
        {kicker}
      </p>
      <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
        {heading}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
