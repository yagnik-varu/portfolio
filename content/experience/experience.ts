import type { Experience } from "@/lib/validation/experience.schema";

export const experiences: Experience[] = [
  {
    company: "Prime Apps",
    role: "Backend Engineer",
    startDate: "2024-06",
    endDate: "2026-08",
    current: false,
    description: "Architecting backend services, REST/gRPC APIs, and scalable modular web applications.",
    technologies: ["Node.js", "NestJS", "TypeScript", "PostgreSQL", "Next.js", "Docker", "Redis"],
  },
  {
    company: "Prime Apps",
    role: "Full Stack Developer",
    startDate: "2023-11",
    endDate: "2024-05",
    current: false,
    description: "Built full-stack applications with modular architecture, relational database modeling, and automated pipelines.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "Tailwind CSS", "MongoDB"],
  },
];
