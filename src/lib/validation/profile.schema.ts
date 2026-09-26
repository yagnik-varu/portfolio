import { z } from "zod";

export const engineeringPrincipleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

/**
 * Engineer-perspective identity. The Recruiter perspective reads `title`,
 * `summary` and `highlights`; the Engineer perspective reads this block.
 * Same person, different lens (docs/02 §9).
 */
export const engineeringProfileSchema = z.object({
  headline: z.string().min(1),
  philosophy: z.string().min(1),
  principles: z.array(engineeringPrincipleSchema).min(3).max(6),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  summary: z.string().min(1),
  currentFocus: z.array(z.string()),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  resumeUrl: z.string().url().optional(),
  highlights: z.array(z.string()).optional(),
  engineering: engineeringProfileSchema.optional(),
});

export type Profile = z.infer<typeof profileSchema>;
export type EngineeringPrinciple = z.infer<typeof engineeringPrincipleSchema>;
export type EngineeringProfile = z.infer<typeof engineeringProfileSchema>;
