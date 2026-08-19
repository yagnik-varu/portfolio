"use client";

import * as React from "react";
import type { Project } from "@/lib/validation/project.schema";
import { searchProjects } from "@/domains/project/query";
import { SearchInput } from "@/shared/components/search-input/search-input";
import { ProjectGrid } from "@/features/projects/components/project-grid";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { Button } from "@/shared/components/button/button";

export interface ProjectDiscoveryProps {
  /** The full array of validated projects loaded from the server */
  initialProjects: Project[];
}

/**
 * Feature-level orchestrator for Project Discovery.
 * Manages local search/filter state and computes the visible projects
 * before passing them down to the presentation grid.
 */
export function ProjectDiscovery({ initialProjects }: ProjectDiscoveryProps) {
  // Local state for the search input.
  // We keep this local (not global Zustand) because this state is ephemeral
  // and solely belongs to this specific feature route.
  const [searchQuery, setSearchQuery] = React.useState("");

  // Pure compute step: we run the domain logic on every render.
  // Because it's a pure function and portfolio arrays are small, 
  // we do not need to memoize or debounce this yet.
  const visibleProjects = searchProjects(initialProjects, searchQuery);

  return (
    <div className="flex flex-col gap-8">
      {/* Controls Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <SearchInput 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by title, stack, or tags..."
        />
        
        {/* Filter dropdowns will be injected here in the next step */}
        <div className="flex items-center gap-3">
          <p className="text-sm text-muted font-mono whitespace-nowrap">
            {visibleProjects.length} {visibleProjects.length === 1 ? "project" : "projects"}
          </p>
        </div>
      </div>

      {/* Presentation Area */}
      {visibleProjects.length === 0 ? (
        <EmptyState 
          message="No projects match your current search and filters."
          action={
            <Button variant="secondary" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          }
        />
      ) : (
        <ProjectGrid projects={visibleProjects} />
      )}
    </div>
  );
}
