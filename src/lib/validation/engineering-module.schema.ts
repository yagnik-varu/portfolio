import { z } from "zod";

export const engineeringModuleSchema = z.object({
  key: z.string(),
  title: z.string(),
  description: z.string(),
  route: z.string(),
});

export type EngineeringModule = z.infer<typeof engineeringModuleSchema>;
