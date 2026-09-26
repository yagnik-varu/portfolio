import * as React from "react";
import { SectionHeader } from "@/shared/components/section-header/section-header";
import { profile } from "../../../../content/profile/profile";

/**
 * Reads `profile.engineering.principles` (docs/14 §8) so the Engineer hero
 * chips and this section share one source of truth.
 */
export function EngineeringPrinciples() {
  const principles = profile.engineering?.principles ?? [];

  // Graceful degradation: nothing to show until the profile has principles.
  if (principles.length === 0) return null;

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
            key={principle.title}
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
