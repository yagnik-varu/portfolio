import type { Experience } from "@/lib/validation/experience.schema";

export const experiences: Experience[] = [
  {
    company: "Freelance / Independent",
    role: "Backend Engineer",
    startDate: "2023-01",
    current: true,
    description: "Architecting backend services, REST/gRPC APIs, and scalable modular web applications.",
    technologies: ["Node.js", "NestJS", "TypeScript", "PostgreSQL", "Next.js", "Docker", "Redis"],
  },
  {
    company: "Engineering Projects",
    role: "Full Stack Developer",
    startDate: "2022-01",
    endDate: "2022-12",
    current: false,
    description: "Built full-stack applications with modular architecture, relational database modeling, and automated pipelines.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "MongoDB"],
  },
];
