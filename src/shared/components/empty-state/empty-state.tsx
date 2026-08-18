import * as React from "react";

import { cn } from "@/lib/utils/cn";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  message: string;
  action?: React.ReactNode;
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, message, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-background p-8 text-center",
          className
        )}
        {...props}
      >
        {icon && (
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface text-muted">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-medium text-text">{message}</h3>
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
