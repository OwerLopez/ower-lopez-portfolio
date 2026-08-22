import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getContent } from "@/content";

import { SkipToContent } from "@/components/layout/SkipToContent";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/seo/StructuredData";
import { WaterBackground } from "@/components/animations/WaterBackground";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

/**
 * PORTAFOLIO 2026 — Production Page
 *
 * High-Impact visual engineering experience:
 * - Dynamic cybernetic GridBackground with ambient gradient orbs
 * - Interactive 2-column Hero with live JVM+ONNX Runtime HUD
 * - Mission-cockpit Flagship case study + datasheet matrix
 * - Visual Data & ML Lifecycle Circuit with glowing pipeline
 * - Radiant golden Trophy wall + Credly badges
 * - Clean terminal CTA + live system telemetry
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const content = getContent(locale);

  return (
    <>
      <SkipToContent />
      <StructuredData locale={locale} />
      <WaterBackground />
      <Navbar content={content} />

      <main id="main-content" className="relative z-10 min-h-screen flex flex-col pt-16">
        <Hero content={content} />

        <section id="work" className="py-20 sm:py-28 px-5 sm:px-8 mx-auto max-w-5xl w-full border-t border-[var(--color-border)]">
          <Work content={content} />
        </section>

        <section id="expertise" className="py-20 sm:py-28 px-5 sm:px-8 mx-auto max-w-5xl w-full border-t border-[var(--color-border)]">
          <Expertise content={content} />
        </section>

        <section id="experience" className="py-20 sm:py-28 px-5 sm:px-8 mx-auto max-w-5xl w-full border-t border-[var(--color-border)]">
          <Experience content={content} />
        </section>

        <section id="about" className="py-20 sm:py-28 px-5 sm:px-8 mx-auto max-w-5xl w-full border-t border-[var(--color-border)]">
          <About content={content} />
        </section>

        <section id="contact" className="py-20 sm:py-28 px-5 sm:px-8 mx-auto max-w-5xl w-full border-t border-[var(--color-border)]">
          <Contact content={content} />
        </section>
      </main>

      <Footer content={content} />
    </>
  );
}
