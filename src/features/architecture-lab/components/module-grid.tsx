import * as React from "react";
import type { EngineeringModule } from "@/lib/validation/engineering-module.schema";
import { ModuleCard } from "./module-card";

interface ModuleGridProps {
  modules: EngineeringModule[];
}

export function ModuleGrid({ modules }: ModuleGridProps) {
  if (!modules || modules.length === 0) {
    return null;
  }

  // Map presentation-only action text based on module keys to provide contextual CTA
  const getActionText = (key: string) => {
    switch (key) {
      case "architecture-lab":
        return "Explore Lab →";
      case "telemetry":
        return "View Telemetry →";
      case "learning-timeline":
        return "Inspect Journey →";
      default:
        return "View Workspace →";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {modules.map((module) => (
        <ModuleCard
          key={module.key}
          module={module}
          actionText={getActionText(module.key)}
        />
      ))}
    </div>
  );
}
