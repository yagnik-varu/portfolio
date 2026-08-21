import type { Telemetry, TelemetryAdapter, ContributionWeek } from "../validation/telemetry.schema";

/**
 * A static mock implementation of the TelemetryAdapter contract.
 * Serves as an interchangeable source to build/test the UI without external API dependencies,
 * and acts as a safe fallback when external APIs fail.
 */
export const getMockTelemetry: TelemetryAdapter = async (): Promise<Telemetry> => {
  // Simulate network delay to ensure the UI gracefully handles loading states
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Generate realistic week-by-week mock heatmap data
  const heatmapData: ContributionWeek[] = [];
  const today = new Date();
  
  for (let w = 0; w < 52; w++) {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - (51 - w) * 7);
    
    heatmapData.push({
      contributionDays: Array.from({ length: 7 }).map((_, d) => {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + d);
        return {
          date: date.toISOString().split("T")[0],
          count: Math.floor(Math.random() * 5),
        };
      })
    });
  }

  return {
    provider: "mock-static-data",
    contributions: 1337,
    repositories: 42,
    languages: [
      { name: "TypeScript", percentage: 65.5 },
      { name: "Python", percentage: 20.0 },
      { name: "Go", percentage: 10.5 },
      { name: "Rust", percentage: 4.0 },
    ],
    heatmapData,
    recentActivity: [
      {
        id: "1",
        type: "pr",
        repository: "spendsync-v2",
        description: "Merged PR #42: Implement RBAC layer for organization workspaces",
        timestamp: new Date().toISOString(),
      },
      {
        id: "2",
        type: "commit",
        repository: "portfolio-nextjs",
        description: "refactor: isolate perspective transition engine",
        timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      },
      {
        id: "3",
        type: "review",
        repository: "techreel-ai",
        description: "Approved PR #12: AWS S3 video streaming pipeline",
        timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ],
  };
};
