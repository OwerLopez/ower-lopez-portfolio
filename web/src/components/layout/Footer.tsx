import { ArrowUp, Github, Linkedin, Award } from "lucide-react";
import type { FooterContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Chakana } from "@/components/ui/Chakana";
import { VisitCounter } from "@/components/animations/VisitCounter";

const socials = [
  { href: siteConfig.links.github, label: "GitHub", icon: Github },
  { href: siteConfig.links.linkedin, label: "LinkedIn", icon: Linkedin },
  { href: siteConfig.links.credly, label: "Credly", icon: Award },
];

export function Footer({ content }: { content: FooterContent }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] overflow-hidden border-t border-white/[0.08] px-[clamp(20px,5vw,72px)] pb-10 pt-[clamp(56px,8vw,96px)]">
      {/* Cinta tricolor peruana */}
      <span className="peru-line absolute inset-x-0 top-0 h-px opacity-70" />
      {/* Resplandor cálido de cierre */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-1/2 left-1/2 h-[60vh] w-[80vw] max-w-[1100px] -translate-x-1/2 rounded-full opacity-40 blur-[130px]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(255,171,56,0.12), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-[1240px]">
        {/* Wordmark gigante de cierre */}
        <div className="flex flex-col gap-8 border-b border-white/[0.07] pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="font-mono-token mb-4 text-[11px] tracking-[0.2em] text-[var(--color-faint)]">
              {content.tagline}
            </div>
            <a
              href="#top"
              className="block max-w-[16ch] text-[clamp(2.2rem,6vw,4.4rem)] font-bold leading-[0.98] tracking-[-0.04em] text-[var(--color-ink)]"
            >
              Construyamos algo{" "}
              <span className="text-gradient-accent motion-safe:animate-[var(--animate-shimmer)]">
                que escale.
              </span>
            </a>
          </div>

          <a
            href={siteConfig.links.email}
            className="font-mono-token group inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-white/12 bg-white/[0.04] px-6 py-3.5 text-[14px] text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/[0.1] lg:self-auto"
          >
            {siteConfig.email}
          </a>
        </div>

        {/* Columnas: enlaces + meta */}
        <div className="flex flex-col gap-8 py-10 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {socials.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
              >
                <Icon className="h-4 w-4 text-[var(--color-faint)] transition-colors group-hover:text-[var(--color-accent-2)]" />
                {label}
              </a>
            ))}
            <a
              href="#top"
              aria-label={content.backToTop}
              className="group inline-flex items-center gap-2 text-[14px] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
            >
              {content.backToTop}
              <ArrowUp className="h-4 w-4 text-[var(--color-faint)] transition-transform group-hover:-translate-y-0.5 group-hover:text-[var(--color-accent-2)]" />
            </a>
          </nav>

          <VisitCounter />
        </div>

        {/* Base: copyright + firma peruana */}
        <div className="flex flex-col gap-3 border-t border-white/[0.05] pt-7 text-[12.5px] text-[var(--color-faint)] sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {content.rights}
          </span>
          <span className="font-mono-token text-[11px] tracking-[0.04em] text-white/25">
            {content.builtWith}
          </span>
          <span className="font-mono-token inline-flex items-center gap-2 text-[11px] tracking-[0.08em] text-white/30">
            <Chakana className="h-3.5 w-3.5 text-[var(--color-peru-red)]" />
            Hecho con precisión en Perú
            <span aria-hidden="true">🇵🇪</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
