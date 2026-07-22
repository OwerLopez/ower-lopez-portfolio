import { Database, GitBranch, Server, Cpu } from "lucide-react";
import type { ComponentType } from "react";

interface Stage {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  sub: string;
}

const STAGES: Stage[] = [
  { Icon: Database, label: "SOURCE", sub: "SQL · NoSQL" },
  { Icon: GitBranch, label: "PIPELINE", sub: "ETL · Batch" },
  { Icon: Cpu, label: "MODEL", sub: "ONNX · XAI" },
  { Icon: Server, label: "SERVE", sub: "REST · JWT" },
];

/** Conector con linea de flujo animada + paquetes de datos viajando. */
function Connector() {
  return (
    <div className="relative mx-1 h-6 flex-1" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 24"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="12"
          x2="100"
          y2="12"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="12"
          x2="100"
          y2="12"
          stroke="var(--color-accent)"
          strokeWidth="1.4"
          strokeDasharray="4 10"
          className="motion-safe:animate-[var(--animate-flow)]"
        />
      </svg>
      <span
        className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--color-accent-cyan)] shadow-[0_0_8px_var(--color-accent-cyan)] motion-safe:animate-[travel_2.4s_linear_infinite]"
        style={{ marginLeft: "-3px" }}
      />
    </div>
  );
}

/**
 * Visualizacion de un pipeline de datos (fuente → proceso → modelo → servicio)
 * con paquetes que fluyen entre etapas. Puramente presentacional y sin idioma
 * (etiquetas tecnicas universales), por lo que se renderiza en el servidor.
 */
export function DataPipeline({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex items-center">
        {STAGES.map((stage, index) => (
          <div key={stage.label} className="contents">
            <div className="group/stage flex flex-col items-center gap-2 text-center">
              <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-white/12 bg-[rgba(15, 13, 20,0.7)] text-[var(--color-accent-2)] shadow-[0_0_20px_rgba(240, 112, 13,0.15)] transition-colors duration-300 group-hover/stage:border-[var(--color-accent)]/50">
                <span className="absolute inset-0 rounded-xl bg-[var(--color-accent)]/10 opacity-0 blur-md transition-opacity duration-300 group-hover/stage:opacity-100" />
                <stage.Icon className="h-5 w-5" />
              </span>
              <span className="font-mono-token text-[9.5px] font-semibold tracking-[0.14em] text-[var(--color-ink)]">
                {stage.label}
              </span>
              <span className="font-mono-token text-[8.5px] tracking-[0.08em] text-[var(--color-faint)]">
                {stage.sub}
              </span>
            </div>
            {index < STAGES.length - 1 && <Connector />}
          </div>
        ))}
      </div>
    </div>
  );
}
