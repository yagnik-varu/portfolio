# 12-ui-inventory.md

# UI Inventory

## Purpose

This document defines every screen, section, component, state, and interaction required for Version 1 of the portfolio platform.

The objective is to ensure:

- No missing screens
- No missing components
- No missing states
- Consistent design implementation
- AI-agent friendly development

This document acts as the complete UI scope for the project.

---

# 1. Application Screens

## Public Screens

### Home

Route:

```text
/
```

Purpose:

Primary landing page.

Target Audience:

- Recruiters
- Hiring Managers
- Developers
- Technical Leads

---

### Projects

Route:

```text
/projects
```

Purpose:

Project discovery and filtering.

---

### Project Detail

Route:

```text
/projects/[slug]
```

Purpose:

Project deep dive and technical exploration.

---

### Architecture Lab

Route:

```text
/architecture-lab
```

Purpose:

Dedicated engineering workspace.

---

### Telemetry

Route:

```text
/telemetry
```

Purpose:

Show engineering activity and development metrics.

---

### Not Found

Route:

```text
/404
```

Purpose:

Handle invalid routes.

---

# 2. Global Layout Components

These components are available throughout the application.

---

## Header

### Responsibilities

- Branding
- Navigation
- Perspective Switching

### Contains

- Logo
- Navigation Menu
- Perspective Slider

---

## Footer

### Responsibilities

- Contact Access
- External Links

### Contains

- GitHub
- LinkedIn
- Email
- Resume Download
- Copyright

---

## Perspective Switcher

### Desktop Component
Perspective Segmented Slider

### Mobile Component
Compact High-Contrast Toggle / Drawer Switch

### Responsibilities
Control application perspective.

### States
- `Overview`
- `Architecture`

### Discovery & Interaction Affordances
- First-load pulse/highlight hint
- URL synchronized (`?perspective=overview | architecture`)
- Keyboard toggle (`Shift + P`)
- Animated layout morph

---

# 3. Home Page

## Hero Section

### Purpose
Introduce the developer.

### Content
- Name
- Role
- Headline
- Summary
- Primary CTA: "View Projects"
- Secondary CTA: "Explore Architecture View →"

---

## Current Focus Section

### Purpose
Show active learning and growth.

### Example Topics
- NestJS
- System Design
- Microservices
- Architecture

---

## Featured Projects Section

### Purpose
Highlight important projects.

### Component
Project Card

---

## Experience Section (`/#experience`)

### Purpose
Show career progression, roles, key achievements, and tech stack per company.

### Navigation Anchor
`/#experience`

---

## Engineering Snapshot Section

### Purpose
Quick technical credibility.

### Metrics
- Years Experience
- Projects Built
- Technologies Used
- GitHub Activity

---

## Contact CTA Section

### Purpose
Encourage engagement.

### Actions
- Contact
- Resume
- LinkedIn

---

# 4. Projects Page

## Project Search

### Purpose

Find projects quickly.

### Search Targets

- Title
- Summary
- Technology
- Tags

---

## Filter Bar

### Filters

Technology

Status

Architecture Type

Complexity

---

## Project Grid

### Purpose

Display project cards.

### Layout

Responsive Grid

---

## Empty State

### Trigger

No projects match filters.

### Displays

- Message
- Reset Action

---

# 5. Project Detail Page

## Project Hero

### Displays

- Project Name
- Summary
- Status
- Links
- Technology Stack

---

## Project Overview

### Purpose

Business-level explanation.

### Audience

Recruiters

---

## Technology Stack

### Displays

Frontend

Backend

Database

Infrastructure

Tools

---

## Architecture Section

### Purpose

Technical explanation.

### Visibility

Architecture Perspective

---

## Engineering Details

Possible Sections:

- Architecture
- Request Flow
- Data Flow
- Security
- Scaling
- Challenges
- Lessons Learned

---

## Future Improvements

### Purpose

Show roadmap thinking.

---

# 6. Architecture Lab

## Purpose

Engineering-focused exploration environment.

---

## Module Grid

### Displays

Architecture Modules.

---

## Architecture Module Card

### Displays

- Title
- Description
- Action

---

## Learning Timeline

### Displays

Engineering growth journey.

---

## Engineering Principles

### Displays

Personal engineering beliefs.

---

# 7. Telemetry Page

## Purpose

Show engineering activity.

---

## Contribution Heatmap

### Source

GitHub Activity

---

## Metrics Grid

### Displays

- Repositories
- Contributions
- Languages
- Activity

---

## Activity Timeline

### Displays

Recent development activity.

---

## Language Distribution

### Displays

Technology usage breakdown.

---

# 8. Core Components

## Button

### Variants

- Primary
- Secondary
- Ghost

---

## Card

### Variants

- Default
- Elevated
- Technical

---

## Badge

### Variants

- Technology
- Status
- Architecture

---

## Section Header

### Displays

- Title
- Description

---

## Empty State

### Displays

- Icon
- Message
- Action

---

## Search Input

Reusable search component.

---

## Filter Dropdown

Reusable filter component.

---

## Divider

Reusable section separator.

---

# 9. Project Components

## Project Card

### Overview Mode

Displays:

- Title
- Summary
- Stack
- Status

---

### Architecture Mode

Displays:

- Title
- Summary
- Stack
- Status
- Architecture Type
- Complexity
- View Architecture Action

---

## Technology Badge

Displays:

Technology Name

---

## Architecture Badge

Displays:

Architecture Pattern

---

## Complexity Indicator

Displays:

Project Complexity

### Levels

- Beginner
- Intermediate
- Advanced
- Production

---

# 10. Perspective Components

## Perspective Slider

### Purpose

Switch between perspectives.

### States

Overview

Architecture

---

## Perspective Indicator

### Displays

Current Perspective

---

## Architecture Reveal Panel

### Purpose

Reveal additional technical information.

---

# 11. Telemetry Components

## Contribution Heatmap

GitHub-style contribution graph.

---

## Metric Card

Displays:

Single metric.

---

## Activity Feed

Displays:

Recent activity.

---

## Language Chart

Displays:

Technology distribution.

---

# 12. Navigation Components

## Desktop Navigation

### Displays

- Home
- Projects
- Architecture Lab
- Telemetry

---

## Mobile Navigation

### Displays

Responsive navigation menu.

---

## Active Navigation Indicator

Displays current page.

---

# 13. State Inventory

## Loading State

Required For:

- Projects
- Telemetry
- Search

---

## Empty State

Required For:

- Search
- Filters
- Telemetry

---

## Error State

Required For:

- Telemetry
- Content Loading

---

## Success State

Required For:

Future user actions.

---

# 14. Perspective Transformation Inventory

## Home

### Overview

Recruiter-focused content.

### Architecture

Technical credibility expanded.

---

## Projects

### Overview

Simple project information.

### Architecture

Additional engineering metadata.

---

## Project Detail

### Overview

Business explanation.

### Architecture

System explanation.

---

## Navigation

### Overview

Balanced navigation.

### Architecture

Engineering sections emphasized.

---

## Telemetry

### Overview

Basic metrics.

### Architecture

Expanded engineering metrics.

---

# 15. Motion Inventory

## Perspective Transition

### Type

Morph Transition

---

## Card Expansion

### Type

Progressive Reveal

---

## Page Entry

### Type

Fade + Slide

---

## Hover Interaction

### Type

Subtle Elevation

---

## Metric Animation

### Type

Count-Up Animation

---

# 16. Accessibility Inventory

Every interactive element must support:

- Keyboard Navigation
- Focus States
- Screen Reader Labels
- Reduced Motion Support

---

# 17. Responsive Inventory

## Mobile

Width:

```text
< 768px
```

---

## Tablet

Width:

```text
768px - 1024px
```

---

## Desktop

Width:

```text
> 1024px
```

---

# 18. V1 Deliverables

## Screens

- Home
- Projects
- Project Detail
- Architecture Lab
- Telemetry
- Not Found

---

## Core Systems

- Perspective Transformation
- Search
- Filtering
- Telemetry

---

## UX Requirements

- Responsive
- Accessible
- Fast
- Animated

---

## Performance Requirements

- Lighthouse Score > 90
- Mobile Optimized
- SEO Optimized

---

# UI Inventory Summary

This document defines the complete UI scope for Version 1.

Every screen, component, state, and interaction must originate from this inventory.

New UI structures require updating this document before implementation.

The portfolio should feel like:

```text
Recruiter Portfolio
        +
Engineering Workspace
```

while maintaining a single cohesive design language.