import * as React from "react";
import { EngineeringSection } from "./engineering-section";
import type { EngineeringSection as DomainEngineeringSection } from "@/lib/mdx/section-splitter";

interface EngineeringSectionsProps {
  sections: DomainEngineeringSection[];
}

/**
 * Optional deep-dive sections parsed from the MDX body. Visibility is decided
 * by the <PerspectiveGater /> in the page, not here.
 */
export function EngineeringSections({ sections }: EngineeringSectionsProps) {
  // Graceful degradation: not every project has engineering sections.
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
