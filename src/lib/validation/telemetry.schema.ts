import { z } from "zod";

export const languageMetricSchema = z.object({
  name: z.string(),
  percentage: z.number().min(0).max(100),
});

export const dailyContributionSchema = z.object({
  date: z.string(),
  count: z.number().min(0),
});

export const contributionWeekSchema = z.object({
  contributionDays: z.array(dailyContributionSchema),
});

export const activityEventSchema = z.object({
  id: z.string(),
  type: z.enum(["commit", "pr", "issue", "review"]),
  repository: z.string(),
  description: z.string(),
  timestamp: z.string(),
});

export const telemetrySchema = z.object({
  provider: z.string(),
  contributions: z.number().min(0),
  repositories: z.number().min(0),
  languages: z.array(languageMetricSchema),
  heatmapData: z.array(contributionWeekSchema),
  recentActivity: z.array(activityEventSchema),
});

export type LanguageMetric = z.infer<typeof languageMetricSchema>;
export type DailyContribution = z.infer<typeof dailyContributionSchema>;
export type ContributionWeek = z.infer<typeof contributionWeekSchema>;
export type ActivityEvent = z.infer<typeof activityEventSchema>;
export type Telemetry = z.infer<typeof telemetrySchema>;

/**
 * Adapter Pattern Contract (docs/07-api-design.md §18)
 * Any telemetry source (GitHub, GitLab, Mock) must conform to this function signature.
 * This ensures the UI remains completely decoupled from the data origin.
 */
export type TelemetryAdapter = () => Promise<Telemetry>;
