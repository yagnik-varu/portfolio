# 09-repository-structure.md

# Repository Structure

## Purpose

This document defines the repository organization strategy for the portfolio project.

The goal is to create a structure that is:

* Easy to navigate
* Scalable
* Domain-oriented
* AI-agent friendly
* Future CMS compatible
* Future backend compatible

A clean repository structure improves maintainability, onboarding, and long-term scalability. Separating source code, tests, documentation, and content into dedicated top-level directories is a widely adopted software engineering practice.

---

# 1. Repository Principles

## Principle 1

Separate concerns.

Different responsibilities should live in different locations.

---

## Principle 2

Domain before technology.

Structure should reflect:

```text
Profile

Projects

Perspective

Telemetry
```

not:

```text
Components

Hooks

Utils
```

---

## Principle 3

Documentation is part of the product.

Architecture decisions must be version-controlled alongside source code.

---

## Principle 4

Content is not application code.

Content should live separately from source code.

---

## Principle 5

Future migrations should not require repository restructuring.

The repository should support:

```text
MDX

↓

CMS

↓

NestJS API

↓

Admin Dashboard
```

without major changes.

---

# 2. Top-Level Repository Structure

```text
portfolio/

├── src/
├── content/
├── public/
├── docs/
├── tests/

├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── .env.example
├── .gitignore
```

---

# 3. Directory Responsibilities

## src/

Application source code.

Contains:

```text
Domains

Features

Shared Components

Libraries
```

---

## content/

Application content.

Contains:

```text
Projects

Profile

Navigation

Perspectives

Experience
```

---

## public/

Static assets.

Contains:

```text
Images

Icons

Favicon

Open Graph Assets
```

---

## docs/

Project documentation.

Contains:

```text
Architecture

Requirements

Standards

Progress Tracking
```

---

## tests/

Automated tests.

Contains:

```text
Unit Tests

Integration Tests
```

---

# 4. Source Code Structure

## Root Source Structure

```text
src/

├── app/
├── domains/
├── features/
├── shared/
│   └── components/
│       └── smooth-scroll-provider.tsx  ← Lenis root provider, gsap.ticker-synced
└── lib/
    └── motion/
        └── gsap-config.ts              ← GSAP plugin registration (one-time)
```

---

# 5. App Router Structure

## Purpose

Contains Next.js routes.

---

## Structure

```text
src/app/

├── page.tsx

├── projects/
│   ├── page.tsx
│   └── [slug]/
│       └── page.tsx

├── architecture-lab/
│   └── page.tsx

├── telemetry/
│   └── page.tsx

└── not-found.tsx
```

---

# 6. Domains Directory

## Purpose

Contains business/domain logic.

---

## Structure

```text
src/domains/

├── profile/
├── project/
├── perspective/
├── telemetry/
└── experience/
```

---

# Domain Responsibilities

## profile

Manages:

```text
Profile Models

Profile Contracts

Profile Services
```

---

## project

Manages:

```text
Project Models

Project Parsing

Project Contracts

Project Queries
```

---

## perspective

Manages:

```text
Perspective State

Visibility Rules

Transformation Rules
```

---

## telemetry

Manages:

```text
Telemetry Models

Telemetry Contracts

Telemetry Services
```

---

## experience

Manages:

```text
Experience Models

Experience Contracts
```

---

# 7. Feature Layer

## Purpose

Page-level composition.

Features combine multiple domains into user-facing experiences.

---

## Structure

```text
src/features/

├── home/
├── projects/
├── architecture-lab/
├── telemetry/
└── shared-layout/
```

---

# Example

## Home Feature

May consume:

```text
Profile Domain

Project Domain

Perspective Domain
```

simultaneously.

---

# 8. Shared Layer

## Purpose

Reusable UI and application utilities.

---

## Structure

```text
src/shared/

├── components/
├── hooks/
├── providers/
├── constants/
├── types/
└── styles/
```

---

# Rule

Only truly reusable code belongs here.

---

## Bad Example

```text
shared/

SpendSyncCard
```

---

## Good Example

```text
shared/

Button

Modal

Card
```

---

# 9. Library Layer

## Purpose

Application infrastructure.

---

## Structure

```text
src/lib/

├── mdx/
├── motion/
├── telemetry/
├── analytics/
├── validation/
└── utils/
```

---

# Responsibilities

## mdx

Content loading.

---

## motion

GSAP plugin registration and Lenis smooth-scroll provider.

Entry point: `src/lib/motion/gsap-config.ts` — registers ScrollTrigger, SplitText, and Flip once per app load.
Smooth scroll: `src/shared/components/smooth-scroll-provider.tsx` — mounts Lenis at root, synced to gsap.ticker.

---

## telemetry

Telemetry provider integration.

---

## validation

Schema validation.

---

## utils

Pure utility functions.

---

# 10. Content Structure

## Root Content Structure

```text
content/

├── projects/
├── profile/
├── perspectives/
├── navigation/
└── experience/
```

---

# 11. Project Content

## Structure

```text
content/projects/

spendsync.mdx

techreel-ai.mdx

lac-platform.mdx

lac-cms.mdx
```

---

## Rule

One project.

One file.

---

## Benefits

* Simpler maintenance
* Easier editing
* Better author experience

---

# 12. Profile Content

## Structure

```text
content/profile/

profile.ts
```

---

## Purpose

Stores profile metadata.

---

# 13. Navigation Content

## Structure

```text
content/navigation/

navigation.ts
```

---

## Purpose

Navigation configuration.

---

# 14. Perspective Content

## Structure

```text
content/perspectives/

perspectives.ts
```

---

## Purpose

Perspective configuration.

---

# 15. Experience Content

## Structure

```text
content/experience/

experience.ts
```

---

## Purpose

Professional experience data.

---

# 16. Public Assets

## Structure

```text
public/

├── images/
├── icons/
├── logos/
└── og/
```

---

# Images

Project screenshots.

---

# Icons

Application icons.

---

# Logos

Technology logos.

---

# OG

Open Graph assets.

---

# 17. Testing Structure

## Strategy

Dedicated root test directory.

---

## Structure

```text
tests/

├── unit/
└── integration/
```

---

# Unit Tests

Test:

```text
Domain Logic

Utilities

Validation
```

---

# Integration Tests

Test:

```text
Content Loading

Perspective Flow

Feature Composition
```

---

# Why Not src/**tests**?

Dedicated test directories scale better as project complexity grows and keep source code focused on implementation.

---

# 18. Documentation Structure

## Structure

```text
docs/
├── 00-review-rules.md
├── 01-project-requirements.md
├── 02-perspective-transformation-model.md
├── 03-domain-model.md
├── 04-information-architecture.md
├── 05-system-architecture.md
├── 06-data-design.md
├── 07-api-design.md
├── 08-error-handling.md
├── 09-repository-structure.md
├── 10-coding-standards.md
├── 12-design-system.md
├── 13-ui-inventory.md
├── 14-component-architecture.md
├── 15-content-schema.md
└── 16-development-roadmap.md
```

---

# Purpose

Acts as the project's single source of truth for architectural decisions.

---

# 19. Naming Conventions

## Directories
Use: `kebab-case` (e.g., `architecture-lab/`, `project-card/`)

## Files (All TS/TSX files)
Use: `kebab-case.tsx` / `kebab-case.ts` (e.g., `project-card.tsx`, `use-perspective.ts`)

## React Components (Exports)
Use: `PascalCase` (e.g., `export function ProjectCard()`)

## TypeScript Interfaces / Types
Use: `PascalCase` (e.g., `interface Project {}`, `type Perspective = ...`)
```

Example:

```ts
interface Project {}
```

---

# 20. Future Repository Expansion

Future additions may include:

```text
apps/

packages/

services/

admin/
```

---

## Example

```text
portfolio/

admin/

api/

website/
```

---

## Rule

Current architecture must support expansion without restructuring existing domains.

---

# 21. Repository Ownership Rule

Every file should clearly belong to one responsibility.

Example:

```text
Project Content

→ content/projects

Project Logic

→ domains/project

Project UI

→ features/projects
```

This prevents responsibility leakage.

---

# Repository Structure Summary

The repository is organized around:

```text
Domain Separation

Content Isolation

Documentation First

Future Scalability
```

The structure intentionally treats the portfolio as a real software product rather than a collection of pages.

This creates a codebase that is:

```text
Easy To Navigate

Easy To Extend

AI-Agent Friendly

Future CMS Ready

Future NestJS Ready
```
