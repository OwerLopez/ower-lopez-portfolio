"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface CinematicDividerProps {
  /** URL remota (Unsplash) permitida en next.config. */
  src: string;
  alt: string;
  /** Texto gigante delineado que cruza la escena. */
  title: string;
  /** Linea mono pequena (coordenadas, contexto). */
  caption: string;
  /** Segunda linea del texto gigante, en acento. */
  titleAccent?: string;
}

/**
 * Divisor cinematografico full-bleed: imagen con parallax vertical, viñeta,
 * texto gigante delineado con leve desplazamiento horizontal y caption mono.
 * Decorativo: la imagen es aria-hidden y el texto es presentacional.
 */
export function CinematicDivider({
  src,
  alt,
  title,
  caption,
  titleAccent,
}: CinematicDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const reduced = useReducedMotion();
  const isReduced = isMounted && reduced;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["3%", "-3%"]);

  return (
    <div
      ref={ref}
      className="relative z-[2] my-[clamp(40px,6vw,80px)] h-[clamp(320px,44vw,520px)] overflow-hidden"
    >
      {/* Imagen con parallax */}
      <motion.div
        style={isReduced ? undefined : { y: imgY }}
        className="absolute inset-[-14%_0]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          quality={70}
        />
      </motion.div>

      {/* Viñetas para integrarse al tema oscuro */}
      <div className="absolute inset-0 bg-[rgba(6,6,9,0.55)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] via-transparent to-[var(--color-bg)]" />
      <div className="grid-overlay absolute inset-0 opacity-60" />

      {/* Texto gigante delineado */}
      <motion.div
        style={isReduced ? undefined : { x: textX }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
        <span className="text-outline select-none whitespace-nowrap text-[clamp(2.6rem,9vw,7.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
          {title}
        </span>
        {titleAccent && (
          <span className="text-outline-accent select-none whitespace-nowrap text-[clamp(2.6rem,9vw,7.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
            {titleAccent}
          </span>
        )}
        <span className="font-mono-token mt-6 rounded-full border border-white/15 bg-[rgba(6,6,9,0.6)] px-4 py-2 text-[10.5px] tracking-[0.22em] text-[var(--color-muted)] backdrop-blur-sm">
          {caption}
        </span>
      </motion.div>

      {/* Cinta andina inferior */}
      <div className="andean-fret absolute bottom-0 left-0 right-0 h-4 opacity-40" />
    </div>
  );
}
