"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Globe, Menu, X, Sparkles, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { sections } from "@/config/navigation";
import type { PortfolioContent } from "@/types/content";
import { playTick, playHover } from "@/lib/audio";

/**
 * Navbar — Floating Glass Dock.
 * - Nav pills with hover and active states
 * - Brand monogram with live status badge
 * - Bilingual toggle and contact CTA button
 */
export function Navbar({ content }: { content: PortfolioContent }) {
  const { nav } = content;
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const isEn = pathname.startsWith("/en");
  const currentLocale = isEn ? "en" : "es";
  const otherLocale = isEn ? "/es" : "/en";
  const homePath = `/${currentLocale}`;

  // Scroll spy tracking active section
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionEls = sections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean) as HTMLElement[];

      let current: string | null = null;
      for (const el of sectionEls) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) current = el.id;
      }
      setActiveId(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const scrollTo = useCallback((id: string) => {
    playTick();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <motion.header
        initial={reduced ? undefined : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[60] px-4 pt-4 sm:pt-5 pointer-events-none"
      >
        {/* Floating Glass Capsule Dock */}
        <div
          className={`pointer-events-auto mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2 sm:px-6 sm:py-2.5 transition-all duration-300 relative ${
            scrolled || open
              ? "bg-[#090a12]/92 backdrop-blur-2xl border border-white/[0.16] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.9),0_0_30px_-5px_rgba(59,130,246,0.3),inset_0_1px_0_0_rgba(255,255,255,0.2)]"
              : "bg-[#090a12]/75 backdrop-blur-xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.15)]"
          }`}
        >
          {/* Brand Logo & Live Radar Pill */}
          <Link
            href={homePath}
            onClick={() => playTick()}
            className="group flex shrink-0 items-center gap-3"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 p-[1px] shadow-[0_0_18px_rgba(59,130,246,0.6)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.8)] transition-all group-hover:scale-105">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-[#090a12] font-mono text-xs font-black text-white">
                {siteConfig.initials}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-extrabold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                {siteConfig.shortName}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[9px] text-emerald-400 font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                {nav.statusText}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — Distinct Tactile Glass Pills */}
          <nav
            className="hidden items-center gap-2 lg:flex"
            aria-label="Main navigation"
          >
            {sections.map((section) => {
              const label = nav[section.contentKey];
              const isActive = activeId === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  onMouseEnter={() => playHover()}
                  className={`relative rounded-full px-4 py-1.5 text-[13px] font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "text-blue-300 font-bold bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/40 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      : "text-zinc-300 hover:text-white hover:bg-white/[0.08] border border-transparent hover:border-white/10"
                  }`}
                >
                  <span>{label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Side: Language Switcher + Shiny CTA Button */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
            {/* Bilingual Switcher */}
            <Link
              href={otherLocale}
              onClick={() => playTick()}
              aria-label={isEn ? "Cambiar a Español" : "Switch to English"}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.04] px-3.5 font-mono text-xs font-bold text-zinc-200 transition-all hover:border-blue-500/50 hover:bg-blue-500/15 hover:text-white shadow-sm"
            >
              <Globe className="h-3.5 w-3.5 text-cyan-400" aria-hidden />
              <span>{isEn ? "ES" : "EN"}</span>
            </Link>

            {/* Glowing Shimmer CTA Button */}
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              className="hidden sm:inline-flex h-9 items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-5 text-xs font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.5),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.7)] hover:scale-[1.04] active:scale-[0.98]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{nav.cta}</span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={() => {
                playTick();
                setOpen((v) => !v);
              }}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? nav.menuClose : nav.menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] lg:hidden text-white transition-all hover:bg-white/[0.1]"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[55] flex flex-col bg-[#07080e]/98 pt-24 pb-8 px-6 backdrop-blur-3xl lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="mx-auto flex w-full max-w-md flex-col gap-2.5">
              <div className="mb-4 pb-3 border-b border-white/10 flex items-center justify-between">
                <span className="mono-label text-xs text-blue-400 font-bold">Navegación</span>
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                  {nav.statusText}
                </span>
              </div>

              {sections.map((section, i) => {
                const label = nav[section.contentKey];
                const isActive = activeId === section.id;
                return (
                  <motion.button
                    key={section.id}
                    type="button"
                    onClick={() => scrollTo(section.id)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    className={`flex items-center justify-between rounded-2xl border p-4 text-left transition-all ${
                      isActive
                        ? "border-blue-500/40 bg-blue-500/10 text-blue-300 font-bold shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                        : "border-white/[0.08] bg-white/[0.03] text-white hover:border-white/20"
                    }`}
                  >
                    <span className="text-base font-bold tracking-tight">
                      {label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-zinc-500" />
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile Footer Area */}
            <div className="mx-auto mt-auto flex w-full max-w-md flex-col gap-4 border-t border-white/10 pt-6 text-xs text-zinc-400">
              <div className="flex items-center justify-between">
                <span className="text-blue-400 font-mono">{siteConfig.location[currentLocale]}</span>
                <span className="font-mono text-white/90">{siteConfig.email}</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4 font-semibold">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    GitHub
                  </a>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={siteConfig.links.credly}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    Credly
                  </a>
                </div>
                <Link
                  href={otherLocale}
                  onClick={() => setOpen(false)}
                  className="font-mono font-bold text-blue-400 hover:text-cyan-300"
                >
                  {isEn ? "Versión en Español" : "English Version"} →
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
