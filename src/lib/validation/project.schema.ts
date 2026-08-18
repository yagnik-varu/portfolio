import { z } from "zod";

export const techStackSchema = z.object({
  frontend: z.array(z.string()),
  backend: z.array(z.string()),
  database: z.array(z.string()),
  infrastructure: z.array(z.string()),
  tools: z.array(z.string()).optional(),
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
  repositoryUrl: z.string().url().optional(),
  liveUrl: z.string().url().optional(),
  startedAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type TechStack = z.infer<typeof techStackSchema>;
export type Project = z.infer<typeof projectSchema>;
