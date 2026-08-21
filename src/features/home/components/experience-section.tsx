import * as React from "react";
import { experiences } from "../../../../content/experience/experience";
import { Card } from "@/shared/components/card/card";
import { Badge } from "@/shared/components/badge/badge";
import { SectionHeader } from "@/shared/components/section-header/section-header";
import { StaggeredSection, StaggeredItem } from "./staggered-section";

export function ExperienceSection() {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <StaggeredSection
      className="w-full flex flex-col gap-8 scroll-mt-24"
    >
      <div id="experience" className="absolute -translate-y-24" aria-hidden="true" />
      <StaggeredItem>
        <div className="border-t border-white/10 pt-8 mb-4">
          <h2 id="experience-heading" className="text-2xl font-bold text-text mb-2">
            Experience
          </h2>
          <p className="text-muted text-lg">Professional engineering history and delivered systems.</p>
        </div>
      </StaggeredItem>

      <div className="relative border-l border-white/10 ml-4 md:ml-6 flex flex-col gap-10 pb-4">
        {experiences.map((exp, index) => {
          const dateRange = `${exp.startDate} — ${exp.current ? "Present" : exp.endDate || "Present"}`;

          return (
            <StaggeredItem key={`${exp.company}-${index}`} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <div 
                className={`absolute left-[-5px] top-10 w-2.5 h-2.5 rounded-full z-10 ${
                  exp.current 
                    ? "bg-primary ring-4 ring-primary/20" 
                    : "bg-muted"
                }`} 
              />
              
              <div className="flex flex-col gap-6 py-6 border-b border-white/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-xl font-bold tracking-tight text-text">
                      {exp.role}
                    </h3>
                    <p className="text-base font-medium text-primary">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-medium text-muted">
                      {dateRange}
                    </span>
                    {exp.current && (
                      <span className="text-[10px] uppercase tracking-wider text-text font-bold">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm md:text-base text-muted leading-relaxed">
                  {exp.description}
                </p>

                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="text-sm font-mono text-muted/70 hover:text-text transition-colors">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </StaggeredItem>
          );
        })}
      </div>
    </StaggeredSection>
  );
}
