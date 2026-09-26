# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md
@AGENT.md

## Operating rules specific to this repo

- **`AGENT.md` is the operating contract** (singular — not the auto-generated `AGENTS.md`). Read `PROGRESS.MD` (uppercase extension — that is the real filename) at the start of every session; it is the source of truth for what is actually built vs. only planned. Update it at the end of a work session.
- Before adding a dependency, architecture pattern, state solution, build tool, or folder structure: **stop and ask**, with (1) why, (2) alternatives, (3) tradeoffs. See `AGENT.md` §2.
- `docs/00`–`docs/18` are the design spec. Match your task to the index in `AGENT.md` and read the relevant file before changing behavior. `docs/14-content-schema.md` is the canonical content schema.
- Teaching Mode (`AGENT.md` §7): explanations accompany implementation; this is a learning project for the owner.

## Commands

```bash
npm run dev      # next dev (Turbopack) — http://localhost:3000
npm run build    # next build (Turbopack) — production build + type check
npm start        # serve the production build (run build first)
npm run lint     # eslint . (flat config, eslint-config-next + prettier)
npm run format   # prettier --write .
```

- No test runner is wired up yet. `tests/unit/` and `tests/integration/` exist as empty placeholders; `AGENT.md` describes the intended split (unit = domain logic / utils / validation, integration = content loading / perspective flow).
- `next build` does **not** run ESLint (Next 16). Run `npm run lint` explicitly — the repo currently has lint errors (`no-explicit-any`, `react-hooks/set-state-in-effect`) that do not block the build but violate the project's own standards.
- Node env vars (all optional, read at runtime): `NEXT_PUBLIC_APP_URL` (metadataBase + canonical URLs), `GITHUB_TOKEN` + `GITHUB_USERNAME` (telemetry; absent → mock data fallback).

## Stack

Next.js 16 App Router (Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config`) · Zustand (UI state only) · Framer Motion + GSAP + Lenis (motion) · MDX via `next-mdx-remote` + `gray-matter` · Zod v4 validation. Path alias `@/*` → `src/*`. Content in `content/` is imported with **relative paths** (`../../../content/...`), not the alias.

## Architecture

Four layers, top to bottom — **Presentation → Feature → Domain → Content**. Content is the single source of truth; the UI consumes it and never owns it. Every layer is meant to be swappable later (`MDX → CMS → NestJS API`) without a UI redesign, so features must consume domain objects, never raw MDX.

- **`src/proxy.ts`** — Next 16 proxy (formerly middleware). Only job: resolve the perspective per request (see below). Keep it thin.
- **`src/app/`** — routes only, thin. Pages are Server Components that call loaders and compose feature sections. All routes are dynamically rendered because the root layout reads request headers. Routes: `/`, `/projects`, `/projects/[slug]` (`generateStaticParams` still lists slugs), `/architecture-lab`, `/telemetry` (GitHub fetch cached via `next: { revalidate: 3600 }` in `github-adapter.ts`, plus a manual-refresh server action calling `revalidatePath`), plus `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`. `template.tsx` remounts per navigation for page-entry animation; `layout.tsx` persists (Header/Footer/providers).
- **`src/domains/<domain>/`** — business logic, pure and UI-free: `profile`, `project` (`query.ts` = `searchProjects`/`filterProjects`), `perspective` (Zustand store + URL sync + visibility rules), `telemetry`, `experience`.
- **`src/features/<feature>/`** — page-level composition combining multiple domains: `home`, `projects`, `project-detail`, `architecture-lab`, `telemetry`, `perspective`, `portfolio-pet`.
- **`src/shared/`** — genuinely reusable primitives (`components/`, `hooks/`, `providers/`). Design-system components live in `components/<name>/<name>.tsx`.
- **`src/lib/`** — infrastructure: `mdx/` (content loading + `section-splitter.ts`), `motion/` (`gsap-config.ts` registers GSAP plugins once), `telemetry/` (`github-adapter.ts` + `mock-source.ts`), `validation/` (Zod schemas, one per domain), `utils/cn.ts` (`clsx` + `tailwind-merge` class helper). `lib/analytics/` and `features/shared-layout/` are currently empty placeholders.
- **`content/`** — `.mdx` project case studies + typed `.ts` config (`profile/`, `navigation/`, `experience/`, `perspectives/`). One project = one `.mdx` file.

### The Perspective System (core feature)

Two states only: `overview` (default, recruiter-facing) and `architecture` (engineer-facing). It is a **data reveal, not a theme swap** — same routes, same colors, same content; only density, layout emphasis, and navigation depth change. Transition budget 600–900ms.

- Visitor-facing labels are **Recruiter** (`overview`) / **Engineer** (`architecture`), defined in `content/perspectives/perspectives.ts`. Internal ids never change; never hardcode the labels in components.
- **Resolution happens server-side.** `src/proxy.ts` runs `resolvePerspective()` (`domains/perspective/resolve.ts`: URL param > engineer route > `perspective` cookie > `overview`) and passes the result as the `x-perspective` request header. `app/layout.tsx` reads it, sets the `.perspective-architecture` class on `<html>` and seeds a **per-request Zustand store** via `PerspectiveStoreProvider` (`domains/perspective/store-provider.tsx`; `store.ts` is only the factory). Consequence: every route is dynamically rendered (`ƒ`), by design.
- Consumers call `usePerspectiveStore(selector)` from `store-provider.tsx` (same signature as before). `PerspectiveSync` keeps store ↔ URL ↔ cookie in agreement after hydration (invalid URL value → `console.warn`, param removed, never crash).
- `/architecture-lab` and `/telemetry` auto-switch to Engineer: the proxy handles full loads, `PerspectiveEnforcer` handles client-side navigations.
- First-visit explanation is `PerspectiveIntroDialog` (once per browser, `localStorage`). There is no pulse/tooltip anymore.
- `Shift+P` toggles perspective (desktop only, `use-perspective-shortcut.ts`). Single letter keys `c`/`r`/`h`/`p`/`a` are separate global shortcuts in `GlobalShortcuts` (theme cycle / resume / nav).
- Gating: `PerspectiveGater` (wrap server-rendered children; optional `fallback` rendered when the perspective is not active, e.g. the project-page `ArchitectureTeaser`) and `isItemVisible` / `isEngineeringModuleVisible` in `domains/perspective/visibility.ts`. Engineering modules are architecture-only.
- Engineer-mode content comes from structured content: `project.architecture` (summary + decisions, `docs/14 §5`) and `profile.engineering` (headline, philosophy, principles, `docs/14 §8`). Both optional; UI must degrade gracefully when absent.

### Content pipeline

`content/projects/*.mdx` → `gray-matter` → `projectSchema.safeParse` (throws a build error with field-level diagnostics on invalid frontmatter) → `Project` domain object + raw body → page compiles body with `next-mdx-remote` and `mdxComponents` mapping. `splitMdxSections` parses the body by top-level `#` headings into `overview` / `architecture` / `engineeringSections[]` / `futureImprovements`; the first three are mandatory (missing → throw). Engineering section titles are normalized to types via `ENGINEERING_TYPE_MAP`. `docs/18-project-mdx-template.md` is the authoring template.

### Motion architecture

Dual-engine, deliberately separated: **Framer Motion** = mount / hover / layout / page transitions; **GSAP** = scroll-linked and physical-morph effects. `SmoothScrollProvider` mounts one root Lenis instance driven by `gsap.ticker` (`autoRaf: false`) so ScrollTrigger and Lenis share one rAF loop. Under `prefers-reduced-motion`, Lenis is fully removed (native scroll) — always route reduced-motion checks through `useMotionPreference()`.

## Conventions

- Files/dirs: `kebab-case`. Components: `PascalCase` exports. Types/interfaces: `PascalCase`.
- Prettier: double quotes, semicolons, trailing commas, 80 col.
- Server-first: keep `"use client"` at the leaf. Pages stay server components; push interactivity into feature/shared client components.
- Error handling = graceful degradation (`docs/08`): one feature failing never takes down the page. Routing errors → real 404s. External services (GitHub) → isolated behind `ErrorBoundary` + try/catch with an honest fallback UI, never a generic "Something went wrong".
