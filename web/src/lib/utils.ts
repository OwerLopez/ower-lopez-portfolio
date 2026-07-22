import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Combina clases de Tailwind resolviendo conflictos de forma predecible. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
