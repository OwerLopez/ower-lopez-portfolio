"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Award, Layers, Zap, Cpu, CheckCircle2 } from "lucide-react";
import type { WorkContent } from "@/types/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { DataPipeline } from "@/components/animations/DataPipeline";
import { ProjectComparison } from "@/components/animations/ProjectComparison";
import { TechTag } from "@/components/ui/TechTag";

export function Work({ content }: { content: WorkContent }) {
  const { featured } = content;
  const [active, setActive] = useState(0);

  return (
    <section
      id="work"
      className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-24 sm:py-32"
    >
      {/* Header */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.05] mt-4">
            {content.heading}
          </h2>
        </div>
        <p className="text-zinc-400 max-w-md text-base sm:text-lg">
          {content.description}
        </p>
      </div>

      {/* Featured Flagship Bento Spotlight */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl border border-white/15 bg-[#09080d]/90 backdrop-blur-2xl overflow-hidden shadow-2xl relative mb-16 group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-cyan-500/10 opacity-30 group-hover:opacity-100 transition-opacity" />

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Column Info */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-amber-400">
                  <Award className="h-3.5 w-3.5 text-amber-400" />
                  {featured.flag}
                </span>
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                  {featured.category}
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
                {featured.title}
              </h3>

              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6">
                {featured.summary}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {featured.tags.map((tag) => (
                  <TechTag key={tag}>{tag}</TechTag>
                ))}
              </div>

              <div className="border-l-2 border-amber-500/50 pl-4 py-2 bg-white/[0.02] rounded-r-lg text-sm text-zinc-300 italic mb-8">
                {featured.note}
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              {featured.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center">
                  <div className={`font-mono font-bold text-xl sm:text-2xl ${m.highlight ? 'text-amber-400' : 'text-white'}`}>
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider mt-1">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Diagram */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-white/10 p-8 sm:p-12 flex flex-col justify-center bg-black/40 relative">
            <div className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>LIVE_INFERENCE_PIPELINE</span>
            </div>
            <DataPipeline className="w-full" />
          </div>
        </div>
      </motion.article>

      {/* Secondary Projects Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-5">
          <Eyebrow>{content.secondary.length} MÁS PROYECTOS</Eyebrow>
          <h3 className="font-display text-3xl font-semibold text-white mt-2 mb-4">
            Innovación en Hackathons & IoT
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Proyectos construidos bajo alta presión de tiempo o presentados en ferias de ingeniería con alto impacto tecnológico.
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hidden lg:block"
            >
              <div className="font-mono text-xs text-amber-400 mb-2">
                {content.secondary[active]?.meta}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4">
                {content.secondary[active]?.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {content.secondary[active]?.tags.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-4">
          {content.secondary.map((project, i) => (
            <div
              key={project.title}
              onMouseEnter={() => setActive(i)}
              className={`rounded-2xl border p-6 transition-all duration-300 cursor-pointer ${
                active === i
                  ? "border-amber-500/50 bg-amber-500/5 shadow-xl"
                  : "border-white/10 bg-[#09080d]/80 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold ${
                  project.badgeTone === 'gold' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {project.badge}
                </span>
                <span className="font-mono text-xs text-zinc-400">{project.meta}</span>
              </div>
              <h4 className="font-display text-2xl font-bold text-white mb-2">
                {project.title}
              </h4>
              <p className="text-zinc-300 text-sm leading-relaxed mb-4 lg:hidden">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <TechTag key={t}>{t}</TechTag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benchmark Matrix */}
      <div className="pt-8 border-t border-white/10">
        <ProjectComparison
          comparisonTitle={content.comparisonTitle}
          comparisonHeaders={content.comparisonHeaders}
          comparison={content.comparison}
        />
      </div>
    </section>
  );
}
