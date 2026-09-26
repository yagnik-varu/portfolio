import { z } from "zod";

export const techStackSchema = z.object({
  frontend: z.array(z.string()),
  backend: z.array(z.string()),
  database: z.array(z.string()),
  infrastructure: z.array(z.string()),
  tools: z.array(z.string()).optional(),
});

/**
 * A single, short architecture decision. Long-form reasoning stays in the MDX
 * body (`# Architecture` + <ArchitectureCallout />); this is the scannable
 * version used on project cards, the Recruiter-mode teaser and the
 * "Key Decisions" grid.
 */
export const architectureDecisionSchema = z.object({
  title: z.string().min(1),
  choice: z.string().min(1),
  tradeoff: z.string().min(1),
});

export const projectArchitectureSchema = z.object({
  summary: z.string().min(1),
  decisions: z.array(architectureDecisionSchema).min(1).max(4),
});

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  status: z.enum(["active", "completed", "paused"]),
  featured: z.boolean().default(false),
  architectureType: z.string().min(1),
  complexity: z.enum(["beginner", "intermediate", "advanced", "production"]),
  visibility: z.enum(["public", "hidden", "draft"]).default("public"),
  stack: techStackSchema.optional(),
  tags: z.array(z.string()).optional(),
  impactMetrics: z.array(z.string()).optional(),
  // Optional so existing case studies keep building; UI falls back to
  // architectureType + complexity when absent.
  architecture: projectArchitectureSchema.optional(),
  repositoryUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  startedAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type TechStack = z.infer<typeof techStackSchema>;
export type ArchitectureDecision = z.infer<typeof architectureDecisionSchema>;
export type ProjectArchitecture = z.infer<typeof projectArchitectureSchema>;
export type Project = z.infer<typeof projectSchema>;
