"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { ExperienceContent } from "@/types/content";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Experience({ content }: { content: ExperienceContent }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 70%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      id="experience"
      className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-24 sm:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column Heading */}
        <div className="lg:col-span-5 sticky top-28">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.05] mt-4">
            {content.heading}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 max-w-md">
            {content.description}
          </p>
        </div>

        {/* Right Column Timeline */}
        <div ref={trackRef} className="lg:col-span-7 relative pl-8 sm:pl-12">
          {/* Vertical Track Line */}
          <div className="absolute left-[10px] sm:left-[14px] top-2 bottom-2 w-px bg-white/10" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[10px] sm:left-[14px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-amber-400 via-cyan-400 to-emerald-400"
          />

          <div className="space-y-12">
            {content.items.map((exp, idx) => (
              <div key={exp.title} className="relative group">
                {/* Node Dot */}
                <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-[#030305] transition-all group-hover:border-amber-400 group-hover:scale-125">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      exp.tone === "accent"
                        ? "bg-amber-400 shadow-[0_0_10px_#fbbf24]"
                        : "bg-zinc-500 group-hover:bg-amber-300"
                    }`}
                  />
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#09080d]/80 p-6 backdrop-blur-xl transition-all duration-300 group-hover:border-amber-400/40">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-amber-400 tracking-wider">
                      {exp.period}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-white mb-3">
                    {exp.title}
                  </h3>

                  <p className="text-zinc-300 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
