"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Code2, Database, BrainCircuit, Cloud, CheckCircle2 } from "lucide-react";
import type { StackContent } from "@/types/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SkillMeters } from "@/components/animations/SkillMeters";

const ICONS = [Code2, Cpu, Database, BrainCircuit, Cloud, CheckCircle2];

export function Stack({ content }: { content: StackContent }) {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const filteredGroups = activeTab === null
    ? content.groups
    : content.groups.filter((_, idx) => idx === activeTab);

  return (
    <section
      id="stack"
      className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-24 sm:py-32"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
        <div className="lg:col-span-6 space-y-4">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <h2 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-white leading-[1.05]">
            {content.heading}
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            {content.description}
          </p>
        </div>

        <div className="lg:col-span-6">
          <SkillMeters className="rounded-3xl border border-white/10 bg-[#09080d]/80 p-6 backdrop-blur-xl shadow-2xl" />
        </div>
      </div>

      {/* Domain Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab(null)}
          className={`rounded-full px-5 py-2 font-mono text-xs font-semibold transition-all ${
            activeTab === null
              ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
              : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
          }`}
        >
          TODOS LOS DOMINIOS
        </button>

        {content.groups.map((group, idx) => (
          <button
            key={group.label}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`rounded-full px-5 py-2 font-mono text-xs font-semibold transition-all ${
              activeTab === idx
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                : "border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Grid of Tech Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredGroups.map((group, idx) => {
            const Icon = ICONS[idx % ICONS.length] || Cpu;
            return (
              <motion.div
                key={group.label}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-white/10 bg-[#09080d]/90 p-6 backdrop-blur-xl flex flex-col justify-between hover:border-amber-400/50 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
                        {group.label}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-zinc-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-zinc-300 transition-all group-hover:border-white/20 group-hover:bg-white/[0.06] group-hover:text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>PRODUCTION READY</span>
                  <span className="text-emerald-400 font-semibold">VERIFICADO</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
