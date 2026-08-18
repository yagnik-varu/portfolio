import { z } from "zod";

export const perspectiveSchema = z.enum(["overview", "architecture"]);

export type Perspective = z.infer<typeof perspectiveSchema>;
