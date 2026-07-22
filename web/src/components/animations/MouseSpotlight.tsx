"use client";

import { useEffect, useRef } from "react";

/**
 * Foco de luz que sigue el cursor con interpolacion suave.
 * Se desactiva en dispositivos tactiles y con movimiento reducido.
 */
export function MouseSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const onMove = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      el.style.opacity = "1";
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate(${x}px, ${y}px)`;
          raf = 0;
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[640px] w-[640px] -ml-[320px] -mt-[320px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-500"
      style={{
        background: "radial-gradient(circle, rgba(255, 171, 56,.12), transparent 60%)",
      }}
    />
  );
}
