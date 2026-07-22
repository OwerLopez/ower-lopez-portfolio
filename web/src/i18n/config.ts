/** Configuracion de internacionalizacion. Espanol es el idioma principal. */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeLabels: Record<Locale, string> = {
  es: "ES",
  en: "EN",
};

export const localeNames: Record<Locale, string> = {
  es: "Espanol",
  en: "English",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
