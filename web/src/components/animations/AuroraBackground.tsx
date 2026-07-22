/**
 * Fondo fijo con auroras animadas, malla de grilla, vignette y ruido.
 * Es puramente CSS, por lo que se renderiza en el servidor sin JS de cliente.
 */
export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute -left-[5%] -top-[15%] h-[55vw] w-[55vw] rounded-full blur-[90px] motion-safe:animate-[var(--animate-aurora-1)]"
        style={{
          background:
            "radial-gradient(circle, rgba(43,92,255,.42), transparent 62%)",
        }}
      />
      <div
        className="absolute -right-[10%] top-[20%] h-[50vw] w-[50vw] rounded-full blur-[100px] motion-safe:animate-[var(--animate-aurora-2)]"
        style={{
          background:
            "radial-gradient(circle, rgba(91,140,255,.34), transparent 62%)",
        }}
      />
      <div
        className="absolute -bottom-[20%] left-[25%] h-[48vw] w-[48vw] rounded-full blur-[110px] motion-safe:animate-[var(--animate-aurora-3)]"
        style={{
          background:
            "radial-gradient(circle, rgba(46,166,255,.20), transparent 62%)",
        }}
      />
      <div className="grid-overlay absolute inset-0 motion-safe:animate-[var(--animate-grid-pan)]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, transparent 40%, rgba(6,6,9,.7) 100%)",
        }}
      />
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
