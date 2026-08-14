"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FeaturedProject, LogEntry, WorkSection } from "@/types/content";

const LOG_COLORS: Record<string, string> = {
  gold: "#fbbf24",
  emerald: "#34d399",
  violet: "#8b5cf6",
};

/**
 * Carrusel horizontal de misiones: pieza principal + registro de misiones
 * como tarjetas deslizables con navegación por flechas, indicadores y drag.
 */
export function WorkCarousel({ content }: { content: WorkSection }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  type Slide =
    | { type: "featured"; project: FeaturedProject }
    | { type: "log"; project: LogEntry };

  const slides: Slide[] = [
    { type: "featured", project: content.featured },
    ...content.log.map((m) => ({ type: "log" as const, project: m })),
  ];

  const CARD_W = 420;

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const safe = Math.max(0, Math.min(i, slides.length - 1));
    track.scrollTo({ left: safe * (CARD_W + 24), behavior: "smooth" });
    setIndex(safe);
  };

  const onDragUpdate = () => {
    const track = trackRef.current;
    if (!track) return;
    const idx = Math.round(track.scrollLeft / (CARD_W + 24));
    setIndex(Math.max(0, Math.min(idx, slides.length - 1)));
  };

  return (
    <div className="relative">
      {/* Controles */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className="group"
            >
              <span
                className={`block transition-all duration-300 ${
                  i === index ? "h-2 w-9 rounded-full bg-[#ff7a18]" : "h-2 w-2 rounded-full bg-[#2e2e42] group-hover:bg-[#e11d74]"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollToIndex(index - 1)}
            disabled={index === 0}
            aria-label="Anterior"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1e1e2e] bg-[#0c0c14] text-[#a9a8b8] transition-all duration-300 hover:border-[#ff7a18]/50 hover:text-[#ff7a18] disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(index + 1)}
            disabled={index === slides.length - 1}
            aria-label="Siguiente"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1e1e2e] bg-[#0c0c14] text-[#a9a8b8] transition-all duration-300 hover:border-[#ff7a18]/50 hover:text-[#ff7a18] disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Pista del carrusel */}
      <div
        ref={trackRef}
        onScroll={onDragUpdate}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => {
          const isFeatured = slide.type === "featured";
          const color = isFeatured ? "#ff7a18" : LOG_COLORS[slide.project.tone];
          const p = slide.project;
          return (
            <motion.article
              key={`${slide.type}-${i}`}
              initial={reduced ? undefined : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative w-[420px] shrink-0 snap-center overflow-hidden rounded-2xl border border-[#1e1e2e] bg-[#0c0c14]/80 backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-[#2e2e42] hover:shadow-[0_28px_80px_-20px_rgba(225,29,116,0.4)]"
            >
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
              <div className="p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono-token text-[10px] uppercase tracking-[0.25em] text-[#6a6978]">
                    {isFeatured ? content.featuredLabel : (p as LogEntry).index}
                  </span>
                  <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
                </div>

                <p className="mt-4 text-xs font-medium" style={{ color }}>
                  {isFeatured ? (p as FeaturedProject).category : (p as LogEntry).index}
                </p>
                <h3 className="mt-1.5 text-2xl font-bold tracking-tight text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#a9a8b8]">
                  {isFeatured ? (p as FeaturedProject).summary : (p as LogEntry).description}
                </p>

                {"metrics" in p && p.metrics && (
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {(p.metrics as { value: string; label: string }[]).map((m) => (
                      <div key={m.label} className="rounded-xl border border-[#1e1e2e] bg-[#0a0a10] p-3.5">
                        <p className="font-mono-token text-lg font-bold tabular-nums" style={{ color }}>
                          {m.value}
                        </p>
                        <p className="mt-0.5 font-mono-token text-[9px] uppercase tracking-[0.18em] text-[#6a6978]">
                          {m.label}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tags.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-[#1e1e2e] bg-[#131321] px-2.5 py-1 font-mono-token text-[10px] text-[#a9a8b8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {"links" in p && p.links && (
                  <div className="mt-6 flex gap-3">
                    {(p.links as { label: string; href: string; external?: boolean }[]).map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="font-mono-token rounded-full border border-[#2e2e42] px-4 py-2 text-[11px] text-[#a9a8b8] transition-all duration-300 hover:border-[#ff7a18]/50 hover:text-[#ff7a18]"
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: color }}
              />
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
