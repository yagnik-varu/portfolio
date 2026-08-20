import { z } from "zod";

export const learningMilestoneSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
});

export type LearningMilestone = z.infer<typeof learningMilestoneSchema>;
