"use client";

import { SmoothScroll } from "./SmoothScroll";

/**
 * Client wrapper that provides smooth scrolling via Lenis for the vertical layout.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return <SmoothScroll mode="vertical">{children}</SmoothScroll>;
}
