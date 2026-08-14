"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, Copy } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { PortfolioContent } from "@/types/content";

function TerminalPrompt({ text, delay, done }: { text: string; delay: number; done: () => void }) {
  const [visible, setVisible] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setVisible(text);
      done();
      return;
    }
    let frame: number;
    const t0 = window.setTimeout(() => {
      let i = 0;
      const tick = () => {
        i += 1;
        setVisible(text.slice(0, i));
        if (i < text.length) frame = window.setTimeout(tick, 38);
        else done();
      };
      tick();
    }, delay);
    return () => {
      window.clearTimeout(t0);
      window.clearTimeout(frame);
    };
  }, [text, delay, done, reduce]);

  return (
    <p className="font-mono-token text-sm leading-7 text-muted">
      <span className="text-[#e11d74]">$&nbsp;</span>
      {visible}
      {visible.length < text.length && <span className="terminal-cursor" aria-hidden />}
    </p>
  );
}

export function Contact({ content }: { content: PortfolioContent }) {
  const { contact } = content;
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(0);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard no disponible */
    }
  };

  const lines = [contact.greeting, contact.context, contact.request];

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 pt-8 pb-10 sm:pt-12 sm:pb-12" aria-label="Contacto">
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono-token mb-4 flex items-center gap-4 text-xs tracking-[0.35em] text-muted"
      >
        <span className="inline-block h-px w-12 bg-line-strong" />
        {contact.kicker}
      </motion.p>

      {/* CTA monumental */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="font-display max-w-4xl text-3xl leading-[1.05] font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl"
      >
        {contact.headingLead}{" "}
        <span className="text-gradient-flame">{contact.headingAccent}</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 max-w-xl text-base text-muted sm:text-lg"
      >
        {contact.description}
      </motion.p>

      {/* Terminal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="border-gradient mt-8 overflow-hidden rounded-2xl bg-surface-raised"
      >
        <div className="flex items-center gap-3 border-b border-line px-6 py-4">
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#e11d74]/60" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]/60" />
          <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-[#34d399]/60" />
          <span className="font-mono-token ml-2 text-[10px] tracking-[0.3em] text-faint">{contact.terminalTitle}</span>
        </div>
        <div className="space-y-2 px-6 py-8">
          {lines.map((line, i) => (
            <TerminalPrompt
              key={i}
              text={line}
              delay={400 + i * 1800}
              done={() => setStep((s) => Math.max(s, i + 1))}
            />
          ))}
          {step >= lines.length && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="font-mono-token mt-2 text-sm text-ink"
            >
              <span className="text-[#e11d74]">→&nbsp;</span>
              {contact.emailLabel}{" "}
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 border-b border-dashed border-line-strong pb-0.5 transition-colors duration-300 hover:border-[#ff7a18] hover:text-[#ff7a18]"
              >
                {siteConfig.email}
                {copied ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#34d399]" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-faint" />
                )}
              </button>
              <span className="text-faint">&nbsp;· {contact.responseTime}</span>
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Tarjetas de canal */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contact.cards.map((card, i) => (
          <motion.a
            key={card.label}
            href={card.href}
            {...(card.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.35 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="hover-lift group rounded-2xl border border-line bg-surface p-5"
          >
            <p className="font-mono-token text-[10px] tracking-[0.25em] text-faint">{card.label}</p>
            <p className="mt-2 flex items-center justify-between text-sm font-semibold text-ink">
              {card.value}
              <ArrowUpRight className="h-4 w-4 text-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#ff7a18]" />
            </p>
          </motion.a>
        ))}
      </div>

      {/* Canales alternativos */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-wrap items-center gap-3 text-xs text-muted"
      >
        {contact.channels.map((ch) => (
          <a
            key={ch.label}
            href={ch.href}
            {...(ch.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 transition-all duration-300 hover:border-[#e11d74]/50 hover:text-ink"
          >
            <span className="font-mono-token text-[10px] uppercase tracking-[0.2em] text-faint">{ch.kind}</span>
            {ch.handle}
          </a>
        ))}
      </motion.div>
    </section>
  );
}
