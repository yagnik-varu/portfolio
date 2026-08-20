import * as React from "react";
import { ExternalLink } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4" />
      <path d="M9 20a5 5 0 0 1-5-1.5 5 5 0 0 1-1-3" />
    </svg>
  );
}
import { Badge } from "@/shared/components/badge/badge";
import { ComplexityIndicator } from "@/shared/components/complexity-indicator/complexity-indicator";
import type { Project } from "@/lib/validation/project.schema";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  // Flatten a few key technologies for the summary (or use tags if present)
  // We'll extract up to 5 items across the stack to show a quick summary.
  const flatStack = project.stack 
    ? [
        ...project.stack.frontend,
        ...project.stack.backend,
        ...project.stack.database,
        ...project.stack.infrastructure,
        ...(project.stack.tools || [])
      ].slice(0, 5)
    : [];

  return (
    <header className="mb-12 flex flex-col items-start space-y-6">
      {/* Title & Status */}
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {project.title}
        </h1>
        <Badge variant="status" className="w-fit px-3 py-1 text-sm uppercase tracking-wider">
          {project.status}
        </Badge>
      </div>

      {/* Summary */}
      <p className="max-w-2xl font-sans text-lg leading-relaxed text-text md:text-xl">
        {project.summary}
      </p>

      {/* Metadata Indicators (Architecture & Complexity) */}
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="architecture">
          {project.architectureType}
        </Badge>
        <ComplexityIndicator level={project.complexity} />
      </div>

      {/* Tech Stack Summary */}
      {flatStack.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {flatStack.map((tech) => (
            <Badge key={tech} variant="technology">
              {tech}
            </Badge>
          ))}
          {(project.stack && Object.values(project.stack).flat().length > 5) && (
            <span className="text-sm text-muted">+{Object.values(project.stack).flat().length - 5} more</span>
          )}
        </div>
      )}

      {/* Links */}
      {(project.repositoryUrl || project.liveUrl) && (
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-surface px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-surface/80 hover:text-foreground"
            >
              <GithubIcon className="h-4 w-4" />
              Source Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-primary/90"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          )}
        </div>
      )}
    </header>
  );
}
