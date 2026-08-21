import { z } from "zod";

export const languageMetricSchema = z.object({
  name: z.string(),
  percentage: z.number().min(0).max(100),
});

export const telemetrySchema = z.object({
  provider: z.string(),
  contributions: z.number().min(0),
  repositories: z.number().min(0),
  languages: z.array(languageMetricSchema),
});

export type LanguageMetric = z.infer<typeof languageMetricSchema>;
export type Telemetry = z.infer<typeof telemetrySchema>;

/**
 * Adapter Pattern Contract (docs/07-api-design.md §18)
 * Any telemetry source (GitHub, GitLab, Mock) must conform to this function signature.
 * This ensures the UI remains completely decoupled from the data origin.
 */
export type TelemetryAdapter = () => Promise<Telemetry>;
