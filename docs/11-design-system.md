# 11-design-system.md

# Design System

## Purpose

This document defines the visual language, interaction patterns, motion system, and design tokens for the portfolio platform.

The goal is to create a portfolio that communicates:

- Professional engineering capability
- Backend expertise
- System thinking
- Product maturity

while remaining approachable to recruiters.

The design system must support perspective transformation without creating two separate applications.

---

# 1. Design Philosophy

## Core Idea

The portfolio is not a collection of pages.

The portfolio is an adaptive interface.

Users can explore the same information through different perspectives.

---

## Design Principles

### Principle 1

Clarity before decoration.

---

### Principle 2

Information before animation.

---

### Principle 3

Consistency before creativity.

---

### Principle 4

Transformation instead of replacement.

Information should evolve as perspective changes.

---

# 2. Visual Identity

## Selected Strategy

Hybrid Identity

---

## Overview Perspective

Inspired by:

- Linear
- Vercel
- Stripe

Characteristics:

- Clean
- Minimal
- Recruiter Friendly

---

## Architecture Perspective

Inspired by:

- Datadog
- Grafana
- Engineering Dashboards

Characteristics:

- Technical
- Dense
- System Focused

---

## Rule

Both perspectives must feel like the same product.

---

# 3. Color System

## Color Architecture

The entire color system is generated from:

```text
PRIMARY_COLOR
```

---

## Current Primary

```text
#10b981
```

(Emerald)

---

## Important Rule

Components must never depend on:

```text
emerald
blue
purple
```

named colors.

---

## Components Use Tokens

```text
primary
background
surface
border
text
muted
success
warning
danger
```

---

## Generated Scale

```text
primary-50
primary-100
primary-200
primary-300
primary-400
primary-500
primary-600
primary-700
primary-800
primary-900
primary-950
```

---

## Theme Migration Rule

Changing:

PRIMARY_COLOR

must automatically regenerate the entire palette.

No component changes allowed.

---

# 4. Base Theme

## Background

```text
#09090b
```

---

## Surface

```text
#18181b
```

---

## Border

```text
#27272a
```

---

## Foreground

```text
#fafafa
```

---

## Muted

```text
#a1a1aa
```

---

# 5. Typography

## Primary Font

Geist

---

## Technical Font

JetBrains Mono

---

## Usage

Geist:

- Headings
- Paragraphs
- Navigation

---

JetBrains Mono:

- Metrics
- System Information
- Architecture Elements
- Telemetry
- Technical Labels

---

# 6. Perspective Transformation System

## Selected Strategy

Interactive Perspective Slider

---

## States

Overview

↓

Architecture

---

## Purpose

Reveal increasing technical depth.

---

## Rule

Perspective changes:

- Density
- Information
- Navigation emphasis

---

Never:

- Change theme
- Change branding
- Change layout completely

---

# 7. Motion Philosophy

## Selected Strategy

Morph Transition

---

## Goal

Information is revealed.

Not replaced.

---

## Examples

Project Card

↓

Expanded Metadata

↓

Architecture Information

---

## Rule

Motion communicates state changes.

Motion should never exist for decoration only.

---

# 8. Project Card System

## Overview State

Displays:

- Title
- Summary
- Stack
- Status

---

## Architecture State

Displays:

- Title
- Summary
- Stack
- Status
- Architecture Type
- Complexity Indicator
- Architecture Entry Point

---

## Rule

Same card.

More information.

---

# 9. Engineering Workspace

## Purpose

Dedicated architecture exploration environment.

---

## Modules

Architecture Lab

Telemetry

Learning Timeline

System Thinking

---

## Rule

Feels like a developer workspace.

Not a portfolio section.

---

# 10. Layout System

## Content Width

Readable by default.

---

## Density

Overview:

Low Density

---

Architecture:

Medium Density

---

## Rule

Do not create entirely different layouts.

Only increase information density.

---

# 11. Accessibility

All interactions must support:

- Keyboard Navigation
- Visible Focus States
- Screen Readers
- Reduced Motion Preferences

---

# 12. Future Theme Support

Future themes should be possible by changing:

PRIMARY_COLOR

only.

---

## Examples

Emerald

↓

Blue

↓

Purple

↓

Orange

---

## Rule

No component refactoring required.

---

# 13. Motion System

## Entrance Animations (Page Load)

Word-level stagger entrance is used for primary headings (Hero H1) on initial page load only.
It does NOT replay on perspective switch — the heading is the stable identity anchor.

Stagger delay between words: 80ms
Word animation: opacity 0→1, y 20→0, duration 500ms, ease [0, 0, 0.2, 1]

## Perspective Transition Animation

Exit: opacity 1→0, y 0→-16px, filter blur 0→6px — duration 180ms, ease [0.4, 0, 1, 1] (fast ease-in)
Enter: opacity 0→1, y 24→0px, filter blur 8px→0 — duration 350ms, delay 100ms, ease [0, 0, 0.2, 1] (ease-out)
Total round-trip: ~630ms (within 600-900ms spec from §02-05)

## Perspective Toggle (Desktop)

Pill movement: Framer Motion layout spring — stiffness 400, damping 30
This creates a physically weighted, elastic feel that communicates "shift" not "jump".

## Badge / List Stagger (Architecture Mode)

Stagger delay between items: 40ms
Item animation: opacity 0→1, y 12→0, duration 300ms, ease [0, 0, 0.2, 1]
Used for: tech focus badges, engineering module cards, architecture tags.

## Scroll-Linked Depth (Header)

At Y=0: no shadow, border-bottom always visible
At Y=80px: box-shadow 0 4px 24px -4px rgba(0,0,0,0.5)
Interpolated linearly via Framer Motion useTransform.

## Navigation Underline (CSS Only)

Underline slides in from left on hover/active — transform: scaleX(0→1), transform-origin: left
Duration: 250ms, ease: ease
This is pure CSS — no JS runtime cost.

## Accessibility Rule

All motion must respect prefers-reduced-motion.
All Framer Motion components must check useReducedMotion() and short-circuit to instant state.
CSS animations in globals.css already handle this via the @media (prefers-reduced-motion: reduce) block.

---

## 14. Ambient Interaction Layer

### Spotlight Cursor
- Radial gradient, primary-500 @ 15% opacity, ~400px radius
- Follows pointer via CSS custom properties (--cursor-x, --cursor-y), updated in a single top-level listener
- Disabled entirely on touch devices and when prefers-reduced-motion is set

### Spring Hover Physics (Card, Button)
- whileHover: scale 1.02, y -4px
- whileTap: scale 0.98
- Spring: stiffness 300, damping 20
- Reuses the same spring family already defined for the Perspective Toggle (§13)

### Surface Noise Texture
- SVG feTurbulence, 2–3% opacity, applied as a fixed background layer
- No image asset, no new dependency

### Gradient Text Token
- --gradient-hero: linear-gradient(135deg, var(--foreground), var(--primary-400))
- Reserved for: Hero name, at most one section title per page — never used for body text

---
## Perspective Typography Rule
When Architecture perspective is active, section labels, metric values, and
timestamps switch to JetBrains Mono (font-mono). Headings and body copy stay
on Geist in both perspectives. This is a class toggle driven by perspective
state — not a font swap at the theme level.

## 15. Dual-Engine Motion Ownership

TODO: Add ownership matrix details here.

# Design System Summary

The portfolio uses a perspective-driven design system where:

Overview

↓

Architecture

reveals increasing technical depth while preserving a single visual identity.

The entire design system is powered by tokenized colors and generated palettes, allowing future rebranding through a single primary color change.