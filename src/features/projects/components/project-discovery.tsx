"use client";

import * as React from "react";
import type { Project } from "@/lib/validation/project.schema";
import { searchProjects, filterProjects, type ProjectFilters } from "@/domains/project/query";
import { SearchInput } from "@/shared/components/search-input/search-input";
import { ProjectGrid } from "@/features/projects/components/project-grid";
import { EmptyState } from "@/shared/components/empty-state/empty-state";
import { Button } from "@/shared/components/button/button";
import { ProjectFilterBar } from "./project-filter-bar";

export interface ProjectDiscoveryProps {
  /** The full array of validated projects loaded from the server */
  initialProjects: Project[];
}

export function ProjectDiscovery({ initialProjects }: ProjectDiscoveryProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filters, setFilters] = React.useState<ProjectFilters>({});

  // Domain logic execution: Search first, then filter the results.
  const searchedProjects = searchProjects(initialProjects, searchQuery);
  const visibleProjects = filterProjects(searchedProjects, filters);

  const resetAll = () => {
    setSearchQuery("");
    setFilters({});
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Controls Area */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <SearchInput 
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by title, stack, or tags..."
            className="w-full lg:max-w-sm"
          />
          
          <div className="w-full lg:w-auto">
            <ProjectFilterBar 
              projects={initialProjects} 
              activeFilters={filters} 
              onFilterChange={setFilters} 
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end">
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
            <Button variant="secondary" onClick={resetAll}>
              Reset Filters & Search
            </Button>
          }
        />
      ) : (
        <ProjectGrid projects={visibleProjects} />
      )}
    </div>
  );
}
