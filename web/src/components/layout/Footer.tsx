"use client";

import { ArrowUp, Github, Linkedin, Award, Heart } from "lucide-react";
import type { FooterContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { VisitCounter } from "@/components/animations/VisitCounter";

export function Footer({ content }: { content: FooterContent }) {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#030305] px-4 sm:px-6 lg:px-12 py-12">
      <div className="mx-auto max-w-[1360px] flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div>
            <div className="font-mono text-xs text-amber-400 font-semibold mb-1">
              {content.tagline}
            </div>
            <div className="text-zinc-400 text-xs font-mono">
              © {year} {content.rights}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <VisitCounter />

            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-zinc-300 hover:border-amber-400 hover:text-white transition-all"
            >
              <span>{content.backToTop}</span>
              <ArrowUp className="h-3.5 w-3.5 text-amber-400" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-4">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href={siteConfig.links.credly} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Credly</a>
          </div>

          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>{content.builtWith}</span>
            <span>🇵🇪</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
