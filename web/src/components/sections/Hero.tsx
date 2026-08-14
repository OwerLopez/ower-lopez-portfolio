"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Copy } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ParticleRain } from "@/components/effects/ParticleRain";
import type { PortfolioContent } from "@/types/content";

const AURORA = "/assets/hero_aurora.png";

function LiveClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("es-PE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "America/Lima",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums text-muted">{time}</span>;
}

export function Hero({ content }: { content: PortfolioContent }) {
  const { nav, intro } = content;
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* noop */
    }
  };

  useEffect(() => {
    document.title = content.meta.title;
    for (const tag of document.head.querySelectorAll('meta[name="description"]')) tag.remove();
    const desc = document.createElement("meta");
    desc.setAttribute("name", "description");
    desc.content = content.meta.description;
    document.head.appendChild(desc);
    return () => desc.remove();
  }, [content.meta.title, content.meta.description]);

  return (
    <section className="relative overflow-hidden scene-glow-flame" aria-label="Intro">
      {/* Arte de fondo generado con IA */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage: `url(${AURORA})`,
          backgroundSize: "cover",
          backgroundPosition: "center 75%",
          opacity: 0.75,
          mixBlendMode: "screen",
        }}
      />
      {/* Lluvia de chispas animadas */}
      <ParticleRain count={58} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base via-transparent to-base" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-base to-transparent" />

      {/* Rueda cónica orbital decorativa */}
      {!reduce && (
        <div
          aria-hidden
          className="animate-orbit pointer-events-none absolute -right-44 top-1/4 h-[520px] w-[520px] opacity-60 md:right-0"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(225,29,116,0.4) 55deg, transparent 115deg, rgba(139,92,246,0.32) 235deg, transparent 300deg)",
            WebkitMaskImage: "radial-gradient(circle, transparent 52%, #000 72%)",
            maskImage: "radial-gradient(circle, transparent 52%, #000 72%)",
          }}
        />
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-5 pb-24 pt-40 sm:px-8 sm:pb-28 sm:pt-48 md:pt-56 md:pb-32">
        {/* Barra de estado */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-12 flex flex-wrap items-center gap-3"
        >
          <span className="rec-blink flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-raised px-4 py-1.5 text-[11px] tracking-[0.18em] text-muted">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#e11d74]" />
            {intro.status}
          </span>
          <span className="font-mono-token rounded-full border border-line bg-surface px-4 py-1.5 text-[11px] tracking-[0.22em] text-faint">
            {intro.frameLabel}
          </span>
        </motion.div>

        {/* Titular cinematográfico */}
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="font-mono-token mb-7 text-xs tracking-[0.38em] text-flame"
        >
          {intro.kicker}
        </motion.p>

        <h1 className="max-w-4xl font-display text-[13vw] leading-[0.94] font-extrabold tracking-tight text-ink sm:text-[8.5vw] md:text-[5.4rem]">
          {intro.titleLines.map((line, i) => (
            <motion.span
              key={i}
              initial={reduce ? undefined : { opacity: 0, y: 28, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease }}
              className="block"
            >
              {line.split(" ").map((token, ti) => (
                <motion.span
                  key={ti}
                  initial={reduce ? undefined : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.15 + ti * 0.06, ease }}
                  style={{ display: "inline-block", marginRight: "0.28em" }}
                >
                  {token}
                </motion.span>
              ))}
            </motion.span>
          ))}
          <motion.span
            initial={reduce ? undefined : { opacity: 0, y: 28, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="block text-gradient-flame"
          >
            {intro.titleAccent}
          </motion.span>
        </h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.62, ease }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {intro.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.74, ease }}
          className="mt-11 flex flex-wrap items-center gap-4"
        >
          <a
            href={intro.primaryTarget}
            className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ff7a18] via-[#e11d74] to-[#8b5cf6] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_14px_44px_-14px_rgba(225,29,116,0.6)] transition-transform duration-300 hover:scale-[1.04]"
          >
            <span>{intro.primaryCta}</span>
            <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              ↓
            </span>
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-raised px-6 py-3.5 text-sm font-medium text-ink transition-all duration-300 hover:border-[#e11d74]/50 hover:bg-surface"
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-[#34d399]" />
                <span className="text-[#34d399]">{intro.copiedFeedback}</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-faint" />
                <span>{intro.secondaryCta}</span>
              </>
            )}
          </button>
        </motion.div>

        {/* Pista de scroll + reloj en vivo */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.05, ease }}
          className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6 text-faint"
        >
          <span className="font-mono-token flex items-center gap-3 text-[11px] tracking-[0.3em]">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              ↓
            </motion.span>
            {intro.scrollCue}
          </span>
          <span className="hidden items-center gap-2 text-xs sm:flex">
            Arequipa · UTC-5 <span aria-hidden className="text-faint">·</span> <LiveClock />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
