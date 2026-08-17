# AGENT.md

## 0. What This File Is

This is the entry point for any AI agent (Claude Code, Cursor, Copilot, or otherwise) — or any human contributor — working on the **Yagnik Portfolio** codebase. Read this before touching any code, every session.

It exists because the project has 16 detailed planning documents in `docs/`. This file distills them into one operational reference so an agent doesn't have to re-derive the rules from scratch each time, and adds a couple of working rules specific to *how* this project should be built, not just *what* to build.

If anything here conflicts with `docs/`, the docs win — flag the mismatch and update this file, don't silently proceed on stale info.

---

## 1. Project Summary

One line: a developer portfolio for **Yagnik Varu** that shows the *same* content through two lenses — **Overview** (recruiter-facing) and **Architecture** (engineer-facing) — via a global Perspective Switch, without maintaining two separate sites.

Primary references: `01-project-requirements.md` (why), `02-perspective-transformation-model.md` (the mechanism), `03-domain-model.md` (the data), `04-information-architecture.md` (the structure).

---

## 2. Golden Rules — non-negotiable (`00-review-rules.md`)

The project owner values **simplicity over abstraction**, **clarity over cleverness**, **future extensibility over premature complexity**.

Before introducing any of the following, an agent must **stop and ask for approval** — never just do it:

- A new dependency
- A new architecture pattern
- A new state management solution
- A new build tool
- A new folder structure

The approval request must include: **(1)** why it's needed, **(2)** alternatives considered, **(3)** tradeoffs, **(4)** then wait for a decision. No architectural change happens automatically — ever.

---

## 3. Tech Stack (locked, don't swap without approval)

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Global state | Zustand — perspective/theme/UI prefs **only**, never content |
| Content | MDX + typed TS config, validated with Zod |
| Deployment | Vercel |

---

## 4. Architecture Principles (`05-system-architecture.md`)

1. **Content is the source of truth.** The UI consumes it; it never owns it.
2. **Perspective controls presentation, never content.** Overview and Architecture render the same data at different density/visibility — never different data.
3. **Domain drives structure.** Folders are organized by business domain (`profile`, `project`, `perspective`, `telemetry`, `experience`), not by technical type (`components/`, `hooks/`, `utils/`).
4. **Every layer must be swappable later without a UI redesign.** The intended path is `MDX → CMS → NestJS API`; nothing in V1 should block that.

Layering, top to bottom: **Presentation → Feature → Domain → Content.**

---

## 5. The Perspective System — this *is* the product

The whole product hinges on this feature. Treat it with more care than anything else in the codebase.

- Two states only: `overview` (default) and `architecture`.
- Synced to a URL query param (`?perspective=architecture`) — shareable, survives refresh.
- A switch is a **data reveal, not a theme swap**: same colors, same routes, same content source. Only density, layout emphasis, and navigation depth change.
- Transition budget: **600–900ms**, across four stages (see `02-perspective-transformation-model.md` §5).
- An invalid perspective value must silently fall back to `overview` and log — never crash (`08-error-handling.md` §7).

---

## 6. Repository Map (`09-repository-structure.md`)

```text
portfolio/
├── src/
│   ├── app/          → Next.js routes only
│   ├── domains/       → business logic (profile, project, perspective, telemetry, experience)
│   ├── features/      → page-level composition, combines domains
│   ├── shared/         → reusable UI + hooks + providers (must be reused in 2+ places)
│   └── lib/             → infra: mdx loader, telemetry client, validation, utils
├── content/
│   ├── projects/*.mdx  → one file per project
│   ├── profile/profile.ts
│   ├── experience/experience.ts
│   ├── navigation/navigation.ts
│   └── perspectives/perspectives.ts
├── public/
├── docs/                → planning docs 00–15
├── tests/{unit,integration}/
├── AGENT.md              ← you are here
└── PROGRESS.MD
```

Rule of thumb: a component used by one feature stays in that feature; once reused, it graduates to `shared/`. Domains never contain JSX.

---

## 7. Coding Standards — quick reference (`10-coding-standards.md`)

- TypeScript strict mode always on. No `any`; use `unknown` when uncertain.
- One component = one responsibility. Compose small pieces; never build a "God Component."
- Server Components by default. `"use client"` only for animation, event handlers, browser APIs, or Zustand access.
- Global state is for perspective/theme/UI prefs only — never project content or static data.
- Import order: external libraries → `@/` aliases → relative imports. Never deep-relative (`../../../`).
- Naming: files `kebab-case`, component exports `PascalCase`, hooks `use-*.ts` / `use*()`, utils `kebab-case.ts` / `camelCase()`, constants `UPPER_SNAKE_CASE`.
- Never swallow errors — `catch {}` is banned. Always log, then degrade gracefully.

---

## 8. Content & Data Rules (`06-data-design.md`, `14-content-schema.md`)

- One project = one `.mdx` file. Frontmatter carries typed metadata; the body carries the case study.
- Required project fields: `slug, title, summary, status, architectureType, complexity, featured, stack`.
- Standard content flow: `Overview → Architecture → Engineering Sections → Future Improvements`. Engineering sections (database, request-flow, security, scaling, challenges, lessons-learned) are optional per project.
- All content is Zod-validated at build time. Invalid content fails the build in dev; in production, degrade gracefully (missing image → default thumbnail, missing section → skip it silently).
- The frontend must consume domain contracts (e.g. `Project`), never raw MDX/CMS/DB shapes — that's what keeps the future `MDX → CMS → NestJS` migration free.

---

## 9. Error Handling Philosophy (`08-error-handling.md`)

Strategy: **graceful degradation, always.** One feature failing (e.g. GitHub telemetry down) must never take the rest of the app down with it.

- Routing errors → real 404s, never silent redirects.
- Perspective errors → fall back to `overview`, log, continue.
- External service errors (GitHub API, future CMS) → isolated behind error boundaries around Telemetry, Architecture Lab, and Project Details.
- User-facing error messages: clear, actionable, professional. No stack traces, no generic "Something went wrong."

---

## 10. API Shape, Even Though V1 Has No Backend (`07-api-design.md`)

Build the MDX loader as if it were an API client. `getProjects()` should read like a call to `GET /api/v1/projects`, even though today it's reading a folder. That discipline is what lets the future NestJS swap happen without touching the UI.

---

## 11. Documentation Map — when to open which doc

| Need to know... | Read |
|---|---|
| Why we're building this at all | `01-project-requirements.md` |
| How perspective switching should feel | `02-perspective-transformation-model.md` |
| What the business entities are | `03-domain-model.md` |
| Where a page/route/nav item belongs | `04-information-architecture.md` |
| How the layers connect | `05-system-architecture.md` |
| Shape of content/frontmatter | `06-data-design.md`, `14-content-schema.md` |
| Contract for an API-like function | `07-api-design.md` |
| What happens when something fails | `08-error-handling.md` |
| Where a file should live | `09-repository-structure.md` |
| Naming / style / TS rules | `10-coding-standards.md` |
| Colors, type, tokens, motion | `11-design-system.md` |
| Every screen/component/state needed | `12-ui-inventory.md` |
| Component ownership & composition | `13-component-architecture.md` |
| Build order | `15-development-roadmap.md` |

---

## 12. Working Agreement for Agents

1. Read `PROGRESS.MD` first, every session — it's the single source of truth for what actually exists vs. what's only planned.
2. Never invent scope. If the docs don't cover something, ask — don't assume.
3. Never restructure folders, swap libraries, or introduce new patterns without going through the Golden Rules approval flow (§2).
4. If a doc and the code disagree, the doc isn't automatically right — flag the mismatch and ask which one should change (`10-coding-standards.md` §22, Rule 6: update docs before implementation continues).
5. Update `PROGRESS.MD` at the end of every work session — as a snapshot of what's real, not a diary.

---

## 13. Teaching Mode — required for every implementation

Yagnik is learning software architecture and engineering practice alongside this build, not just directing it. Because of that, **every implementation step comes with an explanation, not just working code**:

- Before writing code for a new piece, explain in plain language what's about to be built and *why this approach* was chosen over the alternatives that were considered.
- When a new concept, pattern, or library shows up for the first time (Zustand, Zod, `next-mdx-remote`, Server vs. Client Components, error boundaries, `cva`, etc.), give a short, concrete explanation of what it is and the problem it solves — treat it as genuinely new, don't just name-drop it.
- After the code, connect it back to the relevant doc/section so the "why" is traceable — e.g. *"this fallback follows the graceful-degradation rule in `08-error-handling.md` §6."*
- Favor small, understandable steps over big opaque diffs. It's fine to build something in stages if that makes the reasoning easier to follow.
- If asked "why," answer with the tradeoff, not just the rule — the goal is that Yagnik could explain the decision to someone else afterward.

This applies for the whole project, not just at kickoff — revisit it any time a new library, pattern, or architectural piece shows up for the first time.