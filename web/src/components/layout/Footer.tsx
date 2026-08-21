"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Copy, CheckCircle2, Terminal, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { sections } from "@/config/navigation";
import type { PortfolioContent } from "@/types/content";

/**
 * Footer — Bento-style Engineering Command Center.
 *
 * Compact, cohesive, and high-tech:
 * - High-impact brand card with quick-copy email & live coordinates
 * - Structured navigation hub with smooth scroll triggers
 * - Verified proof channels (GitHub, LinkedIn, Credly)
 * - Live terminal system status monitor (`status@ower.dev`)
 */
export function Footer({ content }: { content: PortfolioContent }) {
  const { nav, footer, contact } = content;
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const homePath = isEn ? "/en" : "/es";
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteConfig.email);
      }
    } catch {
      /* ignore */
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#07070a] pt-16 pb-12">
      {/* Top Laser Accent Line */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-full max-w-5xl bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
      />

      {/* Ambient Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-80 w-3/4 rounded-full bg-blue-600/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        {/* Bento Grid Command Center */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Card 1: Brand, Identity & Fast Action (Col 1-5) */}
          <div className="md:col-span-12 lg:col-span-5 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-[#101017] to-[#0a0a0f] p-6 sm:p-7 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="mono-label text-[10px] text-blue-400 font-bold flex items-center gap-1.5">
                  <Terminal className="h-3 w-3" />
                  {footer.tagline}
                </span>
              </div>

              <Link
                href={homePath}
                className="block text-3xl sm:text-4xl font-extrabold tracking-tight text-[var(--color-ink)] transition-colors hover:text-blue-400"
              >
                {siteConfig.name}
              </Link>

              <p className="mt-2 text-xs font-mono text-[var(--color-muted)] leading-relaxed">
                Junior Data Engineer & Backend Developer
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-[var(--color-faint)]">
                <MapPin className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                <span>{footer.location} · {footer.timezone} (16.40°S 71.53°W)</span>
              </div>
            </div>

            {/* Quick Email Copy Button */}
            <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-xs font-mono font-bold text-[var(--color-ink)] transition-all hover:border-blue-500/40 hover:bg-blue-500/10 active:scale-95 shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">{contact.copiedFeedback}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-blue-400" />
                    <span>{siteConfig.email}</span>
                  </>
                )}
              </button>

              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Q3/Q4
              </span>
            </div>
          </div>

          {/* Card 2: Navigation Hub (Col 6-8) */}
          <div className="md:col-span-6 lg:col-span-3 rounded-2xl border border-white/[0.08] bg-[#0c0d13] p-6 flex flex-col justify-between shadow-xl">
            <div>
              <p className="mono-label text-[10px] text-blue-400 font-bold mb-4">
                {footer.navTitle}
              </p>
              <ul className="space-y-2 font-mono text-xs">
                {sections.map((section) => {
                  const label = nav[section.contentKey];
                  return (
                    <li key={section.id}>
                      <button
                        type="button"
                        onClick={() => scrollTo(section.id)}
                        className="group flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-[var(--color-muted)] transition-all hover:bg-white/[0.04] hover:text-[var(--color-ink)]"
                      >
                        <span className="font-semibold">{label}</span>
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-400 transition-all" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Card 3: Channels & System Terminal (Col 9-12) */}
          <div className="md:col-span-6 lg:col-span-4 rounded-2xl border border-white/[0.08] bg-[#0c0d13] p-6 flex flex-col justify-between shadow-xl gap-4">
            {/* Quick Links */}
            <div>
              <p className="mono-label text-[10px] text-blue-400 font-bold mb-3">
                {footer.contactTitle}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {footer.contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-blue-500/40 hover:bg-blue-500/10 transition-all group"
                  >
                    <span className="text-[10px] font-mono text-[var(--color-muted)] group-hover:text-white font-bold truncate">
                      {item.label.split(".")[0]}
                    </span>
                    <ArrowUpRight className="h-3 w-3 text-[var(--color-faint)] group-hover:text-blue-400 mt-1" />
                  </a>
                ))}
              </div>
            </div>

            {/* System Status Terminal HUD */}
            <div className="rounded-xl border border-white/[0.08] bg-[#07070a] p-3.5 font-mono text-[11px] leading-relaxed">
              <div className="flex items-center justify-between border-b border-white/[0.06] pb-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500/80" />
                  <span className="h-2 w-2 rounded-full bg-amber-500/80" />
                  <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
                  <span className="ml-1 text-[9px] text-[var(--color-faint)]">status@ower.dev</span>
                </div>
                <span className="text-[9px] text-emerald-400 font-bold">ONLINE</span>
              </div>

              <div className="space-y-1 text-[10px]">
                <p>
                  <span className="text-emerald-400">$</span>{" "}
                  <span className="text-[var(--color-muted)]">{footer.systemStatus.availabilityLabel}:</span>{" "}
                  <span className="text-blue-300 font-semibold">{footer.systemStatus.availabilityValue}</span>
                </p>
                <p>
                  <span className="text-emerald-400">$</span>{" "}
                  <span className="text-[var(--color-muted)]">{footer.systemStatus.modeLabel}:</span>{" "}
                  <span className="text-emerald-400 font-semibold terminal-cursor">
                    {footer.systemStatus.modeValue}
                  </span>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Meta Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] pt-6 text-[11px] font-mono text-[var(--color-faint)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span>
              {footer.copyright} · {footer.rights}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>{footer.credit}</span>
            <span>·</span>
            <span className="text-blue-400 font-semibold">Next.js 15 · ONNX Runtime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
