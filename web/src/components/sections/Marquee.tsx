/** Cinta infinita de tecnologías con chips coloreados por categoría. */
import type { PortfolioContent } from "@/types/content";

const GLOW: Record<string, string> = {
  Backend: "text-[#ff7a18] border-[#ff7a18]/30",
  Data: "text-[#e11d74] border-[#e11d74]/30",
  AI: "text-[#8b5cf6] border-[#8b5cf6]/30",
  Security: "text-[#fbbf24] border-[#fbbf24]/30",
  DevOps: "text-[#34d399] border-[#34d399]/30",
  Cloud: "text-[#22d3ee] border-[#22d3ee]/30",
};

export function Marquee({ content }: { content: PortfolioContent }) {
  return (
    <div aria-label="Tecnologias" className="marquee-mask relative z-10 flex h-12 w-full shrink-0 items-center overflow-hidden border-y border-line bg-surface">
      <div className="animate-marquee flex w-max shrink-0 items-center gap-3">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0 items-center gap-3 pr-10">
            {content.marquee.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className={`font-mono-token inline-flex items-center gap-2.5 whitespace-nowrap border bg-surface-raised px-4 py-2 text-[11px] tracking-wide ${GLOW[item.category] ?? "text-muted border-line"}`}
              >
                <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-current opacity-70" />
                {item.name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
