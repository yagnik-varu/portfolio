import * as React from "react";
import { SectionHeader } from "@/shared/components/section-header/section-header";
import { Card } from "@/shared/components/card/card";

// Lightweight local constant rather than a heavy Zod-validated content file.
// These principles rarely change, are low-volume, and aren't reused across other pages.
const principles = [
  {
    title: "Simplicity over Abstraction",
    description:
      "Avoid premature optimization and unnecessary abstractions. Don't build for scale you don't have. Clarity and maintainability always win over cleverness.",
  },
  {
    title: "Content is the Source of Truth",
    description:
      "The UI should act purely as a presentation layer that consumes and reflects data, never as the owner of the data itself.",
  },
  {
    title: "Graceful Degradation",
    description:
      "A single failing feature or external service should never take the entire application down. Systems must fail predictably and safely.",
  },
  {
    title: "Domain-Driven Organization",
    description:
      "Organize code and architectures by business capabilities and domain boundaries, not by technical framework constructs or file types.",
  },
];

export function EngineeringPrinciples() {
  return (
    <section aria-labelledby="engineering-principles-heading" className="w-full flex flex-col gap-8">
      <SectionHeader
        id="engineering-principles-heading"
        title="Engineering Principles"
        description="The foundational beliefs and heuristics that guide my architectural decisions and system design."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((principle, index) => (
          <Card
            key={index}
            variant="default"
            className="p-6 flex flex-col gap-3 border-border/50 bg-surface/30 hover:bg-surface/60 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center h-8 w-8 rounded bg-primary/10 text-primary font-mono text-sm font-bold">
                0{index + 1}
              </span>
              <h3 className="text-lg font-bold font-sans text-foreground">
                {principle.title}
              </h3>
            </div>
            <p className="text-sm text-muted leading-relaxed font-sans pl-11">
              {principle.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}
