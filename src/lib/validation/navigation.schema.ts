import { z } from "zod";

export const navigationItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  visible: z.boolean(),
});

export type NavigationItem = z.infer<typeof navigationItemSchema>;
