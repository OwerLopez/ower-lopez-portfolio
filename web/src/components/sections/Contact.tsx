"use client";

import { useState } from "react";
import { CheckCircle2, Copy, ArrowUpRight, Terminal, Mail, Send, Github, Linkedin, ShieldCheck, Sparkles, Clock, Globe } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { PortfolioContent } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";
import { playTick, playSuccess, playHover } from "@/lib/audio";

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  GitHub: <Github className="h-5 w-5 text-white" />,
  LinkedIn: <Linkedin className="h-5 w-5 text-blue-400" />,
  Credly: <ShieldCheck className="h-5 w-5 text-emerald-400" />,
};

export function Contact({ content }: { content: PortfolioContent }) {
  const { contact } = content;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(siteConfig.email);
      }
    } catch {
      /* ignore permission error */
    }
    playSuccess();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div aria-label="Contact and Channels" className="w-full">
      <SectionHeader
        kicker={contact.kicker}
        heading={contact.headingLead + " " + contact.headingAccent}
        description={contact.description}
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (Col 1-7): Interactive Command Dispatch & Direct Email */}
        <div className="lg:col-span-7">
          <Reveal>
            <div className="h-full rounded-3xl border border-white/[0.12] bg-gradient-to-b from-[#11121c]/95 to-[#090a10]/95 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle top edge ambient aura */}
              <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-32 w-3/4 rounded-full bg-blue-500/15 blur-3xl" />

              <div>
                {/* Terminal Header Bar */}
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
                      <Terminal className="h-3 w-3 text-cyan-400" />
                      dispatch://protocol-handshake
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[10px] font-mono text-emerald-400 font-bold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    DISPONIBLE
                  </span>
                </div>

                {/* Terminal Narrative */}
                <div className="space-y-3 font-mono text-xs sm:text-sm leading-relaxed mb-8">
                  <p className="text-zinc-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold select-none">$</span>
                    <span>{contact.greeting}</span>
                  </p>
                  <p className="text-zinc-400 flex items-start gap-2">
                    <span className="text-blue-400 font-bold select-none">&gt;</span>
                    <span>{contact.context}</span>
                  </p>
                  <p className="text-white font-semibold flex items-start gap-2">
                    <span className="text-cyan-400 font-bold select-none">&gt;</span>
                    <span>{contact.request}</span>
                  </p>
                </div>
              </div>

              {/* Action Box: Email Capsule & SLA */}
              <div className="pt-6 border-t border-white/[0.08] space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/40 border border-white/[0.08]">
                  <div className="flex items-center gap-3 min-w-0 pl-2">
                    <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-bold text-white truncate select-all">
                      {siteConfig.email}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      onClick={() => playTick()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono font-bold text-white transition-all shadow-sm active:scale-95"
                    >
                      <Send className="h-3 w-3" />
                      <span>Escribir</span>
                    </a>

                    <button
                      type="button"
                      onClick={copyEmail}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/[0.12] bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono font-bold text-zinc-200 transition-all active:scale-95"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{contact.copiedFeedback}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-zinc-400" />
                          <span>{contact.copyLabel}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* SLA and Location telemetry */}
                <div className="flex flex-wrap items-center justify-between gap-y-2 text-[11px] font-mono text-zinc-500 px-1">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3 text-cyan-400" />
                    {contact.responseTime}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe className="h-3 w-3 text-blue-400" />
                    Arequipa, Perú · UTC-5 (Remoto Global)
                  </span>
                </div>
              </div>

            </div>
          </Reveal>
        </div>

        {/* Right Column (Col 8-12): Verified Digital Nodes & Direct Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {contact.cards && contact.cards.map((item, idx) => {
            const icon = CHANNEL_ICONS[item.label] ?? <ArrowUpRight className="h-5 w-5 text-blue-400" />;
            
            return (
              <Reveal key={item.label} delay={idx * 60}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playTick()}
                  onMouseEnter={() => playHover()}
                  className="glass-card hover-lift p-5 sm:p-6 rounded-2xl border border-white/[0.1] bg-gradient-to-r from-[#10111a]/95 to-[#0c0d15]/95 flex items-center justify-between group relative overflow-hidden transition-all shadow-lg hover:border-blue-500/40"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-blue-500/30 transition-transform">
                      {icon}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <span className="font-mono text-[11px] text-zinc-400 group-hover:text-cyan-300 font-semibold transition-colors">
                        {item.label}
                      </span>
                      <span className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors truncate mt-0.5">
                        {item.value}
                      </span>
                    </div>
                  </div>

                  <div className="h-9 w-9 rounded-xl border border-white/[0.08] bg-white/[0.02] flex items-center justify-center group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all shrink-0 ml-3">
                    <ArrowUpRight className="h-4 w-4 text-zinc-400 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

      </div>
    </div>
  );
}
