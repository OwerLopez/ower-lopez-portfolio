"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Github, Linkedin, ShieldCheck, Terminal, MapPin, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { sections } from "@/config/navigation";
import type { PortfolioContent } from "@/types/content";
import { playTick, playHover } from "@/lib/audio";

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <Github className="h-4 w-4" />,
  linkedin: <Linkedin className="h-4 w-4" />,
  credly: <ShieldCheck className="h-4 w-4" />,
};

export function Footer({ content }: { content: PortfolioContent }) {
  const { nav, footer } = content;
  const pathname = usePathname();
  const isEn = pathname.startsWith("/en");
  const homePath = isEn ? "/en" : "/es";

  const scrollTo = (id: string) => {
    playTick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/[0.08] bg-[#06070a] pt-14 pb-12">
      {/* Top Laser Accent Line */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[1px] w-full max-w-5xl bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
      />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          
          {/* Brand & Identity */}
          <div className="space-y-2">
            <Link
              href={homePath}
              onClick={() => playTick()}
              className="group inline-flex items-center gap-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 p-[1px] shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-105 transition-transform">
                <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#090a12] font-mono text-xs font-black text-white">
                  {siteConfig.initials}
                </div>
              </div>
              <span className="text-xl font-extrabold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                {siteConfig.name}
              </span>
            </Link>

            <p className="text-xs font-mono text-zinc-400">
              Junior Data Engineer & Backend Developer
            </p>

            <p className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5 pt-1">
              <MapPin className="h-3 w-3 text-amber-400" />
              <span>{footer.location} · {footer.timezone}</span>
            </p>
          </div>

          {/* Quick Navigation Links */}
          <nav className="flex flex-wrap items-center gap-1 sm:gap-2" aria-label="Footer navigation">
            {sections.map((section) => {
              const label = nav[section.contentKey];
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  onMouseEnter={() => playHover()}
                  className="rounded-lg px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-all"
                >
                  {label}
                </button>
              );
            })}
          </nav>

          {/* Social Nodes & Live Status */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
            {/* Live Availability Pill */}
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-[11px] font-mono font-bold text-emerald-400 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {nav.statusText}
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {footer.contactItems.map((item) => {
                const key = (item.label || "").toLowerCase().split(".")[0] || "";
                const icon = SOCIAL_ICONS[key] ?? <ArrowUpRight className="h-4 w-4" />;
                
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    onClick={() => playTick()}
                    onMouseEnter={() => playHover()}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-zinc-400 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all active:scale-95"
                    aria-label={item.label}
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Legal & Technology Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
          <p>
            {footer.copyright}
          </p>

          <p className="flex items-center gap-2 text-[11px]">
            <span>Next.js 15</span>
            <span>·</span>
            <span>Tailwind CSS</span>
            <span>·</span>
            <span className="text-blue-400 font-semibold">ONNX Runtime</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
