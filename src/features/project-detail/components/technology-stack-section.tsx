import * as React from "react";
import { Badge } from "@/shared/components/badge/badge";
import type { TechStack } from "@/lib/validation/project.schema";

interface TechnologyStackSectionProps {
  stack?: TechStack;
}

export function TechnologyStackSection({ stack }: TechnologyStackSectionProps) {
  if (!stack) return null;

  // We iterate over the categories and render them dynamically.
  // This cleanly handles the fact that tools is optional.
  const categories = [
    { label: "Frontend", items: stack.frontend },
    { label: "Backend", items: stack.backend },
    { label: "Database", items: stack.database },
    { label: "Infrastructure", items: stack.infrastructure },
    { label: "Tools", items: stack.tools },
  ].filter((category) => category.items && category.items.length > 0);

  if (categories.length === 0) return null;

  return (
    <section className="my-10 rounded-xl border border-border bg-surface/50 p-6 md:p-8">
      <h2 className="mb-6 font-sans text-xl font-bold tracking-tight text-foreground">
        Technology Stack
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <div key={category.label} className="flex flex-col space-y-3">
            <h3 className="font-mono text-sm font-semibold uppercase tracking-wider text-muted">
              {category.label}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {category.items!.map((tech) => (
                <li key={tech}>
                  <Badge variant="technology">{tech}</Badge>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
