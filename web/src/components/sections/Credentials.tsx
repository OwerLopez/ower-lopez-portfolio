import { BadgeCheck, ExternalLink } from "lucide-react";
import type { CredentialsContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/animations/Reveal";
import { CertCarousel } from "@/components/animations/CertCarousel";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function Credentials({ content }: { content: CredentialsContent }) {
  return (
    <section
      id="credentials"
      className="relative z-[2] mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)] py-[clamp(60px,9vw,120px)]"
    >
      <Reveal>
        <Eyebrow className="mb-4">{content.eyebrow}</Eyebrow>
      </Reveal>
      <Reveal as="h2" className="text-[clamp(1.9rem,4vw,3.2rem)] font-bold tracking-[-0.03em]">
        {content.heading}
      </Reveal>
      <Reveal delay={100}>
        <p className="mb-12 mt-3 max-w-[54ch] text-[1.05rem] text-[var(--color-muted)]">
          {content.description}
        </p>
      </Reveal>

      {/* Logros */}
      <Reveal>
        <div className="font-mono-token mb-5 mt-12 text-[11px] tracking-[0.15em] text-[var(--color-faint)]">
          {content.achievementsLabel}
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.achievements.map((achievement, index) => (
          <Reveal key={achievement.title} delay={(index % 3) * 60}>
            <div className="flex h-full items-start gap-3.5 rounded-2xl border border-white/[0.09] bg-white/[0.02] p-[22px] transition-colors duration-300 hover:border-[var(--color-accent)]/30">
              <span className="mt-1.5 h-[9px] w-[9px] flex-none rotate-45 bg-[var(--color-accent)] shadow-[0_0_12px_var(--color-accent)]" />
              <div>
                <div className="text-[1.02rem] font-semibold">{achievement.title}</div>
                <div className="mt-0.5 text-[0.9rem] text-[var(--color-faint)]">
                  {achievement.detail}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Certificaciones */}
      <Reveal>
        <div className="font-mono-token mb-5 mt-16 flex items-center justify-between text-[11px] tracking-[0.15em] text-[var(--color-faint)]">
          <span>{content.certificationsLabel}</span>
          <span className="text-[var(--color-accent-2)]">{content.certificationsTotal}</span>
        </div>
      </Reveal>
      <Reveal>
        <CertCarousel items={content.certifications} />
      </Reveal>

      {/* Verificacion publica de credenciales */}
      <Reveal delay={100}>
        <div className="mt-8 text-center">
          <a
            href={siteConfig.links.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-6 py-3 text-[14px] font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-accent)]/[0.12]"
          >
            <BadgeCheck className="h-4 w-4 text-[var(--color-accent-2)]" />
            {content.verifyCta}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
