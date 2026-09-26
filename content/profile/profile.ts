import type { Profile } from "@/lib/validation/profile.schema";

export const profile: Profile = {
  name: "Yagnik Varu",
  title: "Backend Engineer",
  location: "India",
  email: "yagnik.varu.dev@gmail.com",
  summary: "Backend-focused engineer building scalable systems.",
  currentFocus: ["System Architecture", "Next.js", "NestJS", "N8n"],
  githubUrl: "https://github.com/yagnik-varu",
  linkedinUrl: "https://linkedin.com/in/yagnik-varu-41216a22a",
  resumeUrl: "/resume.pdf",
  highlights: [
    "Built multi-tenant platforms serving 50+ organizations and 10,000+ users",
    "Implemented I-9, E-Verify, compliance, RBAC, SAML SSO workflows",
    "Engineered RabbitMQ workers with retries, event tracking, and DLQs",
    "Mentored 3 junior developers to successful project lead roles",
  ],
  // Engineer-perspective identity (docs/02 §9). Same person, engineering lens.
  engineering: {
    headline: "Backend engineer who designs systems for change",
    philosophy:
      "I start from the domain boundaries and the failure modes, pick the simplest architecture that survives both, and keep every layer replaceable so the system can grow without a rewrite.",
    principles: [
      {
        title: "Simplicity over Abstraction",
        description:
          "Avoid premature optimization and unnecessary abstractions. Don't build for scale you don't have. Clarity and maintainability always win over cleverness.",
      },
      {
        title: "Content is the Source of Truth",
        description:
          "The UI should act purely as a presentation layer that consumes and reflects data, never as the owner of the data itself.",
      },
      {
        title: "Graceful Degradation",
        description:
          "A single failing feature or external service should never take the entire application down. Systems must fail predictably and safely.",
      },
      {
        title: "Domain-Driven Organization",
        description:
          "Organize code and architectures by business capabilities and domain boundaries, not by technical framework constructs or file types.",
      },
    ],
  },
};
