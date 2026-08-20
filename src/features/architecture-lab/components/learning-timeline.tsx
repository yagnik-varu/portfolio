import * as React from "react";
import { learningTimeline } from "../../../../content/profile/learning-timeline";
import { SectionHeader } from "@/shared/components/section-header/section-header";
import { Card } from "@/shared/components/card/card";

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
            {/* Timeline Node */}
            <div className="absolute -left-[37.5px] top-1.5 h-3 w-3 rounded-full bg-primary/50 ring-4 ring-background group-hover:bg-primary group-hover:scale-125 transition-all duration-300" />
            
            {/* Content Card */}
            <Card variant="default" className="p-5 border-border/50 bg-surface/30 group-hover:bg-surface/60 transition-colors">
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                  <h3 className="text-xl font-bold font-sans text-foreground">
                    {milestone.title}
                  </h3>
                  <span className="text-xs font-mono font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {milestone.date}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed font-sans">
                  {milestone.description}
                </p>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
