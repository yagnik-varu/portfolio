import { notFound } from "next/navigation";
import { getProjects } from "@/lib/mdx/projects";
import { splitMdxSections } from "@/lib/mdx/section-splitter";
import { ProjectHero } from "@/features/project-detail/components/project-hero";
import { TechnologyStackSection } from "@/features/project-detail/components/technology-stack-section";
import { OverviewSection } from "@/features/project-detail/components/overview-section";
import { ArchitectureSection } from "@/features/project-detail/components/architecture-section";
import { EngineeringSections } from "@/features/project-detail/components/engineering-sections";
import { FutureImprovementsSection } from "@/features/project-detail/components/future-improvements-section";
import { PerspectiveGater } from "@/features/perspective/components/perspective-gater";

import { ErrorBoundary } from "@/shared/components/error-boundary/error-boundary";

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const sections = splitMdxSections(project.content);

  return (
    <div className="flex flex-col gap-8 md:gap-16 pt-8">
      <ErrorBoundary fallbackMessage={`Unable to load project details for ${project.title}.`}>
        <div className="flex flex-col gap-8 md:gap-16 w-full">
          {/* 1. Identity & Stack (Always Visible) */}
          <div className="flex flex-col gap-12">
            <ProjectHero project={project} />
            <TechnologyStackSection stack={project.stack} />
          </div>

          <div className="mx-auto w-full max-w-3xl flex flex-col">
            {/* 2. Overview (Always Visible) */}
            <OverviewSection content={sections.overview} />

            {/* 3. Engineering Deep Dives (Perspective Gated) */}
            <PerspectiveGater requiredPerspective="architecture">
              <ArchitectureSection content={sections.architecture} perspective="architecture" />
              <EngineeringSections sections={sections.engineeringSections} perspective="architecture" />
            </PerspectiveGater>

            {/* 4. Future Improvements (Always Visible) */}
            <FutureImprovementsSection content={sections.futureImprovements} />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
