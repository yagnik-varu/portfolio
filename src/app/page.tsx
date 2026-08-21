import { getProjects } from "@/lib/mdx/projects";
import { HeroSection } from "@/features/home/components/hero-section";
import { CurrentFocusSection } from "@/features/home/components/current-focus-section";
import { EngineeringModulesSection } from "@/features/home/components/engineering-modules-section";
import { FeaturedProjectsSection } from "@/features/home/components/featured-projects-section";
import { ExperienceSection } from "@/features/home/components/experience-section";
import { EngineeringSnapshotSection } from "@/features/home/components/engineering-snapshot-section";
import { ContactCTASection } from "@/features/home/components/contact-cta-section";

import { PerspectiveFlipProvider } from "@/features/perspective/components/perspective-flip-provider";

export default function Home() {
  const projects = getProjects();
  const projectCount = projects.length;

  return (
    <PerspectiveFlipProvider>
      <div className="container mx-auto px-4 md:px-6 flex flex-col gap-16 md:gap-24 pb-20">
        <HeroSection />
        <CurrentFocusSection />
        
        {/* Engineering Modules are only visible in Architecture mode, no flip ID needed for itself */}
        <EngineeringModulesSection />
        
        {/* Sections below modules must have flip IDs to animate smoothly as they shift */}
        <div data-flip-id="featured-projects">
          <FeaturedProjectsSection projects={projects} />
        </div>
        <div data-flip-id="experience">
          <ExperienceSection />
        </div>
        <div data-flip-id="engineering-snapshot">
          <EngineeringSnapshotSection projectCount={projectCount} />
        </div>
        <div data-flip-id="contact-cta">
          <ContactCTASection />
        </div>
      </div>
    </PerspectiveFlipProvider>
  );
}
