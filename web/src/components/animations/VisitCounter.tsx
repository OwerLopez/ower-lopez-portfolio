"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Counter } from "@/components/animations/Counter";

const API = "https://api.counterapi.dev/v1/owerlopez-portfolio/views";
const SESSION_KEY = "visited-v1";

let visitPromise: Promise<{ count: number }> | null = null;

const fetchVisits = (): Promise<{ count: number }> => {
  if (!visitPromise) {
    visitPromise = (async () => {
      const seen = sessionStorage.getItem(SESSION_KEY);
      const url = seen ? `${API}/` : `${API}/up`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("API error");
      const data = (await res.json()) as { count: number };
      if (!seen) sessionStorage.setItem(SESSION_KEY, "1");
      return data;
    })();
  }
  return visitPromise;
};

/**
 * Contador de visitas REAL (counterapi.dev): incrementa una vez por sesion
 * y solo lee en recargas. Se oculta silenciosamente si la API no responde.
 */
export function VisitCounter({ className }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetchVisits()
      .then((data) => {
        if (active) setCount(data.count);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <span
      className={`font-mono-token inline-flex items-center gap-2 text-[11px] tracking-[0.14em] text-[var(--color-faint)] ${className ?? ""}`}
    >
      <Eye className="h-3.5 w-3.5 text-[var(--color-accent-2)]" />
      <span className="tabular-nums text-[var(--color-muted)] min-w-[32px] inline-block">
        {count !== null ? (
          <Counter value={count} duration={1200} />
        ) : failed ? (
          "—"
        ) : (
          <span className="inline-block w-8 h-2.5 animate-pulse rounded bg-white/10" />
        )}
      </span>
      VISITAS
    </span>
  );
}
