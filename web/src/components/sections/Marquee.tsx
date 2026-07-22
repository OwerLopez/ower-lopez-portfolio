/**
 * Cinta infinita de tecnologias. Duplica el contenido para un loop continuo
 * y se pausa al pasar el cursor por encima.
 */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee-mask group relative z-[2] overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-[22px]">
      <div className="font-mono-token flex w-max whitespace-nowrap text-sm text-[var(--color-muted)] motion-safe:animate-[var(--animate-marquee)] motion-safe:group-hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex" aria-hidden={copy === 1}>
            {items.map((item) => (
              <span
                key={`${copy}-${item}`}
                className="border-r border-white/[0.07] px-[26px] transition-colors duration-200 hover:text-[var(--color-accent-2)]"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
