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
};
