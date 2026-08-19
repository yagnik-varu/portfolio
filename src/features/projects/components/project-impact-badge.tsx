import { Badge } from "@/shared/components/badge/badge";
import type { Project } from "@/lib/validation/project.schema";

interface ProjectImpactBadgeProps {
  project: Project;
}

export function ProjectImpactBadge({ project }: ProjectImpactBadgeProps) {
  if (!project.impactMetrics || project.impactMetrics.length === 0) {
    return null;
  }

  // Slice to 1-2 items as specified
  const metrics = project.impactMetrics.slice(0, 2);

  return (
    <div className="flex flex-col gap-1.5">
      {metrics.map((metric, idx) => (
        <Badge key={idx} variant="status" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 shadow-sm w-fit truncate">
          {metric}
        </Badge>
      ))}
    </div>
  );
}
