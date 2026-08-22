import { Metadata } from "next";
import { ArchitectureLabHero } from "@/features/architecture-lab/components/architecture-lab-hero";
import { ModuleGrid } from "@/features/architecture-lab/components/module-grid";
import { LearningTimeline } from "@/features/architecture-lab/components/learning-timeline";
import { EngineeringPrinciples } from "@/features/architecture-lab/components/engineering-principles";
import { engineeringModules } from "../../../content/perspectives/engineering-modules";

import { ErrorBoundary } from "@/shared/components/error-boundary/error-boundary";
import { PetEventTrigger } from "@/features/portfolio-pet/components/pet-event-trigger";

export const metadata: Metadata = {
  title: "Architecture Lab",
  description: "Dedicated engineering workspace and architectural deep-dives.",
};

export default function ArchitectureLabPage() {
  return (
    <>
      <PetEventTrigger event="ARCHITECTURE_LAB_OPENED" />
      <div className="flex flex-col gap-24 pt-8 md:pt-12">
        {/* Page Header */}
        <ArchitectureLabHero />

        <ErrorBoundary fallbackMessage="Unable to load the Architecture Lab content at this time.">
          <div className="flex flex-col gap-24">
            {/* 1. Module Grid */}
            <ModuleGrid modules={engineeringModules} />

            {/* 2. Learning Timeline */}
            <LearningTimeline />

            {/* 3. Engineering Principles */}
            <EngineeringPrinciples />
          </div>
        </ErrorBoundary>
      </div>
    </>
  );
}
