import * as React from "react";
import { experiences } from "../../../../content/experience/experience";
import { Card } from "@/shared/components/card/card";
import { Badge } from "@/shared/components/badge/badge";
import { SectionHeader } from "@/shared/components/section-header/section-header";

export function ExperienceSection() {
  if (!experiences || experiences.length === 0) {
    return null;
  }

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full flex flex-col gap-8 scroll-mt-24"
    >
      <SectionHeader
        id="experience-heading"
        title="Experience"
        description="Professional engineering history, technical responsibilities, and delivered systems."
      />

      <div className="flex flex-col gap-6">
        {experiences.map((exp, index) => {
          const dateRange = `${exp.startDate} — ${exp.current ? "Present" : exp.endDate || "Present"}`;

          return (
            <Card
              key={`${exp.company}-${index}`}
              variant="elevated"
              className="p-6 md:p-8 flex flex-col gap-4 transition-colors hover:border-primary/40"
            >
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
                    <Badge variant="status" className="text-[10px] uppercase tracking-wider">
                      Current
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-sm md:text-base text-muted leading-relaxed">
                {exp.description}
              </p>

              {exp.technologies && exp.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech) => (
                    <Badge key={tech} variant="technology" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </section>
  );
}
