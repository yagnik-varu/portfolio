import { getProjects } from "@/lib/mdx/projects";
import { HeroSection } from "@/features/home/components/hero-section";
import { CurrentFocusSection } from "@/features/home/components/current-focus-section";
import { EngineeringModulesSection } from "@/features/home/components/engineering-modules-section";
import { FeaturedProjectsSection } from "@/features/home/components/featured-projects-section";
import { ExperienceSection } from "@/features/home/components/experience-section";
import { EngineeringSnapshotSection } from "@/features/home/components/engineering-snapshot-section";
import { ContactCTASection } from "@/features/home/components/contact-cta-section";
import { LayoutShiftWrapper } from "@/shared/components/motion/layout-shift-wrapper";
import { BackgroundEffects } from "@/shared/components/layout/background-effects";

export default function Home() {
  const projects = getProjects();
  const projectCount = projects.length;

  return (
    <>
      <BackgroundEffects />
      <div className="container mx-auto px-4 md:px-6 max-w-5xl flex flex-col gap-12 md:gap-16 pt-8 pb-20">
        <LayoutShiftWrapper>
          <HeroSection />
        </LayoutShiftWrapper>
        
        <LayoutShiftWrapper>
          <CurrentFocusSection />
        </LayoutShiftWrapper>
        
        <LayoutShiftWrapper>
          <EngineeringModulesSection />
        </LayoutShiftWrapper>
        
        <LayoutShiftWrapper>
          <FeaturedProjectsSection projects={projects} />
        </LayoutShiftWrapper>
        
        <LayoutShiftWrapper>
          <ExperienceSection />
        </LayoutShiftWrapper>
        
        <LayoutShiftWrapper>
          <EngineeringSnapshotSection projectCount={projectCount} />
        </LayoutShiftWrapper>
        
        <LayoutShiftWrapper>
          <ContactCTASection />
        </LayoutShiftWrapper>
      </div>
    </>
  );
}
