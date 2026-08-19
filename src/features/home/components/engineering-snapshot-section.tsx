import * as React from "react";
import Link from "next/link";
import { experiences } from "../../../../content/experience/experience";
import { profile } from "../../../../content/profile/profile";
import { Card } from "@/shared/components/card/card";
import { SectionHeader } from "@/shared/components/section-header/section-header";
import { StaggeredSection, StaggeredItem } from "./staggered-section";

interface EngineeringSnapshotSectionProps {
  projectCount?: number;
}

export function EngineeringSnapshotSection({ projectCount = 2 }: EngineeringSnapshotSectionProps) {
  // 1. Calculate Years Experience from earliest start date
  const startYears = experiences.map((exp) => {
    const year = parseInt(exp.startDate.split("-")[0], 10);
    return isNaN(year) ? new Date().getFullYear() : year;
  });
  const earliestYear = startYears.length > 0 ? Math.min(...startYears) : new Date().getFullYear();
  const currentYear = new Date().getFullYear();
  const calculatedYears = Math.max(1, currentYear - earliestYear);
  const yearsExperienceDisplay = `${calculatedYears}+`;

  // 2. Calculate unique technologies across experiences
  const uniqueTechs = new Set<string>();
  experiences.forEach((exp) => {
    exp.technologies.forEach((tech) => uniqueTechs.add(tech));
  });
  const technologiesCountDisplay = `${Math.max(uniqueTechs.size, 10)}+`;

  // 3. Projects Built count
  const projectsBuiltDisplay = `${projectCount}`;

  // 4. GitHub Activity Placeholder
  const githubActivityDisplay = "500+";

  const metrics = [
    {
      id: "years-experience",
      label: "Years Experience",
      value: yearsExperienceDisplay,
      description: "Production & project delivery",
    },
    {
      id: "projects-built",
      label: "Projects Built",
      value: projectsBuiltDisplay,
      description: "Validated architectural builds",
      href: "/projects",
    },
    {
      id: "technologies-used",
      label: "Technologies Used",
      value: technologiesCountDisplay,
      description: "Backend, frontend & cloud",
    },
    {
      id: "github-activity",
      label: "GitHub Activity",
      value: githubActivityDisplay,
      description: "Contributions & telemetry",
      href: "/telemetry",
    },
  ];

  return (
    <StaggeredSection className="w-full flex flex-col gap-6" aria-labelledby="engineering-snapshot-heading">
      <StaggeredItem>
        <SectionHeader
          id="engineering-snapshot-heading"
          title="Engineering Snapshot"
          description="Key technical metrics and architectural delivery at a glance."
        />
      </StaggeredItem>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const cardContent = (
            <Card
              variant="elevated"
              className="p-5 flex flex-col justify-between gap-3 h-full hover:border-primary/40 transition-colors group"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted group-hover:text-primary transition-colors">
                  {metric.label}
                </span>
                <span className="text-3xl sm:text-4xl font-bold font-mono text-text tracking-tight">
                  {metric.value}
                </span>
              </div>
              <p className="text-xs text-muted">
                {metric.description}
              </p>
            </Card>
          );

          if (metric.href) {
            return (
              <StaggeredItem key={metric.id}>
                <Link href={metric.href} className="block focus:outline-none focus:ring-2 focus:ring-primary rounded-lg h-full">
                  {cardContent}
                </Link>
              </StaggeredItem>
            );
          }

          return <StaggeredItem key={metric.id}>{cardContent}</StaggeredItem>;
        })}
      </div>

      <StaggeredItem>
        <div className="mt-2 p-4 rounded-lg border border-border bg-surface/50 text-sm flex flex-col sm:flex-row sm:items-center gap-3">
          <span className="font-semibold text-primary uppercase text-xs tracking-wider shrink-0">Currently Focused On:</span>
          <div className="flex flex-wrap gap-2">
            {profile.currentFocus.map((focus, idx) => (
              <span key={idx} className="px-2 py-1 bg-surface border border-border rounded-md text-xs font-mono text-muted-foreground shadow-sm">
                {focus}
              </span>
            ))}
          </div>
        </div>
      </StaggeredItem>
    </StaggeredSection>
  );
}
