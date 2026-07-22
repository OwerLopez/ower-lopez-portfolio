import { BadgeCheck } from "lucide-react";
import type { Certification } from "@/types/content";

/**
 * Carrusel infinito de certificaciones (auto-desplazable, se pausa al hover).
 * Duplica la lista para un loop continuo; la copia es aria-hidden.
 */
export function CertCarousel({ items }: { items: Certification[] }) {
  return (
    <div className="marquee-mask group relative overflow-hidden">
      <div className="flex w-max gap-4 motion-safe:animate-[var(--animate-marquee)] motion-safe:group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4" aria-hidden={copy === 1}>
            {items.map((cert) => (
              <div
                key={`${copy}-${cert.name}`}
                className="flex w-[290px] flex-none items-start gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors duration-300 hover:border-[var(--color-accent)]/35"
              >
                <BadgeCheck className="mt-0.5 h-5 w-5 flex-none text-[var(--color-accent-2)]" />
                <div>
                  <div className="text-[0.9rem] font-medium leading-snug text-[var(--color-ink)]">
                    {cert.name}
                  </div>
                  <div className="font-mono-token mt-1 text-[10.5px] tracking-[0.08em] text-[var(--color-faint)]">
                    {cert.issuer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
