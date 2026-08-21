import type { Telemetry, TelemetryAdapter } from "../validation/telemetry.schema";

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

  // Predictable failure if misconfigured — do not decide on fallbacks here.
  if (!token || !username) {
    throw new TelemetryError("GitHub token or username is not configured in environment variables.");
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
        repositories(first: 100, ownerAffiliations: OWNER, isFork: false, orderBy: {field: PUSHED_AT, direction: DESC}) {
          totalCount
          nodes {
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
      // No external caching libraries needed (AGENT.md §2)
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

    const contributions = user.contributionsCollection?.contributionCalendar?.totalContributions ?? 0;
    const repositories = user.repositories?.totalCount ?? 0;

    // Aggregate languages by byte size
    const languageMap = new Map<string, number>();
    let totalSize = 0;

    for (const repo of user.repositories?.nodes || []) {
      for (const edge of repo.languages?.edges || []) {
        const name = edge.node.name;
        const size = edge.size;
        languageMap.set(name, (languageMap.get(name) || 0) + size);
        totalSize += size;
      }
    }

    // Calculate percentages and sort
    const languages = Array.from(languageMap.entries())
      .map(([name, size]) => ({
        name,
        percentage: totalSize > 0 ? Number(((size / totalSize) * 100).toFixed(1)) : 0,
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5); // Return top 5 languages

    return {
      provider: "github",
      contributions,
      repositories,
      languages,
    };
  } catch (error) {
    // Narrow job: fail clearly. UI layer handles what to do with the failure.
    throw new TelemetryError("Failed to fetch or transform GitHub telemetry", error);
  }
};
