import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/config";
import { getContent } from "@/content";

import { Navbar } from "@/components/layout/Navbar";
import { HorizontalDeck, SceneDots, type SceneInfo } from "@/components/layout/HorizontalDeck";
import { EnergyLines } from "@/components/effects/EnergyLines";
import { StructuredData } from "@/components/seo/StructuredData";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Mission } from "@/components/sections/Mission";
import { Work } from "@/components/sections/Work";
import { Architecture } from "@/components/sections/Architecture";
import { Stack } from "@/components/sections/Stack";
import { Journey } from "@/components/sections/Journey";
import { GitHubLive } from "@/components/sections/GitHubLive";
import { Credentials } from "@/components/sections/Credentials";
import { Philosophy } from "@/components/sections/Philosophy";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { SceneSection } from "@/components/layout/SceneSection";

/**
 * V5 — Deck horizontal.
 *
 * La home ya no es una página con scroll vertical: son 11 escenas de
 * 100vw x 100vh que se navegan lateralmente con la rueda, el trackpad,
 * el teclado (flechas / PageUp-Down / Home-End) o el swipe táctil.
 * El `HorizontalDeck` captura la rueda y convierte cada "vuelta" en un
 * salto de escena; las escenas largas (Proyectos) siguen fluyendo en
 * vertical dentro de su propio contenedor.
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

  const scenes: SceneInfo[] = [
    {
      id: "intro",
      label: "Intro",
      code: "E1",
      element: (
        <div className="relative flex h-full w-full flex-col justify-center">
          <Hero content={content} />
          <Marquee content={content} />
        </div>
      ),
    },
    {
      id: "mission",
      label: "Misión",
      code: "E2",
      element: (
        <div data-deck-scroll="long" className="h-full w-full overflow-y-auto px-4 sm:px-8 py-10 sm:py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-6xl w-full">
            <SceneSection>
              <Mission content={content} />
            </SceneSection>
          </div>
        </div>
      ),
    },
    {
      id: "work",
      label: "Proyectos",
      code: "E3",
      long: true,
      element: (
        <div data-deck-scroll="long" className="h-full w-full overflow-y-auto px-4 sm:px-8 py-10 sm:py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-6xl w-full">
            <Work content={content} />
          </div>
        </div>
      ),
    },
    {
      id: "architecture",
      label: "Arquitectura",
      code: "E4",
      element: (
        <div data-deck-scroll="long" className="h-full w-full overflow-y-auto px-4 sm:px-8 py-10 sm:py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-6xl w-full">
            <SceneSection>
              <Architecture content={content} />
            </SceneSection>
          </div>
        </div>
      ),
    },
    {
      id: "stack",
      label: "Stack",
      code: "E5",
      element: (
        <div data-deck-scroll="long" className="h-full w-full overflow-y-auto px-4 sm:px-8 py-10 sm:py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-6xl w-full">
            <SceneSection>
              <Stack content={content} />
            </SceneSection>
          </div>
        </div>
      ),
    },
    {
      id: "journey",
      label: "Trayectoria",
      code: "E6",
      element: (
        <div data-deck-scroll="long" className="h-full w-full overflow-y-auto px-4 sm:px-8 py-10 sm:py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-6xl w-full">
            <SceneSection>
              <Journey content={content} />
            </SceneSection>
          </div>
        </div>
      ),
    },
    {
      id: "github",
      label: "GitHub",
      code: "E7",
      element: (
        <div data-deck-scroll="long" className="h-full w-full overflow-y-auto px-4 sm:px-8 py-10 sm:py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-6xl w-full">
            <SceneSection>
              <GitHubLive content={content} />
            </SceneSection>
          </div>
        </div>
      ),
    },
    {
      id: "credentials",
      label: "Logros",
      code: "E8",
      element: (
        <div data-deck-scroll="long" className="h-full w-full overflow-y-auto px-4 sm:px-8 py-10 sm:py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-6xl w-full">
            <SceneSection>
              <Credentials content={content} />
            </SceneSection>
          </div>
        </div>
      ),
    },
    {
      id: "philosophy",
      label: "Filosofía",
      code: "E9",
      element: (
        <div data-deck-scroll="long" className="h-full w-full overflow-y-auto px-4 sm:px-8 py-10 sm:py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-6xl w-full">
            <SceneSection>
              <Philosophy content={content} />
            </SceneSection>
          </div>
        </div>
      ),
    },
    {
      id: "faq",
      label: "FAQ",
      code: "E10",
      element: (
        <div data-deck-scroll="long" className="h-full w-full overflow-y-auto px-4 sm:px-8 py-10 sm:py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-6xl w-full">
            <SceneSection>
              <Faq content={content} />
            </SceneSection>
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      label: "Contacto",
      code: "E11",
      element: (
        <div data-deck-scroll="long" className="h-full w-full overflow-y-auto px-4 sm:px-8 py-10 sm:py-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto max-w-6xl w-full">
            <Contact content={content} />
            <div className="mt-12">
              <Footer content={content} />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <StructuredData locale={locale} />
      <Navbar content={content} />

      {/* Fondo fijo: rejilla fina + ruido + líneas de energía */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 grid-overlay" />
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0 noise-overlay" />
      <EnergyLines />

      {/* SceneDots vive dentro de HorizontalDeck para tener acceso al contexto */}
      <main className="relative h-screen w-screen bg-[#06040a] text-[#f2f0ea]">
        <HorizontalDeck scenes={scenes} initial={0}>
          <SceneDots />
        </HorizontalDeck>
      </main>
    </>
  );
}
