import type { PerspectiveConfig } from "@/lib/validation/perspective-config.schema";

/**
 * The two lenses of the portfolio (docs/02 §2).
 * Order matters: it is the order the toggle and the intro dialog render them.
 */
export const perspectives: PerspectiveConfig[] = [
  {
    id: "overview",
    label: "Recruiter",
    audience: "Recruiters, hiring managers and founders",
    description:
      "A 60-second read: who I am, what I have shipped, the outcomes, and how to reach me.",
    unlocks: [
      "Profile, experience and resume",
      "Project outcomes and tech stack",
      "Direct contact links",
    ],
  },
  {
    id: "architecture",
    label: "Engineer",
    audience: "Engineering managers, senior developers and interviewers",
    description:
      "The same projects, opened up: architecture decisions, trade-offs, deep dives and live GitHub telemetry.",
    unlocks: [
      "Key architecture decisions on every project",
      "Engineering deep dives (data design, request flow, challenges)",
      "Architecture Lab and learning timeline",
      "GitHub telemetry dashboard",
    ],
  },
];
