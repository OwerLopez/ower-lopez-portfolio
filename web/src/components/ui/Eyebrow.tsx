import { cn } from "@/lib/utils";

/** Etiqueta editorial monoespaciada que precede a cada seccion (ej. "01 — Perfil"). */
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
        "font-mono-token inline-flex items-center gap-3 text-xs font-medium tracking-[0.18em] uppercase",
        tone === "accent"
          ? "text-[var(--color-accent)]"
          : "text-[var(--color-faint)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-px w-10",
          tone === "accent"
            ? "bg-[var(--color-accent)]"
            : "bg-[var(--color-line)]",
        )}
      />
      {children}
    </div>
  );
}
