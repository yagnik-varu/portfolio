import type { Project } from "@/lib/validation/project.schema";

export interface ProjectFilters {
  technology?: string;
  status?: Project["status"];
  architectureType?: string;
  complexity?: Project["complexity"];
}

/**
 * Pure function to search projects by a query string.
 * Matches against title, summary, tags, and all nested technology stacks.
 * Search is case-insensitive.
 */
export function searchProjects(projects: Project[], query: string): Project[] {
  if (!query || !query.trim()) return projects;
  
  const lowerQuery = query.toLowerCase().trim();
  
  return projects.filter((project) => {
    // 1. Check title
    if (project.title.toLowerCase().includes(lowerQuery)) return true;
    
    // 2. Check summary
    if (project.summary.toLowerCase().includes(lowerQuery)) return true;
    
    // 3. Check tags
    if (project.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))) return true;
    
    // 4. Check technology stack
    if (project.stack) {
      const allTech = [
        ...project.stack.frontend,
        ...project.stack.backend,
        ...project.stack.database,
        ...project.stack.infrastructure,
        ...(project.stack.tools || []),
      ];
      
      if (allTech.some((tech) => tech.toLowerCase().includes(lowerQuery))) {
        return true;
      }
    }
    
    return false;
  });
}

/**
 * Pure function to filter projects by exact-match (but case-insensitive for strings) criteria.
 * Composes cleanly with searchProjects.
 */
export function filterProjects(projects: Project[], filters: ProjectFilters): Project[] {
  return projects.filter((project) => {
    // Filter by status
    if (filters.status && project.status !== filters.status) {
      return false;
    }
    
    // Filter by architectureType (case-insensitive string match)
    if (
      filters.architectureType && 
      project.architectureType.toLowerCase() !== filters.architectureType.toLowerCase()
    ) {
      return false;
    }
    
    // Filter by complexity
    if (filters.complexity && project.complexity !== filters.complexity) {
      return false;
    }
    
    // Filter by technology (must match exactly one of the items in the stack)
    if (filters.technology) {
      if (!project.stack) return false;
      
      const allTech = [
        ...project.stack.frontend,
        ...project.stack.backend,
        ...project.stack.database,
        ...project.stack.infrastructure,
        ...(project.stack.tools || []),
      ];
      
      const hasTech = allTech.some(
        (tech) => tech.toLowerCase() === filters.technology!.toLowerCase()
      );
      
      if (!hasTech) return false;
    }
    
    return true;
  });
}
