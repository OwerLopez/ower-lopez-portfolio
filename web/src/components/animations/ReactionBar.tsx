"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NS = "https://api.counterapi.dev/v1/owerlopez-portfolio";

const REACTIONS = [
  { key: "react-fire", emoji: "🔥", label: "Impresionante" },
  { key: "react-rocket", emoji: "🚀", label: "Contratable" },
  { key: "react-heart", emoji: "💙", label: "Me encanta" },
] as const;

type ReactionKey = (typeof REACTIONS)[number]["key"];

/**
 * Barra de reacciones con conteo REAL compartido entre todos los visitantes
 * (counterapi.dev). Un voto por reaccion por navegador (localStorage).
 */
export function ReactionBar({ className }: { className?: string }) {
  const [counts, setCounts] = useState<Record<ReactionKey, number> | null>(null);
  const [voted, setVoted] = useState<Record<string, boolean>>({});
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setVoted(
      Object.fromEntries(
        REACTIONS.map((r) => [r.key, localStorage.getItem(`v-${r.key}`) === "1"]),
      ),
    );
    const load = async () => {
      try {
        const results = await Promise.all(
          REACTIONS.map(async (r) => {
            const res = await fetch(`${NS}/${r.key}/`);
            if (!res.ok) throw new Error("counter");
            const data = (await res.json()) as { count: number };
            return [r.key, data.count] as const;
          }),
        );
        setCounts(Object.fromEntries(results) as Record<ReactionKey, number>);
      } catch {
        setFailed(true);
      }
    };
    void load();
  }, []);

  const react = async (key: ReactionKey) => {
    if (voted[key]) return;
    // Optimista: cuenta y bloquea al instante
    setVoted((v) => ({ ...v, [key]: true }));
    localStorage.setItem(`v-${key}`, "1");
    setCounts((c) => (c ? { ...c, [key]: (c[key] ?? 0) + 1 } : c));
    try {
      await fetch(`${NS}/${key}/up`);
    } catch {
      /* el voto optimista se mantiene visualmente */
    }
  };

  return (
    <div className={`flex flex-wrap items-center justify-center gap-3 ${className ?? ""}`}>
      {REACTIONS.map((r) => (
        <motion.button
          key={r.key}
          type="button"
          onClick={() => react(r.key)}
          disabled={voted[r.key]}
          whileTap={{ scale: 0.9 }}
          whileHover={voted[r.key] ? undefined : { scale: 1.06, y: -2 }}
          title={r.label}
          aria-label={`${r.label} (${counts?.[r.key] ?? 0})`}
          className={`group inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] transition-colors ${
            voted[r.key]
              ? "cursor-default border-[var(--color-accent)]/50 bg-[var(--color-accent)]/[0.14] text-[var(--color-ink)]"
              : "border-white/12 bg-white/[0.04] text-[var(--color-muted)] hover:border-[var(--color-accent)]/40 hover:bg-white/[0.07]"
          }`}
        >
          <span className="text-[15px] transition-transform duration-200 group-hover:scale-110">
            {r.emoji}
          </span>
          <span className="font-mono-token tabular-nums text-[12px] inline-block min-w-[16px] text-center">
            {counts ? (counts[r.key] ?? 0) : (failed ? 0 : "·")}
          </span>
        </motion.button>
      ))}
    </div>
  );
}
