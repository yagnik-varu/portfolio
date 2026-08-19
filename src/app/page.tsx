import { getProjects } from "@/lib/mdx/projects";
import { HeroSection } from "@/features/home/components/hero-section";
import { CurrentFocusSection } from "@/features/home/components/current-focus-section";
import { FeaturedProjectsSection } from "@/features/home/components/featured-projects-section";
import { EngineeringSnapshotSection } from "@/features/home/components/engineering-snapshot-section";

export default function Home() {
  const projects = getProjects();
  const projectCount = projects.length;

  return (
    <div className="container mx-auto px-4 md:px-6 flex flex-col gap-16 md:gap-24 pb-20">
      <HeroSection />
      <CurrentFocusSection />
      <FeaturedProjectsSection projects={projects} />
      <EngineeringSnapshotSection projectCount={projectCount} />
    </div>
  );
}
