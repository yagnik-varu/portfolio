# 05-system-architecture.md

# System Architecture

## Purpose

This document defines the technical architecture of the portfolio application.

It describes:

* System boundaries
* Application layers
* Data flow
* Content architecture
* Perspective architecture
* Future scalability strategy

This document intentionally focuses on architecture rather than implementation details.

---

# 1. Architecture Goals

The system must:

* Be simple to maintain
* Be content-driven
* Support the Perspective System
* Support future CMS migration
* Support future backend integration
* Remain performant
* Remain SEO friendly

---

# 2. Architecture Principles

## Principle 1

Content is the source of truth.

The UI must consume content.

The UI must never own content.

---

## Principle 2

Perspective controls presentation.

Perspective does not control content.

---

## Principle 3

Domain drives architecture.

Application structure should follow domains.

Not pages.

Not components.

---

## Principle 4

Future backend integration must not require UI redesign.

---

# 3. High-Level Architecture

## Version 1

```text id="e7z5f2"
User
   │
   ▼
Next.js Application
   │
   ▼
Perspective Engine
   │
   ▼
Domain Layer
   │
   ▼
Content Layer (MDX + Config)
```

---

## Request Flow

```text id="g5d2m9"
User
   │
   ▼
Route
   │
   ▼
Feature Layer
   │
   ▼
Domain Layer
   │
   ▼
Content Loader
   │
   ▼
MDX Content
```

---

# 4. Technology Stack

## Frontend

```text id="n1c8v4"
Next.js

TypeScript

Tailwind CSS

shadcn/ui

Framer Motion

GSAP & @gsap/react (See docs/11-design-system.md §15)

Lenis (See docs/11-design-system.md §15)
```

---

## Content

```text id="v4j9y6"
MDX

TypeScript Config Files
```

---

## State Management

```text id="r7f2q1"
Zustand
```

---

## URL Synchronization

```text id="z6m4t8"
Perspective State

↕

URL Query Parameters
```

Example:

```text id="y3b7n5"
/projects/spendsync

/projects/spendsync?perspective=architecture
```

---

# 5. Architectural Layers

## Layer 1

Presentation Layer

Responsibilities:

* Rendering
* User interaction
* Animations
* Accessibility

Examples:

```text id="c8h2v7"
Pages

Components

Layouts
```

---

## Layer 2

Feature Layer

Responsibilities:

* Page composition
* User workflows
* Perspective-aware rendering

Examples:

```text id="w2n6p4"
Home Feature

Projects Feature

Telemetry Feature
```

---

## Layer 3

Domain Layer

Responsibilities:

* Business rules
* Content interpretation
* Perspective rules

Examples:

```text id="f5m8q1"
Profile Domain

Project Domain

Perspective Domain
```

---

## Layer 4

Content Layer

Responsibilities:

* Content storage
* MDX loading
* Configuration management

Examples:

```text id="q3t9r6"
Projects

Profile Data

Perspective Config
```

---

# 6. Domain-Oriented Architecture

## Architecture Strategy

Selected Strategy:

```text id="k7p4d1"
Domain-Oriented Frontend Architecture
```

---

## Structure

```text id="j6w8n2"
src/

domains/

features/

shared/

content/

lib/
```

---

## Why Domain-Oriented?

Benefits:

* Scales better
* Easier maintenance
* CMS migration friendly
* Matches domain model

---

# 7. Perspective Engine

## Purpose

The Perspective Engine is the core architectural feature.

---

## Responsibilities

Controls:

```text id="m2r7v8"
Current Perspective

Navigation Visibility

Module Visibility

Density Rules

Transformation State
```

---

## Does Not Control

```text id="u8f3q6"
Project Data

Content Ownership

Routing
```

---

## Architecture

```text id="v5t1n9"
User
   │
   ▼
Perspective Switch
   │
   ▼
Perspective Store
   │
   ▼
Visibility Rules
   │
   ▼
UI Updates
```

---

# 8. Perspective State Flow

## State Source

```text id="d4k7m3"
Zustand Store
```

---

## Synchronization

```text id="e2v9r1"
Store
   ↕
URL
```

---

## Example

```text id="h7m2q5"
Perspective

Overview

Architecture
```

---

## Benefits

* Shareable URLs
* Refresh persistence
* Analytics support
* Future backend compatibility

---

# 9. Content Architecture

## Strategy

Selected Strategy:

```text id="y8n4p2"
Hybrid Content Architecture
```

---

## Rule

Project content lives in MDX.

System configuration lives in TypeScript.

---

## Structure

```text id="t6w3m8"
content/

projects/

profile/

perspectives/

navigation/
```

---

# 10. Project Content Model

## Strategy

Selected Strategy:

```text id="u1f7q4"
Single Project

=

Single MDX File
```

---

## Example

```text id="z9m5r2"
projects/

spendsync.mdx

techreel-ai.mdx

lac-platform.mdx
```

---

## Why Single File?

Benefits:

* Easier editing
* Easier maintenance
* Easier migration
* Better author experience

---

# 11. Project Content Pipeline

```text id="b4t8n6"
MDX Files (Frontmatter + Markdown)
   │
   ▼
gray-matter / Content Loader
   │
   ▼
Zod Schema Validation (15-content-schema)
   │
   ▼
Project Domain Models
   │
   ▼
Next.js Page (generateStaticParams + Server Component)
   │
   ▼
MDX Remote Compilation (next-mdx-remote + Custom UI Components)
```

---

## Pipeline Stages

### 1. Build-Time Extraction
- Reads MDX files from `content/projects/*.mdx`.
- Parses YAML frontmatter and raw body using `gray-matter`.

### 2. Schema Validation
- Validates frontmatter attributes against Zod schemas matching `15-content-schema.md`.
- Invalid or incomplete content throws a build error with clear diagnostic messages.

### 3. Domain Model Construction
- Transforms validated data into canonical `Project` domain models.
- Prepares slug lists for Next.js `generateStaticParams`.

### 4. Component Mapping & Rendering
- Compiles MDX body using `next-mdx-remote` (or React Server Component native MDX).
- Maps standard markdown elements to styled Design System components (e.g., custom code blocks, architecture callouts, callout cards).

---

## Purpose

Maintain separation between:

```text id="p7r2m4"
Storage (MDX)
     ↕
Domain Contract
     ↕
Presentation (React / Next.js)
```

---

# 12. Routing Architecture

## Public Routes

```text id="n6q1v8"
/

/projects

/projects/[slug]

/architecture-lab

/telemetry
```

---

## Philosophy

Routes represent:

```text id="f8m4q7"
Information Areas
```

not:

```text id="d2w9n5"
Components
```

---

# 13. Homepage Architecture

## Overview Mode

```text id="s5v8m1"
Hero

Featured Projects

Experience Preview

Contact CTA
```

---

## Architecture Mode

```text id="q4n7t2"
Hero

Engineering Modules

Featured Projects

Experience Preview

Contact CTA
```

---

## Rendering Model

Same route.

Same content.

Different perspective rules.

---

# 14. Engineering Module Architecture

## Purpose

Provide technical discovery paths.

---

## Initial Modules

```text id="j1p6m8"
Architecture Lab

Telemetry

Learning Timeline
```

---

## Visibility Rule

```text id="r9v2q4"
Overview

Hidden

Architecture

Visible
```

---

# 15. Telemetry Architecture

## Initial Provider

```text id="w7n3p5"
GitHub
```

---

## Flow

```text id="c6m9q1"
GitHub

   ▼

Telemetry Domain

   ▼

Telemetry Feature

   ▼

UI
```

---

## Future Providers

Possible additions:

```text id="t8v4m7"
GitLab

Custom Analytics

Portfolio Analytics
```

---

# 16. Animation Architecture

## Purpose

Support Perspective Transformation.

---

## Library

```text id="m5n8q3"
Framer Motion
```

---

## Transformation Sequence

```text id="z2p7v6"
Perspective Switch

   ▼

Layout Shift

   ▼

Module Activation

   ▼

Information Expansion

   ▼

Workspace Ready
```

---

## Duration

```text id="x4m9q2"
600ms – 900ms
```

---

# 17. SEO Architecture

## Strategy

Server-first rendering.

---

## Goals

Support:

```text id="v1q6m8"
Search Engines

Social Sharing

Metadata

Open Graph
```

---

## Platform

```text id="p8m4q7"
Next.js App Router
```

---

# 18. Future CMS Migration

## Current

```text id="s7v2m5"
MDX
```

---

## Future

```text id="y6n8q1"
MDX

   ▼

CMS

   ▼

API

   ▼

Admin Dashboard
```

---

## Migration Rule

The UI must consume:

```text id="w3m7q9"
Domain Objects
```

not:

```text id="r4v8n2"
Raw MDX
```

This ensures storage can change without redesigning features.

---

# 19. Future Backend Integration

## Current Architecture

```text id="n5q7m4"
Next.js

   ▼

MDX
```

---

## Future Architecture

```text id="z8m2q6"
Next.js

   ▼

API Layer

   ▼

NestJS

   ▼

PostgreSQL
```

---

## Integration Rule

Frontend contracts must remain unchanged.

Only data providers should change.

---

# 20. Deployment Architecture

## Initial Deployment

```text id="p2v7m9"
Next.js

   ▼

Vercel
```

---

## Content

Bundled with application.

---

## Benefits

* Fast deployment
* Low maintenance
* Excellent performance

---

# 21. System Boundaries

## Inside System

```text id="f7m4q1"
Profile

Projects

Perspective System

Telemetry

Architecture Lab
```

---

## Outside System

```text id="n9v2m8"
CMS

Admin Dashboard

Authentication

Database

Backend APIs
```

These remain future concerns.

---

# Architecture Summary

The portfolio architecture is built around:

```text id="x6m8q4"
Content First

Domain Driven

Perspective Aware

Future Ready
```

The Perspective Engine acts as the central differentiator while the Content Layer remains the source of truth.

This architecture allows the portfolio to evolve from:

```text id="j3v7m2"
MDX Portfolio
```

to

```text id="t5q9m1"
CMS Driven Platform
```

without changing the core domain architecture.
