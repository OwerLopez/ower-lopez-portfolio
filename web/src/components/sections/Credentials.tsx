"use client";

import { BadgeCheck, ExternalLink, Award } from "lucide-react";
import type { CredentialsContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CertCarousel } from "@/components/animations/CertCarousel";

export function Credentials({ content }: { content: CredentialsContent }) {
  return (
    <section
      id="credentials"
      className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-12 py-24 sm:py-32"
    >
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
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

      {/* Engineering Achievements Cards Grid */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6 font-mono text-xs text-amber-400 uppercase tracking-widest">
          <Award className="h-4 w-4" />
          <span>{content.achievementsLabel}</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.achievements.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#09080d]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-400/50 hover:bg-white/[0.04] group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-zinc-500">0{idx + 1}</span>
                <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Carousel */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-6 font-mono text-xs text-amber-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-4 w-4 text-amber-400" />
            <span>{content.certificationsLabel}</span>
          </div>
          <span className="text-zinc-400">{content.certificationsTotal}</span>
        </div>

        <CertCarousel items={content.certifications} />
      </div>

      <div className="text-center pt-8">
        <a
          href={siteConfig.links.credly}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-amber-400/10 to-transparent px-8 py-3.5 text-sm font-semibold text-amber-300 transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_24px_rgba(255,184,0,0.3)] hover:text-white"
        >
          <BadgeCheck className="h-4 w-4 text-amber-400" />
          <span>{content.verifyCta}</span>
          <ExternalLink className="h-3.5 w-3.5 text-zinc-400" />
        </a>
      </div>
    </section>
  );
}
