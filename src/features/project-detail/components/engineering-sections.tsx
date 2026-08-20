import * as React from "react";
import { EngineeringSection } from "./engineering-section";
import type { EngineeringSection as DomainEngineeringSection } from "@/lib/mdx/section-splitter";

interface EngineeringSectionsProps {
  sections: DomainEngineeringSection[];
  perspective: "overview" | "architecture";
}

export function EngineeringSections({ sections, perspective }: EngineeringSectionsProps) {
  // Respect the progressive information expansion rule
  if (perspective !== "architecture") return null;

  // Graceful degradation: not every project has engineering sections.
  // We simply render nothing instead of failing or showing empty states.
  if (!sections || sections.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="mb-6 font-sans text-2xl font-bold tracking-tight text-foreground">
        Engineering Deep Dive
      </h2>
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <EngineeringSection key={section.type} section={section} />
        ))}
      </div>
    </div>
  );
}
