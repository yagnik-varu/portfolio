import * as React from "react";
import { Card } from "@/shared/components/card/card";
import { cn } from "@/lib/utils/cn";
import type { ContributionWeek } from "@/lib/validation/telemetry.schema";

export interface MonthlyContributionChartProps {
  /** Array of contribution weeks from telemetry adapter */
  data: ContributionWeek[];
  /** Optional CSS classes */
  className?: string;
}

export function MonthlyContributionChart({ data, className }: MonthlyContributionChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card className={cn("p-6 flex flex-col gap-4 border-border/80 bg-surface/20", className)}>
        <h3 className="text-sm font-sans font-medium text-text">Monthly Activity</h3>
        <div className="text-sm text-muted">No contribution data available.</div>
      </Card>
    );
  }

  // Aggregate daily counts into monthly buckets
  const monthlyData: Record<string, { label: string, count: number }> = {};

  data.forEach((week) => {
    week.contributionDays.forEach((day) => {
      const date = new Date(day.date);
      // Create a key like "2026-01" to group by month properly sorted
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      
      if (!monthlyData[key]) {
        monthlyData[key] = {
          label: date.toLocaleDateString("en-US", { month: "short" }),
          count: 0
        };
      }
      monthlyData[key].count += day.count;
    });
  });

  // Convert to array and sort chronologically
  const months = Object.keys(monthlyData)
    .sort((a, b) => a.localeCompare(b))
    .map(key => monthlyData[key]);

  // Find max for scaling the bars
  const maxCount = Math.max(...months.map(m => m.count), 1);

  return (
    <Card className={cn("p-6 flex flex-col gap-6 border-border/80 bg-surface/20", className)}>
      <h3 className="text-sm font-sans font-medium text-text">Monthly Activity</h3>
      
      <div className="h-48 flex items-end justify-between gap-1 sm:gap-2 mt-4 relative">
        {months.map((month, idx) => {
          // Calculate height percentage (min 2% so there's always a tiny mark if count > 0)
          const heightPercent = month.count === 0 ? 0 : Math.max((month.count / maxCount) * 100, 2);
          
          return (
            <div key={idx} className="flex flex-col items-center gap-3 flex-1 h-full group">
              {/* Bar Container */}
              <div 
                className="w-full relative flex items-end justify-center h-full rounded-t-sm"
                title={`${month.count} contributions in ${month.label}`}
                role="img"
                aria-label={`${month.count} contributions in ${month.label}`}
              >
                {/* The Bar */}
                <div 
                  className={cn(
                    "w-full rounded-t-sm transition-all duration-500 relative", 
                    month.count > 0 ? "bg-primary-600 group-hover:bg-primary-500" : "bg-transparent"
                  )}
                  style={{ height: `${heightPercent}%` }}
                >
                  {/* Tooltip on hover */}
                  {month.count > 0 && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface px-2 py-1 rounded text-xs font-mono border border-border pointer-events-none whitespace-nowrap z-10 shadow-lg">
                      {month.count}
                    </div>
                  )}
                </div>
              </div>
              
              {/* X-Axis Label */}
              <span className="text-[10px] sm:text-xs font-medium text-muted uppercase tracking-wider">
                {month.label}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
