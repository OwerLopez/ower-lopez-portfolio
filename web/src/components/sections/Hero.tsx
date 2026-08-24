"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Copy, ArrowDown, Sparkles, Terminal, ShieldCheck, Server, Database, GraduationCap } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { PortfolioContent } from "@/types/content";
import { InteractiveRuntimeHUD } from "@/components/ui/InteractiveRuntimeHUD";
import { playTick, playSuccess } from "@/lib/audio";

/**
 * Hero section — Clean 2-Column Overview.
 * Left: Recruiter hook, value proposition, comprehensive skills.
 * Right: Live Interactive Developer Profile Hub.
 */
export function Hero({ content }: { content: PortfolioContent }) {
  const { intro, footer } = content;
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const copyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteConfig.email);
      }
    } catch {
      /* ignore clipboard permission errors */
    }
    playSuccess();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      className="relative min-h-[85vh] flex flex-col justify-center px-5 sm:px-8 py-14 sm:py-20"
      aria-label="Intro"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Thesis & Hook */}
          <div className="lg:col-span-7 space-y-6">
            {/* Status badge with animated green radar pulse */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-mono tracking-wide text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {intro.status}
              </span>
            </motion.div>

            {/* Kicker */}
            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease }}
              className="mono-label text-[var(--color-accent-cyan)] font-semibold flex items-center gap-2"
            >
              <Terminal className="h-3.5 w-3.5" />
              {intro.kicker}
            </motion.p>

            {/* Main heading */}
            <h1 className="text-[clamp(2.4rem,5.2vw,4rem)] font-extrabold leading-[1.1] tracking-[-0.035em] text-[var(--color-ink)]">
              {intro.titleLines.map((line, i) => (
                <motion.span
                  key={i}
                  initial={reduce ? undefined : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
              <motion.span
                initial={reduce ? undefined : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease }}
                className="block text-accent-gradient drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]"
              >
                {intro.titleAccent}
              </motion.span>
            </h1>

            {/* Description */}
            <motion.p
              initial={reduce ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease }}
              className="max-w-xl text-base sm:text-lg text-[var(--color-muted)] leading-relaxed"
            >
              {intro.description}
            </motion.p>

            {/* Quick Skills & Achievements Badges */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease }}
              className="flex flex-wrap gap-2.5 pt-2"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-ink)]">
                <Server className="h-3 w-3 text-blue-400" />
                <span className="font-semibold text-blue-300">Java 17 & Spring Boot</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-ink)]">
                <Database className="h-3 w-3 text-amber-400" />
                <span className="font-semibold text-amber-300">PostgreSQL & SQL</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-ink)]">
                <Sparkles className="h-3 w-3 text-amber-400" />
                <span className="font-bold text-amber-400">1er Puesto Hackathon</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-xs font-mono text-[var(--color-ink)]">
                <GraduationCap className="h-3 w-3 text-emerald-400" />
                <span className="font-semibold text-emerald-400">Quinto Superior (UNSA)</span>
              </span>
            </motion.div>

            {/* Action CTAs */}
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.72, ease }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href={intro.primaryTarget}
                onClick={() => playTick()}
                className="group relative inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 px-7 py-3.5 text-sm font-bold text-white shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-105 active:scale-95"
              >
                <span>{intro.primaryCta}</span>
                <ArrowDown
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1"
                  aria-hidden
                />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-6 py-3.5 text-sm font-semibold text-[var(--color-ink)] transition-all duration-300 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)] active:scale-95 shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">{intro.copiedFeedback}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[var(--color-faint)]" />
                    <span>{intro.secondaryCta}</span>
                  </>
                )}
              </button>
            </motion.div>
          </div>

          {/* Right Column: Live Interactive Architecture & Inference HUD */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
            >
              <InteractiveRuntimeHUD />
            </motion.div>
          </div>

        </div>

        {/* Ambient bottom metadata bar */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease }}
          className="mt-14 sm:mt-18 flex flex-wrap items-center justify-between gap-y-3 border-t border-[var(--color-border)] pt-5 text-[var(--color-faint)]"
        >
          <span className="mono-label flex items-center gap-3">
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
            {intro.scrollCue}
          </span>
          <span className="hidden items-center gap-2 text-xs font-mono sm:flex text-[var(--color-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            {footer.location} · {footer.timezone} · UTC-5
          </span>
        </motion.div>
      </div>
    </section>
  );
}
