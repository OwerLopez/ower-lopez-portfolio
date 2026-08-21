"use client";

import React from "react";
import { PortfolioContent } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Trophy, Sparkles, Award, ShieldCheck, Briefcase, GraduationCap } from "lucide-react";

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
          const isPresent = item.period.includes("HOY") || item.period.includes("TODAY");
          
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

      <hr className="my-20 border-[var(--color-border)]" />

      {/* Credentials & Trophy Wall */}
      <Reveal>
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-xs font-mono font-bold text-amber-400 mb-3">
            <Trophy className="h-3.5 w-3.5" />
            <span>Premios & Reconocimientos</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] mb-3">
            {credentials.heading}
          </h3>
          <p className="text-base text-[var(--color-muted)] max-w-2xl">
            {credentials.description}
          </p>
        </div>
      </Reveal>

      {/* Trophy Highlights Grid — Radiant Golden Cards */}
      {credentials.trophies && credentials.trophies.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {credentials.trophies.map((trophy, idx) => (
            <Reveal key={idx} delay={shouldReduceMotion ? 0 : idx * 50}>
              <div className="trophy-card p-6 sm:p-7 h-full flex flex-col justify-between relative overflow-hidden group">
                {/* Subtle Amber Glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-amber-500/15 blur-2xl group-hover:bg-amber-500/25 transition-all"
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="mono-label text-xs font-bold text-amber-400">
                      {trophy.index}
                    </span>
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
                      <Trophy className="h-4 w-4" aria-hidden />
                    </div>
                  </div>

                  <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-warm-gradient tabular-nums mb-3 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                    {trophy.value}
                    {trophy.suffix && (
                      <span className="text-2xl text-amber-200/80 ml-1">
                        {trophy.suffix}
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-[var(--color-ink)] text-base mb-2">
                    {trophy.title}
                  </h4>
                </div>

                <p className="text-xs text-[var(--color-muted)] leading-relaxed mt-4 pt-3 border-t border-amber-500/15">
                  {trophy.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      )}

      {/* Verified Credentials Badges Grid */}
      {credentials.credentials && credentials.credentials.length > 0 && (
        <div>
          <Reveal>
            <div className="flex items-center justify-between mb-6">
              <h4 className="mono-label text-xs font-bold text-[var(--color-accent-cyan)]">
                {credentials.credentialsLabel}
              </h4>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                Credly Verified
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {credentials.credentials.map((cred, idx) => (
              <Reveal key={idx} delay={shouldReduceMotion ? 0 : idx * 30}>
                <a
                  href={cred.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card hover-lift p-4 flex items-center justify-between gap-3 group"
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
        </div>
      )}
    </div>
  );
}
