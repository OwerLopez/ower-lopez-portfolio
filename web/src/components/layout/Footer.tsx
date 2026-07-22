import { ArrowUp } from "lucide-react";
import type { FooterContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Chakana } from "@/components/ui/Chakana";
import { VisitCounter } from "@/components/animations/VisitCounter";

export function Footer({ content }: { content: FooterContent }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] border-t border-white/[0.07] px-[clamp(20px,5vw,64px)] py-9">
      {/* Cinta tricolor peruana con brillo tenue */}
      <span className="peru-line absolute inset-x-0 top-0 h-px opacity-70" />
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-1 text-[13px] text-[var(--color-faint)]">
          <span>
            © {year} {content.rights}
          </span>
          <span className="font-mono-token tracking-[0.05em]">{content.tagline}</span>
        </div>

        <div className="flex items-center gap-5 text-[13px] text-[var(--color-faint)]">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-ink)]"
          >
            GitHub
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-ink)]"
          >
            LinkedIn
          </a>
          <a
            href={siteConfig.links.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[var(--color-ink)]"
          >
            Credly
          </a>
          <a
            href="#top"
            aria-label={content.backToTop}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--color-ink)]"
          >
            {content.backToTop}
            <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
      <div className="mx-auto mt-6 flex max-w-[1180px] flex-wrap items-center justify-between gap-3">
        <p className="font-mono-token text-[11px] tracking-[0.04em] text-white/20">
          {content.builtWith}
        </p>
        <span className="inline-flex items-center gap-5">
          <VisitCounter />
          <span className="font-mono-token inline-flex items-center gap-2 text-[11px] tracking-[0.08em] text-white/25">
            <Chakana className="h-3.5 w-3.5 text-[var(--color-peru-red)]" />
            Hecho con precisión en Perú
            <span aria-hidden="true">🇵🇪</span>
          </span>
        </span>
      </div>
    </footer>
  );
}
