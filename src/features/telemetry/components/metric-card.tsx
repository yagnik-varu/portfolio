import * as React from "react";
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
    <div
      className={cn(
        "relative p-6 sm:p-8 flex flex-col justify-center gap-3 rounded-2xl border border-white/5 bg-surface/30 hover:bg-surface/60 hover:border-white/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 overflow-hidden group/metric",
        className
      )}
    >
      {/* Subtle top gradient accent on hover */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-500" />
      
      {/* Glowing background blob */}
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/0 group-hover/metric:bg-primary/5 rounded-full blur-2xl transition-all duration-700 pointer-events-none" />

      <span className="relative z-10 text-sm font-sans font-medium text-muted group-hover/metric:text-primary/80 transition-colors duration-300">
        {label}
      </span>
      <span className="relative z-10 text-4xl sm:text-5xl font-mono font-bold text-text tracking-tight group-hover/metric:text-primary transition-colors duration-300">
        {value}
      </span>
    </div>
  );
}
