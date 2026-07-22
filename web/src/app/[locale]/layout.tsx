import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";

import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getContent } from "@/content";
import { siteConfig } from "@/config/site";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { AuroraBackground } from "@/components/animations/AuroraBackground";
import { MouseSpotlight } from "@/components/animations/MouseSpotlight";
import { ScrollProgress } from "@/components/animations/ScrollProgress";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500", "600"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const content = getContent(locale);
  const { meta } = content;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: meta.title,
      template: `%s — ${siteConfig.shortName}`,
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: siteConfig.name, url: siteConfig.links.github }],
    creator: siteConfig.name,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: "/es",
        en: "/en",
        "x-default": `/${defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_PE" : "en_US",
      alternateLocale: locale === "es" ? "en_US" : "es_PE",
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: meta.title,
      description: meta.description,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      creator: "@owerfrank",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    category: "technology",
  };
}

export const viewport: Viewport = {
  themeColor: "#060609",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

import { MotionConfig } from "framer-motion";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale} className={`${manrope.variable} ${jetbrains.variable}`}>
      <body className="relative min-h-screen overflow-x-hidden antialiased">
        <MotionConfig reducedMotion="user">
          <AuroraBackground />
          <MouseSpotlight />
          <ScrollProgress />
          <SmoothScroll>{children}</SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
