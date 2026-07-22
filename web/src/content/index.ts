import type { Locale } from "@/i18n/config";
import type { PortfolioContent } from "@/types/content";
import { es } from "./es";
import { en } from "./en";

const dictionaries: Record<Locale, PortfolioContent> = { es, en };

/** Devuelve el diccionario de contenido para un idioma dado. */
export function getContent(locale: Locale): PortfolioContent {
  return dictionaries[locale];
}
