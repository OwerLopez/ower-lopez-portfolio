import { Reveal } from "@/components/animations/Reveal";
import { InteractiveTerminal } from "@/components/animations/InteractiveTerminal";
import { MetricsDashboard } from "@/components/animations/MetricsDashboard";
import { VisitCounter } from "@/components/animations/VisitCounter";

/**
 * Franja "sala de maquinas": terminal interactiva (el visitante puede escribir
 * comandos) + panel de observabilidad + contador real de visitas.
 * Etiquetas tecnicas universales (SQL/metricas), por lo que no requiere i18n.
 */
export function DataOps() {
  return (
    <section
      aria-label="Live data metrics"
      className="relative z-[2] mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)] py-[clamp(40px,6vw,80px)]"
    >
      <Reveal>
        <div className="font-mono-token mb-8 flex items-center gap-3 text-[11px] tracking-[0.2em] text-[var(--color-faint)]">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-70" />
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          </span>
          [ LIVE — DATA ENGINEERING CONSOLE ]
          <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
          <VisitCounter />
        </div>
      </Reveal>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal from="left" delay={80}>
          <InteractiveTerminal />
        </Reveal>
        <Reveal from="right" delay={160}>
          <MetricsDashboard />
        </Reveal>
      </div>
    </section>
  );
}
