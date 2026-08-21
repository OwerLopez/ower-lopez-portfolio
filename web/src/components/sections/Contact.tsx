"use client";

import { useState } from "react";
import { CheckCircle2, Copy, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { PortfolioContent } from "@/types/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/animations/Reveal";

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

      <Reveal>
        {/* Terminal CTA Panel */}
        <div className="mt-12 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]">
          {/* Window Header */}
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-base-raised)] px-5 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-[11px] text-[var(--color-faint)]">
              {contact.terminalTitle}
            </span>
          </div>

          {/* Window Body */}
          <div className="space-y-4 p-6 font-mono text-sm leading-relaxed sm:p-8">
            <p className="text-[var(--color-muted)]">
              <span className="text-emerald-400">$</span> {contact.greeting}
            </p>
            <p className="text-[var(--color-muted)]">
              <span className="text-emerald-400">&gt;</span> {contact.context}
            </p>
            <p className="text-[var(--color-ink)] font-semibold">
              <span className="text-emerald-400">&gt;</span> {contact.request}
            </p>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <span className="text-[var(--color-accent)] font-bold select-all">
                  {siteConfig.email}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-4 py-2 text-xs font-semibold text-[var(--color-ink)] transition-all hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-hover)]"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{contact.copiedFeedback}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[var(--color-faint)]" />
                      <span>{contact.copyLabel}</span>
                    </>
                  )}
                </button>
                <span className="mono-label text-[10px] text-[var(--color-faint)]">
                  {contact.responseTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Connect Cards Grid */}
      {contact.cards && contact.cards.length > 0 && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {contact.cards.map((item, idx) => (
            <Reveal key={item.label} delay={idx * 50}>
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card hover-lift p-5 block group"
              >
                <div className="flex items-center justify-between">
                  <span className="mono-label">{item.label}</span>
                  <ArrowUpRight className="h-4 w-4 text-[var(--color-faint)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="mt-2 text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors">
                  {item.value}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
