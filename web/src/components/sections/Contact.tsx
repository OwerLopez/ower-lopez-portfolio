import { ArrowRight } from "lucide-react";
import type { ContactContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/animations/Reveal";
import { ReactionBar } from "@/components/animations/ReactionBar";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Contact({ content }: { content: ContactContent }) {
  return (
    <section
      id="contact"
      className="relative z-[2] mx-auto max-w-[1000px] px-[clamp(20px,5vw,64px)] py-[clamp(90px,13vw,170px)] text-center"
    >
      <Reveal>
        <Eyebrow className="mb-6">{content.eyebrow}</Eyebrow>
      </Reveal>

      <Reveal delay={60} as="h2" className="text-[clamp(2.2rem,6vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.035em]">
        {content.headingLead}
        <br />
        <span className="text-gradient-accent motion-safe:animate-[var(--animate-shimmer)]">
          {content.headingAccent}
        </span>
      </Reveal>

      <Reveal delay={140}>
        <p className="mx-auto mt-6 max-w-[52ch] text-[1.12rem] leading-[1.6] text-[var(--color-muted)]">
          {content.description}
        </p>
      </Reveal>

      <Reveal delay={220}>
        <div className="mt-11 flex flex-wrap justify-center gap-3.5">
          <MagneticButton
            href={siteConfig.links.email}
            className="gap-2.5 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] px-8 py-4 text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(43,92,255,0.4)] transition-shadow hover:shadow-[0_12px_44px_rgba(43,92,255,0.6)]"
          >
            {content.emailCta}
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href={siteConfig.links.linkedin}
            external
            className="gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-8 py-4 text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:border-white/22 hover:bg-white/[0.09]"
          >
            {content.linkedinCta}
          </MagneticButton>
          <MagneticButton
            href={siteConfig.links.github}
            external
            className="gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-8 py-4 text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:border-white/22 hover:bg-white/[0.09]"
          >
            {content.githubCta}
          </MagneticButton>
        </div>
      </Reveal>

      <Reveal delay={300}>
        <a
          href={siteConfig.links.email}
          className="font-mono-token mt-10 inline-block text-sm tracking-[0.05em] text-[var(--color-faint)] transition-colors hover:text-[var(--color-ink)]"
        >
          {siteConfig.email}
        </a>
      </Reveal>

      {/* Reacciones reales compartidas entre visitantes */}
      <Reveal delay={360}>
        <ReactionBar className="mt-10" />
      </Reveal>
    </section>
  );
}
