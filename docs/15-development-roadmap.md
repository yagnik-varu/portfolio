# 15-development-roadmap.md

# Development Roadmap

Executable implementation plan. Build foundations first, features second, optimize last.

```text
Foundation → Design System → Content → Perspective Engine → Pages → Polish → Deploy
```

---

# Phase 1 — Project Foundation

**Goal**: Create project skeleton.

**Deliverables**:
- Next.js App Router + TypeScript + Tailwind CSS
- Folder structure: `src/`, `content/`, `docs/`, `tests/`, `public/`
- Domain directories: `src/domains/`, `src/features/`, `src/shared/`, `src/lib/`
- ESLint, Prettier, path aliases (`@/`)

**Done when**: Project runs, folder structure matches `09-repository-structure.md`.

---

# Phase 2 — Design System

**Goal**: Build visual foundation. No page-specific UI yet.

**Deliverables**:
- Theme tokens: primary (`#10b981`), background, surface, border, text, muted
- Typography: Geist (headings/body), JetBrains Mono (technical/metrics)
- Global styles via Tailwind config
- Shared components: Button, Card, Badge, Container, Section Header, Empty State

**Done when**: Reusable design system exists with all tokens and base components.

---

# Phase 3 — Content System

**Goal**: MDX content pipeline with schema validation.

**Deliverables**:
- MDX loader using `gray-matter` + `next-mdx-remote`
- Zod schemas: Project, Profile, Experience, Navigation, Perspective
- Sample content: `profile.ts`, `spendsync-v2.mdx`, `techreel-ai.mdx`
- `generateStaticParams` integration

**Done when**: Content renders from MDX. Validation catches invalid metadata at build time.

---

# Phase 4 — Perspective Engine

**Goal**: Implement the core portfolio differentiator.

**Deliverables**:
- Zustand store for perspective state (`overview | architecture`)
- URL sync: `?perspective=overview`, `?perspective=architecture`
- Perspective Slider/Toggle component (desktop + mobile)
- Visibility rules and transformation logic
- First-visit discovery affordance

**Done when**: Perspective switches globally without page reload. URL is shareable.

---

# Phase 5 — Home Page

**Goal**: Create landing experience with perspective transformation.

**Deliverables**:
- Hero Section (Overview → Architecture transformation)
- Current Focus badges
- Engineering Snapshot (metrics)
- Featured Projects grid
- Experience section (`/#experience`)
- Contact CTA

**Done when**: Homepage fully functional, responsive, transforms between perspectives.

---

# Phase 6 — Projects Page

**Goal**: Project discovery and filtering.

**Deliverables**:
- Project grid with responsive layout
- Search (title, summary, technology, tags)
- Filters (technology, status, architecture type)
- Project Card with perspective-aware metadata
- Empty state

**Done when**: Projects searchable, filterable, perspective-aware.

---

# Phase 7 — Project Detail Pages

**Goal**: Deep project exploration via MDX case studies.

**Deliverables**:
- Dynamic routing (`/projects/[slug]`)
- MDX rendering with custom components
- Project Hero, Stack Display, Overview, Architecture sections
- Engineering Deep Dive sections (optional per project)
- Future Improvements section

**Done when**: All projects render from content with full perspective support.

---

# Phase 8 — Architecture Lab

**Goal**: Engineering workspace experience (`/architecture-lab`).

**Deliverables**:
- Module Grid, Architecture Module Cards
- Learning Timeline
- Engineering Principles section

**Done when**: Architecture Lab page complete and navigable from Architecture perspective.

---

# Phase 9 — Telemetry

**Goal**: Display engineering activity (`/telemetry`).

**Deliverables**:
- Contribution Heatmap, Metrics Grid, Activity Feed, Language Distribution
- Phase 1: Static mock data
- Phase 2: GitHub API integration with caching

**Done when**: Telemetry page operational with graceful degradation on API failure.

---

# Phase 10 — Motion & Polish

**Goal**: Animations that support UX, never decorative.

**Deliverables** (Framer Motion):
- Perspective morph transitions (600–900ms)
- Card expansion, hover states, page transitions
- `prefers-reduced-motion` fallback (instant state changes)

**Done when**: Transitions feel natural. Animations degrade gracefully.

---

# Phase 11 — Accessibility & Performance

**Goal**: Compliance and optimization.

**Accessibility**: Keyboard navigation, focus states, ARIA labels, reduced motion, semantic HTML.

**Performance**: Image optimization, bundle review, lazy loading, metadata, SEO. Target: Lighthouse > 90.

---

# Phase 12 — Testing

**Goal**: Validate critical flows.

- **Unit**: Validation, content loaders, utilities
- **Integration**: Perspective flow, project rendering, search

---

# Phase 13 — Deployment

**Goal**: Launch V1 on Vercel.

**Deliverables**: Production build, custom domain, analytics, Open Graph images, sitemap, robots.txt.

---

# Future Phases (Not V1)

**CMS**: Admin dashboard, content editor, CMS integration, authentication, analytics dashboard.

**Backend**: NestJS API, project management, dynamic content, admin features, telemetry aggregation.

---

# Definition of Done

A feature is complete when:
- **Functional**: Meets domain and perspective requirements
- **Responsive**: Mobile (< 768px), tablet (768–1024px), desktop (> 1024px)
- **Accessible**: Keyboard, focus, ARIA, reduced-motion
- **Type Safe**: Strict TypeScript, no `any`
- **Tested**: Critical flows covered
- **Documented**: Architecture docs updated if decisions changed

---

# V1 Completion Criteria

**Pages**: Home, Projects, Project Detail, Architecture Lab, Telemetry

**Systems**: Perspective Transformation, Search, Filtering, MDX Content, Telemetry

**Quality**: Lighthouse > 90, Responsive, Accessible, SEO Ready

**Deployment**: Production hosted, custom domain connected