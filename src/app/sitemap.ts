import { MetadataRoute } from "next";
import { getProjects } from "@/lib/mdx/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://yagnikvaru.dev";

  // Base static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/architecture-lab`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/telemetry`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // Dynamic project routes
  const projects = getProjects();
  
  // Filter out any hidden or draft projects from the sitemap
  const publicProjects = projects.filter(project => project.visibility === "public");

  const projectRoutes: MetadataRoute.Sitemap = publicProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    // Prefer explicitly updated dates if available in frontmatter, fallback to current
    lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}
