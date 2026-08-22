import * as React from "react";
import type { Metadata } from "next";
import { getProjects } from "@/lib/mdx/projects";
import { ProjectDiscovery } from "@/features/projects/components/project-discovery";
import { ProjectsHero } from "@/features/projects/components/projects-hero";
import { BackgroundEffects } from "@/shared/components/layout/background-effects";
import { LayoutShiftWrapper } from "@/shared/components/motion/layout-shift-wrapper";

export const metadata: Metadata = {
  title: "Projects | Yagnik Varu",
  description: "A complete directory of all software systems and architectures.",
};

export default function ProjectsPage() {
  // 1. Fetch all validated projects from MDX loader
  const projects = getProjects();

  return (
    <>
      <BackgroundEffects />
      <div className="container mx-auto px-4 md:px-6 max-w-5xl flex flex-col gap-12 md:gap-16 pt-8 pb-20">
        <LayoutShiftWrapper>
          <ProjectsHero />
        </LayoutShiftWrapper>
        
        {/* 
          ProjectDiscovery operates as a Client Component boundary.
          It manages the search/filter state locally and maps the filtered array 
          down to the ProjectGrid. 
        */}
        <LayoutShiftWrapper>
          <ProjectDiscovery initialProjects={projects} />
        </LayoutShiftWrapper>
      </div>
    </>
  );
}
