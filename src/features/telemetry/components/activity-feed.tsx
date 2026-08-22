import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface ActivityEvent {
  id: string;
  /** Type of activity, used for optional icon mapping in the future */
  type: "commit" | "pr" | "issue" | "review";
  /** The repository where the activity occurred */
  repository: string;
  /** A short description of the activity */
  description: string;
  /** ISO date string of when the activity occurred */
  timestamp: string;
}

export interface ActivityFeedProps {
  /** Array of recent activity events */
  events: ActivityEvent[];
  /** Optional CSS classes */
  className?: string;
}

export function ActivityFeed({ events, className }: ActivityFeedProps) {
  return (
    <div className={cn("relative p-6 sm:p-8 flex flex-col gap-8 rounded-2xl border border-white/5 bg-surface/30 hover:border-white/10 transition-colors duration-500 overflow-hidden", className)}>
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-primary/5 blur-[80px] pointer-events-none rounded-full" />

      <h3 className="relative z-10 text-xl font-bold font-sans text-text">Recent Activity</h3>
      
      {(!events || events.length === 0) ? (
        <div className="text-sm text-muted">No recent activity.</div>
      ) : (
        <div className="flex flex-col gap-5">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col gap-2 border-l-[3px] border-border/50 pl-6 relative group">
              {/* Timeline dot & Glow */}
              <div className="absolute -left-[7px] top-1.5 w-[11px] h-[11px] rounded-full bg-surface border-2 border-primary/50 group-hover:border-primary transition-colors duration-300 z-10" />
              <div className="absolute -left-[7px] top-1.5 w-[11px] h-[11px] rounded-full bg-primary/0 group-hover:bg-primary/50 group-hover:shadow-[0_0_12px_2px_rgba(var(--color-primary-rgb),0.5)] group-hover:scale-150 transition-all duration-500 z-0" />
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 relative z-10">
                <span className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                  {event.repository}
                </span>
                <span className="text-xs font-mono text-muted shrink-0">
                  {new Date(event.timestamp).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                  })}
                </span>
              </div>
              <p className="text-sm text-muted line-clamp-2">
                {event.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
