import * as React from "react";
import { Card } from "@/shared/components/card/card";
import { cn } from "@/lib/utils/cn";

export interface MetricCardProps {
  /** The descriptive label for the metric */
  label: string;
  /** The primary numeric or string value to display */
  value: string | number;
  /** Optional CSS classes to apply to the card */
  className?: string;
}

export function MetricCard({ label, value, className }: MetricCardProps) {
  return (
    <Card
      variant="elevated"
      className={cn(
        "p-6 flex flex-col justify-center gap-2 border-border/80 bg-surface/40 hover:bg-surface hover:border-primary/50 transition-all duration-200 group",
        className
      )}
    >
      <span className="text-sm font-sans font-medium text-muted group-hover:text-primary transition-colors">
        {label}
      </span>
      <span className="text-4xl font-mono font-bold text-text tracking-tight">
        {value}
      </span>
    </Card>
  );
}
