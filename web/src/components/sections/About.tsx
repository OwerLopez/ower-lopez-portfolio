"use client";

import type { AboutContent } from "@/types/content";
import { ShieldCheck, Terminal, Layers, Award } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TiltCard } from "@/components/ui/TiltCard";

export function About({ content }: { content: AboutContent }) {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-24 sm:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Storytelling Narrative */}
        <div className="lg:col-span-7 space-y-8">
          <Eyebrow>{content.eyebrow}</Eyebrow>

          <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
            {content.heading}
          </h2>

          <div className="space-y-6 text-base sm:text-lg leading-relaxed text-zinc-300">
            {content.paragraphs.map((p, i) => (
              <p key={i} className="border-l-2 border-amber-500/40 pl-6 py-1 bg-white/[0.01] rounded-r-xl">
                {p}
              </p>
            ))}
          </div>

          {/* Key Principles Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-2">
              <ShieldCheck className="h-5 w-5 text-amber-400" />
              <span className="font-mono text-xs font-semibold text-white">Sub-Second Latency</span>
              <span className="text-xs text-zinc-400">P99 optimized in-process ML inference</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-2">
              <Layers className="h-5 w-5 text-cyan-400" />
              <span className="font-mono text-xs font-semibold text-white">Data Parity</span>
              <span className="text-xs text-zinc-400">Declarative schemas & strict contract parity</span>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 flex flex-col gap-2">
              <Award className="h-5 w-5 text-emerald-400" />
              <span className="font-mono text-xs font-semibold text-white">Production Ready</span>
              <span className="text-xs text-zinc-400">Zero-downtime ETL & API security</span>
            </div>
          </div>
        </div>

        {/* Right Column: Operational Telemetry Card with Specular 3D Tilt */}
        <div className="lg:col-span-5 sticky top-28">
          <TiltCard className="p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-5 mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-amber-400" />
                <span className="font-mono text-xs font-bold tracking-widest text-amber-400 uppercase">
                  {content.panelTitle}
                </span>
              </div>
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            </div>

            <dl className="divide-y divide-white/10 font-mono text-xs space-y-4">
              {content.facts.map((fact) => (
                <div key={fact.label} className="flex justify-between items-center pt-4 first:pt-0">
                  <dt className="text-zinc-400 uppercase tracking-wider">{fact.label}</dt>
                  <dd className="font-semibold text-white text-right text-sm">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>UNSA SYSTEMS ENG.</span>
              <span className="text-amber-400">QUINTO SUPERIOR</span>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
