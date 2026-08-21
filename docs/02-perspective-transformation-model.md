# 02-perspective-transformation-model.md

# Perspective Transformation Model

## Purpose

This document defines how the portfolio transforms between perspectives.

The transformation system is the core product differentiator and must be treated as a product feature rather than a UI theme.

The goal is to allow different audiences to explore the same developer through different lenses.

---

# 1. Core Philosophy

## Principle

The website must always communicate:

> Same Developer. Same Projects. Same Data. Different Perspective.

The transformation must never feel like switching between two separate websites.

---

## What Changes

The following elements may change:

* Information density
* Layout structure
* Navigation depth
* Visual organization
* Discovery paths
* Engineering visibility

---

## What Never Changes

The following elements remain constant:

* Brand identity
* Color palette
* Project data
* Personal profile
* Content source
* Routes
* URLs

---

# 2. Perspective Definitions

## Overview Perspective

Target Audience:

* Recruiters
* HR
* Founders
* Non-technical stakeholders

Primary Goal:

Quickly evaluate the candidate.

Focus Areas:

* Professional profile
* Experience
* Project outcomes
* Skills
* Resume access
* Contact information

Expected Session Duration:

30–90 seconds

---

## Architecture Perspective

Target Audience:

* Engineering Managers
* Senior Developers
* Technical Interviewers
* Architects

Primary Goal:

Evaluate technical depth and engineering thinking.

Focus Areas:

* Architecture
* System design
* Technical decisions
* Engineering growth
* GitHub activity
* Technical project exploration

Expected Session Duration:

3–15 minutes

---

# 3. Perspective Entry Model

## Default Perspective

The website always loads in:

```text
Overview Perspective
```

Reason:

Most visitors are recruiters or first-time visitors.

---

## Perspective Discovery

The homepage and global header must surface the Perspective System immediately:

* **Header Placement**: Visible in the global navigation bar on all pages.
* **First-Visit Affordance**: Subtle highlight/pulse animation on the perspective control during the first user session to signal interactivity.
* **Hero Section CTA**: An explicit callout in the homepage Hero:
  ```text
  Viewing: Overview Mode
  [ Explore Architecture Perspective → ]
  ```
* **Mobile Discovery**: On compact screens (< 768px), the slider adapts into an accessible, high-contrast segmented control or quick-toggle in the sticky mobile navigation.
* **Keyboard Shortcut**: Power users can toggle perspectives with `Shift + P`.

---

# 4. Perspective Switch Component

## Component Type

Desktop:
```text
Interactive Perspective Slider / Segmented Control
```

Mobile:
```text
Compact Perspective Toggle
```

---

## Purpose

The component should communicate:

```text
Perspective Shift
```

not:

```text
Theme Change
```

---

## Example Structure

```text
Perspective: [ Overview | Architecture ]
```

---

## User Expectations

When interacting with the slider users should expect:

* Additional context
* Additional information
* Additional engineering depth

The user should not expect:

* Different branding
* Different website
* Different content source

---

# 5. Transformation Timeline

## Duration

Target:

```text
600ms – 900ms
```

---

## Stage 1

Perspective Activated

Duration:

100ms

Actions:

* Slider movement
* Transition initialization

---

## Stage 2

Workspace Transformation

Duration:

200ms–300ms

Actions:

* Layout adjustments
* Panel activation
* Grid appearance

---

## Stage 3

Information Expansion

Duration:

200ms–300ms

Actions:

* Engineering modules appear
* Navigation expands
* Additional context becomes visible

---

## Stage 4

Architecture Workspace Ready

Duration:

100ms–200ms

Actions:

* Technical modules become interactive
* Engineering discovery features become available

---

## Implementation Reference

The 4-stage model maps to the following Framer Motion parameters in
`src/features/perspective/components/perspective-transition.tsx`:

* **Stage 1 (100ms)**: Zustand store update triggers React re-render. `AnimatePresence` detects key change and begins exit animation.
* **Stage 2 (180ms)**: Content exits — `opacity 1→0`, `y 0→-16px`, `filter blur 0→6px`. Ease: `cubic-bezier(0.4, 0, 1, 1)` — fast ease-in communicates "pulled away".
* **Stage 3 (350ms, delay 100ms)**: New content enters — `opacity 0→1`, `y 24px→0`, `filter blur 8px→0`. Ease: `cubic-bezier(0, 0, 0.2, 1)` — spring-like ease-out communicates "settling into place".
* **Stage 4 (100ms)**: `useReducedMotion` check ensures instant fallback is always active. State is never gated behind animation completion.

Total: ~630ms — within the 600–900ms target.

---

## GSAP Flip Layout Morph (The Hardware-Accelerated Accordion)

To prevent expensive layout thrashing when sections (like Engineering Modules) appear or disappear, the physical shifting of the page is orchestrated via GSAP Flip:

1. **State Interception:** The global Zustand store intercepts `setPerspective` calls to trigger `Flip.getState()` *before* React renders the new state.
2. **Instant Collapse:** Framer Motion layout changes (e.g. `height` from `auto` to `0` on exit) are configured to happen instantaneously with `duration: 0`, rather than being animated.
3. **Smooth Translation:** After React updates the DOM, `requestAnimationFrame` triggers `Flip.from()`. The sibling sections that instantly snapped to new positions are smoothly animated via hardware-accelerated `transform: translateY` to their new locations.
4. **Visual Overlap:** Because the exiting elements collapse their layout space instantly but remain visible (`overflow: visible`) as they fade out, the lower page sections smoothly slide *over* them, creating a premium cross-fade morph effect.

---

# 6. Visual Language Transformation

## Color System

Decision:

```text
Shared Color Palette
```

Both perspectives use the same design system.

---

## Rationale

Users should feel:

```text
Same Product
```

instead of:

```text
Different Theme
```

---

## Overview Visual Style

Characteristics:

* Spacious
* Minimal
* Premium
* Clean

Visual Focus:

* Readability
* Simplicity
* Scannability

---

## Architecture Visual Style

Characteristics:

* Structured
* Layered
* Technical
* System-oriented

Visual Focus:

* Exploration
* Discovery
* Engineering context

---

## Visual Enhancements

Architecture Perspective may introduce:

* Subtle grid overlays
* Workspace panels
* System cards
* Information groupings

The interface must remain professional and never resemble:

* Hacker terminals
* Cyberpunk dashboards
* Fictional operating systems

---

# 7. Navigation Transformation Model

## Overview Navigation

```text
Home
Projects
Experience
Contact
```

---

## Architecture Navigation

Additional navigation becomes available.

```text
Home
Projects
Experience
Architecture Lab
Telemetry
Contact
```

---

## Navigation Philosophy

Architecture Perspective should feel like:

```text
Additional Capabilities Unlocked
```

not:

```text
Navigation Replaced
```

---

# 8. Homepage Transformation Model

## Overview Homepage

Focus:

* Personal introduction
* Experience
* Projects
* Contact

Primary Goal:

Fast evaluation.

---

## Architecture Homepage

Focus:

* Engineering profile
* Architecture discovery
* GitHub telemetry
* Learning evolution
* Technical exploration

Primary Goal:

Technical evaluation.

---

# 9. Hero Transformation Model

## Overview Hero

Contains:

* Name
* Role
* Short introduction
* Primary call-to-action

Example:

```text
Yagnik Varu

Backend & Full Stack Developer

Building scalable applications.
```

---

## Architecture Hero

Contains:

* Name
* Engineering role
* Current technical focus
* Supporting engineering modules

Example:

```text
Yagnik Varu

Backend Engineer

Current Focus:
- Microservices
- System Design
- Distributed Systems
```

---

## Hero Philosophy

The hero must remain professional.

Avoid:

* Boot sequences
* Fake terminal effects
* Artificial system startup screens

---

# 10. Engineering Module System

## Purpose

Expose engineering-specific content without overwhelming users.

---

## Module Type

Architecture Perspective introduces:

```text
Engineering Modules
```

These modules act as workspace entry points.

---

## Initial Modules

### Architecture Lab

Purpose:

Explore system architecture and project structures.

---

### Telemetry

Purpose:

Display GitHub activity and engineering metrics.

---

### Learning Timeline

Purpose:

Display engineering evolution and technical growth.

---

# 11. Project Transformation Model

## Core Rule

Projects must never duplicate content.

There must be:

```text
One Project
```

with

```text
Multiple Representations
```

---

## Overview Representation

Focus:

* What was built
* Why it matters
* Key features
* Technology stack

---

## Architecture Representation

Focus:

* Architecture availability
* Technical depth
* Engineering exploration

---

## Project Card Behavior

Architecture Perspective does not automatically expand project content.

Instead it provides a discovery mechanism.

Example:

```text
SpendSync

Architecture Available

[ Inspect Architecture ]
```

---

# 12. Engineering Deep Dive Model

## Entry Point

Every project supports:

```text
Overview
    ↓
Architecture View
    ↓
Engineering Deep Dive
```

---

## Deep Dive Scope

May include:

* System Architecture
* Module Structure
* Request Flow
* Database Design
* RBAC Design
* Scaling Considerations
* Technical Challenges
* Future Improvements

---

## Location

Deep technical information exists only inside project pages.

It must not overload:

* Homepage
* Navigation
* Global UI

---

# 13. Information Density Model

## Overview Perspective

Information Density:

```text
Low
```

Focus:

* Quick understanding
* Fast scanning

---

## Architecture Perspective

Information Density:

```text
Medium
```

Focus:

* Exploration
* Technical discovery

---

## Deep Dive Pages

Information Density:

```text
High
```

Focus:

* Engineering evaluation
* Technical analysis

---

# 14. Transformation Success Criteria

The transformation is successful when:

### Recruiters

Can ignore Architecture Perspective and still understand the portfolio.

---

### Engineers

Can enter Architecture Perspective and discover meaningful technical depth.

---

### All Visitors

Understand that:

```text
The portfolio changed perspective,
not identity.
```

---

# 15. Future Compatibility

The transformation system must support future additions:

* CMS Integration
* NestJS Backend
* Admin Dashboard
* Analytics
* Dynamic Content

without requiring redesign of the Perspective System.

The Perspective System is a permanent architectural feature of the product.
