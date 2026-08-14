"use client";

import { usePathname } from "next/navigation";
import { SmoothScroll } from "./SmoothScroll";

/**
 * Envoltorio cliente que selecciona el modo de SmoothScroll según la ruta.
 *
 * La home (/es, /en) ahora es un deck horizontal de escenas full-screen
 * donde la rueda la maneja el `HorizontalDeck`; Lenis no debe interceptarla.
 * Cualquier otra ruta (si existiera) usa el scroll suave clásico.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Home: no hay un path explícito distinto de /es o /en (middleware redirige),
  // así que en la home NO creamos Lenis.
  const isHome =
    pathname === "/es" || pathname === "/en" || pathname === "/";
  const mode = isHome ? "deck" : "vertical";

  return <SmoothScroll mode={mode}>{children}</SmoothScroll>;
}
