# 18-project-mdx-template.md

# Project MDX Template Reference

Use this template whenever you are creating a new project case study inside the `content/projects/` directory. 
Make sure you save your files with the `.mdx` extension (e.g., `my-new-project.mdx`).

## The Template

```mdx
---
slug: my-project-slug
title: My Awesome Project
summary: A one-sentence high-level summary of what the project does.
status: active # Options: active, completed, paused
featured: true # Set to true to show on the homepage
architectureType: microservices # e.g. modular-monolith, event-driven, serverless
complexity: advanced # Options: beginner, intermediate, advanced, production
visibility: public # Options: public, hidden, draft
stack:
  frontend:
    - Next.js
    - TypeScript
  backend:
    - Node.js
  database:
    - PostgreSQL
  infrastructure:
    - Docker
    - AWS
tags:
  - backend
  - system-design
impactMetrics:
  - "↓ 40% latency in critical paths"
  - "Handled 1M+ daily active events"
architecture: # Optional but recommended: powers Engineer-mode cards, the Recruiter teaser and Key Decisions
  summary: One or two sentences describing the system shape.
  decisions: # 1-4 short decisions; keep the long reasoning in the # Architecture body below
    - title: Kafka over RabbitMQ
      choice: Event log with replay instead of a routing broker.
      tradeoff: Heavier ops footprint in exchange for replayability.
repositoryUrl: https://github.com/your-username/repo # Optional
liveUrl: https://your-project.com # Optional
---

# Overview

Describe the problem space here. What was the core business or technical issue you were trying to solve? Keep it focused on the "why". 
For example: *Managing distributed state across multiple tenant instances was causing significant data drift and manual reconciliation.*

# Architecture

Describe the "how" here. What patterns did you choose and why?

<ArchitectureCallout title="Decision: Why Kafka over RabbitMQ?">
You can use this custom MDX component to highlight a specific architectural decision, tradeoff, or turning point in your design.
</ArchitectureCallout>

Explain the tradeoffs you evaluated. *We evaluated RabbitMQ but went with Kafka because our primary requirement was event replayability rather than complex routing.*

# Implementation Challenges

Describe the hardest part of building this. What went wrong? How did you debug it?
*We initially faced race conditions when multiple consumers processed the same partition. We resolved this by...*

# Future Improvements

Reflect on the outcome. What did you achieve? If you had to build it again today, what would you do differently?
*The system successfully scaled to 1M events, but in hindsight, I would have extracted the reporting engine into a separate service earlier to avoid memory spikes.*
```

## Parsing Rules (Important!)
Your frontend uses a custom parser (`splitMdxSections`) that strictly looks for the exact H1 headers: `# Overview`, `# Architecture`, and `# Future Improvements`. 
- **Do not change the names of those specific H1 headers.** 
- Any other H1 headers you add (like `# Implementation Challenges` or `# Data Design`) will be grouped automatically under the "Engineering Deep Dive" section on the UI.
