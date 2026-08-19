# 14-content-schema.md

# Content Schema

## Purpose

This document defines the content contracts used throughout the portfolio.

The goals are:

- Type-safe content
- Predictable rendering
- Future CMS compatibility
- Single source of truth
- AI-agent friendly content management

All content must conform to the schemas defined in this document.

The portfolio follows an MDX-first content architecture where metadata drives routing, filtering, rendering, and future CMS integration. Structured frontmatter with schema validation is a widely used pattern in modern portfolio systems. :contentReference[oaicite:0]{index=0}

---

# 1. Content Philosophy

## Principle 1

Content is data.

UI consumes content.

---

## Principle 2

Content must not contain business logic.

---

## Principle 3

All content must be schema validated.

---

## Principle 4

Future CMS must be able to replace MDX without changing frontend contracts.

---

## Principle 5

One source of truth.

Each piece of information should exist only once.

---

# 2. Content Structure

```text
content/

├── profile/
│   └── profile.ts
│
├── projects/
│   ├── spendsync-v2.mdx
│   ├── techreel-ai.mdx
│   └── lac-platform.mdx
│
├── experience/
│   └── experience.ts
│
├── navigation/
│   └── navigation.ts
│
└── perspectives/
    └── perspectives.ts
```

---

# 3. Project Content

## File Structure

```text
content/projects/spendsync-v2.mdx
```

---

## Project Metadata Schema

```yaml
---
slug: spendsync-v2

title: SpendSync V2

summary: Room expense management platform.

status: active

featured: true

architectureType: modular-monolith

complexity: advanced

visibility: public

stack:
  frontend:
    - Next.js
    - TypeScript

  backend:
    - NestJS

  database:
    - PostgreSQL

  infrastructure:
    - Neon

tags:
  - finance
  - room-management
  - architecture

repositoryUrl: ""

liveUrl: ""

startedAt: 2025-01-01

updatedAt: 2025-06-01
---
```

---

# 4. Required Project Fields

## slug

Type:

```ts
string
```

Unique project identifier.

---

## title

Type:

```ts
string
```

Project name.

---

## summary

Type:

```ts
string
```

Short project description.

---

## status

Type:

```ts
"active" | "completed" | "paused"
```

---

## architectureType

Type:

```ts
string
```

Examples:

```text
monolith

modular-monolith

microservices

event-driven
```

---

## complexity

Type:

```ts
"beginner"
| "intermediate"
| "advanced"
| "production"
```

---

## featured

Type:

```ts
boolean
```

Controls homepage visibility.

---

# 5. Optional Project Fields

## repositoryUrl

GitHub repository.

---

## liveUrl

Public deployment URL.

---

## demoUrl

Video/demo URL.

---

## caseStudyUrl

Future detailed case study.

---

## coverImage

Hero image.

---

## gallery

Project screenshots.

---

## impactMetrics

Short impact metrics (e.g. "↓ 60% API latency").

---

## lessonsLearned

List of engineering lessons.

---

# 6. Project Content Sections

Every project should contain:

```md
## Overview

## Architecture

## Challenges

## Future Improvements
```

---

## Optional Sections

```md
## Request Flow

## Database Design

## Security

## Scaling

## DevOps

## Lessons Learned
```

---

## Authoring Guidance: Post-Mortem Depth
Within the existing Overview / Architecture / Challenges / Future Improvements
structure, prefer this ordering when writing:
Problem  Architecture Decision (with alternatives considered)  Implementation
 Outcome (specific metrics)  What I'd Do Differently (goes under
Lessons Learned or Future Improvements, per 03-domain-model.md §7/§8).
No new section types are introduced — this only shapes how existing sections are written.

# 7. Project Domain Contract

```ts
interface Project {
  slug: string;
  title: string;
  summary: string;

  status: ProjectStatus;

  featured: boolean;

  architectureType: string;

  complexity: ComplexityLevel;

  visibility: Visibility;

  stack: TechStack;

  tags: string[];

  impactMetrics?: string[]; // e.g. ["↓ 60% API latency", "500+ concurrent users"]

  repositoryUrl?: string;

  liveUrl?: string;

  startedAt?: string;

  updatedAt?: string;
}
```

---

# 8. Profile Content

## File

```text
content/profile/profile.ts
```

---

## Schema

```ts
interface Profile {
  name: string;

  title: string;

  location: string;

  email: string;

  summary: string;

  currentFocus: string[];

  githubUrl: string;

  linkedinUrl: string;

  resumeUrl: string;
  highlights: string[];
}
```

---

## Example

```ts
export const profile = {
  name: "Yagnik Varu",

  title: "Backend Engineer",

  location: "India",

  summary:
    "Backend-focused engineer building scalable systems."
};
```

---

# 9. Experience Content

## File

```text
content/experience/experience.ts
```

---

## Schema

```ts
interface Experience {
  company: string;

  role: string;

  startDate: string;

  endDate?: string;

  current: boolean;

  description: string;

  technologies: string[];
}
```

---

# 10. Navigation Content

## File

```text
content/navigation/navigation.ts
```

---

## Schema

```ts
interface NavigationItem {
  label: string;

  href: string;

  visible: boolean;
}
```

---

## Example

```ts
[
  {
    label: "Projects",
    href: "/projects",
    visible: true
  }
]
```

---

# 11. Perspective Content

## File

```text
content/perspectives/perspectives.ts
```

---

## Schema

```ts
type Perspective =
  | "overview"
  | "architecture";
```

---

## Configuration

```ts
interface PerspectiveConfig {
  id: Perspective;

  label: string;

  description: string;
}
```

---

# 12. Technology Stack Schema

## Purpose

Standardize technology representation.

---

## Schema

```ts
interface TechStack {
  frontend: string[];

  backend: string[];

  database: string[];

  infrastructure: string[];

  tools?: string[];
}
```

---

# 13. Visibility Rules

## Public

```ts
visibility: "public"
```

Displayed everywhere.

---

## Hidden

```ts
visibility: "hidden"
```

Not rendered.

---

## Draft

```ts
visibility: "draft"
```

Development only.

---

# 14. Project Sorting Rules

Projects should be sorted by:

```text
Featured First

↓

Updated Date

↓

Title
```

This pattern is commonly used in MDX-driven portfolio systems because metadata drives listing behavior rather than hardcoded ordering. :contentReference[oaicite:1]{index=1}

---

# 15. Content Validation Rules

Every project must validate:

```text
slug

title

summary

status

architectureType

complexity
```

before rendering.

---

## Invalid Content

Invalid content must fail build validation.

---

## Rule

Do not silently ignore invalid content.

---

# 16. Future CMS Compatibility

Future CMS should expose the same contracts.

Example:

```text
MDX

↓

Payload CMS

↓

Strapi

↓

Custom NestJS API
```

Frontend should never know the source.

Only the contract.

---

# 17. Search Index Fields

Project search indexes:

```text
title

summary

tags

technology stack

architecture type
```

---

# 18. Telemetry Content

Telemetry data is not content.

It is runtime-generated.

---

## Sources

Future:

```text
GitHub API

Custom Analytics

Activity Tracking
```

---

# 19. AI Agent Rules

Before creating content:

1. Validate schema.
2. Verify required fields.
3. Follow section structure.
4. Preserve contracts.

---

## Never

Invent metadata fields without updating this document.

---

# 20. Content Schema Summary

The portfolio follows a:

```text
Contract-Driven Content Architecture
```

where:

```text
Content

↓

Schema Validation

↓

Domain Models

↓

UI Rendering
```

Every content source, including future CMS integrations, must conform to these contracts.

This ensures:

- Type Safety
- Predictable Rendering
- Search Compatibility
- Future CMS Migration
- AI-Agent Consistency