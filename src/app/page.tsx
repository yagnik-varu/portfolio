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

import { PerspectiveGater } from "@/features/perspective/components/perspective-gater";

import { profile } from "../../content/profile/profile";

export default function Home() {
  const projects = getProjects();
  const projectCount = projects.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.summary,
    url: "https://yagnikvaru.dev",
    sameAs: [profile.githubUrl, profile.linkedinUrl].filter(Boolean),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BackgroundEffects />
      <div className="flex flex-col gap-12 md:gap-16 pt-8">
        <LayoutShiftWrapper>
          <HeroSection />
        </LayoutShiftWrapper>
        
        <LayoutShiftWrapper>
          <PerspectiveGater requiredPerspective="overview">
            <CurrentFocusSection />
          </PerspectiveGater>
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
