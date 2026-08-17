# 01-project-requirements.md

# Project Requirements Document (PRD)

## Project Name

**Yagnik Portfolio**

Tagline (working):

> One Developer. Two Perspectives.

---

# 1. Product Vision

Build a modern portfolio that serves two different audiences without creating two different websites.

Traditional portfolios only optimize for recruiters.

This portfolio will optimize for:

### Audience 1 — Recruiters

Needs:

* Understand who Yagnik is
* Understand experience
* Review projects quickly
* Access resume
* Contact easily

### Audience 2 — Engineers / Technical Interviewers

Needs:

* Understand engineering thinking
* Understand architecture decisions
* Review technical depth
* Explore project internals
* Evaluate system design knowledge

The website should allow users to switch perspectives and see the same information represented differently.

---

# 2. Core Product Concept

## Perspective System

The portfolio is built around a unique perspective switch.

```text
Overview Perspective
        ↕
Architecture Perspective
```

### Overview Perspective

Target Audience:

* HR
* Recruiters
* Founders
* Non-technical stakeholders

Focus:

* Professional profile
* Experience
* Skills
* Project outcomes
* Contact information

### Architecture Perspective

Target Audience:

* Engineering Managers
* Senior Developers
* Technical Interviewers
* Architects

Focus:

* Architecture diagrams
* Technical decisions
* Engineering timeline
* GitHub telemetry
* System thinking
* Scalability considerations

---

# 3. Product Goals

## Primary Goal

Increase portfolio memorability.

Users should remember:

> "This is the portfolio with the perspective switch."

---

## Secondary Goal

Demonstrate both:

* Full-stack capability
* Backend engineering thinking

without requiring a dedicated backend application.

---

## Tertiary Goal

Create a future-proof architecture that can evolve into:

* CMS-driven content
* NestJS backend
* Admin dashboard
* Analytics platform

without redesigning the UI.

---

# 4. Success Criteria

A visitor should be able to understand:

### Within 15 Seconds

* Who Yagnik is
* Current role
* Main technology stack

### Within 60 Seconds

* Key projects
* Experience level
* Core skills

### Within 3 Minutes

* Engineering maturity
* Architecture knowledge
* Problem-solving ability

---

# 5. Target Users

## Recruiter

Goals:

* Review candidate quickly
* Verify skills
* Download resume
* Contact candidate

Expected Session:

30–90 seconds

---

## Engineering Manager

Goals:

* Review technical capability
* Review project depth
* Review architecture decisions

Expected Session:

3–10 minutes

---

## Developer

Goals:

* Explore projects
* Review architecture
* Learn from implementations

Expected Session:

5–15 minutes

---

# 6. Functional Requirements

## FR-01 Perspective Switch

The application must provide a global perspective switch.

Modes:

```text
Overview
Architecture
```

Requirements:

* Accessible from every page
* Persistent during navigation
* Smooth transitions
* No full page reload

---

## FR-02 Homepage

The homepage must:

* Introduce Yagnik
* Present core value proposition
* Provide navigation to projects
* Surface perspective switch

Default Mode:

```text
Overview
```

---

## FR-03 Project Showcase

The portfolio must support project case studies.

Initial Projects:

* SpendSync
* TechReel AI
* LAC Platform
* LAC CMS

Requirements:

* Dedicated route per project
* SEO-friendly URLs
* Deep-dive architecture support

Example:

```text
/projects/spendsync
```

---

## FR-04 Project Perspectives

Each project must support two representations.

### Overview Representation

Contains:

* Project summary
* Business value
* Features
* Technology stack

### Architecture Representation

Contains:

* High-level architecture
* Engineering challenges
* Technical decisions
* Future scalability plans
* System diagrams

---

## FR-05 Engineering Deep Dive

Every project must support:

```text
Overview
      ↓
Architecture View
      ↓
Engineering Deep Dive
```

Deep Dive sections may include:

* Module Structure
* Request Flow
* Database Design
* Security Considerations
* Future Architecture

---

## FR-06 GitHub Integration

Architecture Mode must provide GitHub insights.

Potential Metrics:

* Commit activity
* Repository count
* Contribution graph
* Primary languages
* Recent activity

Data source:

GitHub APIs

---

## FR-07 Learning Timeline

Architecture Mode must provide an engineering growth timeline.

Example:

```text
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

Purpose:

Show evolution rather than employment history.

---

## FR-08 Architecture Lab

Architecture Mode must expose a dedicated section.

Purpose:

Show:

* System diagrams
* Architecture explorations
* Technical concepts
* Project architecture summaries

---

## FR-09 Contact System

Users must be able to contact Yagnik.

Methods:

* LinkedIn
* GitHub
* Email

Future:

Contact form integration.

---

# 7. Navigation Requirements

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

This must feel like revealing advanced functionality rather than changing the site.

---

# 8. Perspective Transformation Requirements

The transition must feel like:

```text
Changing Perspective
```

not

```text
Switching Websites
```

Requirements:

* Shared visual identity
* Shared content source
* Shared navigation structure
* Progressive transformation

---

## Transformation Duration

Target:

```text
600ms – 900ms
```

---

## Transformation Stages

Stage 1

```text
Perspective Switch Activated
```

Stage 2

```text
Layout Adjustments
```

Stage 3

```text
Technical Information Revealed
```

Stage 4

```text
Engineering Workspace Complete
```

---

# 9. Content Requirements

## No Blog

The initial version will not contain:

* Blog
* Articles
* Notes

Reason:

Focus on project storytelling.

---

## Case Study First

Projects should prioritize:

```text
Problem
↓
Solution
↓
Outcome
```

rather than:

```text
Project
↓
Description
↓
Tech Stack
```

Research on modern engineering portfolios consistently shows that structured case studies and explanation of decisions are more valuable than simple project listings.

---

# 10. Technical Requirements

## Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Framer Motion
* shadcn/ui

These technologies are commonly used in modern portfolio architectures because they provide strong performance, maintainability, and support for content-driven case studies.

---

## Content Layer

Initial Version:

```text
MDX
+
Typed Config Files
```

Reason:

Content remains independent from UI and can later migrate to an API or CMS. This separation is a common recommendation in modern portfolio architectures.

---

# 11. Future Requirements

Future versions may include:

* NestJS Backend
* PostgreSQL
* Admin Dashboard
* Content Management
* Visitor Analytics
* Resume Download Tracking
* Contact Management

The current architecture must not block future adoption of these features.

---

# 12. Non-Functional Requirements

## Performance

Target:

* Lighthouse 90+
* Fast First Paint
* Mobile Optimized

Performance and accessibility are repeatedly identified as key differentiators for engineering portfolios.

---

## Accessibility

Requirements:

* Keyboard navigation
* Proper semantic HTML
* ARIA support
* Motion reduction support

---

## SEO

Requirements:

* Metadata support
* Open Graph support
* Structured data
* Sitemap generation

---

## Maintainability

Requirements:

* Strong TypeScript typing
* Content separated from UI
* Reusable component architecture
* Future CMS compatibility

---

# Out of Scope (V1)

Not included:

* Backend API
* Authentication
* Admin Dashboard
* CMS
* Blog
* User Accounts
* Comments
* Real-time Features

These may be introduced in future versions.
