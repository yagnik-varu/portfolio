# PROGRESS.md — Portfolio Build State

> Read this file FIRST before starting work.
> Also read `AGENT.md` FIRST — it's the operating guide for how work should get done on this project.
> Update this file LAST before ending work.
> This file is the project's current state, not a development diary.

Last Updated: 2026-08-20
Owner: Yagnik Varu

---

# 1. Overall Status

Project Phase:

- [x] Foundation & Planning
- [x] Design System
- [x] Content Architecture
- [x] Core UI Development (Home Page - Phase 5 Complete)
- [x] Perspective Transformation System
- [x] Project Pages (Phase 6 & Phase 7)
- [x] Architecture Lab
- [ ] Telemetry Dashboard
- [ ] Performance & Accessibility
- [ ] Deployment
- [ ] V1 Complete

---

# 2. Current Focus

Current Phase: Phase 8 (Architecture Lab & Telemetry)

Current Task: Phase 8 complete

Blocked By: Nothing

Next Task: Phase 9 — Telemetry

---

# 3. Architecture Documents

| # | File | Status |
|---|---|---|
| 00 | `docs/00-review-rules.md` | ✅ Done |
| 01 | `docs/01-project-requirements.md` | ✅ Done |
| 02 | `docs/02-perspective-transformation-model.md` | ✅ Done |
| 03 | `docs/03-domain-model.md` | ✅ Done |
| 04 | `docs/04-information-architecture.md` | ✅ Done |
| 05 | `docs/05-system-architecture.md` | ✅ Done |
| 06 | `docs/06-data-design.md` | ✅ Done |
| 07 | `docs/07-api-design.md` | ✅ Done |
| 08 | `docs/08-error-handling.md` | ✅ Done |
| 09 | `docs/09-repository-structure.md` | ✅ Done |
| 10 | `docs/10-coding-standards.md` | ✅ Done |
| 11 | `docs/11-design-system.md` | ✅ Done |
| 12 | `docs/12-ui-inventory.md` | ✅ Done |
| 13 | `docs/13-component-architecture.md` | ✅ Done |
| 14 | `docs/14-content-schema.md` | ✅ Done (Canonical Schema Source) |
| 15 | `docs/15-development-roadmap.md` | ✅ Done |

---

# 3a. Agent Operating Files

Root-level files (outside `docs/`, read first every session):

| File | Purpose | Status |
|---|---|---|
| `AGENT.md` | Consolidated operating guide for any agent/contributor: golden rules, tech stack, architecture principles, repo map, coding standards, content rules, error-handling philosophy, doc index, and the Teaching Mode working agreement | ✅ Done |
| `PROGRESS.MD` | This file — actual build state | ✅ Living document |

---

# 4. What's Actually Implemented

Only list completed functionality. Update as work progresses.

## Infrastructure

- Next.js App Router initialized with TypeScript and Tailwind CSS.
- Basic `page.tsx` cleaned up.
- Next.js + TS + Tailwind scaffold, domain-oriented src/ structure, ESLint/Prettier, and path aliases configured.

## UI

- Established complete Design System foundation: pure CSS dynamic color token system, `next/font` typography (Geist & JetBrains Mono), global accessibility baselines, and six core shared components (Button, Card, Badge, Container, SectionHeader, EmptyState).
- Built global Header/Footer/Navigation, and the full homepage (Hero, Current Focus, Engineering Snapshot, Featured Projects, Experience, Contact CTA, Engineering Modules).
- Added Ambient Interaction Layer (CursorSpotlight, Spring Hover Physics on Card/Button, fixed SVG Noise Layer, Gradient Tokens).
- Implemented Perspective Typography utility class (data-perspective-mono).
- **Phase 7 UI Primitives**: Built `ComplexityIndicator` component (`src/shared/components/complexity-indicator/`) using `cva` to visually represent project complexity levels mapping strictly to the domain.
- **Phase 7 UI Features**: Built `ProjectHero`, `TechnologyStackSection`, `OverviewSection`, `ArchitectureSection`, `EngineeringSection`, `EngineeringSections`, and `FutureImprovementsSection` components (`src/features/project-detail/components/`) adhering to strict Single Responsibility and progressive information expansion principles.
- **Phase 7 Page Assembly**: Orchestrated the Project Detail page (`src/app/projects/[slug]/page.tsx`) mapping MDX outputs to a vertically rhythm-driven timeline view using `PerspectiveGater` for smooth client-side capability revelation.

## Content

- Established complete MDX content pipeline: implemented five strict Zod schemas, a type-safe `getProjects()` loader, created the sample profile and two sample MDX projects (`spendsync-v2`, `techreel-ai`), and wired them to `/projects/[slug]` with build-time static generation (`generateStaticParams`) and automated 404 handling.
- Added `content/navigation/navigation.ts` and `content/experience/experience.ts` to power the site navigation and experience timeline.
- Updated Project and Profile schemas to include `impactMetrics` and `highlights` fields, and rewrote sample project content (SpendSync V2 and TechReel AI) to follow the Post-Mortem Depth ordering (Problem -> Architecture Decision -> Implementation -> Outcome -> What I'd Do Differently) without introducing new markdown headings.
- Validated that build gracefully fails on missing schema fields per `docs/08-error-handling.md §4`.
- **Phase 7 Content Loaders**: Built `splitMdxSections` utility in `src/lib/mdx/section-splitter.ts` to parse raw MDX bodies into structured domain models (`Overview`, `Architecture`, `EngineeringSections`, `FutureImprovements`), enforcing mandatory sections and normalizing engineering types.
- **Phase 7 Content Rendering**: Created `mdxComponents` mapping for `next-mdx-remote` (`src/lib/mdx/mdx-components.tsx`) to map raw markdown tags to semantic Design System classes, and implemented a custom `<ArchitectureCallout />` MDX element.
- **Phase 8 Content**: Added `EngineeringModule` and `LearningMilestone` Zod schemas and their respective content files (`content/perspectives/engineering-modules.ts`, `content/profile/learning-timeline.ts`). Refactored Phase 5's homepage `EngineeringModulesSection` to pull from this real content file instead of a hardcoded array, establishing a single source of truth.

## Perspective System

- Established a robust Perspective Engine architecture including: a centralized Zustand memory store, bidirectional URL synchronization enabling shareable state (with Zod validation fallback), desktop & mobile segmented controls mapped to global shortcuts (`Shift + P`), pure domain visibility calculation rules, Framer Motion-driven 4-stage UI layout shifts, and a one-time session-based discovery pulse affordance. (All systems gracefully degrade if `prefers-reduced-motion` is detected).
- Enhanced motion fidelity across system: asymmetric staged exit/enter curves in `<PerspectiveTransition />`, spring physics layout animations on `<PerspectiveToggleDesktop />`, word-stagger entrance and badge orchestration on `<HeroSection />`, scroll-linked elevation on `<Header />`, and CSS underline slide on `<Navigation />`.
- Implemented the exact Onboarding Pulse interaction specification from `docs/02-perspective-transformation-model.md §3`: 800ms delayed double-ring emerald pulse, a dismissible 6-second tooltip, and a `sessionStorage` flag to guarantee it only ever plays once.
- Built a reusable `KbdHint` component (`src/shared/components/kbd-hint.tsx`) and affixed a `Shift+P` badge to the desktop Perspective Toggle to increase power-user discoverability on viewports >1024px.
- Integrated the Depth Shift Layer into `PerspectiveTransition` by adding `z: -20` (translateZ) and `transformPerspective: 1000` to the Stage 2-3 variants, creating a subtle 3D recess effect while holding the background grid overlay position. Verified `prefers-reduced-motion` strictly overrides all timing. Total transition duration remains ~630ms, successfully within the 600-900ms threshold.
- Canonicalized animation standards across documentation (`docs/11-design-system.md §13` and `docs/02-perspective-transformation-model.md §5`).
- **TODO**: Implement Toast notification for invalid perspective URLs (`?perspective=wrong`). The app should gracefully fallback to `overview` but show a toast warning the user, and dynamically highlight the Perspective toggle button so they know where to fix it.
- Created `PerspectiveGater` utility (`src/features/perspective/components/perspective-gater.tsx`) to allow server-rendered components to be cleanly conditionally mounted into the DOM purely based on client-side global store state without compromising the RSC payload architecture.

## Core UI Development

- Implemented dynamic global Header and Footer in `src/app/layout.tsx`.
- Constructed `<Navigation />` system that reads directly from the canonical `content/navigation/navigation.ts` file, dynamically filtering links based on the active `Perspective` rules.
- Wired the global `usePerspectiveStore` to the Header per the Parent Controlled pattern, pushing state downwards to the responsive desktop and mobile toggles.
- Built the `HeroSection` homepage component demonstrating the "lens shift" perspective transformation, reusing Phase 4 Framer Motion animation utilities, page-load word stagger entrance, and reading purely from `profile.ts` content.
- Built the `CurrentFocusSection` homepage component (`src/features/home/components/current-focus-section.tsx`) rendering `profile.currentFocus` as technology badges, adhering to the Single Source of Truth architecture principle and perspective-agnostic visibility rules.
- Created `content/experience/experience.ts` content source validated against `experienceSchema`.
- Built the `EngineeringSnapshotSection` homepage component (`src/features/home/components/engineering-snapshot-section.tsx`) displaying quick credibility metrics (Years Experience, Projects Built, Technologies Used, GitHub Activity) using `font-mono` JetBrains Mono token, deriving project metrics directly from the MDX content loader.
- Built the composite `ProjectCard` component (`src/features/projects/components/project-card.tsx`) with discrete sub-components (`ProjectCardHeader`, `ProjectCardSummary`, `ProjectCardStack`, `ProjectArchitecturePanel`, `ProjectCardActions`) adhering to the Single Responsibility Principle and Perspective reveal rules ("same card, more info").
- Built the `FeaturedProjectsSection` homepage component (`src/features/home/components/featured-projects-section.tsx`) filtering for featured MDX projects in a responsive grid.
- Built the `ExperienceSection` homepage component (`src/features/home/components/experience-section.tsx`) with `id="experience"` anchor support and smooth scrolling, rendering career history from `content/experience/experience.ts`. Updated navigation links to route to `/#experience` smoothly across all pages.
- Built the `ContactCTASection` homepage component (`src/features/home/components/contact-cta-section.tsx`) with `id="contact"` anchor support, providing low-friction email, resume download, and LinkedIn connection actions using data from `content/profile/profile.ts`.
- Built the `EngineeringModulesSection` homepage component (`src/features/home/components/engineering-modules-section.tsx`) with dynamic perspective visibility (rendered strictly in Architecture mode), exposing entry points to Architecture Lab, Telemetry, and Learning Timeline workspaces with staggered entrance animations.
- Assembled the full Homepage (`src/app/page.tsx`) as a thin Server Component composing feature sections with responsive vertical rhythm.
- Created `RotatingStat` component replacing the static profile summary in the `HeroSection` with a 5s-interval crossfade cycling through `Profile.highlights`, gracefully halting on hover/focus.
- Added a progressive hover reveal panel to the `ProjectCard`, housing a newly created `ProjectImpactBadge` (showing 1-2 key outcomes) and a "View Case Study" link without introducing a new grid wrapper.
- Integrated a reusable `StaggeredSection` and `StaggeredItem` animation wrapper using `useInView` to handle staggered spring entrances (opacity 0->1 / y 40px->0) for the Hero, Engineering Snapshot, Featured Projects, Experience, and Contact CTA sections.
- Embedded a "Currently Focused On" indicator into the `EngineeringSnapshotSection` utilizing `profile.currentFocus`.
- Validated that `prefers-reduced-motion` strictly overrides the `RotatingStat` auto-play, the staggered entrances, and the `ProjectCard` hover transitions, maintaining 100% accessibility compliance.
- Built reusable `SearchInput` and `FilterDropdown` shared components (`src/shared/components/`) to serve as "dumb" UI primitives.
- Built the full `/projects` page featuring the `ProjectFilterBar`, `ProjectDiscovery` orchestrator, and `ProjectGrid`, fully wired with `EmptyState` fallbacks and functional search/filter logic.
- **Phase 8 Architecture Lab**: Built the `ModuleCard` (composing Shared `Card`), `ModuleGrid`, `LearningTimeline` (chronologically sorted local domain data), and `EngineeringPrinciples` (local constant array) components.
- **Phase 8 Page Assembly**: Assembled the `/architecture-lab` route as a fully static, non-perspective-gated public landing page composing the Lab modules, Timeline, and Principles in a vertical rhythm.
- **Phase 9 Telemetry UI Primitives**: Built `MetricCard` (composing Shared `Card` with JetBrains Mono metrics), `MetricsGrid` components adhering to the Parent-Controlled widget architecture pattern, a dependency-free CSS-grid `ContributionHeatmap`, and pure CSS `LanguageChart` / `ActivityFeed` representations to avoid charting library overhead while maintaining strict token usage.
- **Phase 9 Page Assembly & Resiliency**: Built generic `ErrorBoundary` shared component. Assembled the `/telemetry` page with three-layer failure handling (Adapter validation -> Mock Fallback via try/catch with honest UI communication -> ErrorBoundary localized catch) ensuring 100% graceful degradation on GitHub API failure. (Note: ContributionHeatmap was removed per user request).

## Domain Logic

- Implemented pure domain functions (`searchProjects` and `filterProjects`) in `src/domains/project/query.ts` to handle complex project discovery and criteria filtering independent of the UI layer.

## Process / Tooling

- `AGENT.md` created — synthesizes `docs/00`–`15` into actionable rules and adds a standing **Teaching Mode** requirement: every implementation step must be explained in plain language (what's being built, why this approach over alternatives, what any new concept/library/pattern actually does, and how the decision traces back to the relevant doc). This applies for the rest of the build, not just at kickoff.

---

# 5. Working Agreement Reminder

Before any code is written from this point forward:

1. Check this file for current state.
2. Check `AGENT.md` §2 (Golden Rules) before adding any dependency, pattern, state solution, build tool, or folder structure — approval required first.
3. Explanations accompany implementation by default (`AGENT.md` §7, Teaching Mode) — this is a learning project as much as a build.
4. **Detailed Agent Execution Summary**: After completing each task, the agent must provide a comprehensive summary of its execution flow. This includes: files read or edited, commands executed and the reasoning behind them, command outputs, any errors encountered and how the agent figured out the issue and resolved it, and the agent's step-by-step thought process.