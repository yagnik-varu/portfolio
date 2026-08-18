import { z } from "zod";
import { perspectiveSchema } from "./perspective.schema";

export const navigationItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  perspectives: z.array(perspectiveSchema).optional(),
});

export type NavigationItem = z.infer<typeof navigationItemSchema>;
