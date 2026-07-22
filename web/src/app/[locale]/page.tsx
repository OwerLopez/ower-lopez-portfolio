import { notFound } from "next/navigation";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getContent } from "@/content";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Work } from "@/components/sections/Work";
import { DataOps } from "@/components/sections/DataOps";
import { GitHubLive } from "@/components/sections/GitHubLive";
import { Architecture } from "@/components/sections/Architecture";
import { Stack } from "@/components/sections/Stack";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";
import { CinematicDivider } from "@/components/animations/CinematicDivider";
import { DataRain } from "@/components/animations/DataRain";
import { StructuredData } from "@/components/seo/StructuredData";

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
      <Navbar locale={locale} content={content.nav} />
      <main>
        <Hero content={content.hero} />
        <Marquee items={content.marquee} />
        <About content={content.about} />
        <CinematicDivider
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=75&auto=format&fit=crop"
          alt=""
          title="Data"
          titleAccent="Engineering"
          caption="PIPELINES · SQL · ML — PRODUCTION GRADE"
        />
        <Experience content={content.experience} />
        <Work content={content.work} />
        <DataOps />
        <GitHubLive locale={locale} content={content.github} />
        <Architecture content={content.architecture} />
        <Stack content={content.stack} />
        <Credentials content={content.credentials} />
        <CinematicDivider
          src="https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1920&q=75&auto=format&fit=crop"
          alt=""
          title="Arequipa"
          titleAccent="→ El Mundo"
          caption="16.40°S 71.53°W — PERÚ · UTC−5"
        />
        <div className="relative">
          <DataRain className="pointer-events-none absolute inset-0 z-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_30%,transparent_75%)]" />
          <Contact content={content.contact} />
        </div>
      </main>
      <Footer content={content.footer} />
    </>
  );
}
