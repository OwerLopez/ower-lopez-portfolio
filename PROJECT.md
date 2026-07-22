# Project: Senior Portfolio Upgrade

## Architecture
- **Framework**: Next.js 15 (App Router, React 19)
- **Styling**: Tailwind CSS v4.0.0
- **i18n**: Language switcher, `middleware.ts` locale matching, bilingual content dictionaries in `src/content/en.ts` and `src/content/es.ts`.
- **Components**:
  - `src/components/animations`: Framer Motion-based components (AuroraBackground, DataPipeline, DataRain, split-text, etc.)
  - `src/components/layout`: Shell layouts (Navbar, Footer, LocaleSwitcher, SmoothScroll)
  - `src/components/sections`: Landing page sections (Hero, About, Experience, Work, Stack, Credentials, Contact)
  - `src/components/ui`: UI widgets (TiltCard, TechTag, ProjectCard, etc.)

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Testing Track | Define test infra, write Tiers 1-4 tests, write `TEST_READY.md` | None | PLANNED |
| 2 | Visual & UX Upgrades | Framer Motion micro-interactions, prevent layout shifts (R1) | None | PLANNED |
| 3 | Content & Storytelling | Update content dictionaries with architecture decisions/business impact (R2) | None | PLANNED |
| 4 | Code Architecture Refactoring | Fix all typecheck, lint issues, guarantee total dictionary parity (R3) | M3 | PLANNED |
| 5 | Performance & SEO Optimization | Lighthouse >90, JSON-LD metadata, meta tags for routes (R4) | M2, M4 | PLANNED |
| 6 | Final Verification & Hardening | Pass 100% E2E tests, Adversarial Hardening (Tier 5), Forensic Audit | M1, M2, M3, M4, M5 | PLANNED |

## Interface Contracts
### content ↔ i18n
- The locale switcher and sections import from `src/content/index.ts` via `getContent(locale)`.
- Dict structure is verified by the typescript interface `PortfolioContent` in `src/types/content.ts`.

### components ↔ pages
- `src/app/[locale]/page.tsx` renders the portfolio sections sequentially.
- Custom anims must avoid triggering hydration mismatches or blocking main thread execution.

## Code Layout
- `.agents/orchestrator_portfolio`: Orchestration metadata, plans, progress, handoffs.
- `web/src/app/[locale]`: Routing pages.
- `web/src/components`: UI components.
- `web/src/content`: i18n dictionaries.
- `web/src/types`: TypeScript types.
- `web/tests`: Testing code.
