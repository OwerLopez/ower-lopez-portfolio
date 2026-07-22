"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDownRight, Terminal, Cpu, Zap, Activity, CheckCircle2, ShieldCheck } from "lucide-react";
import type { HeroContent } from "@/types/content";
import { siteConfig } from "@/config/site";
import { Counter } from "@/components/animations/Counter";
import { Chakana } from "@/components/ui/Chakana";
import { FluidRipple } from "@/components/animations/FluidRipple";

function LiveClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("es-PE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "America/Lima",
        }).format(new Date())
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="font-mono tabular-nums text-amber-400">{time}</span>;
}

export function Hero({ content }: { content: HeroContent }) {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(mx, { stiffness: 50, damping: 18 });
  const gy = useSpring(my, { stiffness: 50, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 30);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 30);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMove}
      className="relative z-10 min-h-screen flex flex-col justify-center overflow-hidden px-4 sm:px-6 lg:px-12 pt-28 pb-16"
    >
      {/* Interactive Liquid Water Ripple Canvas (crafter.run style) */}
      <FluidRipple className="opacity-70" />


      {/* Background Rotating Andean Chakana & Glow */}
      <motion.div
        aria-hidden="true"
        style={{ x: gx, y: gy }}
        className="pointer-events-none absolute right-[-5%] top-1/2 -translate-y-1/2 z-0 hidden lg:block opacity-20"
      >
        <Chakana className="w-[55vw] max-w-[750px] text-amber-500/20" spin />
      </motion.div>

      <div className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[50vh] rounded-full bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-purple-600/5 blur-[140px]" />

      {/* Main Content Grid (Asymmetric Bento) */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1360px]"
      >
        {/* Status Telemetry Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex flex-wrap items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-mono text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>{content.status}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400 border border-white/10 rounded-full px-3 py-1 bg-white/[0.02]">
            <span>AREQUIPA 16.40°S 71.53°W</span>
            <span className="text-zinc-600">•</span>
            <LiveClock />
          </div>
        </motion.div>

        {/* Hero Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Left Card: Editorial Hero Core */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-white/10 bg-[#09080d]/80 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-cyan-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />

            <div>
              <div className="font-mono text-xs text-amber-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-amber-400" />
                <span>{siteConfig.role.es}</span>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05] mb-6">
                {content.titleLead}{" "}
                <span className="text-gradient-accent italic block sm:inline">
                  {content.titleAccent}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed mb-8">
                {content.description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
              <a
                href="#work"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-400 px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/25 transition-all hover:scale-105 hover:shadow-amber-500/40"
              >
                <span>{content.primaryCta}</span>
                <ArrowDownRight className="h-4 w-4 stroke-[2.5]" />
              </a>

              <button
                onClick={copyEmail}
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-white/10 hover:border-amber-400/50"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-xs">¡Email Copiado!</span>
                  </>
                ) : (
                  <>
                    <span>{content.secondaryCta}</span>
                    <span className="font-mono text-xs text-zinc-400">({siteConfig.email})</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Right Bento Column: Interactive Telemetry & Stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Top Interactive Telemetry Terminal Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="rounded-3xl border border-white/10 bg-[#09080d]/90 p-6 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-amber-400" />
                  <span className="font-mono text-xs font-semibold text-zinc-300">
                    LIVE_SYSTEM_TELEMETRY.sh
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                </div>
              </div>

              <div className="font-mono text-xs space-y-2.5 text-zinc-300">
                <div className="flex justify-between items-center bg-white/[0.03] p-2 rounded-lg border border-white/5">
                  <span className="text-zinc-400">$ INFERENCE_ENGINE</span>
                  <span className="text-emerald-400 font-bold">ONNX Runtime (Java 17)</span>
                </div>
                <div className="flex justify-between items-center bg-white/[0.03] p-2 rounded-lg border border-white/5">
                  <span className="text-zinc-400">$ P99_LATENCY</span>
                  <span className="text-amber-400 font-bold">20 ms (In-Process)</span>
                </div>
                <div className="flex justify-between items-center bg-white/[0.03] p-2 rounded-lg border border-white/5">
                  <span className="text-zinc-400">$ MODEL_RECALL</span>
                  <span className="text-cyan-400 font-bold">96.0% (Random Forest)</span>
                </div>
                <div className="flex justify-between items-center bg-white/[0.03] p-2 rounded-lg border border-white/5">
                  <span className="text-zinc-400">$ ETL_STATUS</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Zap className="h-3 w-3 text-emerald-400" /> Zero Downtime
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bottom High-Impact Stats Bento Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="rounded-3xl border border-white/10 bg-[#09080d]/90 p-6 backdrop-blur-xl grid grid-cols-2 gap-4"
            >
              {content.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-center transition-all hover:border-amber-500/30 hover:bg-white/[0.04]"
                >
                  <div className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight text-gradient-accent mb-1">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="font-mono text-[10px] font-medium tracking-wider text-zinc-400 uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
