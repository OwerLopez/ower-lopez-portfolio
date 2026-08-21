import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "warm";
  className?: string;
}

/**
 * Small tech tag / badge — server component.
 */
export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[11px] font-medium tracking-wide",
        variant === "default" && "border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)]",
        variant === "accent" && "border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 text-[var(--color-accent)]",
        variant === "warm" && "border border-[var(--color-accent-warm)]/20 bg-[var(--color-accent-warm)]/10 text-[var(--color-accent-warm)]",
        className,
      )}
    >
      {children}
    </span>
  );
}
