import type { Profile } from "@/lib/validation/profile.schema";

export const profile: Profile = {
  name: "Yagnik Varu",
  title: "Backend Engineer",
  location: "India",
  email: "yagnik.varu.dev@gmail.com",
  summary: "Backend-focused engineer building scalable systems.",
  currentFocus: ["System Architecture", "Next.js", "NestJS"],
  githubUrl: "https://github.com/yagnik-varu",
  linkedinUrl: "https://linkedin.com/in/yagnik-varu-41216a22a",
  resumeUrl: "/resume.pdf",
  highlights: [
    "Scaled a Node.js microservice from 0 to 5,000 requests/sec",
    "Reduced database query latency by 45% using materialized views",
    "Architected event-driven pipelines processing 1M+ daily events",
    "Mentored 3 junior engineers to successful project lead roles",
  ],
};
