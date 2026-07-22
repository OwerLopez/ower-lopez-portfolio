"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
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
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "#about", label: content.about },
    { href: "#work", label: content.work },
    { href: "#architecture", label: content.architecture },
    { href: "#stack", label: content.stack },
    { href: "#credentials", label: content.credentials },
  ] as const;

  // Scrollspy: resalta la seccion visible.
  useEffect(() => {
    const ids = ["top", "about", "work", "architecture", "stack", "credentials", "contact"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id;
          if (id === "top" || id === "contact") {
            setActive("");
          } else {
            setActive(`#${id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(20px,5vw,64px)] py-4 transition-colors duration-400",
          scrolled
            ? "border-b border-white/[0.07] bg-[rgba(8,8,12,0.72)] backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 text-[var(--color-ink)]"
          aria-label={siteConfig.name}
        >
          <span className="font-mono-token grid h-[34px] w-[34px] place-items-center rounded-[9px] bg-gradient-to-br from-[var(--color-accent-deep)] to-[var(--color-accent)] text-[13px] font-semibold text-white shadow-[0_0_20px_rgba(91,140,255,0.4)]">
            {siteConfig.initials}
          </span>
          <span className="text-[15px] font-semibold tracking-[-0.01em]">
            {siteConfig.shortName}
          </span>
        </Link>

        <div className="hidden items-center gap-[clamp(14px,2.4vw,34px)] text-[13.5px] text-[var(--color-muted)] md:flex">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 transition-colors",
                  isActive
                    ? "text-[var(--color-ink)]"
                    : "hover:text-[var(--color-ink)]",
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-cyan)] shadow-[0_0_8px_var(--color-accent)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
          <LocaleSwitcher current={locale} />
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/[0.16]"
          >
            {content.cta}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LocaleSwitcher current={locale} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? content.menuClose : content.menuOpen}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-[var(--color-ink)]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-2 bg-[rgba(6,6,9,0.94)] px-8 backdrop-blur-xl md:hidden"
          >
            {[...links, { href: "#contact", label: content.contact }].map(
              (link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index + 0.1 }}
                  className="border-b border-white/[0.06] py-5 text-3xl font-semibold tracking-tight text-[var(--color-ink)]"
                >
                  {link.label}
                </motion.a>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
