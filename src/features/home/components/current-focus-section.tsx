import * as React from "react";
import { profile } from "../../../../content/profile/profile";
import { Badge } from "@/shared/components/badge/badge";
import { SectionHeader } from "@/shared/components/section-header/section-header";

export function CurrentFocusSection() {
  const { currentFocus } = profile;

  if (!currentFocus || currentFocus.length === 0) {
    return null;
  }

  return (
    <section 
      aria-labelledby="current-focus-heading"
      className="w-full flex flex-col gap-6"
    >
      <SectionHeader
        id="current-focus-heading"
        title="Current Focus"
        description="Technologies, architectural patterns, and engineering domains I am actively exploring and applying."
      />

      <ul className="flex flex-wrap gap-2.5 items-center">
        {currentFocus.map((topic) => (
          <li key={topic}>
            <Badge 
              variant="technology" 
              className="text-sm px-3 py-1 font-medium bg-surface/80 border border-border/60 hover:border-primary/50 transition-colors"
            >
              {topic}
            </Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
