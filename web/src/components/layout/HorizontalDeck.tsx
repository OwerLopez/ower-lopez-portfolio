"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export interface SceneInfo {
  id: string;
  label: string;
  code: string;
  element: React.ReactNode;
  /** ¿La escena es "larga" (contenido que se desliza interno)? */
  long?: boolean;
}

interface HorizontalDeckContextValue {
  index: number;
  scenes: SceneInfo[];
  goTo: (i: number) => void;
  next: () => void;
  prev: () => void;
  lock: (locked: boolean) => void;
}

const HorizontalDeckContext = createContext<HorizontalDeckContextValue | null>(
  null,
);

export function useHorizontalDeck() {
  const ctx = useContext(HorizontalDeckContext);
  if (!ctx) throw new Error("useHorizontalDeck must be used inside HorizontalDeck");
  return ctx;
}

/**
 * Motor de navegación horizontal full-screen.
 *
 * - Cada escena ocupa 100vw x 100vh.
 * - La rueda del mouse/trackpad se convierte en avance lateral (con debounce).
 * - El scroll interno (escenas largas: Work, Journey) sigue vertical/drag normal
 *   porque bloqueamos la rueda SOLO cuando la escena está al inicio de su
 *   contenido o no es larga.
 * - Teclado: flechas izquierda/derecha, Page Up/Down.
 * - Touch: swipe horizontal.
 * - Lenis (SmoothScroll) se ignora porque el body deja de tener scroll.
 */
export function HorizontalDeck({
  scenes,
  initial = 0,
  children,
}: {
  scenes: SceneInfo[];
  initial?: number;
  children?: React.ReactNode;
}) {
  const [index, setIndex] = useState(initial);
  const [locked, setLocked] = useState(false);
  const reduced = useReducedMotion();
  const wheelCooldown = useRef(false);
  const sceneStartY = useRef(0);

  const goTo = useCallback(
    (i: number) => {
      const target = Math.min(Math.max(i, 0), scenes.length - 1);
      if (target === index) return;
      setIndex(target);
      window.scrollTo({ top: 0 });
      // Notificar al resto de componentes (Navbar, Footer) el cambio de escena.
      window.dispatchEvent(
        new CustomEvent("deck:scene", {
          detail: { index: target, total: scenes.length },
        }),
      );
    },
    [index, scenes.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const lock = useCallback((l: boolean) => setLocked(l), []);

  const ctx = useMemo(
    () => ({ index, scenes, goTo, next, prev, lock }),
    [index, scenes, goTo, next, prev, lock],
  );

  /* ---------- Rueda → avance lateral ---------- */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const scene = scenes[index];
      if (locked || !scene) return;

      const rawDy = e.deltaY !== 0 ? e.deltaY : e.deltaX;

      // Escena larga: si el contenedor interno aún tiene scroll, dejarlo
      // fluir en vertical; el deck solo consume la rueda cuando el
      // contenido interno está arriba del todo (bajar) o abajo del todo
      // (se deja al usuario subir manualmente dentro del contenido).
      if (scene.long) {
        const scrollable = document.querySelector(
          `.deck-scene[data-scene="${scene.id}"] [data-deck-scroll]`,
        ) as HTMLElement | null;
        if (scrollable) {
          const atTop = scrollable.scrollTop <= 1;
          const atBottom =
            scrollable.scrollTop + scrollable.clientHeight >=
            scrollable.scrollHeight - 1;
          if (rawDy > 0 && atBottom) {
            // En el fondo: saltar de escena hacia adelante.
          } else if (rawDy < 0 && atTop) {
            // Arriba del todo: saltar hacia atrás si no es la primera escena.
          } else {
            return; // el scroll interno consume la rueda
          }
        }
      }

      const dy = rawDy;
      if (Math.abs(dy) < 12) return; // ruido de trackpad

      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      // Cooldown corto: respuesta inmediata a la rueda; en escena larga se
      // amortigua solo mientras el contenido interno aún se mueve.
      setTimeout(() => {
        wheelCooldown.current = false;
      }, 450);

      if (dy > 0) next();
      else prev();
    };

    /* ---------- Teclado ---------- */
    const onKey = (e: KeyboardEvent) => {
      if (locked) return;
      const t = e.target as HTMLElement | null;
      const typing =
        t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if (typing) return;

      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(scenes.length - 1);
      }
    };

    /* ---------- Touch (swipe) ---------- */
    let startX = 0;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0]?.clientX ?? 0;
      startY = e.touches[0]?.clientY ?? 0;
      sceneStartY.current = window.scrollY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (locked) return;
      const dx = (e.changedTouches[0]?.clientX ?? 0) - startX;
      const dy = (e.changedTouches[0]?.clientY ?? 0) - startY;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) next();
        else prev();
      }
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [index, scenes, next, prev, goTo, locked]);

  /* ---------- Escucha `deck:go {index}` de otros componentes ---------- */
  useEffect(() => {
    const onDeckGo = (e: Event) => {
      const detail = (e as CustomEvent<{ index: number }>).detail;
      if (typeof detail?.index === "number") goTo(detail.index);
    };
    const onHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const i = scenes.findIndex((s) => s.id === hash);
      if (i !== -1) goTo(i);
    };
    window.addEventListener("deck:go", onDeckGo);
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => {
      window.removeEventListener("deck:go", onDeckGo);
      window.removeEventListener("hashchange", onHash);
    };
  }, [goTo]);

  /* ---------- Snap: al cambiar de escena ancla el scroll interno arriba ---------- */
  const prevIndex = useRef(index);
  useEffect(() => {
    if (prevIndex.current === index) return;
    prevIndex.current = index;
    // Anclar los scrollables internos arriba (con animación suave).
    requestAnimationFrame(() => {
      document.querySelectorAll("[data-deck-scroll]").forEach((el) => {
        const s = el as HTMLElement;
        if (s.scrollTop !== 0) s.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }, [index]);

  /* ---------- Body sin scroll global ---------- */
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, []);

  return (
    <HorizontalDeckContext.Provider value={ctx}>
      <div className="relative h-screen w-screen overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.section
            key={scenes[index]?.id ?? ""}
            data-scene={scenes[index]?.id ?? ""}
            className={`deck-scene relative h-full w-full overflow-hidden ${scenes[index]?.long ? "cursor-grab active:cursor-grabbing" : ""}`}
            initial={reduced ? false : { x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={reduced ? undefined : { x: -200, opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            {scenes[index]?.element}
          </motion.section>
        </AnimatePresence>
        {children}
      </div>
    </HorizontalDeckContext.Provider>
  );
}

/**
 * Indicador lateral de escena (dots) con click para saltar.
 */
export function SceneDots({ compact = false }: { compact?: boolean }) {
  const { index, scenes, goTo } = useHorizontalDeck();
  return (
    <div
      className={`fixed right-5 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-3 ${
        compact ? "" : ""
      }`}
    >
      {scenes.map((s, i) => (
        <button
          key={s.id}
          type="button"
          onClick={() => goTo(i)}
          aria-label={s.label}
          className={`group relative flex items-center justify-end transition-all duration-300`}
        >
          <span
            className={`absolute right-5 whitespace-nowrap rounded border border-[#1e1e2e] bg-[#0c0c14]/90 px-2 py-1 font-mono-token text-[10px] uppercase tracking-[0.18em] text-[#a9a8b8] opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100`}
            style={{ transform: "translateX(4px)" }}
          >
            {s.code} {s.label}
          </span>
          <span
            className={`h-2 w-2 rounded-full border transition-all duration-300 ${
              i === index
                ? "scale-[1.4] border-transparent bg-[#ff7a18]"
                : "border-[#2e2e42] bg-transparent hover:border-[#ff7a18]"
            }`}
            style={i === index ? { boxShadow: "0 0 10px #ff7a18" } : undefined}
          />
        </button>
      ))}
    </div>
  );
}
