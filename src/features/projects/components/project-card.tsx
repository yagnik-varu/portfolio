"use client";

import * as React from "react";
import Link from "next/link";
import type { Project } from "@/lib/validation/project.schema";
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store";
import { Card } from "@/shared/components/card/card";
import { Badge } from "@/shared/components/badge/badge";
import { Button } from "@/shared/components/button/button";
import { cn } from "@/lib/utils/cn";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
  perspective?: Perspective;
}

export function ProjectCardHeader({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <h3 className="text-xl font-bold tracking-tight text-text group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <Badge variant="status" className="capitalize shrink-0">
        {project.status}
      </Badge>
    </div>
  );
}

export function ProjectCardSummary({ project, className }: { project: Project; className?: string }) {
  return (
    <p className={cn("text-sm text-muted leading-relaxed line-clamp-3", className)}>
      {project.summary}
    </p>
  );
}

export function ProjectCardStack({ project, className }: { project: Project; className?: string }) {
  if (!project.stack) return null;

  // Flatten primary tech stack items for concise card display
  const techItems = [
    ...(project.stack.backend || []),
    ...(project.stack.frontend || []),
    ...(project.stack.database || []),
    ...(project.stack.infrastructure || []),
  ];

  if (techItems.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {techItems.map((tech) => (
        <Badge key={tech} variant="technology" className="text-xs">
          {tech}
        </Badge>
      ))}
    </div>
  );
}

export function ProjectArchitecturePanel({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2 p-3 bg-surface/60 border border-border/80 rounded-md font-mono text-xs", className)}>
      <div className="flex items-center justify-between text-muted">
        <span className="font-semibold uppercase tracking-wider text-[10px]">Pattern</span>
        <Badge variant="architecture" className="text-xs">
          {project.architectureType}
        </Badge>
      </div>
      <div className="flex items-center justify-between text-muted">
        <span className="font-semibold uppercase tracking-wider text-[10px]">Complexity</span>
        <Badge variant="architecture" className="text-xs capitalize">
          {project.complexity}
        </Badge>
      </div>
    </div>
  );
}

export function ProjectCardActions({ project, perspective, className }: { project: Project; perspective: Perspective; className?: string }) {
  const isArchitecture = perspective === "architecture";
  const targetHref = isArchitecture 
    ? `/projects/${project.slug}?perspective=architecture` 
    : `/projects/${project.slug}`;

  return (
    <div className={cn("flex items-center gap-3 pt-2 mt-auto", className)}>
      <Link href={targetHref} className="w-full">
        <Button 
          variant={isArchitecture ? "secondary" : "primary"} 
          size="sm" 
          className="w-full font-medium"
        >
          {isArchitecture ? "Inspect Architecture →" : "View Project"}
        </Button>
      </Link>
    </div>
  );
}

export function ProjectCard({ project, perspective: propPerspective, className, ...props }: ProjectCardProps) {
  const storePerspective = usePerspectiveStore((state) => state.perspective);
  const activePerspective = propPerspective ?? storePerspective;
  const isArchitecture = activePerspective === "architecture";

  return (
    <Card
      variant={isArchitecture ? "technical" : "elevated"}
      className={cn(
        "p-6 flex flex-col justify-between gap-5 h-full transition-all duration-200 group hover:border-primary/50",
        isArchitecture && "border-primary/30 shadow-md",
        className
      )}
      {...props}
    >
      <div className="flex flex-col gap-4">
        <ProjectCardHeader project={project} />
        <ProjectCardSummary project={project} />
        <ProjectCardStack project={project} />
      </div>

      <div className="flex flex-col gap-4 mt-auto">
        {isArchitecture && (
          <ProjectArchitecturePanel project={project} />
        )}
        <ProjectCardActions project={project} perspective={activePerspective} />
      </div>
    </Card>
  );
}
