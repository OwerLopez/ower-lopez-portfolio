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
 * - Dynamic interactive fluid simulation with multi-stop ambient lighting
 * - Mission-cockpit Flagship case study + datasheet matrix
 * - Visual Data & ML Lifecycle Circuit with glowing pipeline
 * - Verified credentials & leadership timeline
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
      
      {/* Full-Page Interactive Water & Multi-Aura Ambient Background */}
      <WaterBackground />
      
      <Navbar content={content} />

      <main id="main-content" className="relative z-10 min-h-screen flex flex-col pt-16">
        {/* Soft darkened central content spine for maximum reading contrast */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-6xl bg-gradient-to-r from-transparent via-[#05060b]/75 to-transparent -z-10"
        />

        <Hero content={content} />

        {/* Work / Projects with Full-Bleed 3D Showcase */}
        <section id="work" className="relative py-20 sm:py-28 w-full border-t border-white/[0.08] overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl -z-10" />
          <Work content={content} />
        </section>

        {/* Expertise / Stack with Subtle Cyan Circuit Aura */}
        <section id="expertise" className="relative py-20 sm:py-28 px-5 sm:px-8 mx-auto max-w-5xl w-full border-t border-white/[0.08]">
          <div aria-hidden="true" className="pointer-events-none absolute top-10 -left-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl -z-10" />
          <Expertise content={content} />
        </section>

        {/* Experience / Timeline with Sapphire & Emerald Aura */}
        <section id="experience" className="relative py-20 sm:py-28 px-5 sm:px-8 mx-auto max-w-5xl w-full border-t border-white/[0.08]">
          <div aria-hidden="true" className="pointer-events-none absolute top-20 right-10 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl -z-10" />
          <Experience content={content} />
        </section>

        {/* About / Deep Dives with Warm Amber & Sapphire Aura */}
        <section id="about" className="relative py-20 sm:py-28 px-5 sm:px-8 mx-auto max-w-5xl w-full border-t border-white/[0.08]">
          <div aria-hidden="true" className="pointer-events-none absolute top-10 left-10 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl -z-10" />
          <About content={content} />
        </section>

        {/* Contact with Cyber-Terminal Cyan Beam */}
        <section id="contact" className="relative py-20 sm:py-28 px-5 sm:px-8 mx-auto max-w-5xl w-full border-t border-white/[0.08]">
          <div aria-hidden="true" className="pointer-events-none absolute bottom-10 inset-x-0 mx-auto h-72 w-3/4 rounded-full bg-blue-500/10 blur-3xl -z-10" />
          <Contact content={content} />
        </section>
      </main>

      <Footer content={content} />
    </>
  );
}
