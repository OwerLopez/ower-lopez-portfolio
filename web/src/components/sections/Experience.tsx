"use client";

import React from "react";
import { PortfolioContent } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, ShieldCheck, Briefcase } from "lucide-react";

export interface ExperienceProps {
  content: PortfolioContent;
}

export function Experience({ content }: { content: PortfolioContent }) {
  const { journey, credentials } = content;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div aria-label="Experience and Credentials" className="w-full">
      <SectionHeader
        kicker={journey.kicker}
        heading={journey.heading}
        description={journey.description}
      />

      {/* Career Trajectory Timeline with Radiant Spine */}
      <div className="mt-14 relative pl-6 sm:pl-9 border-l-2 border-blue-500/30 space-y-12">
        {journey.items.map((item, idx) => {
          const isPresent = item.period.includes("HOY") || item.period.includes("TODAY") || item.period.includes("hoy") || item.period.includes("Present");
          
          return (
            <Reveal key={idx} delay={shouldReduceMotion ? 0 : idx * 60}>
              <div className="relative group">
                {/* Timeline Pulsing Node */}
                <div
                  aria-hidden
                  className={`absolute -left-[33px] sm:-left-[45px] top-1.5 h-4 w-4 rounded-full border-2 transition-all ${
                    isPresent
                      ? "border-emerald-400 bg-emerald-500 shadow-[0_0_12px_#34d399]"
                      : "border-blue-400 bg-[var(--color-base)] group-hover:bg-blue-400 group-hover:shadow-[0_0_10px_#3b82f6]"
                  }`}
                />

                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                    isPresent
                      ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                      : "bg-blue-500/10 border border-blue-500/20 text-blue-400"
                  }`}>
                    {item.period}
                  </span>
                  {isPresent && (
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                      ● Rol Activo
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-ink)] mb-2 group-hover:text-blue-400 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[var(--color-muted)] leading-relaxed max-w-3xl">
                  {item.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <hr className="my-16 border-white/[0.08]" />

      {/* Verified Credentials Section */}
      <Reveal>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono font-bold text-blue-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{credentials.kicker}</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Credly Verified
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-ink)] mb-2">
            {credentials.heading}
          </h3>
          <p className="text-sm sm:text-base text-[var(--color-muted)] max-w-2xl">
            {credentials.description}
          </p>
        </div>
      </Reveal>

      {/* Verified Credentials Badges Grid */}
      {credentials.credentials && credentials.credentials.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {credentials.credentials.map((cred, idx) => (
            <Reveal key={idx} delay={shouldReduceMotion ? 0 : idx * 30}>
              <a
                href={cred.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card hover-lift p-4 flex items-center justify-between gap-3 group rounded-xl border border-white/[0.08]"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/30 flex items-center justify-center font-mono text-xs font-extrabold text-blue-300 group-hover:border-blue-400 group-hover:text-white transition-all shadow-sm">
                    {cred.acronym}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-[var(--color-ink)] text-xs truncate group-hover:text-blue-400 transition-colors">
                      {cred.name}
                    </span>
                    <span className="text-[11px] text-[var(--color-faint)] truncate font-mono mt-0.5">
                      {cred.issuer}
                    </span>
                  </div>
                </div>

                <ArrowUpRight
                  className="h-4 w-4 text-[var(--color-faint)] shrink-0 transition-transform group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden
                />
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
