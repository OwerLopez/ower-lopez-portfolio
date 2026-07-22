# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

The Next.js application lives in `web/` (relative to this file) — **run all commands from that directory**, not the repo root. `DISEÑO PRELIMINAR/` (if present) holds standalone HTML/CV design mockups, not part of the build. Note the space in the repo root path (`PORTAFOLIO 2026`); quote it in shell commands.

## Commands

```bash
cd web
npm install
npm run dev             # dev server at http://localhost:3000 (redirects to /es)
npm run build           # production build
npm run start           # serve the production build
npm run typecheck       # tsc --noEmit — strict type check
npm run lint             # next lint
npm run test:e2e        # Playwright end-to-end tests (web/tests/e2e)
npm run test:e2e:ui     # Playwright UI mode
npm run test:e2e:report # open last Playwright HTML report
```

`typecheck` is the primary correctness gate for content — it enforces the content-parity constraint below. Playwright covers end-to-end behavior; specs live under `web/tests/e2e`.

## Architecture

Portfolio site — Next.js 15 (App Router, Server Components), React 19, Tailwind CSS v4, Framer Motion, Lenis smooth scroll. Statically generated, dark theme, bilingual.

**Content is fully separated from presentation.** All visible copy lives in `src/content/es.ts` and `src/content/en.ts`, both typed as `PortfolioContent` (`src/types/content.ts`). Section components are presentational: `page.tsx` fetches the locale dictionary via `getContent(locale)` and passes typed slices down as props (`content.hero`, `content.work`, …). To change copy, edit the content dictionaries — do not hardcode strings in components. Because both dictionaries must satisfy `PortfolioContent`, `typecheck` fails if `es` and `en` drift out of parity; when you add a field, update the interface and **both** dictionaries.

Language-independent data (URLs, name, social links, email) lives in `src/config/site.ts`, separate from the per-locale dictionaries.

**Internationalization** is custom (no i18n library). `src/i18n/config.ts` defines `locales = ["es", "en"]` with `es` as default. `src/middleware.ts` redirects unprefixed paths to `/es`. Routes are under `src/app/[locale]/`; `generateStaticParams` in the layout pre-renders both locales. Every page/layout awaits `params` (Next 15 async params), validates with `isLocale`, and calls `notFound()` on an unknown locale.

**Styling** uses Tailwind v4 with design tokens declared in `src/app/globals.css` via `@theme` (colors like `--color-accent`, fonts, `--ease-out-expo`, and `--animate-*` keyframe bindings). There is no `tailwind.config`; add tokens/animations in `globals.css`. Fonts (Manrope, JetBrains Mono) are loaded via `next/font` in the layout and exposed as CSS variables.

**Component organization** (`src/components/`): `sections/` are the page's content blocks (Hero, About, Work, …), `layout/` is chrome (Navbar, Footer, SmoothScroll), `animations/` are the visual-effect wrappers (Reveal, Counter, AuroraBackground, MouseSpotlight, ScrollProgress), `ui/` are small reusables (MagneticButton, ProjectCard), `seo/` holds `StructuredData` (JSON-LD). Interactive/animation components using Framer Motion or hooks are client components; sections receiving props are otherwise server components.

Path alias `@/*` maps to `src/*`. SEO surfaces (`sitemap.ts`, `robots.ts`, `manifest.ts`, `opengraph-image.tsx`, per-locale metadata) derive from `siteConfig` and the content dictionaries.
