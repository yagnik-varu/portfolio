# 13-component-architecture.md

# Component Architecture

## Purpose

This document defines the component architecture for the portfolio application.

The goal is to ensure:

- Consistent component ownership
- Clear responsibilities
- Reusable UI patterns
- AI-agent friendly implementation
- Future scalability

This document acts as the source of truth for component design and composition.

---

# 1. Architecture Principles

## Principle 1

Components should have a single responsibility.

---

## Principle 2

Business logic must not live inside UI components.

---

## Principle 3

Reusable components belong in Shared.

---

## Principle 4

Feature-specific components belong inside Features.

---

## Principle 5

Composition is preferred over large monolithic components.

---

# 2. Component Hierarchy

Application follows:

```text
Page

↓

Feature

↓

Feature Components

↓

Shared Components
```

---

## Example

```text
Projects Page

↓

Projects Feature

↓

Project Card

↓

Badge
Button
Card
```

---

# 3. Component Ownership Rules

## Shared Components

Location:

```text
src/shared/components
```

Purpose:

Reusable across multiple features.

---

## Feature Components

Location:

```text
src/features/*/components
```

Purpose:

Specific to a feature.

---

## Domain Components

Not Allowed

Reason:

Domains contain logic.

Not UI.

---

# 4. Shared Component Library

## Button

Path:

```text
shared/components/button
```

Responsibilities:

- Trigger actions
- Support variants

Variants:

- Primary
- Secondary
- Ghost

---

## Card

Path:

```text
shared/components/card
```

Responsibilities:

- Generic content container

Variants:

- Default
- Elevated
- Technical

---

## Badge

Path:

```text
shared/components/badge
```

Responsibilities:

Display labels.

---

## Section Header

Path:

```text
shared/components/section-header
```

Responsibilities:

- Section title
- Section description

---

## Empty State

Path:

```text
shared/components/empty-state
```

Responsibilities:

Display fallback content.

---

## Search Input

Path:

```text
shared/components/search-input
```

Responsibilities:

Reusable search field.

---

## Filter Dropdown

Path:

```text
shared/components/filter-dropdown
```

Responsibilities:

Reusable filtering control.

---

## Container

Path:

```text
shared/components/container
```

Responsibilities:

Page width control.

---

## Cursor Spotlight
Path: `shared/components/cursor-spotlight`
Responsibilities: Render the ambient pointer-follow glow. Mounted once in root layout.

## Kbd Hint
Path: `shared/components/kbd-hint`
Responsibilities: Render a small `<kbd>`-styled badge next to any element that has a keyboard shortcut.

# 5. Layout Components

Location:

```text
shared/components/layout
```

---

## Header

Responsibilities:

- Branding
- Navigation
- Perspective Switch

---

## Footer

Responsibilities:

- Contact
- Social Links
- Resume Access

---

## Navigation

Responsibilities:

Site navigation.

---

## Mobile Navigation

Responsibilities:

Responsive navigation.

---

# 6. Perspective Components

Location:

```text
features/perspective/components
```

---

## Perspective Slider

Responsibilities:

Switch perspectives.

---

## Perspective Indicator

Responsibilities:

Show current perspective.

---

## Architecture Reveal Panel

Responsibilities:

Reveal technical metadata.

---

# 7. Home Components

Location:

```text
features/home/components
```

---

## Hero Section

Responsibilities:

Primary introduction.

---

## Current Focus Section

Responsibilities:

Show current learning goals.

---

## Featured Projects Section

Responsibilities:

Show highlighted projects.

---

## Engineering Snapshot

Responsibilities:

Display credibility metrics.

---

## Contact CTA

Responsibilities:

Lead user to contact action.

---

# 8. Projects Components

Location:

```text
features/projects/components
```

---

# Project Card Architecture

Selected Strategy:

Composition

---

## ProjectCard

Responsibilities:

Compose project information.

Interactions (Dual-Engine Motion Ownership):
- **Framer Motion**: Handles the initial mount and layout spring (`scale` / `y` hover lift).
- **GSAP (`quickTo`)**: Handles the continuous `mousemove` 3D tilt tracking (`rotateX` / `rotateY`). layered over the Framer Motion spring to provide premium depth without layout thrashing.

---

## ProjectCardHeader

Responsibilities:

Display:

- Title
- Status

---

## ProjectCardSummary

Responsibilities:

Display summary.

---

## ProjectCardStack

Responsibilities:

Display technologies.

---

## ProjectCardActions

Responsibilities:

Display:

- View Project
- View Architecture

---

## ProjectArchitecturePanel

Responsibilities:

Display:

- Architecture Type
- Complexity
- Technical Metadata

Visible in:

```text
Architecture Perspective
```

---

# Project Card Composition

```text
ProjectCard

├── ProjectCardHeader
├── ProjectCardSummary
├── ProjectCardStack
├── ProjectArchitecturePanel
└── ProjectCardActions
```

---

# 9. Project Detail Components

Location:

```text
features/project-detail/components
```

---

## Project Hero

Displays:

- Title
- Summary
- Links

---

## Technology Stack Section

Displays:

Project stack.

---

## Overview Section

Displays:

Business explanation.

---

## Architecture Section

Displays:

Technical explanation.

---

## Future Improvements Section

Displays:

Roadmap.

---

# 10. Architecture Lab Components

Location:

```text
features/architecture-lab/components
```

---

## Module Grid

Responsibilities:

Display architecture modules.

---

## Module Card

Responsibilities:

Display module information.

---

## Learning Timeline

Responsibilities:

Display engineering growth.

---

## Engineering Principles

Responsibilities:

Display personal engineering beliefs.

---

# 11. Telemetry Components

Location:

```text
features/telemetry/components
```

---

Selected Strategy:

Widget Architecture

---

## Metric Card

Responsibilities:

Display single metric.

---

## Contribution Heatmap

Responsibilities:

Display Git activity.

---

## Activity Feed

Responsibilities:

Display recent activity.

---

## Language Chart

Responsibilities:

Display language distribution.

---

## Metrics Grid

Responsibilities:

Compose metric cards.

---

# Telemetry Composition

```text
TelemetryPage

├── MetricsGrid
│   └── MetricCard
│
├── ContributionHeatmap
│
├── LanguageChart
│
└── ActivityFeed
```

---

# 12. Perspective Data Flow

Selected Strategy:

Parent Controlled

---

## Rule

Components do not access perspective state directly.

---

## Correct

```tsx
<ProjectCard
  project={project}
  perspective={perspective}
/>
```

---

## Avoid

```tsx
const perspective = usePerspectiveStore();
```

inside every component.

---

## Benefits

- Easier testing
- Predictable rendering
- Better component reuse

---

# 13. Component Props Rules

## Required

Props should be explicit.

---

## Good

```tsx
<ProjectCard
  project={project}
  perspective={perspective}
/>
```

---

## Avoid

Large generic props objects.

---

## Avoid

```tsx
<ProjectCard
  data={everything}
/>
```

---

# 14. State Ownership

## Local State

Allowed For:

- Modals
- Dropdowns
- Hover States

---

## Global State

Allowed For:

- Perspective
- Future Theme

---

## Content State

Not Global

Should come from content loaders.

---

# 15. Component Naming & File Standards

## Component Files
Use: `kebab-case.tsx` (e.g., `project-card.tsx`, `perspective-slider.tsx`)

## Component Exports
Use: `PascalCase` (e.g., `export function ProjectCard()`)

## Hook Files & Exports
File: `use-*.ts` (e.g., `use-perspective.ts`)
Export: `use*` (e.g., `usePerspective()`)

## Utility Files & Exports
File: `kebab-case.ts` (e.g., `format-date.ts`)
Export: `camelCase` (e.g., `formatProjectDate()`)

---

# 16. Component Testing Strategy

## Shared Components

Test:

- Rendering
- Variants
- Accessibility

---

## Feature Components

Test:

- Composition
- Perspective behavior
- Conditional rendering

---

## Avoid

Testing implementation details.

---

# 17. Future Component Expansion

Future additions may include:

```text
Admin Components

CMS Components

Analytics Components
```

---

## Rule

New components must follow ownership rules.

---

# 18. AI Agent Rules

Before creating a component:

1. Check if it belongs in Shared.
2. Check if it belongs in Feature.
3. Avoid creating duplicate UI.
4. Prefer composition over expansion.

---

## Never

Create large "God Components".

---

## Maximum Responsibility Rule

A component should solve one problem.

Not many.

---

# Component Architecture Summary

The portfolio follows a:

```text
Feature-Driven Component Architecture
```

where:

```text
Pages

↓

Features

↓

Feature Components

↓

Shared Components
```

Project Cards use:

```text
Composition Architecture
```

Telemetry uses:

```text
Widget Architecture
```

Perspective state uses:

```text
Parent-Controlled Rendering
```

The result is a scalable, maintainable, and AI-agent-friendly component system that supports future growth without restructuring.