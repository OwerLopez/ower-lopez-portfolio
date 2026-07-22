"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";

/** Conmutador de idioma que preserva la ruta actual cambiando el prefijo. */
export function LocaleSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();

  const pathWithout = (() => {
    const segments = pathname.split("/");
    // segments[1] es el locale actual; lo reemplazamos por el destino
    return segments.slice(2).join("/");
  })();

  return (
    <div
      role="group"
      aria-label="Seleccionar idioma"
      className="flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.04] p-0.5"
    >
      {locales.map((locale) => {
        const active = locale === current;
        const href = `/${locale}${pathWithout ? `/${pathWithout}` : ""}`;
        return (
          <Link
            key={locale}
            href={href}
            hrefLang={locale}
            aria-current={active ? "true" : undefined}
            className={cn(
              "font-mono-token relative rounded-full px-2.5 py-1 text-[11px] tracking-wide transition-colors",
              active
                ? "text-[var(--color-ink)]"
                : "text-[var(--color-faint)] hover:text-[var(--color-ink)]",
            )}
          >
            {active && (
              <motion.span
                layoutId="activeLocalePill"
                className="absolute inset-0 z-[1] rounded-full bg-white/10"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">{localeLabels[locale]}</span>
          </Link>
        );
      })}
    </div>
  );
}
