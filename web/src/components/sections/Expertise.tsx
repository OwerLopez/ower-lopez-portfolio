"use client";

import React from "react";
import { PortfolioContent } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { useReducedMotion } from "framer-motion";
import { Cpu, Database, Layers, Server, ShieldCheck, ArrowRight, Zap } from "lucide-react";

export interface ExpertiseProps {
  content: PortfolioContent;
}

const CATEGORY_META: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string; border: string }
> = {
  Backend: {
    icon: <Server className="h-4 w-4 text-blue-400" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  Datos: {
    icon: <Database className="h-4 w-4 text-amber-400" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  Data: {
    icon: <Database className="h-4 w-4 text-amber-400" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  "IA / ML": {
    icon: <Cpu className="h-4 w-4 text-emerald-400" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  "AI / ML": {
    icon: <Cpu className="h-4 w-4 text-emerald-400" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  "Cloud & DevOps": {
    icon: <Layers className="h-4 w-4 text-purple-400" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  Cloud: {
    icon: <Layers className="h-4 w-4 text-purple-400" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  Ingeniería: {
    icon: <ShieldCheck className="h-4 w-4 text-cyan-400" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
  Engineering: {
    icon: <ShieldCheck className="h-4 w-4 text-cyan-400" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
  },
};

export function Expertise({ content }: ExpertiseProps) {
  const { stack, architecture } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-label="Expertise and Architecture" className="w-full">
      <SectionHeader
        kicker={stack.kicker}
        heading={stack.heading}
        description={stack.description}
      />

      {/* Categorized Tech Constellation Grid with Luminous Headers */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stack.groups.map((group, idx) => {
          const meta = CATEGORY_META[group.name] ?? {
            icon: <Server className="h-4 w-4 text-blue-400" />,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
          };

          return (
            <Reveal key={group.name} delay={shouldReduceMotion ? 0 : idx * 60}>
              <div className="glass-card hover-lift p-6 h-full flex flex-col justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`p-2 rounded-lg ${meta.bg} ${meta.border} border`}>
                      {meta.icon}
                    </div>
                    <h3 className={`text-base font-bold ${meta.color}`}>
                      {group.name}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <hr className="my-16 border-[var(--color-border)]" />

      {/* 5-Stage Data & ML Lifecycle Circuit */}
      <div id="architecture" className="scroll-mt-24">
        <Reveal>
          <div className="mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-ink)] mb-3">
              {architecture.headingLead}{" "}
              <span className="text-accent-gradient drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                {architecture.headingAccent}
              </span>
            </h3>
            <p className="text-base text-[var(--color-muted)] max-w-2xl">
              {architecture.description}
            </p>
          </div>
        </Reveal>

        {/* Visual Circuit Connected Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {architecture.stages.map((stage, idx) => (
            <Reveal key={stage.index} delay={shouldReduceMotion ? 0 : idx * 60}>
              <div className="glass-card hover-lift p-6 h-full flex flex-col justify-between relative overflow-hidden">
                {/* Circuit Node Pulse Marker */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
                    </span>
                    <span className="mono-label text-cyan-400 font-bold text-xs">
                      {stage.index}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/30 font-bold">
                    {stage.power}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-[var(--color-ink)] text-lg mb-2">
                    {stage.label}
                  </h4>

                  <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-5">
                    {stage.detail}
                  </p>
                </div>

                <div className="pt-3 border-t border-[var(--color-border)]">
                  <span className="mono-label text-[10px] text-amber-300 font-bold">
                    {stage.tech}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {architecture.note && (
          <Reveal>
            <div className="rounded-xl border border-blue-500/20 bg-blue-950/20 p-4 text-center mt-6">
              <p className="text-xs font-mono text-blue-300">
                <Zap className="inline-block h-3.5 w-3.5 mr-1.5 text-amber-400" />
                {architecture.note}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
