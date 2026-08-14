"use client";

import { ExternalLink, ShieldCheck } from "lucide-react";
import { Reveal, Stagger } from "@/components/animations/Reveal";
import { Counter } from "@/components/animations/Counter";
import { siteConfig } from "@/config/site";
import type { PortfolioContent } from "@/types/content";

const LIQUID = "/assets/texture_liquid.png";

const GLOW_COLOR: Record<string, string> = {
  flame: "#ff7a18",
  magenta: "#e11d74",
  violet: "#8b5cf6",
  amber: "#fbbf24",
};

export function Credentials({ content }: { content: PortfolioContent }) {
  const { credentials } = content;

  return (
    <section id="credentials" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12" aria-label="Credenciales">
      <Reveal>
        <p className="font-mono-token mb-4 flex items-center gap-4 text-xs tracking-[0.35em] text-muted">
          <span className="inline-block h-px w-12 bg-line-strong" />
          {credentials.kicker}
        </p>
      </Reveal>

      <div className="mb-8 max-w-2xl">
        <Reveal delay={80}>
          <h2 className="font-display text-3xl leading-[1.12] font-bold tracking-tight text-ink sm:text-4xl md:text-5xl">
            {credentials.heading}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-3 text-base text-muted">{credentials.description}</p>
        </Reveal>
      </div>

      {/* Muro de trofeos */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stagger stagger={0.06}>
          {credentials.trophies.map((t, i) => {
            const color = GLOW_COLOR[t.glow] ?? "#ff7a18";
            return (
              <Reveal key={t.index} delay={i * 60} variant="block">
                <div
                  className="hover-lift h-full rounded-2xl border border-line bg-surface p-5 sm:p-6"
                  style={{ boxShadow: `0 20px 60px -25px ${color}35` }}
                >
                  <span className="font-mono-token text-[10px] tracking-[0.3em] text-faint">{t.index}</span>
                  <dd className="mt-3 text-3xl font-black tracking-tight tabular-nums sm:text-4xl" style={{ color }}>
                    <Counter value={parseFloat(t.value.replace(/[^0-9.]/g, ""))} suffix={t.value.replace(/[0-9.]/g, "")} />
                  </dd>
                  <h3 className="mt-2.5 font-display text-base font-bold tracking-tight text-ink">{t.title}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-muted">{t.detail}</p>
                </div>
              </Reveal>
            );
          })}
        </Stagger>
      </div>

      {/* Certificaciones verificables */}
      <div className="mt-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Reveal>
            <h3 className="font-mono-token text-xs tracking-[0.3em] text-muted">{credentials.credentialsLabel}</h3>
          </Reveal>
          <Reveal delay={60}>
            <a
              href={siteConfig.links.credly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-2.5 text-sm font-medium text-ink transition-all duration-300 hover:border-[#e11d74]/50 hover:bg-surface-raised"
            >
              <ShieldCheck className="h-4 w-4 text-[#e11d74]" />
              {credentials.verifyCta}
              <ExternalLink className="h-3.5 w-3.5 text-faint" />
            </a>
          </Reveal>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-line bg-surface">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 select-none opacity-15"
            style={{
              backgroundImage: `url(${LIQUID})`,
              backgroundSize: "cover",
              mixBlendMode: "screen",
            }}
          />
          <ul className="divide-y divide-line/60">
            <Stagger stagger={0.06}>
              {credentials.credentials.map((cert, i) => {
                const color = GLOW_COLOR[cert.glow] ?? "#e11d74";
                return (
                  <Reveal key={cert.acronym} delay={i * 50} variant="block">
                    <li className="flex flex-wrap items-center gap-4 px-6 py-5 transition-colors duration-300 hover:bg-surface-raised">
                      <span
                        className="font-mono-token inline-flex h-10 w-10 items-center justify-center rounded-xl border bg-base text-[10px] font-bold"
                        style={{ color, borderColor: `${color}4d` }}
                      >
                        {cert.acronym}
                      </span>
                      <span className="text-sm font-semibold text-ink">{cert.name}</span>
                      <span className="text-xs text-muted">{cert.issuer}</span>
                      <a
                        href={cert.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto inline-flex items-center gap-1.5 font-mono-token text-[10px] tracking-wide text-faint transition-colors duration-300 hover:text-ink"
                      >
                        VERIFICAR <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  </Reveal>
                );
              })}
            </Stagger>
          </ul>
        </div>
      </div>
    </section>
  );
}
