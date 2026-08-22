import * as React from "react";
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
      <div className={cn("p-6 sm:p-8 flex flex-col gap-4 rounded-2xl border border-white/5 bg-surface/30", className)}>
        <h3 className="text-xl font-bold font-sans text-text">Monthly Activity</h3>
        <div className="text-sm text-muted">No contribution data available.</div>
      </div>
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
    <div className={cn("relative p-6 sm:p-8 flex flex-col gap-8 rounded-2xl border border-white/5 bg-surface/30 hover:border-white/10 transition-colors duration-500 overflow-hidden", className)}>
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] pointer-events-none rounded-full" />
      
      <h3 className="relative z-10 text-xl font-bold font-sans text-text">Monthly Activity</h3>
      
      <div className="h-48 sm:h-56 flex items-end justify-between gap-1.5 sm:gap-3 relative z-10">
        {months.map((month, idx) => {
          // Calculate height percentage (min 2% so there's always a tiny mark if count > 0)
          const heightPercent = month.count === 0 ? 0 : Math.max((month.count / maxCount) * 100, 2);
          
          return (
            <div key={idx} className="flex flex-col items-center gap-3 flex-1 h-full group">
              {/* Bar Container */}
              <div 
                className="w-full relative flex items-end justify-center h-full rounded-t-md"
                title={`${month.count} contributions in ${month.label}`}
                role="img"
                aria-label={`${month.count} contributions in ${month.label}`}
              >
                {/* The Bar */}
                <div 
                  className={cn(
                    "w-full rounded-t-md transition-all duration-500 relative", 
                    month.count > 0 
                      ? "bg-gradient-to-t from-primary/20 to-primary/60 group-hover:from-primary/40 group-hover:to-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]" 
                      : "bg-white/5"
                  )}
                  style={{ height: `${heightPercent}%` }}
                >
                  {/* Tooltip on hover */}
                  {month.count > 0 && (
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface px-3 py-1.5 rounded-md text-xs font-mono font-bold border border-white/10 pointer-events-none whitespace-nowrap z-20 shadow-xl text-primary">
                      {month.count}
                    </div>
                  )}
                </div>
              </div>
              
              {/* X-Axis Label */}
              <span className="text-[10px] sm:text-xs font-bold text-muted uppercase tracking-wider group-hover:text-primary transition-colors duration-300">
                {month.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
