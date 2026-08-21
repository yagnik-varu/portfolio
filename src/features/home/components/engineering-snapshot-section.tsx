import * as React from "react";
import Link from "next/link";
import { experiences } from "../../../../content/experience/experience";
import { profile } from "../../../../content/profile/profile";
import { Card } from "@/shared/components/card/card";
import { SectionHeader } from "@/shared/components/section-header/section-header";
import { ScrubCountUp } from "@/shared/components/motion/scrub-count-up";
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

  // 2. Calculate unique technologies across experiences
  const uniqueTechs = new Set<string>();
  experiences.forEach((exp) => {
    exp.technologies.forEach((tech) => uniqueTechs.add(tech));
  });

  const metrics = [
    {
      id: "years-experience",
      label: "Years Experience",
      numericValue: calculatedYears,
      suffix: "+",
      description: "Production & project delivery",
    },
    {
      id: "projects-built",
      label: "Projects Built",
      numericValue: projectCount,
      suffix: "",
      description: "Validated architectural builds",
      href: "/projects",
    },
    {
      id: "technologies-used",
      label: "Technologies Used",
      numericValue: Math.max(uniqueTechs.size, 10),
      suffix: "+",
      description: "Backend, frontend & cloud",
    },
    {
      id: "github-activity",
      label: "GitHub Activity",
      numericValue: 500,
      suffix: "+",
      description: "Contributions & telemetry",
      href: "/telemetry",
    },
  ];

  return (
    <StaggeredSection className="w-full flex flex-col gap-6" aria-labelledby="engineering-snapshot-heading">
      <StaggeredItem>
        <div className="border-t border-white/10 pt-8 mb-4">
          <h2 id="engineering-snapshot-heading" className="text-2xl font-bold text-text mb-2">
            Engineering Snapshot
          </h2>
          <p className="text-muted">Key technical metrics and architectural delivery at a glance.</p>
        </div>
      </StaggeredItem>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {metrics.map((metric) => {
          const cardContent = (
            <div
              className="relative p-6 flex flex-col justify-between gap-6 h-full transition-colors duration-300 group"
            >
              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-sm font-semibold uppercase tracking-wider text-muted group-hover:text-text transition-colors">
                  {metric.label}
                </span>
                <span className="text-6xl sm:text-7xl font-bold font-mono text-text tracking-tighter">
                  <ScrubCountUp value={metric.numericValue} suffix={metric.suffix} />
                </span>
              </div>
              <p className="text-sm text-muted/80 relative z-10 border-t border-white/10 pt-4 mt-2">
                {metric.description}
              </p>
            </div>
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


    </StaggeredSection>
  );
}
