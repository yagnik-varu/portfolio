import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().optional(),
  current: z.boolean(),
  description: z.string().min(1),
  technologies: z.array(z.string()),
});

export type Experience = z.infer<typeof experienceSchema>;
