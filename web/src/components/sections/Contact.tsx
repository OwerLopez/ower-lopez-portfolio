"use client";

import { useState } from "react";
import { ArrowRight, Mail, CheckCircle2, Linkedin, Github, BadgeCheck, Terminal } from "lucide-react";
import type { ContactContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ReactionBar } from "@/components/animations/ReactionBar";

export function Contact({ content }: { content: ContactContent }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-24 sm:py-36"
    >
      <div className="rounded-3xl border border-white/15 bg-gradient-to-b from-[#09080d]/90 via-[#050408]/95 to-[#030305] p-8 sm:p-16 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-center">
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-transparent blur-[140px]" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Eyebrow className="justify-center mb-6">{content.eyebrow}</Eyebrow>

          <h2 className="font-display text-4xl sm:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-6">
            {content.headingLead}{" "}
            <span className="text-gradient-accent italic block sm:inline">
              {content.headingAccent}
            </span>
          </h2>

          <p className="text-zinc-300 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            {content.description}
          </p>

          {/* Email Copy Card Terminal */}
          <div className="rounded-2xl border border-white/10 bg-[#09080d] p-6 max-w-xl mx-auto mb-10 text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-amber-400" />
                <span>DIRECT_COMMUNICATION_LINK</span>
              </div>
              <span className="text-emerald-400">STATUS: OPEN</span>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/[0.03] p-4 rounded-xl border border-white/5">
              <div className="font-mono text-sm sm:text-base text-amber-300 font-semibold truncate">
                {siteConfig.email}
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 font-mono text-xs font-bold text-black transition-all hover:bg-amber-400 hover:scale-105 shrink-0"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-black" />
                    <span>COPIADO</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 text-black" />
                    <span>COPIAR EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Direct Social Cards */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-xs font-semibold text-white transition-all hover:border-amber-400 hover:bg-white/10 hover:scale-105"
            >
              <Linkedin className="h-4 w-4 text-cyan-400" />
              <span>{content.linkedinCta}</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
            </a>

            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-xs font-semibold text-white transition-all hover:border-amber-400 hover:bg-white/10 hover:scale-105"
            >
              <Github className="h-4 w-4 text-amber-400" />
              <span>{content.githubCta}</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
            </a>

            <a
              href={siteConfig.links.credly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-xs font-semibold text-white transition-all hover:border-amber-400 hover:bg-white/10 hover:scale-105"
            >
              <BadgeCheck className="h-4 w-4 text-emerald-400" />
              <span>CREDLY VERIFIED</span>
              <ArrowRight className="h-3.5 w-3.5 text-zinc-500" />
            </a>
          </div>

          <div className="pt-6 border-t border-white/10 flex justify-center">
            <ReactionBar />
          </div>
        </div>
      </div>
    </section>
  );
}
