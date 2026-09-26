import { z } from "zod";
import { perspectiveSchema } from "./perspective.schema";

/**
 * Presentation copy for one perspective (docs/14 §11).
 *
 * `id` is the stable internal value used in the store, the URL param and the
 * cookie. `label` is what visitors see ("Recruiter" / "Engineer"), so the
 * wording can change without touching code or breaking shared links.
 */
export const perspectiveConfigSchema = z.object({
  id: perspectiveSchema,
  label: z.string().min(1),
  audience: z.string().min(1),
  description: z.string().min(1),
  unlocks: z.array(z.string().min(1)).min(1),
});

export type PerspectiveConfig = z.infer<typeof perspectiveConfigSchema>;
