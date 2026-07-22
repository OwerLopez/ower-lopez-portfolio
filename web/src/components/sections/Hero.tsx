"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Activity, MapPin, Terminal } from "lucide-react";
import type { HeroContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Counter } from "@/components/animations/Counter";
import { SplitText } from "@/components/animations/SplitText";
import { DataConstellation } from "@/components/animations/DataConstellation";
import { Chakana } from "@/components/ui/Chakana";
import { MagneticButton } from "@/components/ui/MagneticButton";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const panel = {
  hidden: { opacity: 0, y: 34, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.7 },
  },
};

export function Hero({ content }: { content: HeroContent }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <header
      ref={ref}
      id="top"
      className="relative z-[2] flex min-h-screen items-center overflow-hidden px-[clamp(20px,5vw,72px)] pb-24 pt-[132px]"
    >
      {/* Red de datos animada, desvanecida hacia los bordes */}
      <DataConstellation className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_85%_75%_at_60%_45%,#000_30%,transparent_80%)]" />

      {/* Resplandor cálido tras el título (oro → teal) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[28%] top-[42%] z-0 h-[42vh] w-[60vw] max-w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[120px] motion-safe:animate-[var(--animate-drift)]"
        style={{
          background:
            "radial-gradient(ellipse at 40% 40%, rgba(255,171,56,0.22), transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(52,230,212,0.15), transparent 62%)",
        }}
      />

      {/* Chakana como marca de agua andina */}
      <Chakana
        className="pointer-events-none absolute -right-10 bottom-[-4%] z-0 hidden w-[38vw] max-w-[520px] text-[var(--color-accent)]/[0.04] xl:block"
        spin
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-[1] mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-x-14 gap-y-16 lg:grid-cols-12"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* ── Columna izquierda: manifiesto editorial ── */}
        <div className="lg:col-span-7">
          <motion.div
            variants={item}
            className="font-mono-token mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.09] bg-white/[0.04] px-4 py-2 text-[11.5px] tracking-[0.18em] text-[var(--color-muted)] backdrop-blur-sm"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4ade80] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80]" />
            </span>
            {content.status}
          </motion.div>

          <h1 className="max-w-[15ch] text-[clamp(2.9rem,7vw,6.6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            <SplitText
              as="span"
              text={content.titleLead}
              className="inline"
              trigger="mount"
              startDelay={0.1}
            />{" "}
            <SplitText
              as="span"
              text={content.titleAccent}
              className="inline"
              wordClassName="text-gradient-accent motion-safe:animate-[var(--animate-shimmer)]"
              trigger="mount"
              startDelay={0.1 + content.titleLead.split(" ").length * 0.045}
            />
          </h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-[54ch] text-[clamp(1rem,1.5vw,1.2rem)] leading-[1.62] text-[var(--color-muted)]"
          >
            {content.description}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-3.5"
          >
            <MagneticButton
              href="#work"
              className="sheen gap-2.5 rounded-full bg-gradient-to-br from-[var(--color-accent-2)] via-[var(--color-accent)] to-[var(--color-accent-deep)] px-7 py-[15px] text-[15px] font-semibold text-[#08070a] shadow-[0_8px_30px_rgba(240,112,13,0.42)] transition-shadow hover:shadow-[0_14px_46px_rgba(255,171,56,0.55)]"
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

            <span className="font-mono-token ml-1 hidden items-center gap-2 text-[11px] tracking-[0.16em] text-[var(--color-faint)] sm:inline-flex">
              <Chakana className="h-3.5 w-3.5 text-[var(--color-peru-red)]" />
              {siteConfig.location.es.toUpperCase()}
            </span>
          </motion.div>
        </div>

        {/* ── Columna derecha: panel de sistema "en vivo" ── */}
        <motion.aside
          variants={panel}
          style={{ transformPerspective: 1200 }}
          className="group relative lg:col-span-5"
        >
          <div className="card-spotlight glass-panel spin-border relative overflow-hidden rounded-[22px] p-6 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)]">
            {/* barra superior estilo consola */}
            <div className="mb-5 flex items-center justify-between border-b border-white/[0.07] pb-4">
              <div className="flex items-center gap-2.5">
                <Terminal className="h-4 w-4 text-[var(--color-accent-2)]" />
                <span className="font-mono-token text-[11.5px] tracking-[0.14em] text-[var(--color-muted)]">
                  system://ower · status
                </span>
              </div>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[var(--color-peru-red)]/70" />
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]/80" />
                <span className="h-2 w-2 rounded-full bg-[#4ade80]/80" />
              </span>
            </div>

            {/* readout de identidad */}
            <div className="space-y-2.5">
              <ReadoutRow icon={<Activity className="h-3.5 w-3.5" />} label="role">
                {siteConfig.role.es}
              </ReadoutRow>
              <ReadoutRow icon={<MapPin className="h-3.5 w-3.5" />} label="region">
                {siteConfig.location.es} · UTC−5
              </ReadoutRow>
            </div>

            {/* métricas en vivo (los stats del contenido) */}
            <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015]">
              {content.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="relative bg-[var(--color-bg)]/40 px-5 py-4"
                >
                  <dd className="tabular-nums text-[clamp(1.4rem,2.4vw,1.9rem)] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </dd>
                  <dt className="font-mono-token mt-1 text-[10px] leading-tight tracking-[0.08em] text-[var(--color-faint)]">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </div>

            {/* pie: pulso de actividad */}
            <div className="font-mono-token mt-5 flex items-center justify-between text-[10px] tracking-[0.12em] text-[var(--color-faint)]">
              <span>uptime · shipping</span>
              <span className="flex items-center gap-1.5 text-[#4ade80]">
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80] motion-safe:animate-[var(--animate-glow)]" />
                live
              </span>
            </div>

            {/* cinta andina inferior */}
            <div className="andean-fret mt-5 h-3 opacity-40" />
          </div>
        </motion.aside>
      </motion.div>

      {/* Indicador de scroll */}
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

function ReadoutRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] px-4 py-3">
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[var(--color-accent)]/[0.12] text-[var(--color-accent-2)]">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="font-mono-token text-[9.5px] uppercase tracking-[0.18em] text-[var(--color-faint)]">
          {label}
        </div>
        <div className="truncate text-[13.5px] font-medium text-[var(--color-ink)]">
          {children}
        </div>
      </div>
    </div>
  );
}
