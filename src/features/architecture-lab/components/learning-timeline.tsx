import * as React from "react";
import { learningTimeline } from "../../../../content/profile/learning-timeline";
import { SectionHeader } from "@/shared/components/section-header/section-header";

export function LearningTimeline() {
  // Enforce chronological ordering at the presentation layer rather than trusting authoring sequence
  const sortedMilestones = [...learningTimeline].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    // Fallback to original order if dates are placeholders or invalid
    if (isNaN(dateA) || isNaN(dateB)) return 0;
    return dateA - dateB;
  });

  return (
    <section id="learning-timeline" className="w-full flex flex-col gap-8">
      <SectionHeader
        title="Learning Timeline"
        description="Chronological milestones tracing the transition from full-stack implementation to backend systems engineering."
      />
      
      <div className="relative border-l border-primary/20 ml-4 md:ml-8 pl-8 py-2 space-y-12">
        {sortedMilestones.map((milestone) => (
          <div key={milestone.title} className="relative group">
            {/* Timeline Node & Glow */}
            <div className="absolute -left-[37.5px] top-4 h-3 w-3 rounded-full bg-surface border-2 border-primary/50 group-hover:border-primary group-hover:scale-125 transition-all duration-300 z-10" />
            <div className="absolute -left-[37.5px] top-4 h-3 w-3 rounded-full bg-primary/0 group-hover:bg-primary/50 group-hover:shadow-[0_0_15px_3px_rgba(var(--color-primary-rgb),0.5)] group-hover:scale-150 transition-all duration-500 z-0" />
            
            {/* Content Card */}
            <div className="relative p-6 rounded-2xl flex flex-col gap-3 border border-white/5 bg-surface/30 hover:bg-surface/60 hover:border-white/10 hover:-translate-y-1 hover:shadow-xl transition-all duration-500 group/card overflow-hidden">
              
              {/* Subtle accent gradient */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
              
              <div className="flex flex-col gap-2 relative z-10">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h3 className="text-xl font-bold font-sans text-text group-hover/card:text-primary transition-colors duration-300">
                    {milestone.title}
                  </h3>
                  <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full shadow-[0_0_10px_-2px_rgba(var(--color-primary-rgb),0.2)]">
                    {milestone.date}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed font-sans">
                  {milestone.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
