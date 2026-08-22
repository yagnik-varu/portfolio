import * as React from "react";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";

import { getGithubTelemetry } from "@/lib/telemetry/github-adapter";
import { getMockTelemetry } from "@/lib/telemetry/mock-source";
import type { Telemetry } from "@/lib/validation/telemetry.schema";
import { TelemetryHero } from "@/features/telemetry/components/telemetry-hero";
import { ErrorBoundary } from "@/shared/components/error-boundary/error-boundary";

import { MetricsGrid } from "@/features/telemetry/components/metrics-grid";
import { MonthlyContributionChart } from "@/features/telemetry/components/monthly-contribution-chart";
import { LanguageChart } from "@/features/telemetry/components/language-chart";
import { ActivityFeed } from "@/features/telemetry/components/activity-feed";

export const metadata: Metadata = {
  title: "Telemetry | Architecture Lab",
  description: "Live engineering metrics and activity dashboard.",
};

export default async function TelemetryPage() {
  let telemetry: Telemetry;
  let isFallback = false;

  // LAYER 2: Graceful Degradation (Mock Fallback)
  // If the external adapter fails, we catch it and substitute safe mock data.
  // The page continues rendering instead of 500-ing.
  try {
    telemetry = await getGithubTelemetry();
  } catch (error) {
    // Log the actual error as required by docs/10-coding-standards.md §16
    console.error("TelemetryPage: GitHub adapter failed, falling back to mock data.", error);
    telemetry = await getMockTelemetry();
    isFallback = true;
  }

  const metrics = [
    { id: "repos", label: "Repositories", value: telemetry.repositories },
    { id: "commits", label: "Contributions (Year)", value: telemetry.contributions },
    { id: "active", label: "Top Languages", value: telemetry.languages.length },
    { id: "provider", label: "Data Source", value: telemetry.provider },
  ];

  return (
    <div className="flex flex-col gap-12 pt-8 md:pt-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <TelemetryHero />
        
        {/* Honest Communication Notice if degraded */}
        {isFallback && (
          <div className="flex items-center gap-4 px-4 py-2.5 rounded-lg bg-warning/10 border border-warning/20">
            <span className="text-xs font-semibold text-warning">
              Telemetry Unavailable — showing sample data
            </span>
            <form action={async () => {
              "use server";
              revalidatePath("/telemetry");
            }}>
              <button 
                type="submit"
                className="text-xs font-bold text-text underline decoration-border hover:decoration-text transition-colors px-2 py-1 bg-surface/50 rounded-sm"
              >
                Retry
              </button>
            </form>
          </div>
        )}
      </div>

      {/* LAYER 3: Error Boundary Protection */}
      {/* If any component below throws during render, this catches it and shows a localized fallback UI instead of crashing the page */}
      <ErrorBoundary fallbackMessage="Unable to render the telemetry dashboard components. Please try again later.">
        <div className="flex flex-col gap-8">
          <MetricsGrid metrics={metrics} />

          <MonthlyContributionChart data={telemetry.heatmapData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <LanguageChart languages={telemetry.languages} />
            <ActivityFeed events={telemetry.recentActivity} />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
