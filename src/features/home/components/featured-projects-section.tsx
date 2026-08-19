"use client";

import * as React from "react";
import Link from "next/link";
import type { Project } from "@/lib/validation/project.schema";
import type { Perspective } from "@/domains/perspective/types";
import { ProjectCard } from "@/features/projects/components/project-card";
import { SectionHeader } from "@/shared/components/section-header/section-header";
import { Button } from "@/shared/components/button/button";
import { StaggeredSection, StaggeredItem } from "./staggered-section";

interface FeaturedProjectsSectionProps {
  projects: Project[];
  perspective?: Perspective;
}

export function FeaturedProjectsSection({ projects, perspective }: FeaturedProjectsSectionProps) {
  const featuredProjects = projects.filter((project) => project.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 2);

  if (displayProjects.length === 0) {
    return null;
  }

  return (
    <StaggeredSection className="w-full flex flex-col gap-8" aria-labelledby="featured-projects-heading">
      <StaggeredItem>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <SectionHeader
            id="featured-projects-heading"
            title="Featured Projects"
            description="Selected software architectures and production-ready systems."
          />
          <Link href="/projects" className="shrink-0">
            <Button variant="ghost" size="sm" className="font-medium text-primary hover:text-primary/80">
              View All Projects →
            </Button>
          </Link>
        </div>
      </StaggeredItem>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayProjects.map((project) => (
          <StaggeredItem key={project.slug} className="h-full">
            <ProjectCard 
              project={project} 
              perspective={perspective} 
            />
          </StaggeredItem>
        ))}
      </div>
    </StaggeredSection>
  );
}
