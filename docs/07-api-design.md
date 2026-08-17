# 07-api-design.md

# API Design

## Purpose

This document defines the API contracts of the portfolio platform.

Although Version 1 uses MDX content directly, the application will be designed as if a backend already exists.

This ensures:

* Future NestJS compatibility
* CMS compatibility
* Stable frontend contracts
* Easier migration paths

The frontend should never depend directly on storage implementation.

---

# 1. API Design Principles

## Principle 1

Frontend consumes domain contracts.

Frontend must not consume:

```text id="m5n2q8"
MDX

Database Tables

CMS Structures
```

directly.

---

## Principle 2

Storage may change.

API contracts should remain stable.

Example:

```text id="v7m4q1"
MDX
    ↓
CMS
    ↓
NestJS
```

without frontend redesign.

---

## Principle 3

Project is the aggregate root.

Architecture data belongs to a project.

Engineering data belongs to a project.

Projects should not be fragmented into multiple resources.

---

## Principle 4

Telemetry providers are implementation details.

Frontend consumes telemetry contracts.

Not GitHub APIs.

---

# 2. API Strategy

## Current

```text id="k8m2q4"
MDX Adapter
```

---

## Future

```text id="t6m9q2"
NestJS API Adapter
```

---

## Goal

Frontend service calls remain unchanged.

---

## Example

Current:

```ts id="n3q7m5"
getProjects()
```

loads MDX.

---

Future:

```ts id="r8m4q1"
getProjects()
```

calls:

```http id="w2m7q6"
GET /api/projects
```

---

## Result

UI remains unchanged.

---

# 3. Resource Model

## Resources

```text id="z9m3q7"
Profile

Projects

Experience

Telemetry

Perspective
```

---

## Aggregate Root

Primary aggregate:

```text id="c4m8q2"
Project
```

---

## Why?

A project owns:

```text id="v5m2q9"
Overview

Architecture

Engineering Sections

Future Improvements
```

These should be returned together.

---

# 4. API Versioning

## Version Strategy

```text id="y7m4q3"
/api/v1
```

---

## Examples

```http id="w3m8q6"
GET /api/v1/projects

GET /api/v1/projects/spendsync

GET /api/v1/profile
```

---

## Future

Breaking changes create:

```text id="m8q2v5"
/api/v2
```

---

# 5. Profile APIs

## Get Profile

### Endpoint

```http id="n2m7q4"
GET /api/v1/profile
```

---

### Response

```json id="k6m3q8"
{
  "name": "Yagnik Varu",
  "title": "Backend Engineer",
  "location": "India",
  "email": "contact@example.com",
  "summary": "Backend-focused engineer building scalable systems.",
  "currentFocus": [
    "NestJS",
    "System Design",
    "Microservices"
  ],
  "githubUrl": "https://github.com/...",
  "linkedinUrl": "https://linkedin.com/in/...",
  "resumeUrl": "/resume.pdf"
}
```

---

# 6. Experience APIs

## Get Experience

### Endpoint

```http id="v8m4q1"
GET /api/v1/experience
```

---

### Response

```json id="y5m2q7"
[
  {
    "company": "Company Name",
    "role": "Backend Engineer",
    "startDate": "2024-01-01",
    "endDate": null,
    "current": true,
    "description": "Building microservices and API gateways.",
    "technologies": ["NestJS", "PostgreSQL", "Docker"]
  }
]
```

---

# 7. Project APIs

## Get All Projects

### Endpoint

```http id="n7q4m2"
GET /api/v1/projects
```

---

### Purpose

Provides project listing information conforming to `Project` contract in `15-content-schema.md`.

---

### Response

```json id="k2m8q5"
[
  {
    "slug": "spendsync-v2",
    "title": "SpendSync V2",
    "summary": "Room expense management platform.",
    "status": "active",
    "featured": true,
    "architectureType": "modular-monolith",
    "complexity": "advanced",
    "visibility": "public",
    "stack": {
      "frontend": ["Next.js", "TypeScript"],
      "backend": ["NestJS"],
      "database": ["PostgreSQL"],
      "infrastructure": ["Neon"]
    },
    "tags": ["finance", "room-management", "architecture"],
    "startedAt": "2025-01-01",
    "updatedAt": "2025-06-01"
  }
]
```

---

# 8. Get Single Project

## Endpoint

```http id="t9m4q1"
GET /api/v1/projects/:slug
```

---

## Example

```http id="m5q8v2"
GET /api/v1/projects/spendsync
```

---

## Response

```json id="w8m3q6"
{
  "slug": "spendsync",

  "title": "SpendSync",

  "overview": {},

  "architecture": {},

  "engineeringSections": [],

  "futureImprovements": []
}
```

---

# 9. Project Overview Contract

## Structure

```ts id="q4m7v2"
interface ProjectOverview {
  summary: string

  problem: string

  solution: string

  outcome: string

  keyFeatures: string[]

  techStack: string[]
}
```

---

# 10. Project Architecture Contract

## Structure

```ts id="m2q8v5"
interface ProjectArchitecture {
  architectureType: string

  summary: string

  systemDescription: string

  artifacts: ArchitectureArtifact[]
}
```

---

## Example Types

```text id="n5m4q7"
Modular Monolith

Microservice

Event Driven
```

---

# 11. Engineering Section Contract

## Structure

```ts id="y2m7q4"
interface EngineeringSection {
  type: string

  title: string

  content: string
}
```

---

## Supported Types

```text id="r8m3q6"
database

request-flow

security

scaling

challenges

lessons-learned
```

---

# 12. Future Improvement Contract

## Structure

```ts id="v4m8q2"
interface FutureImprovement {
  title: string

  description: string

  priority: string
}
```

---

# 13. Architecture Artifact Contract

## Structure

```ts id="w7m2q5"
interface ArchitectureArtifact {
  id: string

  type: string

  title: string

  description?: string

  assetUrl: string
}
```

---

## Supported Types

```text id="x5m8q1"
system-diagram

database-design

request-flow

module-structure

rbac-design
```

---

# 14. Telemetry APIs

## Strategy

Frontend never communicates directly with GitHub.

Telemetry providers are hidden behind a contract.

---

# Get Telemetry

### Endpoint

```http id="n4m7q2"
GET /api/v1/telemetry
```

---

### Response

```json id="q8m2v4"
{
  "provider": "github",

  "contributions": 1200,

  "repositories": 15,

  "languages": []
}
```

---

# Future Providers

Possible integrations:

```text id="m3q8v7"
GitHub

GitLab

Portfolio Analytics

Custom Metrics
```

---

## Frontend Impact

Zero.

Contract remains unchanged.

---

# 15. Perspective APIs

## Purpose

Expose Perspective configuration.

---

## Endpoint

```http id="v6m4q8"
GET /api/v1/perspectives
```

---

## Response

```json id="p2m7q5"
[
  {
    "key": "overview",
    "densityLevel": "low"
  },
  {
    "key": "architecture",
    "densityLevel": "medium"
  }
]
```

---

# 16. Error Response Standard

## Purpose

Provide predictable error handling.

---

## Structure

```ts id="z8m4q2"
interface ApiError {
  statusCode: number

  error: string

  message: string

  timestamp: string

  path: string
}
```

---

## Example

```json id="r4m7q8"
{
  "statusCode": 404,

  "error": "Not Found",

  "message": "Project not found",

  "path": "/api/v1/projects/unknown"
}
```

---

# 17. Success Response Strategy

## Collection Responses

Return:

```text id="v3m8q5"
Array
```

---

## Single Resource Responses

Return:

```text id="q6m2v4"
Object
```

---

## Rule

Avoid unnecessary wrappers.

Bad:

```json id="n8m4q7"
{
  "data": {}
}
```

---

Preferred:

```json id="m5q7v2"
{}
```

---

# 18. Adapter Pattern

## Purpose

Decouple frontend from storage.

---

## Current Flow

```text id="w2m8q4"
MDX

    ↓

MDX Adapter

    ↓

Domain Objects

    ↓

UI
```

---

## Future Flow

```text id="k7m4q2"
NestJS API

    ↓

API Adapter

    ↓

Domain Objects

    ↓

UI
```

---

## Result

UI remains unchanged.

---

# 19. Future Admin APIs

Potential future endpoints:

```http id="v8m2q6"
POST /api/v1/projects

PATCH /api/v1/projects/:slug

DELETE /api/v1/projects/:slug
```

---

## Version 1

Read-only.

---

## Future

Authenticated content management.

---

# 20. Future CMS Mapping

Current:

```text id="q4m7v8"
MDX
```

---

Future:

```text id="n2m8q5"
CMS
```

---

## Rule

Every API contract must map directly to CMS content models.

---

# 21. Security Considerations

## Version 1

Public read-only APIs.

No authentication.

---

## Future

Potential additions:

```text id="w5m4q2"
Admin Authentication

Role-Based Access

Content Management
```

---

# API Design Summary

The portfolio API architecture follows:

```text id="m8q2v7"
Storage Agnostic

Domain Driven

Contract First

Future Ready
```

The frontend should always consume domain contracts while adapters hide implementation details.

This enables seamless evolution from:

```text id="t4m7q5"
MDX Portfolio
```

to

```text id="z7m2q8"
CMS + NestJS Platform
```

without changing frontend behavior.
