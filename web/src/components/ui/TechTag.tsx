/** Pildora monoespaciada para tecnologias / etiquetas de proyecto. */
export function TechTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono-token rounded-lg border border-white/[0.08] bg-white/[0.05] px-3 py-1.5 text-xs text-[var(--color-muted)]">
      {children}
    </span>
  );
}
