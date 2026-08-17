# 03-domain-model.md

# Domain Model

## Purpose

This document defines the business domains of the portfolio application.

The purpose of the domain model is to establish:

* Core business entities
* Relationships between entities
* Ownership boundaries
* Future extensibility
* CMS compatibility
* API compatibility

This document intentionally avoids UI implementation details.

The domain model must remain stable even if:

* Pages change
* Components change
* Navigation changes
* Styling changes

---

# 1. Domain Overview

The portfolio consists of the following domains:

```text id="yxgbro"
Profile

Perspective

Project

Architecture Artifact

Experience

Learning Timeline

Telemetry

Engineering Module
```

---

# Domain Relationship Map

```text id="d5s11s"
Profile
│
├── Experience[]
│
├── Project[]
│
├── LearningTimeline[]
│
├── Contact
│
└── Resume


Perspective
│
├── Navigation Rules
├── Visibility Rules
└── Engineering Modules


Project
│
├── Overview
├── Architecture
├── Engineering Sections[]
└── Future Improvements


Architecture Artifact
│
├── System Diagram
├── Database Design
├── Request Flow
├── Module Structure
└── RBAC Design


Telemetry
│
├── GitHub Activity
├── Repository Metrics
└── Language Statistics
```

---

# 2. Profile Domain

## Purpose

Represents the owner of the portfolio.

Current Owner:

```text id="xkprsd"
Yagnik Varu
```

---

## Responsibilities

The Profile Domain manages:

* Personal identity
* Professional identity
* Contact information
* Resume information
* Current technical focus

---

## Entity

### Profile

Attributes:

```ts id="f5ep54"
Profile {
  name
  title
  location
  email
  summary
  currentFocus[]
  githubUrl
  linkedinUrl
  resumeUrl
}
```

---

## Example

```text id="hxb0yl"
Name:
Yagnik Varu

Role:
Backend Developer

Focus:
NestJS
System Design
Microservices
```

---

# 3. Perspective Domain

## Purpose

Controls how information is presented.

This is the core differentiator of the application.

---

## Perspectives

Supported Perspectives:

```text id="fkp2rk"
Overview

Architecture
```

---

## Responsibilities

Controls:

* Navigation visibility
* Information density
* Engineering module visibility
* Workspace structure

Does NOT control:

* Project content
* Personal information
* Data ownership

---

## Entity

### Perspective

```ts id="4wmh6x"
Perspective {
  id
  label
  description
}
```

---

## Values

### Overview

```text id="jwd9s8"
Low Density

Recruiter Focus
```

---

### Architecture

```text id="n7wpk7"
Medium Density

Engineering Focus
```

---

# 4. Project Domain

## Purpose

Represents a portfolio project.

This is the most important content domain.

---

## Aggregate Root

### Project

```ts id="syjdgk"
Project {
  slug
  title
  summary
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

## Initial Projects

```text id="8mvq5q"
SpendSync

TechReel AI

LAC Platform

LAC CMS
```

---

# 5. Project Overview

## Purpose

Contains recruiter-focused information.

---

## Entity

```ts id="55s8i4"
ProjectOverview {
  summary

  problem

  solution

  outcome

  keyFeatures[]

  techStack[]
}
```

---

## Audience

```text id="nq34q0"
Recruiters

Founders

Non-Technical Stakeholders
```

---

# 6. Project Architecture

## Purpose

Contains architecture-focused information.

---

## Entity

```ts id="rqn7wm"
ProjectArchitecture {
  summary

  architectureType

  architectureArtifacts[]

  systemDescription
}
```

---

## Example

```text id="f9jj7n"
Monolith

Modular Monolith

Microservice

Event Driven
```

---

# 7. Engineering Section Domain

## Purpose

Provides deep technical exploration.

Not every project must implement every section.

Sections are optional.

---

## Entity

```ts id="z95grg"
EngineeringSection {
  id

  type

  title

  content
}
```

---

## Supported Types

### Database

```text id="tdwtvv"
Database Design

ERD

Relationships
```

---

### Request Flow

```text id="lb3h9l"
API Flow

Sequence Flow

Request Lifecycle
```

---

### Security

```text id="b11apd"
Authentication

Authorization

RBAC
```

---

### Challenges

```text id="u0w0cw"
Problems Faced

Trade-offs

Solutions
```

---

### Scalability

```text id="77l6nr"
Scaling Strategy

Future Architecture

Performance Considerations
```

---

### Lessons Learned

```text id="8mz1dh"
Engineering Insights

Project Learnings
```

---

# 8. Future Improvement Domain

## Purpose

Captures planned evolution.

---

## Entity

```ts id="ztnlkk"
FutureImprovement {
  title

  description

  priority
}
```

---

## Example

```text id="vxvfdz"
Convert Monolith

To

Microservices
```

---

# 9. Architecture Artifact Domain

## Purpose

Represents reusable architecture assets.

Artifacts can be attached to projects.

---

## Entity

```ts id="zazv5x"
ArchitectureArtifact {
  id

  type

  title

  description

  asset
}
```

---

## Artifact Types

### System Diagram

```text id="3w5kdn"
Client
↓
API
↓
Database
```

---

### Module Structure

```text id="ljxvco"
Auth

Expense

Room

Notification
```

---

### Database Design

```text id="j4z9vx"
ERD

Relationships
```

---

### Request Flow

```text id="trwwuq"
Request Lifecycle

Sequence Diagram
```

---

### RBAC Design

```text id="dkh5n8"
Roles

Permissions

Access Matrix
```

---

# 10. Experience Domain

## Purpose

Represents professional experience.

This domain is separate from learning evolution.

---

## Entity

```ts id="f3w3sm"
Experience {
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

# 11. Learning Timeline Domain

## Purpose

Represents engineering growth.

Not employment history.

---

## Entity

```ts id="gfjlwm"
LearningMilestone {
  title

  description

  date
}
```

---

## Example

```text id="apjyrq"
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

# 12. Telemetry Domain

## Purpose

Represents engineering activity metrics.

Initial provider:

```text id="9h5oyf"
GitHub
```

---

## Entity

### Telemetry

```ts id="gn87lb"
Telemetry {
  provider

  metrics[]
}
```

---

## Supported Metrics

### Contribution Activity

```text id="a8fzgx"
Commits

Contribution Graph
```

---

### Repository Metrics

```text id="of7fyo"
Repositories

Stars

Forks
```

---

### Language Metrics

```text id="zb6tgd"
TypeScript

JavaScript

Python
```

---

# 13. Engineering Module Domain

## Purpose

Represents Architecture Perspective workspace modules.

These modules provide discovery paths.

---

## Entity

```ts id="5k8t6g"
EngineeringModule {
  id

  key

  title

  description

  route
}
```

---

## Initial Modules

### Architecture Lab

Purpose:

Architecture exploration.

---

### Telemetry

Purpose:

Engineering activity.

---

### Learning Timeline

Purpose:

Engineering evolution.

---

# 14. Contact Domain

## Purpose

Represents communication channels.

---

## Entity

```ts id="bjjnmn"
Contact {
  email

  github

  linkedin
}
```

---

## Future Expansion

Future versions may include:

```text id="px2d5r"
Contact Form

Message Tracking

CRM Integration
```

---

# 15. Domain Ownership Rules

## Profile Owns

```text id="knnkv0"
Experience

Contact

Resume

Learning Timeline
```

---

## Project Owns

```text id="5w9wzq"
Overview

Architecture

Engineering Sections

Future Improvements
```

---

## Perspective Owns

```text id="mrysn7"
Navigation Rules

Visibility Rules

Enabled Modules
```

---

## Telemetry Owns

```text id="byrmj7"
GitHub Metrics

Repository Metrics

Language Metrics
```

---

# 16. Future Compatibility

This domain model must support future migration to:

```text id="0jq2w7"
MDX
    ↓
Headless CMS
    ↓
NestJS API
    ↓
Admin Dashboard
```

without changing domain ownership.

The domain model should remain the source of truth regardless of storage strategy.

---

# Domain Design Principles

The portfolio is designed around:

```text id="08uzht"
One Developer

Multiple Perspectives

One Project

Multiple Representations

One Content Source

Multiple Presentation Layers
```

This principle must guide all future architectural decisions.
