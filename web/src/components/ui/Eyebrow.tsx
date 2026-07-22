import { cn } from "@/lib/utils";

/** Etiqueta monoespaciada que precede a cada seccion (ej. "01 — PERFIL"). */
export function Eyebrow({
  children,
  className,
  tone = "accent",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "accent" | "muted";
}) {
  return (
    <div
      className={cn(
        "font-mono-token inline-flex items-center gap-3 text-xs tracking-[0.22em]",
        tone === "accent" ? "text-[var(--color-accent)]" : "text-[var(--color-faint)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-8",
          tone === "accent"
            ? "bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-cyan)]"
            : "bg-[var(--color-line)]",
        )}
      />
      {children}
    </div>
  );
}
