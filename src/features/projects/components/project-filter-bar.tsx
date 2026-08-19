"use client";

import * as React from "react";
import type { Project } from "@/lib/validation/project.schema";
import type { ProjectFilters } from "@/domains/project/query";
import { FilterDropdown } from "@/shared/components/filter-dropdown/filter-dropdown";

export interface ProjectFilterBarProps {
  projects: Project[];
  activeFilters: ProjectFilters;
  onFilterChange: (filters: ProjectFilters) => void;
}

export function ProjectFilterBar({ projects, activeFilters, onFilterChange }: ProjectFilterBarProps) {
  // Compute unique filter options from the provided projects dataset
  const techOptions = React.useMemo(() => {
    const allTech = new Set<string>();
    projects.forEach((p) => {
      if (p.stack) {
        p.stack.frontend.forEach((t) => allTech.add(t));
        p.stack.backend.forEach((t) => allTech.add(t));
        p.stack.database.forEach((t) => allTech.add(t));
        p.stack.infrastructure.forEach((t) => allTech.add(t));
        p.stack.tools?.forEach((t) => allTech.add(t));
      }
    });
    return Array.from(allTech).sort().map(t => ({ label: t, value: t }));
  }, [projects]);

  const archOptions = React.useMemo(() => {
    const allArch = new Set<string>();
    projects.forEach(p => allArch.add(p.architectureType));
    return Array.from(allArch).sort().map(a => ({ label: a, value: a }));
  }, [projects]);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <FilterDropdown
        label="Technology"
        hideLabel
        className="min-w-[150px] flex-1 sm:flex-none shrink-0"
        value={activeFilters.technology || ""}
        onChange={(val) => onFilterChange({ ...activeFilters, technology: val || undefined })}
        options={[
          { label: "All Technologies", value: "" },
          ...techOptions,
        ]}
      />
      <FilterDropdown
        label="Status"
        hideLabel
        className="min-w-[150px] flex-1 sm:flex-none shrink-0"
        value={activeFilters.status || ""}
        onChange={(val) => onFilterChange({ ...activeFilters, status: (val as Project["status"]) || undefined })}
        options={[
          { label: "All Statuses", value: "" },
          { label: "Active", value: "active" },
          { label: "Completed", value: "completed" },
          { label: "Paused", value: "paused" },
        ]}
      />
      <FilterDropdown
        label="Architecture"
        hideLabel
        className="min-w-[150px] flex-1 sm:flex-none shrink-0"
        value={activeFilters.architectureType || ""}
        onChange={(val) => onFilterChange({ ...activeFilters, architectureType: val || undefined })}
        options={[
          { label: "All Architectures", value: "" },
          ...archOptions,
        ]}
      />
      <FilterDropdown
        label="Complexity"
        hideLabel
        className="min-w-[150px] flex-1 sm:flex-none shrink-0"
        value={activeFilters.complexity || ""}
        onChange={(val) => onFilterChange({ ...activeFilters, complexity: (val as Project["complexity"]) || undefined })}
        options={[
          { label: "All Complexities", value: "" },
          { label: "Beginner", value: "beginner" },
          { label: "Intermediate", value: "intermediate" },
          { label: "Advanced", value: "advanced" },
          { label: "Production", value: "production" },
        ]}
      />
    </div>
  );
}
