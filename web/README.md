# Portafolio — Ower Frank Lopez Arela

Portafolio de ingeniería premium: **Backend · Data · AI · Cloud**. Bilingüe (español principal / inglés), tema oscuro con auroras animadas, construido con arquitectura moderna de frontend.

## Stack

- **Next.js 15** (App Router, Server Components) + **React 19**
- **TypeScript** estricto
- **Tailwind CSS v4** (tokens de diseño con `@theme`)
- **Framer Motion** (reveal, contadores, botones magnéticos, transiciones)
- **Lenis** (scroll suave)
- **lucide-react** (iconografía)

## Arquitectura

```
src/
  app/
    [locale]/            # rutas por idioma (es | en) — layout raíz + página + OG + 404
    globals.css          # tokens de diseño + keyframes + utilidades
    sitemap.ts | robots.ts | manifest.ts | icon.svg
    middleware.ts        # redirección "/" -> "/es"
  components/
    animations/          # Reveal, Counter, Aurora, MouseSpotlight, ScrollProgress
    layout/              # Navbar, Footer, LocaleSwitcher, SmoothScroll
    sections/            # Hero, Marquee, About, Experience, Work, Stack, Credentials, Contact
    seo/                 # StructuredData (JSON-LD)
    ui/                  # MagneticButton, ProjectCard, Eyebrow, TechTag
  config/site.ts         # identidad, enlaces, URLs
  content/               # diccionarios es.ts / en.ts (tipados por types/content.ts)
  i18n/config.ts         # locales y helpers
  lib/utils.ts           # cn()
  types/content.ts       # modelo de contenido
```

Todo el contenido visible proviene de `content/es.ts` y `content/en.ts`, tipados contra `PortfolioContent` para garantizar paridad entre idiomas.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000  (redirige a /es)
npm run build      # build de producción
npm run typecheck  # verificación de tipos
```

## Idiomas

Español es el idioma principal (`/es`, ruta por defecto). Inglés disponible en `/en`. El conmutador del navbar preserva la ruta actual.
