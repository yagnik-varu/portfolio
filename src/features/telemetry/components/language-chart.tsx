import * as React from "react";
import { Card } from "@/shared/components/card/card";
import { cn } from "@/lib/utils/cn";
import type { LanguageMetric } from "@/lib/validation/telemetry.schema";

export interface LanguageChartProps {
  /** Array of language metrics from the telemetry contract */
  languages: LanguageMetric[];
  /** Optional CSS classes */
  className?: string;
}

export function LanguageChart({ languages, className }: LanguageChartProps) {
  // We apply a deterministic subset of the Phase 2 primary scale to differentiate languages
  // This honors the single-theme system while visually separating the bars
  const colorTokens = [
    "bg-primary-500",
    "bg-primary-400",
    "bg-primary-600",
    "bg-primary-300",
    "bg-primary-700",
  ];

  return (
    <Card className={cn("p-6 flex flex-col gap-6 border-border/80 bg-surface/20", className)}>
      <h3 className="text-sm font-sans font-medium text-text">Language Distribution</h3>
      
      {(!languages || languages.length === 0) ? (
        <div className="text-sm text-muted">No language data available.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Stacked Bar Representation */}
          <div 
            className="h-3 w-full flex rounded-full overflow-hidden bg-surface/50" 
            role="progressbar" 
            aria-label="Language usage distribution"
          >
            {languages.map((lang, idx) => (
              <div 
                key={lang.name}
                className={cn("h-full transition-all duration-500 hover:brightness-110", colorTokens[idx % colorTokens.length])}
                style={{ width: `${lang.percentage}%` }}
                title={`${lang.name}: ${lang.percentage}%`}
                aria-label={`${lang.name}: ${lang.percentage}%`}
              />
            ))}
          </div>

          {/* Accessible Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-3">
            {languages.map((lang, idx) => (
              <div key={lang.name} className="flex items-start gap-2 group">
                <div className={cn("w-2.5 h-2.5 rounded-full shrink-0 mt-1 transition-transform group-hover:scale-125", colorTokens[idx % colorTokens.length])} />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-text">{lang.name}</span>
                  <span className="text-xs font-mono text-muted">{lang.percentage.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
