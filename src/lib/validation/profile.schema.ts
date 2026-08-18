import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  summary: z.string().min(1),
  currentFocus: z.array(z.string()),
  githubUrl: z.string().url(),
  linkedinUrl: z.string().url(),
  resumeUrl: z.string().url(),
});

export type Profile = z.infer<typeof profileSchema>;
