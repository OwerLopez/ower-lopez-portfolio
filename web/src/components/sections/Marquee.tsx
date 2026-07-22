"use client";

import { Cpu } from "lucide-react";

export function Marquee({ items }: { items: string[] }) {
  const row1 = items;
  const row2 = [...items].reverse();

  return (
    <section className="relative z-20 overflow-hidden border-y border-white/10 bg-[#060509] py-6">
      {/* Side Sticky Telemetry Badge */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 hidden md:flex h-full items-center bg-gradient-to-r from-[#030305] via-[#030305]/90 to-transparent pl-6 sm:pl-12 pr-12">
        <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 font-mono text-xs font-semibold text-amber-400 backdrop-blur-md">
          <Cpu className="h-3.5 w-3.5 text-amber-400" />
          <span>PRODUCTION_STACK</span>
        </div>
      </div>

      <div className="marquee-mask space-y-3">
        {/* Row 1: Forward */}
        <div className="flex w-max whitespace-nowrap animate-[marq_36s_linear_infinite] hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-4 px-2" aria-hidden={copy === 1}>
              {row1.map((tech) => (
                <div
                  key={`${copy}-${tech}`}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono text-zinc-300 backdrop-blur-md transition-all hover:border-amber-400/50 hover:bg-white/10 hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Row 2: Reverse */}
        <div className="flex w-max whitespace-nowrap animate-[marqrev_42s_linear_infinite] hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex gap-4 px-2" aria-hidden={copy === 1}>
              {row2.map((tech) => (
                <div
                  key={`${copy}-${tech}`}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs font-mono text-zinc-400 backdrop-blur-md transition-all hover:border-cyan-400/50 hover:bg-white/10 hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
