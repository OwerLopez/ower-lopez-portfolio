"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Cpu, Sparkles, Trophy, Zap } from "lucide-react";
import type { PortfolioContent } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/animations/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { playTick } from "@/lib/audio";

export function Work({ content }: { content: PortfolioContent }) {
  const { work } = content;
  const reduce = useReducedMotion();
  const featured = work.featured;

  return (
    <div aria-label="Work and Projects" className="w-full">
      <SectionHeader
        kicker={work.kicker}
        heading={work.heading}
        description={work.description}
      />

      {/* Featured Flagship Case Study — ChurnInsight Mission Cockpit */}
      <Reveal>
        <TiltCard
          glowColor="rgba(59, 130, 246, 0.22)"
          maxTilt={4}
          className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#13141f]/95 via-[#0e0f17]/95 to-[#09090e]/98 p-6 sm:p-9 lg:p-11 mb-14 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8),0_0_40px_-5px_rgba(59,130,246,0.18)]"
        >
          {/* Radiant Corner Atmosphere */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, #3b82f6, #06b6d4)" }}
          />

          {/* Top Label & Flag */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-xs font-mono font-bold text-[var(--color-accent)]">
                <Cpu className="h-3.5 w-3.5" />
                {work.featuredLabel}
              </span>
              <span className="text-[var(--color-faint)]">·</span>
              <span className="text-xs font-mono text-[var(--color-muted)]">{featured.category}</span>
            </div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-xs font-mono font-bold text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles className="h-3 w-3" />
              {featured.flag}
            </span>
          </div>

          {/* Main Title & Value Proposition */}
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-ink)] mb-4">
            {featured.title}
          </h3>

          <p className="text-base sm:text-lg text-[var(--color-muted)] leading-relaxed max-w-3xl mb-8">
            {featured.summary}
          </p>

          {/* Metrics Grid: 4 High-Impact Visual Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            {featured.metrics.map((metric) => (
              <div
                key={metric.label}
                className="relative overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[#0d0d14]/90 p-5 shadow-inner transition-transform hover:scale-[1.02]"
              >
                <div
                  className={`text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums ${
                    metric.highlight
                      ? "text-accent-gradient drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      : "text-[var(--color-ink)]"
                  }`}
                >
                  {metric.value}
                </div>
                <div className="mono-label mt-2 text-[10px] text-[var(--color-muted)] font-semibold">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Speedup Architecture Callout */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-4 sm:p-5 my-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Impacto de Arquitectura · 100x Aceleración
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--color-muted)]">
                Inferencia ejecutada en el mismo proceso JVM (Spring Boot) redujo la latencia de <strong className="text-red-400">2000 ms</strong> a <strong className="text-emerald-400">20 ms</strong> sin costo de llamadas externas.
              </p>
            </div>
            <div className="shrink-0 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-300">
              P99 &lt; 20 ms
            </div>
          </div>

          {/* Tags & Action Links */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-[var(--color-border)]">
            <div className="flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <Badge key={tag} variant="accent">{tag}</Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {featured.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  onClick={() => playTick()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border-strong)] text-xs font-mono font-bold text-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all shadow-sm"
                >
                  {link.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>
        </TiltCard>
      </Reveal>

      {/* Secondary Projects Grid with 3D Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {work.log.map((project, idx) => {
          const isGold = project.tone === "gold";
          const isEmerald = project.tone === "emerald";
          const glow = isGold
            ? "rgba(245, 158, 11, 0.18)"
            : isEmerald
            ? "rgba(16, 185, 129, 0.18)"
            : "rgba(59, 130, 246, 0.16)";
          
          return (
            <Reveal key={project.title} delay={reduce ? 0 : idx * 60}>
              <TiltCard
                glowColor={glow}
                maxTilt={6}
                className="glass-card hover-lift p-7 h-full flex flex-col justify-between group rounded-2xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    {isGold && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-300 font-bold">
                        <Trophy className="h-3.5 w-3.5" />
                        1er Puesto Hackathon
                      </span>
                    )}
                    {isEmerald && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-300 font-bold">
                        <Trophy className="h-3.5 w-3.5" />
                        1er Puesto Feria UNSA
                      </span>
                    )}
                    {!isGold && !isEmerald && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-mono text-blue-300 font-bold">
                        <Zap className="h-3.5 w-3.5" />
                        Producción
                      </span>
                    )}
                  </div>

                  <h4 className="text-2xl font-bold text-[var(--color-ink)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--color-border)]">
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>

      {/* Technical Comparison Matrix Table */}
      <Reveal>
        <div className="mt-14">
          <div className="flex items-center justify-between mb-4">
            <h4 className="mono-label text-xs font-bold text-[var(--color-accent-cyan)]">
              {work.matrixTitle}
            </h4>
            <span className="text-[11px] font-mono text-[var(--color-faint)]">
              Auditoría Técnica Verificable
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-[var(--color-border-strong)] bg-gradient-to-b from-[#111116] to-[#0a0a0d] shadow-xl">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border-strong)] bg-[#0d0d12] mono-label text-[11px]">
                  <th className="py-4 px-5 font-bold text-[var(--color-ink)]">{work.matrixHeaders.project}</th>
                  <th className="py-4 px-5 font-semibold">{work.matrixHeaders.domain}</th>
                  <th className="py-4 px-5 font-semibold">{work.matrixHeaders.stack}</th>
                  <th className="py-4 px-5 font-semibold text-[var(--color-accent)]">{work.matrixHeaders.result}</th>
                  <th className="py-4 px-5 font-semibold">{work.matrixHeaders.role}</th>
                  <th className="py-4 px-5 font-semibold text-right">{work.matrixHeaders.year}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {work.matrix.map((row) => (
                  <tr
                    key={row.project}
                    className="transition-colors hover:bg-blue-500/[0.04]"
                  >
                    <td className="py-4 px-5 font-bold text-[var(--color-ink)]">{row.project}</td>
                    <td className="py-4 px-5 text-[var(--color-muted)]">{row.domain}</td>
                    <td className="py-4 px-5 font-mono text-xs text-[var(--color-muted)]">{row.stack}</td>
                    <td className="py-4 px-5 font-semibold text-emerald-400 font-mono text-xs">{row.result}</td>
                    <td className="py-4 px-5 text-[var(--color-muted)]">{row.role}</td>
                    <td className="py-4 px-5 font-mono text-xs tabular-nums text-right text-[var(--color-faint)]">
                      {row.year}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
