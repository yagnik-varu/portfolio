"use client";

import * as React from "react";
import type { Project } from "@/lib/validation/project.schema";
import { ProjectCard } from "@/features/projects/components/project-card";
import { usePerspectiveStore } from "@/domains/perspective/store";
import { cn } from "@/lib/utils/cn";

export interface ProjectGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The list of projects to render */
  projects: Project[];
}

/**
 * A responsive grid orchestrator for Project Cards.
 * Handles layout and passes the global perspective down (Parent Controlled),
 * but contains no search/filtering business logic.
 */
export function ProjectGrid({ projects, className, ...props }: ProjectGridProps) {
  // Read perspective at the feature level to push state down to cards
  const perspective = usePerspectiveStore((state) => state.perspective);

  if (!projects || projects.length === 0) {
    return (
      <div className="w-full py-12 text-center text-muted">
        No projects found.
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
      {...props}
    >
      {projects.map((project) => (
        <ProjectCard 
          key={project.slug} 
          project={project} 
          perspective={perspective} 
        />
      ))}
    </div>
  );
}
