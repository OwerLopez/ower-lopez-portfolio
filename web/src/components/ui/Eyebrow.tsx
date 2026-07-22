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
        "font-mono-token text-xs tracking-[0.22em]",
        tone === "accent" ? "text-[var(--color-accent)]" : "text-[var(--color-faint)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
