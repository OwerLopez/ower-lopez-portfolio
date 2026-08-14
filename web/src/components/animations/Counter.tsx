"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

/** Cuenta animada hasta `value` al entrar en vista; `suffix` opcional. */
export function Counter({
  value,
  suffix,
}: {
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const raw = useMotionValue(0);
  const smooth = useSpring(raw, { stiffness: 90, damping: 40 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    raw.set(value);
    const unsub = smooth.on("change", (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [inView, value, raw, smooth]);

  return (
    <span ref={ref}>
      {display}
      {suffix ?? ""}
    </span>
  );
}
