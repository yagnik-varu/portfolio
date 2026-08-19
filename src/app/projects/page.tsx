import * as React from "react";
import type { Metadata } from "next";
import { getProjects } from "@/lib/mdx/projects";
import { ProjectDiscovery } from "@/features/projects/components/project-discovery";
import { SectionHeader } from "@/shared/components/section-header/section-header";

export const metadata: Metadata = {
  title: "Projects | Yagnik Varu",
  description: "A complete directory of all software systems and architectures.",
};

export default function ProjectsPage() {
  // 1. Fetch all validated projects from MDX loader
  const projects = getProjects();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 flex flex-col gap-10">
      <SectionHeader 
        id="projects-heading"
        title="All Projects"
        description="A complete directory of all software systems and architectures built, from full-stack platforms to module integrations."
      />
      
      {/* 
        ProjectDiscovery operates as a Client Component boundary.
        It manages the search/filter state locally and maps the filtered array 
        down to the ProjectGrid. 
      */}
      <ProjectDiscovery initialProjects={projects} />
    </div>
  );
}
