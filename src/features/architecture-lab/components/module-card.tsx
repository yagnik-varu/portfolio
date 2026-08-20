import * as React from "react";
import Link from "next/link";
import { Card } from "@/shared/components/card/card";
import type { EngineeringModule } from "@/lib/validation/engineering-module.schema";

interface ModuleCardProps {
  module: EngineeringModule;
  actionText?: string;
}

export function ModuleCard({ module, actionText = "Explore →" }: ModuleCardProps) {
  return (
    <Link
      href={module.route}
      className="block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group"
    >
      <Card
        variant="technical"
        className="p-6 flex flex-col justify-between gap-4 h-full border-border/80 bg-surface/40 hover:bg-surface hover:border-primary/50 transition-all duration-200"
      >
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold font-sans text-text group-hover:text-primary transition-colors">
            {module.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed font-sans">
            {module.description}
          </p>
        </div>

        <div className="pt-4 text-sm font-mono font-medium text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          {actionText}
        </div>
      </Card>
    </Link>
  );
}
