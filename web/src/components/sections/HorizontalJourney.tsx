"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { JourneyItem } from "@/types/content";

const TONE_COLORS: Record<JourneyItem["tone"], string> = {
  flame: "#ff7a18",
  glow: "#e11d74",
  muted: "#8b5cf6",
};

/**
 * Línea de fuego horizontal: hitos arrastrables con carril de energía,
 * tarjetas que se elevan y código de hito tipo misión completada.
 */
export function HorizontalJourney({ items }: { items: JourneyItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const reduced = useReducedMotion();

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    track.setPointerCapture(e.pointerId);
    setDragging(true);
    (track as HTMLDivElement).dataset.startX = String(e.clientX);
    (track as HTMLDivElement).dataset.scrollLeft = String(track.scrollLeft);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !dragging) return;
    const startX = Number((track as HTMLDivElement).dataset.startX ?? 0);
    const scrollLeft = Number((track as HTMLDivElement).dataset.scrollLeft ?? 0);
    track.scrollLeft = scrollLeft - (e.clientX - startX) * 1.4;
  };

  const onPointerUp = () => setDragging(false);

  return (
    <div className="relative">
      {/* Carril de energía superior */}
      <div className="pointer-events-none absolute left-0 right-0 top-[44px] hidden h-px sm:block">
        <motion.div
          className="h-full w-full"
          style={{
            background: "linear-gradient(90deg, #ff7a18, #e11d74 50%, #8b5cf6)",
          }}
          initial={reduced ? undefined : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-12 sm:px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ cursor: dragging ? "grabbing" : "grab" }}
      >
        {items.map((item, i) => {
          const color = TONE_COLORS[item.tone];
          const isToday = item.period.toLowerCase().includes("hoy") || item.period.toLowerCase().includes("today");
          return (
            <motion.article
              key={i}
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[300px] shrink-0 snap-center"
            >
              {/* Nodo en el carril */}
              <div className="absolute -top-[52px] left-8 hidden sm:block">
                <motion.span
                  className="block h-3.5 w-3.5 rounded-full"
                  style={{ background: color, boxShadow: `0 0 16px ${color}` }}
                  animate={reduced ? undefined : { scale: [1, 1.35, 1] }}
                  transition={{ duration: 2.2, delay: i * 0.3, repeat: Infinity }}
                />
              </div>

              <div className="group h-full rounded-2xl border border-[#1e1e2e] bg-[#0c0c14]/80 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2e2e42] hover:shadow-[0_20px_60px_-18px_rgba(225,29,116,0.35)]">
                <div className="flex items-center justify-between">
                  <span className="font-mono-token text-[10px] uppercase tracking-[0.25em] text-[#6a6978]">
                    Hito {String(i + 1).padStart(2, "0")}
                  </span>
                  {isToday && (
                    <span className="rounded-full border border-[#ff7a18]/50 bg-[#ff7a18]/10 px-2 py-0.5 font-mono-token text-[9px] tracking-[0.2em] text-[#ff7a18]">
                      HOY
                    </span>
                  )}
                </div>
                <p className="font-mono-token mt-4 text-[11px] tracking-wide" style={{ color }}>
                  {item.period}
                </p>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#a9a8b8]">{item.description}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Hint de arrastre */}
      <p className="font-mono-token mt-1 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#6a6978]">
        <span aria-hidden>←</span> Desliza para recorrer la línea de fuego <span aria-hidden>→</span>
      </p>
    </div>
  );
}
