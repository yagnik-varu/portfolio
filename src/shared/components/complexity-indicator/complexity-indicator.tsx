import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const complexityVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold font-mono transition-colors focus:outline-none focus:ring-2 focus:ring-primary",
  {
    variants: {
      level: {
        beginner: "border-transparent bg-surface text-muted",
        intermediate: "border-transparent bg-surface text-text",
        advanced: "border-transparent bg-primary/10 text-primary",
        production: "border-primary/50 bg-background text-primary shadow-sm",
      },
    },
    defaultVariants: {
      level: "intermediate",
    },
  }
);

export interface ComplexityIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof complexityVariants> {
  level: "beginner" | "intermediate" | "advanced" | "production";
}

function ComplexityIndicator({ className, level, ...props }: ComplexityIndicatorProps) {
  // Format the text to PascalCase for display (e.g., "production" -> "Production")
  const label = level.charAt(0).toUpperCase() + level.slice(1);
  
  return (
    <div className={cn(complexityVariants({ level }), className)} {...props}>
      {label}
    </div>
  );
}

export { ComplexityIndicator, complexityVariants };
