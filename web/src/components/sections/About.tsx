"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PortfolioContent, PersonalHobby } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { 
  Languages, 
  MapPin, 
  GraduationCap, 
  Terminal, 
  Gamepad2, 
  Headphones, 
  Code2, 
  Camera, 
  Sparkles, 
  Cpu,
  Flame,
  Binary,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { playTick, playHover } from "@/lib/audio";

export interface AboutProps {
  content: PortfolioContent;
}

const HOBBY_META: Record<
  string, 
  { icon: React.ReactNode; glowColor: string; borderColor: string; bgGradient: string; tagClass: string }
> = {
  chess: {
    icon: <Gamepad2 className="h-5 w-5 text-amber-400" />,
    glowColor: "rgba(245, 158, 11, 0.25)",
    borderColor: "hover:border-amber-500/50 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]",
    bgGradient: "from-amber-500/10 via-transparent to-transparent",
    tagClass: "bg-amber-500/15 border-amber-500/30 text-amber-300",
  },
  music: {
    icon: <Headphones className="h-5 w-5 text-purple-400" />,
    glowColor: "rgba(168, 85, 247, 0.25)",
    borderColor: "hover:border-purple-500/50 group-hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]",
    bgGradient: "from-purple-500/10 via-transparent to-transparent",
    tagClass: "bg-purple-500/15 border-purple-500/30 text-purple-300",
  },
  "competitive-coding": {
    icon: <Code2 className="h-5 w-5 text-cyan-400" />,
    glowColor: "rgba(6, 182, 212, 0.25)",
    borderColor: "hover:border-cyan-500/50 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]",
    bgGradient: "from-cyan-500/10 via-transparent to-transparent",
    tagClass: "bg-cyan-500/15 border-cyan-500/30 text-cyan-300",
  },
  "photography-campus": {
    icon: <Camera className="h-5 w-5 text-emerald-400" />,
    glowColor: "rgba(16, 185, 129, 0.25)",
    borderColor: "hover:border-emerald-500/50 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
    bgGradient: "from-emerald-500/10 via-transparent to-transparent",
    tagClass: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
  },
};

const FACET_ICONS = [
  <Languages key="lang" className="h-4 w-4 text-cyan-400 shrink-0" />,
  <Cpu key="cpu" className="h-4 w-4 text-blue-400 shrink-0" />,
  <GraduationCap key="grad" className="h-4 w-4 text-emerald-400 shrink-0" />,
  <MapPin key="map" className="h-4 w-4 text-amber-400 shrink-0" />,
];

export function About({ content }: AboutProps) {
  const { philosophy } = content;
  const [avatarError, setAvatarError] = useState(false);

  return (
    <div aria-label="About Section" className="w-full space-y-12">
      {/* Section Header */}
      <SectionHeader
        kicker={philosophy.kicker}
        heading={`${philosophy.headingLead} ${philosophy.headingAccent}`}
        description={philosophy.description}
      />

      {/* =========================================================================
          Master Persona & Bio Showcase (Editorial Obsidian Bento)
          ========================================================================= */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-gradient-to-b from-[#111322]/95 via-[#0c0e18]/95 to-[#080912]/98 p-6 sm:p-9 md:p-10 backdrop-blur-2xl shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),0_0_35px_rgba(59,130,246,0.12)] group hover:border-blue-500/40 transition-all duration-500">
          
          {/* Subtle Top Ambient Lighting Aura */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-44 w-3/4 rounded-full bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-purple-600/15 blur-3xl" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Interactive Profile Avatar & Status Node (Col 1-4) */}
            <div className="lg:col-span-4 flex flex-col items-center text-center lg:items-start lg:text-left">
              
              {/* Profile Image with Multi-Gradient Luminous Ring */}
              <div className="relative group/avatar mb-5">
                <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-3xl bg-gradient-to-br from-blue-500 via-cyan-400 to-indigo-500 p-[2px] shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover/avatar:shadow-[0_0_40px_rgba(6,182,212,0.7)] group-hover/avatar:scale-105 transition-all duration-300">
                  <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-[#090b14]">
                    {!avatarError ? (
                      <Image
                        src="/assets/profile.jpg"
                        alt={philosophy.bioHeading}
                        width={144}
                        height={144}
                        priority
                        onError={() => setAvatarError(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-mono text-3xl font-black text-white">
                        {siteConfig.initials}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pulsing Active Availability Radar Beacon */}
                <span className="absolute -bottom-1 -right-1 flex h-6 w-6">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 border-3 border-[#090b14]" />
                </span>
              </div>

              {/* Status Chips */}
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-mono font-bold text-emerald-300 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Disponible para Backend & Datos
                </span>

                <div className="text-xs font-mono text-zinc-400 flex items-center justify-center lg:justify-start gap-1.5 pt-1">
                  <GraduationCap className="h-4 w-4 text-blue-400 shrink-0" />
                  <span>{philosophy.bioBadge}</span>
                </div>
              </div>

            </div>

            {/* Right: Identity Narrative & Engineering Story (Col 5-12) */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Identity Header */}
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                  {philosophy.bioHeading}
                </h3>
                <p className="text-sm sm:text-base font-mono text-blue-400 flex items-center justify-center lg:justify-start gap-2 mt-1.5 font-bold">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  <span>{philosophy.bioRole}</span>
                </p>
              </div>

              {/* Narrative Text */}
              <div className="space-y-3.5 text-sm sm:text-base text-zinc-300 leading-relaxed">
                {philosophy.bioText.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* Quick Technical Facets (2x2 Glass Tile Grid) */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {philosophy.facets.map((facet, idx) => (
                  <div
                    key={facet.label}
                    onMouseEnter={() => playHover()}
                    className="p-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:border-blue-500/40 hover:bg-blue-500/[0.05] transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1">
                      {FACET_ICONS[idx % FACET_ICONS.length]}
                      <span>{facet.label}</span>
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white">
                      {facet.value}
                    </div>
                    {facet.detail && (
                      <div className="text-[10px] font-mono text-zinc-500 mt-1">
                        {facet.detail}
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>
      </Reveal>

      {/* =========================================================================
          Hobbies, Mindset & Flow State Section (4 Distinctive Glowing Cards)
          ========================================================================= */}
      <Reveal delay={80}>
        <div className="space-y-6 pt-4">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/[0.08] pb-4">
            <div>
              <span className="mono-label text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <Flame className="h-4 w-4 text-cyan-400" />
                {philosophy.hobbiesKicker}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                {philosophy.hobbiesLabel}
              </h3>
            </div>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              {philosophy.hobbiesDescription}
            </p>
          </div>

          {/* 4 Custom Hobbies Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {philosophy.hobbies.map((hobby: PersonalHobby) => {
              const meta = HOBBY_META[hobby.id] ?? {
                icon: <Gamepad2 className="h-5 w-5 text-amber-400" />,
                glowColor: "rgba(245, 158, 11, 0.25)",
                borderColor: "hover:border-amber-500/50 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]",
                bgGradient: "from-amber-500/10 via-transparent to-transparent",
                tagClass: "bg-amber-500/15 border-amber-500/30 text-amber-300",
              };

              return (
                <div
                  key={hobby.id}
                  onMouseEnter={() => playHover()}
                  onClick={() => playTick()}
                  className={`group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-gradient-to-b from-[#111320]/90 via-[#0d0e19]/90 to-[#080912]/95 p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 cursor-default flex flex-col justify-between ${meta.borderColor}`}
                >
                  {/* Internal ambient corner glow */}
                  <div className={`pointer-events-none absolute -top-12 -right-12 h-28 w-28 rounded-full bg-gradient-to-br ${meta.bgGradient} blur-2xl opacity-70 group-hover:opacity-100 transition-opacity`} />

                  <div>
                    {/* Top Row: Icon + Category Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/[0.05] border border-white/[0.1] shadow-inner group-hover:scale-110 transition-transform duration-300">
                        {meta.icon}
                      </div>

                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold border ${meta.tagClass}`}>
                        {hobby.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                      {hobby.name}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {hobby.description}
                    </p>
                  </div>

                  {/* Category Footer */}
                  <div className="mt-5 pt-3 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span>{hobby.category}</span>
                    <span className="text-zinc-400 group-hover:translate-x-1 group-hover:text-cyan-300 transition-all">→</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </Reveal>

      {/* =========================================================================
          Academic & Community Motto Footer Bar
          ========================================================================= */}
      <Reveal delay={120}>
        <div className="rounded-2xl border border-white/[0.08] bg-[#090b14]/90 p-4 px-6 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-400 shadow-sm">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold">
            <ShieldCheck className="h-4 w-4 text-blue-400 shrink-0" />
            <span>Secretario ACM Student Chapter UNSA</span>
          </div>

          <div className="flex items-center gap-2 text-blue-400 font-bold">
            <Binary className="h-3.5 w-3.5 text-cyan-400" />
            <span>{philosophy.footerMotto}</span>
          </div>

          <div className="text-zinc-500">
            <span>{philosophy.footerTag}</span>
          </div>
        </div>
      </Reveal>

    </div>
  );
}
