import type { EngineeringModule } from "@/lib/validation/engineering-module.schema";

export const engineeringModules: EngineeringModule[] = [
  {
    key: "architecture-lab",
    title: "Architecture Lab",
    description: "Interactive system design blueprints, request lifecycle diagrams, and relational database domain boundaries.",
    route: "/architecture-lab",
  },
  {
    key: "telemetry",
    title: "Telemetry",
    description: "Real-time commit telemetry, technology distribution, codebase velocity, and GitHub activity feeds.",
    route: "/telemetry",
  },
  {
    key: "learning-timeline",
    title: "Learning Timeline",
    description: "Chronological milestone timeline tracing the transition from full-stack implementation to backend systems engineering.",
    route: "/architecture-lab#learning-timeline",
  }
];
