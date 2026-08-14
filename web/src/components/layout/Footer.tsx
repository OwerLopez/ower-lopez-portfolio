"use client";

import { useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Radio, Signal } from "lucide-react";
import type { PortfolioContent } from "@/types/content";
import { siteConfig } from "@/config/site";

const SCENE_TICKS = [
  { id: "mission", code: "E2" },
  { id: "work", code: "E3" },
  { id: "architecture", code: "E4" },
  { id: "stack", code: "E5" },
  { id: "journey", code: "E6" },
  { id: "github", code: "E7" },
  { id: "credentials", code: "E8" },
  { id: "philosophy", code: "E9" },
  { id: "faq", code: "E10" },
  { id: "contact", code: "E11" },
];

/**
 * Footer "Mission Control": panel de despegue con ticker de marquee,
 * timeline de escenas, big-type del nombre y terminal de estado en vivo.
 */
const SCENE_INDEX: Record<string, number> = {
  mission: 1,
  work: 2,
  architecture: 3,
  stack: 4,
  journey: 5,
  github: 6,
  credentials: 7,
  philosophy: 8,
  faq: 9,
  contact: 10,
};

/**
 * Footer "Mission Control" para el deck horizontal.
 *
 * Los enlaces `#id` clásicos no funcionan en un deck sin scroll vertical:
 * cada tick/nav item ahora dispara el evento `deck:go {index}` para saltar
 * lateralmente a la escena correspondiente (con fallback de hash por si
 * la página se viera en modo vertical).
 */
export function Footer({ content }: { content: PortfolioContent }) {
  const { footer } = content;
  const reduced = useReducedMotion();

  const navigateScene = useCallback((id: string) => {
    const idx = SCENE_INDEX[id];
    if (typeof idx === "number") {
      window.dispatchEvent(
        new CustomEvent("deck:go", { detail: { index: idx } }),
      );
      return;
    }
    // Fallback: si algún día se reintroduce scroll vertical, el hash funciona.
    window.location.hash = id;
  }, []);

  const nav = [
    { id: "mission", label: footer.navItems.mission },
    { id: "work", label: footer.navItems.work },
    { id: "architecture", label: footer.navItems.architecture },
    { id: "stack", label: footer.navItems.stack },
    { id: "journey", label: footer.navItems.journey },
    { id: "github", label: footer.navItems.github },
    { id: "credentials", label: footer.navItems.credentials },
    { id: "philosophy", label: footer.navItems.philosophy },
    { id: "faq", label: footer.navItems.faq },
    { id: "contact", label: footer.navItems.contact },
  ];

  const tickerItems = [
    "LATENCIA P99 20 MS",
    "RECALL 96%",
    "DATOS LIMPIOS",
    "PRODUCCIÓN, NO DEMOS",
    "INFERENCIA EMBEBIDA",
    "JWT ACTIVO",
    "PIPELINE VIVO",
    siteConfig.location.es.toUpperCase(),
  ];

  return (
    <footer className="relative z-10 mt-16 overflow-hidden border-t border-[#1e1e2e]">
      {/* Ticker de marquee */}
      <div className="relative overflow-hidden border-b border-[#1e1e2e] bg-[#0a0a10] py-2.5">
        <div
          className="flex w-max items-center gap-10 whitespace-nowrap font-mono-token text-[10px] tracking-[0.3em]"
          style={reduced ? undefined : { animation: "ticker 30s linear infinite" }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span className={i % 2 === 0 ? "text-[#ff7a18]" : "text-[#e11d74]"}>{item}</span>
              <span aria-hidden className="text-[#2e2e42]">✦</span>
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6">
        {/* Big-type + timeline de escenas */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono-token text-[10px] uppercase tracking-[0.3em] text-[#6a6978]">
            {footer.tagline?.slice(0, 30)} — {footer.tagline}
          </p>
          <Link
            href="/es"
            className="group mt-4 block bg-gradient-to-r from-[#fbbf24] via-[#ff7a18] via-45% to-[#e11d74] bg-[length:200%_100%] bg-clip-text text-5xl font-black tracking-tighter text-transparent transition-[background-position] duration-700 hover:bg-[100%_0] sm:text-7xl"
            style={{ WebkitBackgroundClip: "text" }}
          >
            {siteConfig.shortName}
            <span className="inline-block origin-left transition-transform duration-500 group-hover:rotate-6">/</span>
          </Link>

          {/* Timeline horizontal de escenas */}
          <div className="relative mt-10 hidden sm:block">
            <div className="h-px w-full bg-gradient-to-r from-[#ff7a18] via-[#e11d74] to-[#8b5cf6] opacity-50" />
            <div className="absolute inset-x-0 top-0 flex justify-between">
              {SCENE_TICKS.map((scene) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => navigateScene(scene.id)}
                  aria-label={String(Object.values(footer.navItems)[SCENE_TICKS.findIndex((t) => t.id === scene.id)] ?? scene.id)}
                  className="group -mt-[5px] flex flex-col items-center"
                >
                  <span className="block h-2.5 w-2.5 rounded-full border border-[#2e2e42] bg-[#0c0c14] transition-all duration-300 group-hover:border-[#ff7a18] group-hover:bg-[#ff7a18] group-hover:shadow-[0_0_10px_rgba(255,122,24,0.8)]" />
                  <span className="font-mono-token mt-2 text-[8px] tracking-[0.2em] text-[#6a6978] transition-colors group-hover:text-[#ff7a18]">
                    {scene.code}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-14 grid gap-10 md:grid-cols-12">
          {/* Columna 1: identidad */}
          <div className="md:col-span-4">
            <p className="font-mono-token text-[11px] uppercase tracking-[0.2em] text-[#6a6978]">
              {footer.navTitle}
            </p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => navigateScene(item.id)}
                    className="group flex w-full items-center gap-2 text-left text-sm text-[#a9a8b8] transition-colors duration-300 hover:text-[#ff7a18]"
                  >
                    <span className="font-mono-token text-[9px] text-[#6a6978] transition-colors group-hover:text-[#ff7a18]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 2: canales */}
          <div className="md:col-span-4">
            <p className="font-mono-token text-[11px] uppercase tracking-[0.2em] text-[#6a6978]">
              {footer.contactTitle}
            </p>
            <ul className="mt-4 space-y-2.5">
              {footer.contactItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group inline-flex w-full items-center justify-between rounded-lg border border-[#1e1e2e] bg-[#0c0c14]/70 px-4 py-3 transition-all duration-300 hover:border-[#e11d74]/40 hover:bg-[#131321]"
                  >
                    <span className="inline-flex items-center gap-2.5 font-mono-token text-xs text-muted">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                      {item.label}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#6a6978] transition-all duration-300 group-hover:text-[#e11d74] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: terminal de estado */}
          <div className="md:col-span-4">
            <p className="font-mono-token text-[11px] uppercase tracking-[0.2em] text-[#6a6978]">
              Estado del sistema
            </p>
            <div className="mt-4 rounded-2xl border border-[#1e1e2e] bg-[#0a0a10] p-5 font-mono-token text-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
                <span className="h-2 w-2 rounded-full bg-[#fbbf24]" />
                <span className="h-2 w-2 rounded-full bg-[#34d399]" />
                <span className="ml-2 text-[10px] text-[#6a6978]">status@ower.dev</span>
              </div>
              <div className="mt-4 space-y-2 text-[11px] leading-relaxed">
                <p>
                  <span className="text-[#34d399]">$</span>{" "}
                  <span className="text-[#a9a8b8]">disponibilidad</span>
                </p>
                  <p className="text-[#e11d74]">→ Q3/Q4 2026 · en busca de misión</p>
                <p>
                  <span className="text-[#34d399]">$</span>{" "}
                  <span className="text-[#a9a8b8]">zona</span>
                </p>
                <p className="text-[#ff7a18]">→ {footer.location} · {footer.timezone}</p>
                <p>
                  <span className="text-[#34d399]">$</span>{" "}
                  <span className="text-[#a9a8b8]">modo</span>
                </p>
                <p className="text-[#8b5cf6]">
                  → encendido · <span className="terminal-cursor">recibiendo señales</span>
                </p>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-[#1e1e2e] pt-3 text-[10px] text-[#6a6978]">
                <Radio className="h-3 w-3 text-[#ff7a18]" />
                <Signal className="h-3 w-3 text-[#e11d74]" />
                <span className="ml-auto">{footer.credit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Base */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-[#1e1e2e] pt-6 font-mono-token text-[11px] text-[#6a6978]"
        >
          <span>
            {footer.copyright} · {footer.rights}
          </span>
          <span className="flex items-center gap-2">
            Diseñado y construido por {siteConfig.shortName}
            <span aria-hidden className="text-[#e11d74]">♦</span>
          </span>
        </motion.div>
      </div>
    </footer>
  );
}
