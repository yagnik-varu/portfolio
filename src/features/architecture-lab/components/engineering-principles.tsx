import * as React from "react";
import { SectionHeader } from "@/shared/components/section-header/section-header";

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
          <div
            key={index}
            className="relative p-6 sm:p-8 rounded-2xl flex flex-col gap-4 border border-white/5 bg-surface/30 hover:bg-surface/60 hover:border-white/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 group overflow-hidden"
          >
            {/* Background number watermark */}
            <span className="absolute -bottom-6 -right-2 text-[8rem] font-bold font-mono leading-none text-white/[0.02] group-hover:text-primary/[0.05] group-hover:scale-110 transition-all duration-700 pointer-events-none select-none z-0">
              0{index + 1}
            </span>
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary font-mono text-sm font-bold shadow-[0_0_15px_-3px_rgba(var(--color-primary-rgb),0.2)] group-hover:shadow-[0_0_20px_-3px_rgba(var(--color-primary-rgb),0.4)] transition-shadow duration-500">
                  0{index + 1}
                </span>
                <h3 className="text-xl font-bold font-sans text-text group-hover:text-primary transition-colors duration-300">
                  {principle.title}
                </h3>
              </div>
              <p className="text-sm text-muted leading-relaxed font-sans pl-14">
                {principle.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
