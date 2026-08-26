"use client";

import React, { useState } from "react";
import { PortfolioContent, PersonalMoment } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { useReducedMotion } from "framer-motion";
import { 
  Trophy, 
  Sparkles, 
  GraduationCap, 
  Languages, 
  MapPin, 
  ShieldCheck, 
  Terminal, 
  Layers,
  Camera,
  Cpu,
  Award
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { playTick, playHover } from "@/lib/audio";

export interface AboutProps {
  content: PortfolioContent;
}

const ACCENT_STYLES = {
  flame: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "rgba(245, 158, 11, 0.2)",
    icon: <Trophy className="h-4 w-4 text-amber-400" />,
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    glow: "rgba(6, 182, 212, 0.2)",
    icon: <Layers className="h-4 w-4 text-cyan-400" />,
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    glow: "rgba(16, 185, 129, 0.2)",
    icon: <Sparkles className="h-4 w-4 text-emerald-400" />,
  },
  amber: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "rgba(245, 158, 11, 0.2)",
    icon: <Award className="h-4 w-4 text-amber-400" />,
  },
  violet: {
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    glow: "rgba(168, 85, 247, 0.2)",
    icon: <Cpu className="h-4 w-4 text-purple-400" />,
  },
};

const FACET_ICONS = [
  <Languages key="lang" className="h-4 w-4 text-cyan-400 shrink-0" />,
  <Cpu key="cpu" className="h-4 w-4 text-blue-400 shrink-0" />,
  <GraduationCap key="grad" className="h-4 w-4 text-emerald-400 shrink-0" />,
  <MapPin key="map" className="h-4 w-4 text-amber-400 shrink-0" />,
];

function MomentCard({ moment, index }: { moment: PersonalMoment; index: number }) {
  const [imageError, setImageError] = useState(false);
  const style = ACCENT_STYLES[moment.accent] || ACCENT_STYLES.flame;

  return (
    <div onMouseEnter={() => playHover()} onClick={() => playTick()}>
      <TiltCard
        glowColor={style.glow}
        maxTilt={5}
        className={`rounded-2xl border ${style.border} bg-gradient-to-b from-[#11121b]/95 to-[#0a0a10]/95 p-5 sm:p-6 flex flex-col justify-between group shadow-lg cursor-default`}
      >
        <div>
          {/* Top bar with category & status tag */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="mono-label text-[10px] text-[var(--color-muted)] font-bold flex items-center gap-1.5">
              {style.icon}
              {moment.category}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${style.bg} ${style.border} ${style.text} border`}>
              {moment.tag}
            </span>
          </div>

          {/* Optional Image / Visual Banner slot */}
          {moment.image && !imageError ? (
            <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={moment.image}
                alt={moment.title}
                onError={() => setImageError(true)}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a10] via-transparent to-transparent opacity-80" />
            </div>
          ) : (
            /* Stylized Fallback Visual Banner when image is not uploaded */
            <div className="relative mb-4 h-24 w-full overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-blue-950/30 via-[#0e0f17] to-amber-950/20 p-3 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-faint)]">
                <span className="flex items-center gap-1">
                  <Camera className="h-3 w-3 text-cyan-400" />
                  Snapshot #{index + 1}
                </span>
                <span className="text-zinc-500">2024–2026</span>
              </div>
              <div className="text-xs font-mono font-semibold text-zinc-300 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {moment.subtitle}
              </div>
            </div>
          )}

          <h4 className="text-lg font-bold text-[var(--color-ink)] mb-1.5 group-hover:text-blue-400 transition-colors">
            {moment.title}
          </h4>

          <p className="text-xs sm:text-sm text-[var(--color-muted)] leading-relaxed mb-3">
            {moment.description}
          </p>
        </div>

        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[var(--color-faint)]">
          <span>{moment.subtitle}</span>
          <span className="text-blue-400 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </TiltCard>
    </div>
  );
}

export function About({ content }: AboutProps) {
  const { philosophy } = content;
  const shouldReduceMotion = useReducedMotion();
  const [avatarError, setAvatarError] = useState(false);

  return (
    <div aria-label="About and Personal Snapshot" className="w-full">
      <SectionHeader
        kicker={philosophy.kicker}
        heading={`${philosophy.headingLead} ${philosophy.headingAccent}`}
        description={philosophy.description}
      />

      {/* Main 2-Column Bento Layout */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Personal Narrative, Facets & Engineering Principles (Col 1-6) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Personal Bio Spotlight Card */}
          <Reveal>
            <div className="glass-card p-6 sm:p-7 rounded-3xl border border-white/[0.12] bg-gradient-to-b from-[#11121a]/95 to-[#090a10]/95 shadow-xl">
              
              {/* Profile Header with Avatar / Monogram */}
              <div className="flex items-center gap-4 mb-6 pb-5 border-b border-white/[0.08]">
                <div className="relative shrink-0">
                  <div className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 p-[1.5px] shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                    <div className="relative h-full w-full overflow-hidden rounded-[14px] bg-[#0c0d15] flex items-center justify-center">
                      {!avatarError ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src="/assets/profile.jpg"
                          alt={philosophy.bioHeading}
                          onError={() => setAvatarError(true)}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="font-mono text-xl font-black text-white">
                          {siteConfig.initials}
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Active Radar Pulse */}
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#090a10]" />
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)]">
                    {philosophy.bioHeading}
                  </h3>
                  <p className="text-xs font-mono text-blue-400 flex items-center gap-1.5 mt-0.5 font-semibold">
                    <Terminal className="h-3 w-3" />
                    Backend & Data Engineer · UNSA
                  </p>
                </div>
              </div>

              {/* Bio Narrative */}
              <div className="space-y-3.5 text-sm sm:text-base text-[var(--color-muted)] leading-relaxed">
                {philosophy.bioText.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Personal Facets / Key Facts */}
              <div className="mt-6 pt-5 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {philosophy.facets.map((facet, idx) => (
                  <div 
                    key={facet.label}
                    className="p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-muted)] mb-1">
                      {FACET_ICONS[idx % FACET_ICONS.length]}
                      <span>{facet.label}</span>
                    </div>
                    <div className="text-xs font-bold text-[var(--color-ink)]">
                      {facet.value}
                    </div>
                    {facet.detail && (
                      <div className="text-[10px] font-mono text-[var(--color-faint)] mt-1">
                        {facet.detail}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </Reveal>

          {/* 3 Core Engineering Principles */}
          <Reveal>
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-blue-400" />
                <h4 className="mono-label text-xs font-bold text-blue-400">
                  {philosophy.principlesLabel}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {philosophy.principles.map((principle) => (
                  <div
                    key={principle.index}
                    className="glass-card p-4 rounded-xl border border-white/[0.08] hover:border-blue-500/30 transition-all flex items-start gap-3.5 group"
                  >
                    <span className="font-mono text-xs font-extrabold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-1 rounded-lg shrink-0">
                      {principle.index}
                    </span>
                    <div>
                      <h5 className="text-sm font-bold text-[var(--color-ink)] group-hover:text-blue-300 transition-colors">
                        {principle.title}
                      </h5>
                      <p className="text-xs text-[var(--color-muted)] leading-relaxed mt-1">
                        {principle.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>

        {/* Right Column: Visual Moments & Milestones Gallery ("Mini-Blog / Snapshot") (Col 7-12) */}
        <div className="lg:col-span-6 space-y-6">
          <Reveal>
            <div className="flex items-center justify-between mb-2">
              <div>
                <span className="mono-label text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  {philosophy.momentsKicker}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[var(--color-ink)] mt-0.5">
                  {philosophy.momentsLabel}
                </h3>
              </div>
            </div>
          </Reveal>

          {/* Cards Stack */}
          <div className="space-y-4">
            {philosophy.moments.map((moment, idx) => (
              <Reveal key={moment.id} delay={shouldReduceMotion ? 0 : idx * 70}>
                <MomentCard moment={moment} index={idx} />
              </Reveal>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
