import * as React from "react";
import { Card } from "@/shared/components/card/card";
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
    <Card className={cn("p-6 flex flex-col gap-6 border-border/80 bg-surface/20", className)}>
      <h3 className="text-sm font-sans font-medium text-text">Recent Activity</h3>
      
      {(!events || events.length === 0) ? (
        <div className="text-sm text-muted">No recent activity.</div>
      ) : (
        <div className="flex flex-col gap-5">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col gap-1 border-l-[3px] border-border pl-4 relative group">
              {/* Timeline dot */}
              <div className="absolute -left-[6px] top-1.5 w-[9px] h-[9px] rounded-full bg-surface border-2 border-primary group-hover:bg-primary transition-colors" />
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
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
    </Card>
  );
}
