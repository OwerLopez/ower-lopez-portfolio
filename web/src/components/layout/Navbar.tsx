"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ArrowUpRight, Command, Sparkles } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { NavContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { cn } from "@/lib/utils";

interface NavbarProps {
  locale: Locale;
  content: NavContent;
}

export function Navbar({ locale, content }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    const sections = ["work", "about", "architecture", "stack", "credentials", "faq", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [open]);

  const links = [
    { href: "#about", id: "about", label: content.about },
    { href: "#work", id: "work", label: content.work },
    { href: "#architecture", id: "architecture", label: content.architecture },
    { href: "#stack", id: "stack", label: content.stack },
    { href: "#credentials", id: "credentials", label: content.credentials },
    { href: "#faq", id: "faq", label: content.faq },
    { href: "#contact", id: "contact", label: content.contact },
  ];

  return (
    <>
      {/* Floating HUD Command Navbar */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[60] flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none"
      >
        <div
          className={cn(
            "pointer-events-auto flex items-center justify-between gap-4 sm:gap-8 rounded-full border px-4 sm:px-6 py-2.5 transition-all duration-500 max-w-[1240px] w-full",
            scrolled
              ? "border-white/15 bg-[#030305]/80 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.8)] shadow-amber-500/5"
              : "border-white/10 bg-[#09080d]/60 backdrop-blur-xl"
          )}
        >
          {/* Left Brand Identity */}
          <Link
            href={`/${locale}`}
            aria-label={siteConfig.name}
            className="group flex items-center gap-3 shrink-0"
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 transition-transform duration-300 group-hover:scale-105 group-hover:border-amber-400">
              <span className="font-mono text-xs font-bold tracking-tighter">
                {siteConfig.initials}
              </span>
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <div className="hidden flex-col md:flex">
              <span className="text-[13.5px] font-semibold tracking-tight text-white transition-colors group-hover:text-amber-300">
                {siteConfig.shortName}
              </span>
              <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                {content.statusText}
              </span>
            </div>
          </Link>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] p-1.5 backdrop-blur-md">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-300 rounded-full",
                    isActive
                      ? "text-amber-400 font-semibold"
                      : "text-zinc-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-cyan-500/20 border border-amber-400/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className={open ? "pointer-events-none opacity-0" : "opacity-100 transition-opacity"}>
              <LocaleSwitcher current={locale} />
            </div>

            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent px-4 py-1.5 text-xs font-semibold text-amber-300 transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(255,184,0,0.3)] hover:text-white"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>{content.cta}</span>
            </a>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? content.menuClose : content.menuOpen}
              className="group flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] p-2 sm:px-3.5 sm:py-1.5 text-xs font-medium text-white transition-all hover:border-amber-500/50 hover:bg-white/10 lg:hidden"
            >
              <Command className="h-3.5 w-3.5 text-amber-400" />
              <span className="hidden sm:inline font-mono text-[11px] tracking-wider text-zinc-300">
                {open ? content.menuClose : content.menuOpen}
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Immersive Mobile Navigation Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[55] flex flex-col justify-between overflow-y-auto bg-[#030305]/98 px-6 pb-8 pt-28 backdrop-blur-3xl lg:hidden"
          >
            {/* Background Ambient Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[20%] top-[15%] h-[50vh] w-[50vh] rounded-full opacity-30 blur-[120px]"
              style={{
                background: "radial-gradient(circle, rgba(255,184,0,0.25), transparent 70%)",
              }}
            />

            <nav className="relative mx-auto flex w-full max-w-lg flex-col gap-2 my-auto">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  className="group flex items-center justify-between border-b border-white/10 py-3.5 text-left transition-colors hover:border-amber-400/50"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-amber-400">0{i + 1}</span>
                    <span className="font-display text-2xl font-medium tracking-tight text-zinc-300 transition-colors group-hover:text-white">
                      {link.label}
                    </span>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-amber-400 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1" />
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative mx-auto flex w-full max-w-lg flex-col gap-4 border-t border-white/10 pt-6 text-xs text-zinc-400"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono tracking-wider text-amber-400">{siteConfig.location.es}</span>
                <span className="font-mono">{siteConfig.email}</span>
              </div>
              <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/5">
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                <a href={siteConfig.links.credly} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Credly</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
