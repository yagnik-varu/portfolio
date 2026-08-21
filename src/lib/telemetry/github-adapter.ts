import type { Telemetry, TelemetryAdapter, ContributionWeek, ActivityEvent } from "../validation/telemetry.schema";

export class TelemetryError extends Error {
  constructor(message: string, public readonly cause?: unknown) {
    super(message);
    this.name = "TelemetryError";
  }
}

/**
 * GitHub implementation of the TelemetryAdapter contract.
 * Fetches data via GitHub GraphQL API, transforms it into the Telemetry domain object,
 * and caches the result. It fails predictably if the environment is misconfigured or the API fails.
 */
export const getGithubTelemetry: TelemetryAdapter = async (): Promise<Telemetry> => {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME;

  // Predictable failure if misconfigured
  if (!token || !username) {
    throw new TelemetryError("GitHub token or username is not configured in environment variables.");
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
          totalCount
          nodes {
            name
            pushedAt
            languages(first: 10, orderBy: {field: SIZE, direction: DESC}) {
              edges {
                size
                node {
                  name
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables: { username } }),
      // Basic time-based caching: revalidate every hour to respect rate limits
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      throw new Error(`GitHub GraphQL Error: ${json.errors[0]?.message}`);
    }

    const user = json.data?.user;
    if (!user) {
      throw new Error("User not found in GitHub response.");
    }

    const calendar = user.contributionsCollection?.contributionCalendar;
    const contributions = calendar?.totalContributions ?? 0;
    const repositoriesCount = user.repositories?.totalCount ?? 0;

    // Heatmap data is returned exactly as weeks
    const heatmapData: ContributionWeek[] = (calendar?.weeks || []).map((week: { contributionDays: Array<{ date: string; contributionCount: number }> }) => ({
      contributionDays: week.contributionDays.map((day: { date: string; contributionCount: number }) => ({
        date: day.date,
        count: day.contributionCount,
      })),
    }));

    // Aggregate languages by byte size
    const languageMap = new Map<string, number>();
    let totalSize = 0;

    const recentActivity: ActivityEvent[] = [];
    const repos = user.repositories?.nodes || [];
    for (const repo of repos) {
      for (const edge of repo.languages?.edges || []) {
        const name = edge.node.name;
        const size = edge.size;
        languageMap.set(name, (languageMap.get(name) || 0) + size);
        totalSize += size;
      }
    }

    // Use recent repositories as "recent activity"
    const sortedRepos = [...repos].sort((a, b) => new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime());
    for (let i = 0; i < Math.min(5, sortedRepos.length); i++) {
      const repo = sortedRepos[i];
      recentActivity.push({
        id: `push-${repo.name}-${i}`,
        type: "commit",
        repository: repo.name,
        description: `Pushed to ${repo.name}`,
        timestamp: repo.pushedAt,
      });
    }

    // Calculate percentages and sort
    const allLanguages = Array.from(languageMap.entries())
      .map(([name, size]) => ({
        name,
        percentage: totalSize > 0 ? (size / totalSize) * 100 : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const topLanguages = allLanguages.slice(0, 4);
    const otherLanguages = allLanguages.slice(4);

    if (otherLanguages.length > 0) {
      const otherPercentage = otherLanguages.reduce((sum, lang) => sum + lang.percentage, 0);
      topLanguages.push({ name: "Other", percentage: otherPercentage });
    }

    // Format to 1 decimal place after grouping
    const languages = topLanguages.map(l => ({
      name: l.name,
      percentage: Number(l.percentage.toFixed(1))
    }));

    return {
      provider: "github",
      contributions,
      repositories: repositoriesCount,
      languages,
      heatmapData,
      recentActivity,
    };
  } catch (error) {
    throw new TelemetryError("Failed to fetch or transform GitHub telemetry", error);
  }
};
