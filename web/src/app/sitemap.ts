import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.map((locale) => ({
    url: `${siteConfig.url}/${locale}`,
    lastModified,
    changeFrequency: "monthly",
    priority: locale === "es" ? 1 : 0.9,
    alternates: {
      languages: {
        es: `${siteConfig.url}/es`,
        en: `${siteConfig.url}/en`,
      },
    },
  }));
}
