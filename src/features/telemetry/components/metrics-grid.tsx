import * as React from "react";
import { MetricCard } from "./metric-card";

export interface TelemetryMetric {
  /** Unique identifier for the metric */
  id: string;
  /** The descriptive label for the metric */
  label: string;
  /** The primary numeric or string value to display */
  value: string | number;
}

export interface MetricsGridProps {
  /** Array of metrics to display in the grid */
  metrics: TelemetryMetric[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  if (!metrics || metrics.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.id}
          label={metric.label}
          value={metric.value}
        />
      ))}
    </div>
  );
}
