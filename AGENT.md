# AGENT.md

## 🚨 MANDATORY AGENT INSTRUCTIONS
Before executing any task or writing any code, you must strictly follow these steps:

1. **READ `PROGRESS.MD` FIRST:** This is the single source of truth for what actually exists in the codebase versus what is only planned. Read it at the start of every session.
2. **CONSULT THE DOCUMENTATION INDEX:** Identify your task in the index below and read the specific documentation file(s) before starting.
3. **NEVER INVENT SCOPE:** If the docs don't cover something, ask the user. Don't make assumptions.
4. **UPDATE PROGRESS:** Update `PROGRESS.MD` at the end of every work session as a snapshot of what's real.

---

## 📚 DOCUMENTATION INDEX BY TASK
Find your current task category and read the corresponding file(s) before touching code:

| If your task involves... | You MUST read... |
|---|---|
| **Understanding the Goal** (Why we're building this) | `docs/01-project-requirements.md` |
| **The Perspective Feature** (Overview vs. Architecture) | `docs/02-perspective-transformation-model.md` |
| **Business Entities & Data Models** | `docs/03-domain-model.md` |
| **Routing, Navigation & Pages** | `docs/04-information-architecture.md` |
| **Application Layers & How they connect** | `docs/05-system-architecture.md` |
| **Markdown Content, MDX & Frontmatter** | `docs/06-data-design.md`, `docs/14-content-schema.md` |
| **Data Fetching, Loaders & API Shape** | `docs/07-api-design.md` |
| **Error Handling & Graceful Degradation** | `docs/08-error-handling.md` |
| **Where to place a new file/folder** | `docs/09-repository-structure.md` |
| **Writing Code, TypeScript & Naming Rules** | `docs/10-coding-standards.md` |
| **Styling, Tailwind, Colors & UI Tokens** | `docs/11-design-system.md` |
| **Building or Modifying UI Components** | `docs/12-ui-inventory.md`, `docs/13-component-architecture.md` |
| **Checking what to build next (Roadmap)** | `docs/15-development-roadmap.md` |

---

## 1. Project Summary
A developer portfolio for **Yagnik Varu** that shows the *same* content through two lenses — **Overview** (recruiter-facing) and **Architecture** (engineer-facing) — via a global Perspective Switch, without maintaining two separate sites.

## 2. Golden Rules
The project owner values **simplicity over abstraction**, **clarity over cleverness**, and **future extensibility over premature complexity**.

Before introducing any of the following, an agent must **stop and ask for approval** — never just do it:
- A new dependency
- A new architecture pattern
- A new state management solution
- A new build tool
- A new folder structure

*The approval request must include: (1) why it's needed, (2) alternatives considered, (3) tradeoffs, (4) then wait for a decision.*

## 3. Tech Stack (Locked)
| Concern | Choice |
|---|---|
| **Framework** | Next.js (App Router) + TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Animation** | Framer Motion |
| **Global state** | Zustand — perspective/theme/UI prefs **only**, never content |
| **Content** | MDX + typed TS config, validated with Zod |
| **Deployment** | Vercel |

## 4. Architecture Principles
1. **Content is the source of truth.** The UI consumes it; it never owns it.
2. **Perspective controls presentation, never content.** Overview and Architecture render the same data at different density/visibility — never different data.
3. **Domain drives structure.** Folders are organized by business domain (`profile`, `project`, `perspective`, etc.), not by technical type.
4. **Every layer must be swappable later without a UI redesign.** The intended path is `MDX → CMS → NestJS API`.
*Layering, top to bottom: Presentation → Feature → Domain → Content.*

## 5. The Perspective System (Core Feature)
- Two states only: `overview` (default) and `architecture`. Synced to URL query param (`?perspective=architecture`).
- It is a **data reveal, not a theme swap**: same colors, same routes. Only density, layout emphasis, and navigation depth change.
- Transition budget: 600–900ms.
- Invalid perspective value must silently fall back to `overview` and log — never crash.

## 6. Error Handling Philosophy
**Strategy: graceful degradation, always.** One feature failing must never take the rest of the app down.
- Routing errors → real 404s, never silent redirects.
- External service errors → isolated behind error boundaries.
- User-facing error messages: clear, actionable, professional. No generic "Something went wrong."

## 7. Teaching Mode (Required)
Yagnik is learning software architecture and engineering practice alongside this build. **Every implementation step comes with an explanation, not just working code**:
- Before writing code for a new piece, explain in plain language what's about to be built and *why this approach* was chosen.
- When a new concept, pattern, or library shows up for the first time, give a short, concrete explanation of what it is and the problem it solves.
- Connect code back to the relevant doc/section so the "why" is traceable.
- Answer "why" with tradeoffs, not just the rule.