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
      {/* Arte de fondo atmosférico */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 select-none"
        style={{
          backgroundImage: `url(${AURORA})`,
          backgroundSize: "cover",
          backgroundPosition: "center 75%",
          opacity: 0.35,
          mixBlendMode: "screen",
        }}
      />
      {/* Lluvia sutil de chispas */}
      <ParticleRain count={20} />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-base via-transparent to-base" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-base to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 pt-20 pb-8 sm:pt-24 sm:pb-10 md:pt-28 md:pb-12 flex flex-col justify-center min-h-[85vh]">
        {/* Barra de estado */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-6 sm:mb-8 flex flex-wrap items-center gap-3"
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
          className="font-mono-token mb-4 text-xs tracking-[0.38em] text-flame"
        >
          {intro.kicker}
        </motion.p>

        <h1 className="max-w-4xl font-display text-[11vw] leading-[0.96] font-extrabold tracking-tight text-ink sm:text-[7vw] md:text-[4.5rem]">
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
          className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          {intro.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.74, ease }}
          className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
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
          className="mt-10 sm:mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-5 text-faint"
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
