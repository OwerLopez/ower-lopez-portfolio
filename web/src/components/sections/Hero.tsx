"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { HeroContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Counter } from "@/components/animations/Counter";
import { SplitText } from "@/components/animations/SplitText";
import { DataConstellation } from "@/components/animations/DataConstellation";
import { Chakana } from "@/components/ui/Chakana";
import { MagneticButton } from "@/components/ui/MagneticButton";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero({ content }: { content: HeroContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: el contenido sube y se desvanece al hacer scroll.
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <header
      ref={ref}
      id="top"
      className="relative z-[2] flex min-h-screen flex-col items-center justify-center overflow-hidden px-[clamp(20px,5vw,64px)] pb-20 pt-[140px] text-center"
    >
      {/* Red de datos animada, desvanecida hacia los bordes */}
      <DataConstellation className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_35%,transparent_78%)]" />

      {/* Chakana como marca de agua andina */}
      <Chakana
        className="pointer-events-none absolute right-[6%] top-[22%] z-0 hidden w-24 text-[var(--color-accent)]/[0.06] lg:block"
        spin
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-[1]"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={item}
          className="font-mono-token mb-9 inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-4 py-2 text-[11.5px] tracking-[0.18em] text-[var(--color-muted)] backdrop-blur-sm"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80]" />
          </span>
          {content.status}
        </motion.div>

        <h1 className="mx-auto max-w-[16ch] text-[clamp(2.9rem,8.5vw,7.4rem)] font-bold leading-[0.96] tracking-[-0.035em]">
          <SplitText
            as="span"
            text={content.titleLead}
            className="inline"
            trigger="mount"
            startDelay={0.15}
          />{" "}
          <SplitText
            as="span"
            text={content.titleAccent}
            className="inline"
            wordClassName="text-gradient-accent motion-safe:animate-[var(--animate-shimmer)]"
            trigger="mount"
            startDelay={0.15 + content.titleLead.split(" ").length * 0.045}
          />
        </h1>

        <motion.p
          variants={item}
          className="mx-auto mt-8 max-w-[60ch] text-[clamp(1rem,1.6vw,1.22rem)] leading-[1.65] text-[var(--color-muted)]"
        >
          {content.description}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-11 flex flex-wrap justify-center gap-3.5"
        >
          <MagneticButton
            href="#work"
            className="gap-2.5 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-deep)] px-7 py-[15px] text-[15px] font-semibold text-white shadow-[0_8px_30px_rgba(43,92,255,0.4)] transition-shadow hover:shadow-[0_12px_40px_rgba(43,92,255,0.6)]"
          >
            {content.primaryCta}
            <ArrowRight className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="gap-2.5 rounded-full border border-white/12 bg-white/[0.05] px-7 py-[15px] text-[15px] font-medium text-[var(--color-ink)] transition-colors hover:border-white/22 hover:bg-white/[0.09]"
          >
            {content.secondaryCta}
          </MagneticButton>
        </motion.div>

        <motion.dl
          variants={item}
          className="mt-16 flex flex-wrap justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-md"
        >
          {content.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={
                index < content.stats.length - 1
                  ? "border-r border-white/[0.08] px-[30px] py-5"
                  : "px-[30px] py-5"
              }
            >
              <dd className="tabular-nums text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.02em]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="font-mono-token mt-1 text-[11px] tracking-[0.1em] text-[var(--color-faint)]">
                {stat.label}
              </dt>
            </div>
          ))}
        </motion.dl>

        <motion.div
          variants={item}
          className="font-mono-token mt-7 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] text-[var(--color-faint)]"
        >
          <Chakana className="h-3.5 w-3.5 text-[var(--color-peru-red)]" />
          {siteConfig.location.es.toUpperCase()}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono-token text-[10px] tracking-[0.25em] text-[var(--color-faint)]">
          {content.scroll}
        </span>
        <div className="relative h-[38px] w-px overflow-hidden bg-gradient-to-b from-[var(--color-faint)] to-transparent">
          <span className="absolute left-[-1px] top-0 h-2.5 w-[3px] rounded-sm bg-[var(--color-accent)] motion-safe:animate-[var(--animate-scroll-cue)]" />
        </div>
      </div>
    </header>
  );
}
