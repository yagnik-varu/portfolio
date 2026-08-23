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
              className="relative p-6 flex flex-col justify-between gap-6 h-full transition-all duration-500 group rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 hover:-translate-y-2 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)] overflow-hidden"
            >
              {/* Corner glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Ambient background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="flex flex-col gap-2 relative z-10">
                <span className="text-sm font-semibold uppercase tracking-wider text-muted group-hover:text-white transition-colors duration-300">
                  {metric.label}
                </span>
                <span className="text-6xl sm:text-7xl font-bold font-mono text-text tracking-tighter group-hover:scale-[1.03] group-hover:text-white origin-left transition-all duration-500 ease-out">
                  <ScrubCountUp value={metric.numericValue} suffix={metric.suffix} />
                </span>
              </div>
              
              <div className="relative z-10 mt-2">
                {/* Animated shimmer line */}
                <div className="h-[1px] w-full bg-white/10 relative overflow-hidden mb-4 transition-colors duration-500 group-hover:bg-white/20">
                  <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                </div>
                <p className="text-sm text-muted/80 group-hover:text-white/90 transition-colors duration-300">
                  {metric.description}
                </p>
              </div>
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
