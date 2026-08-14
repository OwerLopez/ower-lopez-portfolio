"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";
import type { PortfolioContent } from "@/types/content";

const NAV_LINKS = [
  { id: "mission", label: "Misión", code: "E2" },
  { id: "work", label: "Proyectos", code: "E3" },
  { id: "architecture", label: "Arquitectura", code: "E4" },
  { id: "stack", label: "Stack", code: "E5" },
  { id: "journey", label: "Trayectoria", code: "E6" },
  { id: "github", label: "GitHub", code: "E7" },
  { id: "credentials", label: "Logros", code: "E8" },
  { id: "philosophy", label: "Filosofía", code: "E9" },
  { id: "faq", label: "FAQ", code: "E10" },
  { id: "contact", label: "Contacto", code: "E11" },
];

/**
 * Navbar HUD para navegación HORIZONTAL por escenas.
 *
 * En el deck horizontal los anchors `#id` ya no sirven (no hay scroll vertical),
 * así que cada tick llama a `goTo(index)` del HorizontalDeck y el indicador
 * activo se calcula a partir del índice de escena en lugar del scroll.
 * La barra de "progreso" es ahora el avance por escenas (E01 → E11).
 */
export function Navbar({ content }: { content: PortfolioContent }) {
  const { nav } = content;
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [totalScenes, setTotalScenes] = useState(NAV_LINKS.length + 1);

  useEffect(() => {
    const handler = (e: CustomEvent<{ index: number; total: number }>) => {
      setSceneIndex(e.detail.index);
      setTotalScenes(e.detail.total);
    };
    window.addEventListener("deck:scene", handler as EventListener);
    return () => window.removeEventListener("deck:scene", handler as EventListener);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isHome = pathname === "/es" || pathname === "/en" || pathname === "/";
  const otherLocale = pathname.startsWith("/en") ? "/es" : "/en";

  const active = NAV_LINKS[sceneIndex - 1]?.id ?? null;

  // Los ticks: E2 → índice 1 ... E11 → índice 10. El hero es el índice 0.
  const navigate = (i: number) =>
    window.dispatchEvent(new CustomEvent("deck:go", { detail: { index: i } }));

  const progress =
    totalScenes > 1 ? Math.round(((sceneIndex + 1) / totalScenes) * 100) : 0;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-x-0 top-0 z-[60] ${open ? "bg-base/85 backdrop-blur-2xl" : "bg-transparent"}`}
      >
        {/* Línea de progreso de fuego: avance por escenas */}
        <div className="absolute inset-x-0 top-0 z-20 h-[3px]">
          <div
            className="h-full origin-left bg-gradient-to-r from-[#fbbf24] via-[#ff7a18] via-50% to-[#e11d74] shadow-[0_0_12px_rgba(255,122,24,0.7)]"
            style={{
              width: `${progress}%`,
              transition: "width 400ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>

        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-6">
          {/* Marca con pulso */}
          <Link href="/es" className="group flex shrink-0 items-center gap-3">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#2e2e42] bg-surface font-mono-token text-xs font-bold text-[#ff7a18]">
              {siteConfig.initials}
              <span className="absolute inset-0 rounded-full border border-[#ff7a18]/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <span className="hidden items-baseline gap-2 font-mono-token text-xs tracking-[0.25em] text-ink sm:flex">
              {siteConfig.shortName}
              <span className="text-[#8b5cf6]">/</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#6a6978] md:inline">
                {nav.statusText}
              </span>
            </span>
          </Link>

          {/* Ticks de escena → saltan lateralmente */}
          <nav className="hidden items-center gap-4 xl:flex">
            {NAV_LINKS.map((link, i) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => navigate(i + 1)}
                  className="group relative flex items-center gap-1.5 py-1"
                >
                  <motion.span
                    animate={{ width: isActive ? 14 : 6, background: isActive ? "#ff7a18" : "#2e2e42" }}
                    transition={{ duration: 0.3 }}
                    className="absolute -top-1 h-[2px] rounded-full"
                  />
                  <span
                    className={`font-mono-token text-[9px] transition-colors duration-300 ${
                      isActive ? "text-[#ff7a18]" : "text-[#6a6978] group-hover:text-[#e11d74]"
                    }`}
                  >
                    {link.code}
                  </span>
                  <span
                    className={`text-[12px] font-medium transition-colors duration-300 ${
                      isActive ? "text-ink" : "text-[#a9a8b8] group-hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <span className="font-mono-token hidden rounded-full border border-[#1e1e2e] bg-surface px-2.5 py-1 text-[9px] tabular-nums text-[#6a6978] md:block">
              {`E${String(sceneIndex + 1).padStart(2, "0")}`}
            </span>
            {isHome && (
              <Link
                href={otherLocale}
                className="font-mono-token hidden rounded-full border border-[#1e1e2e] bg-surface px-3 py-1.5 text-[10px] tracking-[0.2em] text-muted transition-colors duration-300 hover:border-[#e11d74]/40 hover:text-ink sm:block"
              >
                {pathname.startsWith("/en") ? "ES" : "EN"}
              </Link>
            )}
            <button
              type="button"
              onClick={() => navigate(NAV_LINKS.length)}
              className="group relative hidden overflow-hidden rounded-full px-5 py-2 text-[11px] font-semibold text-white sm:block"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#ff7a18] to-[#e11d74] transition-transform duration-500 group-hover:scale-110" />
              <span className="relative flex items-center gap-1.5">
                <Zap className="h-3 w-3" />
                {nav.cta}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? nav.menuClose : nav.menuOpen}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#2e2e42] bg-surface text-ink xl:hidden"
            >
              {open ? <X className="h-4 w-4 text-[#e11d74]" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

      </motion.header>

      {/* Panel móvil: cuerpo completo con ticks grandes */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[55] flex flex-col bg-base/98 pt-20 backdrop-blur-2xl xl:hidden"
          >
            <div className="mx-auto my-auto flex w-full max-w-lg flex-col px-6">
              <button
                type="button"
                onClick={() => { setOpen(false); navigate(0); }}
                className="group flex items-baseline justify-between border-b border-[#1e1e2e] py-4 transition-colors hover:border-[#e11d74]/40"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono-token text-xs text-[#e11d74]">E1</span>
                  <span className="text-xl font-medium tracking-tight text-ink">Intro</span>
                </div>
                <span className="font-mono-token text-[10px] text-[#6a6978]">01/{String(totalScenes).padStart(2, "0")}</span>
              </button>
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => { setOpen(false); navigate(i + 1); }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="group flex items-baseline justify-between border-b border-[#1e1e2e] py-4 transition-colors hover:border-[#e11d74]/40"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono-token text-xs text-[#e11d74]">{link.code}</span>
                    <span className="text-xl font-medium tracking-tight text-ink">{link.label}</span>
                  </div>
                  <span className="font-mono-token text-[10px] text-[#6a6978]">
                    {String(i + 2).padStart(2, "0")}/{String(totalScenes).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mx-auto flex w-full max-w-lg flex-col gap-4 border-t border-[#1e1e2e] px-6 pb-10 pt-6 font-mono-token text-xs text-muted"
            >
              <div className="flex items-center justify-between">
                <span className="text-[#ff7a18]">{siteConfig.location.es}</span>
                <span>{siteConfig.email}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-[#1e1e2e] pt-2">
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                  GitHub
                </a>
                <a href={siteConfig.links.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                  LinkedIn
                </a>
                <a href={siteConfig.links.credly} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                  Credly
                </a>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
