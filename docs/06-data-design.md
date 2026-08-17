# 06-data-design.md

# Data Design

## Purpose

This document defines how portfolio content is structured, stored, validated, and consumed.

The data design must support:

* MDX-based content
* Future CMS migration
* Future NestJS APIs
* Search and filtering
* Perspective-aware rendering

This document describes the **data model**, not the UI.

---

# 1. Data Design Principles

## Principle 1

Content is the source of truth.

The UI consumes content.

The UI never owns content.

---

## Principle 2

Data structures must remain stable regardless of storage mechanism.

Storage may evolve from:

```text id="p6k7n2"
MDX
    ↓
CMS
    ↓
API
```

The domain contracts should remain unchanged.

---

## Principle 3

Project content should be human-editable.

Developers should be able to update content without touching application logic.

---

## Principle 4

Metadata must be machine-readable.

This enables:

* Search
* Filtering
* Sorting
* CMS migration
* API generation

---

# 2. Content Storage Structure

## Root Structure

```text id="z5m2v8"
content/

├── projects/
│
├── profile/
│
├── perspectives/
│
├── navigation/
│
└── experience/
```

---

# 3. Project Content Storage

## Strategy

Selected Strategy:

```text id="m8v4q7"
Frontmatter
+
Structured Metadata
+
MDX Content
```

---

## Directory Structure

```text id="u7n3m9"
content/

projects/

├── spendsync.mdx
├── techreel-ai.mdx
├── lac-platform.mdx
└── lac-cms.mdx
```

---

## Rule

One Project

=

One MDX File

---

## Benefits

* Easy editing
* Git-friendly
* CMS migration friendly
* Search friendly

---

# 4. Project Schema

## Project Metadata

```ts id="y2q8m4"
interface Project {
  slug: string
  title: string
  summary: string
  status: "active" | "completed" | "paused"
  featured: boolean
  architectureType: string
  complexity: "beginner" | "intermediate" | "advanced" | "production"
  visibility: "public" | "hidden" | "draft"
  stack: {
    frontend: string[]
    backend: string[]
    database: string[]
    infrastructure: string[]
    tools?: string[]
  }
  tags: string[]
  repositoryUrl?: string
  liveUrl?: string
  startedAt?: string
  updatedAt?: string
}
```

---

## Example

```yaml id="q7v2m6"
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

# 5. Project Content Structure

## Standard Content Flow

Every project follows:

```text id="h8n5q3"
Overview
    ↓
Architecture
    ↓
Engineering Sections
    ↓
Future Improvements
```

---

## Example

```md id="f4v7m2"
# Overview

Project details...

# Architecture

Architecture details...

# Database Design

Database details...

# Challenges

Challenges details...

# Future Improvements

Future plans...
```

---

# 6. Engineering Section Schema

## Purpose

Represents technical deep-dive content.

---

## Interface

```ts id="u5m8q1"
interface EngineeringSection {
  type: string

  title: string

  order: number
}
```

---

## Supported Types

```text id="v9n4q6"
database

request-flow

security

scaling

challenges

lessons-learned
```

---

## Future Expansion

Additional types may be introduced without modifying existing projects.

---

# 7. Architecture Artifact Schema

## Purpose

Represents reusable architecture assets.

---

## Interface

```ts id="n7m2q8"
interface ArchitectureArtifact {
  id: string

  type: string

  title: string

  description?: string

  assetPath: string
}
```

---

## Supported Types

```text id="d4v8q1"
system-diagram

database-design

request-flow

module-structure

rbac-design
```

---

# 8. Profile Data Schema

## Storage

```text id="j5m7q4"
content/profile/profile.ts
```

---

## Interface

```ts id="t8n3q6"
interface Profile {
  name: string
  title: string
  location: string
  email: string
  summary: string
  currentFocus: string[]
  githubUrl: string
  linkedinUrl: string
  resumeUrl: string
}
```

---

# 9. Experience Schema

## Storage

```text id="m6q4v9"
content/experience/experience.ts
```

---

## Interface

```ts id="q1n8m4"
interface Experience {
  company: string
  role: string
  startDate: string
  endDate?: string
  current: boolean
  description: string
  technologies: string[]
}
```

---

# 10. Learning Timeline Schema

## Purpose

Represents engineering growth.

---

## Interface

```ts id="r7q2m5"
interface LearningMilestone {
  title: string

  description: string

  date: string
}
```

---

## Example

```text id="v4m8q1"
React

↓

Full Stack

↓

NestJS

↓

System Design

↓

Microservices
```

---

# 11. Perspective Schema

## Storage

```text id="y6q8m2"
content/perspectives/perspectives.ts
```

---

## Interface

```ts id="n4m7q3"
interface Perspective {
  key: string

  label: string

  densityLevel: string

  enabledModules: string[]
}
```

---

## Initial Perspectives

### Overview

```ts id="j9q3m6"
{
  key: "overview",
  densityLevel: "low"
}
```

---

### Architecture

```ts id="z8m5q2"
{
  key: "architecture",
  densityLevel: "medium"
}
```

---

# 12. Navigation Schema

## Storage

```text id="b4q7m9"
content/navigation/navigation.ts
```

---

## Interface

```ts id="h7m2q4"
interface NavigationItem {
  label: string

  href: string

  perspectives: string[]
}
```

---

## Example

```ts id="u3q8m1"
{
  label: "Telemetry",
  href: "/telemetry",
  perspectives: ["architecture"]
}
```

---

# 13. Engineering Module Schema

## Purpose

Controls Architecture Perspective discovery modules.

---

## Interface

```ts id="w9m4q2"
interface EngineeringModule {
  key: string

  title: string

  description: string

  route: string
}
```

---

## Initial Modules

```text id="q2m8v5"
Architecture Lab

Telemetry

Learning Timeline
```

---

# 14. Telemetry Schema

## Purpose

Provides a stable contract for external engineering metrics.

---

## Interface

```ts id="x6q3m8"
interface Telemetry {
  provider: string

  contributions: number

  repositories: number

  languages: LanguageMetric[]
}
```

---

## Language Metric

```ts id="n5m2q7"
interface LanguageMetric {
  name: string

  percentage: number
}
```

---

# 15. Search & Filtering Design

## Search Targets

Projects should be searchable by:

```text id="z7m4q1"
Title

Summary

Technology

Architecture Type

Status
```

---

## Filter Targets

Projects should support filtering by:

```text id="v2m8q6"
Technology

Architecture Type

Featured

Status
```

---

## Example

```text id="p4q7m2"
NestJS

Modular Monolith

Active
```

---

# 16. Perspective-Aware Data Design

## Rule

Perspective never changes data ownership.

---

## Example

Overview Perspective:

```text id="q8m3v1"
Project Summary
```

---

Architecture Perspective:

```text id="m1q7v4"
Project Summary

+

Architecture Information
```

---

## Result

Same data.

Different visibility.

---

# 17. Future CMS Mapping

## Current

```text id="n8q4m2"
MDX Files
```

---

## Future

```text id="x2m7q5"
CMS Entries
```

---

## Mapping Rule

Every MDX metadata field must have a CMS equivalent.

---

## Example

```yaml id="y4m8q3"
title

summary

featured

status

architectureType
```

must become CMS fields.

---

# 18. Future API Contracts

## Current

```text id="t6q2m7"
MDX
```

---

## Future

```text id="w3m8q4"
GET /projects

GET /projects/:slug

GET /profile

GET /telemetry
```

---

## Rule

APIs should return domain models.

Never return raw storage structures.

---

# 19. Validation Strategy

## Metadata Validation

Required:

```text id="v5q8m1"
slug

title

summary

status

architectureType
```

---

## Optional

```text id="m7q2v4"
repositoryUrl

liveUrl

coverImage

endDate
```

---

## Goal

Prevent incomplete project definitions.

---

# 20. Data Evolution Strategy

The data model must support progression:

```text id="r2m8q5"
MDX
    ↓
Content Collections
    ↓
CMS
    ↓
NestJS API
    ↓
Admin Dashboard
```

without redesigning domain contracts.

---

# Data Design Summary

The portfolio data layer is built around:

```text id="k8m4q2"
Structured Metadata

MDX Content

Stable Domain Contracts

Future CMS Compatibility
```

The system treats content as a product asset and ensures all future storage mechanisms conform to the same domain-driven data model.
