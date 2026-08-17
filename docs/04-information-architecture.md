# 04-information-architecture.md

# Information Architecture

## Purpose

This document defines:

* Site structure
* Navigation structure
* Page hierarchy
* User journeys
* Perspective-specific discovery paths
* Content access patterns

This document answers:

> Where does information live and how do users discover it?

---

# 1. Information Architecture Principles

## Principle 1

The homepage must tell the complete story.

A visitor should understand:

* Who Yagnik is
* What Yagnik builds
* What technologies are used
* How to contact Yagnik

without visiting additional pages.

---

## Principle 2

Projects are the primary content.

The portfolio exists to showcase:

* Engineering thinking
* Project execution
* Technical depth

Therefore project pages are first-class citizens.

---

## Principle 3

Architecture Perspective reveals deeper discovery paths.

It should feel like:

```text id="o3l5m0"
Additional Workspace Features
```

not:

```text id="qvczqo"
A Different Website
```

---

## Principle 4

Content depth should increase progressively.

```text id="egxg0g"
Homepage
    ↓
Project Page
    ↓
Engineering Deep Dive
```

Users choose how deep they want to explore.

---

# 2. Site Map

```text id="gbjuzf"
/
│
├── Projects
│     ├── /projects
│     └── /projects/[slug]
│
├── Architecture Lab
│     └── /architecture-lab
│
├── Telemetry
│     └── /telemetry
│
└── Contact
```

---

# 3. Site Structure Strategy

## Selected Strategy

```text id="uzr9j2"
Hybrid Portfolio
```

---

## Homepage

Provides:

* Personal introduction
* Featured projects
* Experience preview
* Contact entry point
* Perspective discovery

---

## Dedicated Pages

Reserved for:

* Projects
* Architecture exploration
* Engineering telemetry

This creates:

```text id="wvaz7j"
Fast Discovery
+
Deep Exploration
```

---

# 4. Global Navigation

## Overview Perspective

Navigation:

```text id="sq1u2w"
Home

Projects

Experience

Contact
```

---

## Architecture Perspective

Additional items become available.

Navigation:

```text id="j9i31f"
Home

Projects

Experience

Architecture Lab

Telemetry

Contact
```

---

## Navigation Philosophy

Architecture Perspective expands navigation.

It never replaces navigation.

Users must feel:

```text id="39a7q3"
Capabilities Added
```

rather than:

```text id="6o7oqg"
Navigation Changed
```

---

# 5. Homepage Architecture

## Route

```text id="9go7pn"
/
```

---

## Purpose

Serve as:

* Landing page
* Personal introduction
* Project discovery hub
* Perspective entry point

---

# Homepage Sections

```text id="0quuqt"
Hero

Featured Projects

Experience Preview

Contact CTA
```

---

## Architecture Perspective Additions

When Architecture Perspective is enabled:

```text id="8jjp6y"
Engineering Modules
```

become visible.

---

# Homepage Structure

## Overview Perspective

```text id="18onl4"
Hero

Featured Projects

Experience Preview

Contact CTA
```

---

## Architecture Perspective

```text id="5wthvi"
Hero

Engineering Modules

Featured Projects

Experience Preview

Contact CTA
```

---

# 6. Hero Section

## Purpose

Introduce Yagnik.

---

## Overview Hero

Focus:

* Identity
* Professional role
* Value proposition

---

## Architecture Hero

Focus:

* Engineering identity
* Technical focus
* Current learning direction

---

## Hero Actions

Primary:

```text id="86d9y8"
View Projects
```

Secondary:

```text id="bbg5v0"
Switch Perspective
```

---

# 7. Engineering Module System

## Purpose

Expose Architecture Perspective features.

---

## Placement

Homepage

Directly below Hero.

---

## Initial Modules

### Architecture Lab

Purpose:

Architecture exploration.

---

### Telemetry

Purpose:

GitHub and engineering metrics.

---

### Learning Timeline

Purpose:

Engineering evolution.

---

## Discovery Model

Modules act as workspace entry points.

Example:

```text id="9uikg7"
Architecture Lab

Status: Active

Explore →
```

---

# 8. Projects Listing Page

## Route

```text id="ngpq6z"
/projects
```

---

## Purpose

Display all portfolio projects.

---

## Initial Projects

```text id="9hj0xw"
SpendSync

TechReel AI

LAC Platform

LAC CMS
```

---

## Project Card Structure

Overview Perspective:

```text id="wmqu9q"
Title

Summary

Tech Stack
```

---

Architecture Perspective:

```text id="n4zn3h"
Title

Architecture Available

Inspect Architecture →
```

---

## User Flow

```text id="8umf4w"
Projects
    ↓
Project Card
    ↓
Project Details
```

---

# 9. Project Details Page

## Route

```text id="r3wmfq"
/projects/[slug]
```

---

## Purpose

Serve as a technical case study.

---

## Structure

Selected Strategy:

```text id="vf58qt"
Progressive Sections
```

---

## Flow

```text id="djlwmq"
Overview
    ↓
Architecture
    ↓
Engineering Sections
    ↓
Future Improvements
```

---

# Section 1

## Overview

Contains:

* Project summary
* Problem
* Solution
* Outcome
* Features

Target Audience:

Recruiters

---

# Section 2

## Architecture

Contains:

* Architecture type
* System overview
* Architecture artifacts
* High-level diagrams

Target Audience:

Engineers

---

# Section 3

## Engineering Sections

Contains optional sections.

Possible Sections:

```text id="mdahw0"
Database Design

Request Flow

Security

Challenges

Scalability

Lessons Learned
```

Not every project requires every section.

---

# Section 4

## Future Improvements

Contains:

* Planned enhancements
* Future architecture
* Scaling roadmap

---

# Project Reading Philosophy

Users may stop at any level.

Example:

Recruiter:

```text id="l7k0ee"
Overview Only
```

---

Engineering Manager:

```text id="g8fqzr"
Overview
+
Architecture
```

---

Senior Engineer:

```text id="5g1gzm"
Overview
+
Architecture
+
Engineering Sections
```

---

# 10. Architecture Lab

## Route

```text id="q28y2u"
/architecture-lab
```

---

## Selected Strategy

Single Page

---

## Purpose

Showcase engineering thinking.

---

## Content Types

May include:

```text id="eozq2r"
System Architecture

Database Concepts

Microservice Ideas

Design Explorations

Architecture Notes
```

---

## Goal

Demonstrate:

```text id="7q67kv"
How Yagnik Thinks
```

not just:

```text id="jlwmwt"
What Yagnik Built
```

---

# 11. Telemetry Page

## Route

```text id="d4vtv8"
/telemetry
```

---

## Purpose

Show engineering activity.

---

## Homepage Integration

Homepage provides:

```text id="jlwm1r"
Telemetry Preview
```

---

Clicking preview opens:

```text id="y8wy2l"
/telemetry
```

---

## Content

Possible metrics:

```text id="q2sqw9"
Contribution Graph

Repository Count

Language Usage

Recent Activity
```

---

# 12. Experience Presentation

## Homepage Integration (V1)

In Version 1, Experience is presented as a dedicated section on the homepage:

```text id="w7khcx"
Route: /#experience
```

Navigation items point to `/#experience` with smooth scroll behavior when on the homepage, or navigate back to the homepage anchor from subpages.

---

## Purpose

Quick, high-impact career progression evaluation.

---

## Future Expansion

Future versions may introduce a standalone route:

```text id="e5lv5j"
/experience
```

if content volume or detailed case studies per role grow significantly.

---

# 13. Contact Architecture

## Purpose

Provide low-friction communication.

---

## Methods

```text id="lk4bxu"
LinkedIn

GitHub

Email
```

---

## Placement

Homepage

Navigation

Project Pages

Footer

---

# 14. User Journey Mapping

## Recruiter Journey

```text id="n6ol7f"
Homepage
    ↓
Projects
    ↓
Resume
    ↓
Contact
```

Expected Duration:

30–90 seconds

---

## Engineering Manager Journey

```text id="qfxt4s"
Homepage
    ↓
Architecture Perspective
    ↓
Project
    ↓
Architecture
    ↓
Engineering Sections
```

Expected Duration:

3–10 minutes

---

## Developer Journey

```text id="7xq39r"
Homepage
    ↓
Architecture Perspective
    ↓
Architecture Lab
    ↓
Projects
    ↓
Telemetry
```

Expected Duration:

5–15 minutes

---

# 15. Content Discovery Model

## Overview Perspective

Discovery Priority:

```text id="kp5jll"
Profile

Projects

Experience

Contact
```

---

## Architecture Perspective

Discovery Priority:

```text id="46yvcc"
Engineering Modules

Projects

Architecture Lab

Telemetry

Learning Timeline
```

---

# 16. Future Compatibility

This information architecture must support:

```text id="vxdm5m"
CMS Integration

NestJS Backend

Admin Dashboard

Analytics Platform
```

without restructuring routes.

---

# Final Architecture Principle

The portfolio should behave like:

```text id="r6g9ol"
A Professional Portfolio
```

for recruiters,

while progressively revealing:

```text id="zch57f"
An Engineering Workspace
```

for technical audiences.

The same content should support both journeys through perspective-driven discovery rather than duplicated experiences.
