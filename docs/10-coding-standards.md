# 10-coding-standards.md

# Coding Standards

## Purpose

This document defines coding standards, architectural rules, and development practices for the portfolio project.

The goals are:

* Maintain consistency
* Improve readability
* Reduce technical debt
* Enable AI-assisted development
* Support long-term maintainability

These standards apply to:

```text
Developers

AI Agents

Future Contributors
```

---

# 1. Engineering Philosophy

## Primary Principle

```text
Readability > Cleverness
```

Code should be easy to understand.

Future maintainers should understand code quickly.

---

## Secondary Principle

```text
Consistency > Personal Preference
```

A consistent codebase is more valuable than individual style preferences.

---

## Third Principle

```text
Simplicity > Abstraction
```

Avoid introducing abstractions before they are needed.

---

## Fourth Principle

```text
Explicit > Magic
```

Prefer code that clearly communicates intent.

---

# 2. Project Philosophy

This portfolio is:

```text
A Product

Not A Demo
```

Every implementation decision should prioritize:

* Maintainability
* Clarity
* Scalability

over showcasing complex patterns.

---

# 3. Architecture Rules

## Rule 1

Domains own business logic.

---

## Rule 2

Features compose domains.

---

## Rule 3

Shared contains reusable utilities only.

---

## Rule 4

UI components should not contain business rules.

---

## Correct Flow

```text
Content

↓

Domain

↓

Feature

↓

UI
```

---

## Incorrect Flow

```text
UI

↓

Business Logic

↓

Content
```

---

# 4. TypeScript Standards

## Strict Mode

Must remain enabled.

---

## Never Use

```ts
any
```

---

## Prefer

```ts
unknown
```

when type is uncertain.

---

## Interface Usage

Use interfaces for:

```ts
Domain Models

API Contracts

DTOs

Configuration Objects
```

---

## Example

```ts
interface Project {
  slug: string;
  title: string;
}
```

---

## Type Usage

Use type for:

```ts
Union Types

Mapped Types

Utility Types
```

---

## Example

```ts
type Perspective = "overview" | "architecture";
```

---

# 5. React Standards

## Component Responsibility

One component should have one responsibility.

---

## Avoid

```ts
Huge Components
```

containing:

* Fetching
* Business Logic
* Rendering
* State Management

all together.

---

## Prefer

Small focused components.

---

## Example

Good:

```text
ProjectCard

ProjectHeader

ProjectMetadata
```

---

Bad:

```text
ProjectEverythingComponent
```

---

# 6. Next.js Standards

## Default

Use Server Components.

---

## Client Components

Only when required.

Examples:

```text
Animations

Event Handlers

Browser APIs

Zustand Store Access
```

---

## Avoid

Adding:

```ts
"use client"
```

without justification.

---

# 7. State Management Standards

## Global State

Use Zustand.

---

## Allowed Global State

```text
Perspective

Theme (Future)

UI Preferences
```

---

## Not Allowed

```text
Project Content

Static Data

Configuration Data
```

These should come from content loaders.

---

## Rule

Prefer local state first.

Global state only when necessary.

---

# 8. Domain Layer Standards

## Purpose

Domains contain business logic.

---

## Example

```text
domains/

project/

perspective/

profile/
```

---

## Domain Responsibilities

Allowed:

```text
Validation

Transformations

Rules

Contracts
```

---

Not Allowed:

```text
Rendering

Styling

Animations
```

---

# 9. Feature Layer Standards

## Purpose

Features compose domains.

---

## Example

```text
features/home

features/projects
```

---

## Allowed

```text
Page Composition

Feature Workflows

Domain Integration
```

---

## Not Allowed

```text
Low-Level Utilities

Global Configuration
```

---

# 10. Shared Layer Standards

## Shared Means Reusable

A component must be reusable in multiple places.

---

## Good Examples

```text
Button

Card

Modal

Container
```

---

## Bad Examples

```text
SpendSyncCard

TelemetrySpecificWidget
```

Those belong to features.

---

# 11. Import Standards

## Use Aliases

Always use:

```ts
@/
```

---

## Example

```ts
import { Project } from "@/domains/project";
```

---

## Avoid

```ts
../../../domains/project
```

---

## Import Order

```ts
External Libraries

↓

Internal Aliases

↓

Relative Imports
```

---

## Example

```ts
import { motion } from "framer-motion";

import { Project } from "@/domains/project";

import "./styles.css";
```

---

# 12. Naming Conventions

## Component Files
Use: `kebab-case.tsx` (e.g., `project-card.tsx`)

## Component Exports
Use: `PascalCase` (e.g., `export function ProjectCard()`)

## Hook Files & Exports
File: `use-*.ts` (e.g., `use-perspective.ts`)
Export: `use*` (e.g., `usePerspective()`)

## Utility Files & Exports
File: `kebab-case.ts` (e.g., `format-date.ts`)
Export: `camelCase` (e.g., `formatProjectDate()`)

---

## Interfaces

Use:

```text
PascalCase
```

Example:

```ts
interface Project {}
```

---

## Constants

Use:

```text
UPPER_SNAKE_CASE
```

Example:

```ts
MAX_PROJECTS
```

---

# 13. Styling Standards

## Styling Solution

```text
Tailwind CSS
```

---

## Rule

Prefer utility classes.

---

## Avoid

Large custom CSS files.

---

## Component Variants

Use:

```text
cva
```

for complex variants.

---

## Example

```text
Button

Badge

Alert
```

---

# 14. Content Standards

## Every Project Must Include

```text
Overview

Architecture

Future Improvements
```

---

## Optional Sections

```text
Database Design

Security

Scaling

Challenges

Lessons Learned
```

---

## Metadata Validation

Required:

```text
slug

title

summary

status

architectureType
```

---

# 15. API Standards

## APIs Return Domain Contracts

Never expose:

```text
MDX Structure

Database Structure

CMS Structure
```

directly.

---

## Example

Good:

```ts
Project
```

---

Bad:

```ts
RawMdxProject
```

---

# 16. Error Handling Standards

## Never Swallow Errors

Bad:

```ts
try {
} catch {}
```

---

## Always Log

Example:

```ts
console.error(error);
```

---

## User Experience

Fail gracefully.

---

# 17. Performance Standards

## Avoid Premature Optimization

Do not optimize before identifying a problem.

---

## Optimize When

```text
Measured

Observed

Verified
```

---

## Focus Areas

```text
Bundle Size

Image Optimization

Rendering Cost
```

---

# 18. Accessibility Standards

Every interactive element must support:

```text
Keyboard Navigation

Focus States

Semantic HTML
```

---

## Rule

Accessibility is not optional.

---

# 19. Testing Standards

## Test Location

```text
tests/

unit/

integration/
```

---

## Unit Tests

Focus on:

```text
Domain Logic

Utilities

Validation
```

---

## Integration Tests

Focus on:

```text
Content Loading

Perspective Flow

Feature Composition
```

---

## Do Not Test

Pure presentation-only markup.

---

# 20. Documentation Standards

Major architectural changes require documentation updates.

---

## Must Update

```text
System Architecture

Domain Model

Repository Structure
```

when affected.

---

## Rule

Documentation should reflect reality.

---

# 21. Git Standards

## Branch Names

Use:

```text
feature/

fix/

refactor/
```

---

## Examples

```text
feature/perspective-switch

fix/project-loader

refactor/content-parser
```

---

## Commit Style

Format:

```text
type(scope): message
```

---

## Examples

```text
feat(project): add project loader

fix(perspective): resolve sync issue

refactor(content): simplify parser
```

---

# 22. AI Agent Rules

## Rule 1

Do not create new domains without approval.

---

## Rule 2

Do not restructure folders automatically.

---

## Rule 3

Do not create abstractions for future assumptions.

---

## Rule 4

Follow existing architecture before introducing new patterns.

---

## Rule 5

When architecture changes:

```text
Update relevant docs
```

before implementation continues.

---

# 23. Refactoring Rules

Refactor when:

```text
Complexity Increases

Duplication Appears

Readability Declines
```

---

## Do Not Refactor

Purely for personal preference.

---

# 24. Future Backend Compatibility

Frontend code should remain compatible with:

```text
MDX

↓

CMS

↓

NestJS API
```

---

## Rule

Depend on contracts.

Not implementations.

---

# Coding Standards Summary

This project follows a:

```text
Pragmatic Engineering
```

approach.

Core values:

```text
Readability

Consistency

Simplicity

Maintainability
```

The goal is to build a portfolio that demonstrates professional engineering practices while remaining approachable, scalable, and AI-agent friendly.
