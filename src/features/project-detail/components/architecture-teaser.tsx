import * as React from "react";
import type { Project } from "@/lib/validation/project.schema";
import type { EngineeringSection } from "@/lib/mdx/section-splitter";
import { getPerspectiveConfig } from "@/domains/perspective/config";
import { Badge } from "@/shared/components/badge/badge";
import { SwitchPerspectiveButton } from "@/features/perspective/components/switch-perspective-button";

interface ArchitectureTeaserProps {
  project: Project;
  engineeringSections: EngineeringSection[];
}

/**
 * Shown in the Recruiter perspective where the Architecture + Engineering
 * sections would be. Tells the visitor a deeper layer exists and what is in
 * it, with a one-click switch. Fixes the "hidden content is invisible" gap
 * from docs/02 §11 (Architecture Available → Inspect Architecture).
 * Server Component; only the button is a client leaf.
 */
export function ArchitectureTeaser({ project, engineeringSections }: ArchitectureTeaserProps) {
  const engineer = getPerspectiveConfig("architecture");
  const decisionCount = project.architecture?.decisions.length ?? 0;
  const sectionCount = engineeringSections.length;

  const contents: string[] = ["Architecture overview"];
  if (decisionCount > 0) {
    contents.push(`${decisionCount} key decision${decisionCount === 1 ? "" : "s"} with trade-offs`);
  }
  for (const section of engineeringSections) contents.push(section.title);

  return (
    <aside
      aria-labelledby="architecture-teaser-heading"
      className="mb-12 rounded-xl border border-dashed border-primary/40 bg-primary/[0.03] p-6 md:p-8 flex flex-col gap-5"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[11px] font-mono uppercase tracking-wider text-primary">
          Available in {engineer.label} view
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="architecture">{project.architectureType}</Badge>
          <Badge variant="architecture" className="capitalize">{project.complexity}</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 id="architecture-teaser-heading" className="font-sans text-2xl font-bold tracking-tight text-foreground">
          Architecture deep dive
        </h2>
        <p className="text-muted leading-relaxed">
          {project.architecture?.summary ??
            `How ${project.title} is structured, the decisions behind it, and what was hard.`}
        </p>
      </div>

      <ul className="flex flex-wrap gap-2">
        {contents.map((item) => (
          <li
            key={item}
            className="rounded-md border border-border bg-surface/60 px-2.5 py-1 text-xs font-mono text-text/90"
          >
            {item}
          </li>
        ))}
        {sectionCount === 0 && decisionCount === 0 && (
          <li className="rounded-md border border-border bg-surface/60 px-2.5 py-1 text-xs font-mono text-text/90">
            Engineering notes
          </li>
        )}
      </ul>

      <div>
        <SwitchPerspectiveButton to="architecture" variant="primary" size="lg" />
      </div>
    </aside>
  );
}
