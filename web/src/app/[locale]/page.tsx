import { notFound } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getContent } from "@/content";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { GitHubLive } from "@/components/sections/GitHubLive";
import { Architecture } from "@/components/sections/Architecture";
import { Stack } from "@/components/sections/Stack";
import { Experience } from "@/components/sections/Experience";
import { Credentials } from "@/components/sections/Credentials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { CinematicDivider } from "@/components/animations/CinematicDivider";
import { DataRain } from "@/components/animations/DataRain";
import { StructuredData } from "@/components/seo/StructuredData";
import { FluidCursor } from "@/components/animations/FluidCursor";
import { ScrollStorytelling } from "@/components/animations/ScrollStorytelling";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = isLocale(raw) ? raw : defaultLocale;
  const content = getContent(locale);

  return (
    <>
      <StructuredData locale={locale} />
      <FluidCursor />
      <Navbar locale={locale} content={content.nav} />
      <main className="relative bg-[#030305] text-[#f8f6f0] overflow-hidden">
        {/* Section 1: Bento Hero with Fluid Water Ripple */}
        <Hero content={content.hero} />

        {/* Section 2: Dual Infinite Tech Marquee */}
        <Marquee items={content.marquee} />

        {/* Section 3: Profile & Engineering Philosophy */}
        <About content={content.about} />

        {/* Section 4: Interactive Pinned Scroll Storytelling (thenextcraft.org style) */}
        <ScrollStorytelling />

        {/* Cinematic Break 1 */}
        <CinematicDivider
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=75&auto=format&fit=crop"
          alt="Data Infrastructure"
          title="Data"
          titleAccent="Engineering"
          caption="PIPELINES · SQL · IN-PROCESS ML — PRODUCTION GRADE"
        />

        {/* Section 5: Featured Showcase & Interactive Benchmark Matrix */}
        <Work content={content.work} />

        {/* Section 6: Real-Time GitHub Telemetry */}
        <GitHubLive locale={locale} content={content.github} />

        {/* Section 7: Interactive Architecture Node Flow */}
        <Architecture content={content.architecture} />

        {/* Section 8: Tech Radar Matrix */}
        <Stack content={content.stack} />

        {/* Section 9: Career Experience Roadmap */}
        <Experience content={content.experience} />

        {/* Section 10: Verified Credentials & Milestones */}
        <Credentials content={content.credentials} />

        {/* Section 11: Architecture & Collaboration FAQ */}
        <Faq content={content.faq} />

        {/* Cinematic Break 2 */}
        <CinematicDivider
          src="https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1920&q=75&auto=format&fit=crop"
          alt="Arequipa Peru"
          title="Arequipa"
          titleAccent="→ World"
          caption="16.40°S 71.53°W — PERÚ · UTC−5"
        />

        {/* Section 12: Cinematic Contact Hub */}
        <div className="relative">
          <DataRain className="pointer-events-none absolute inset-0 z-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_75%)]" />
          <Contact content={content.contact} />
        </div>
      </main>

      <Footer content={content.footer} />
    </>
  );
}
