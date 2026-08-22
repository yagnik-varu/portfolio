import { Metadata } from "next";
import { ModuleGrid } from "@/features/architecture-lab/components/module-grid";
import { LearningTimeline } from "@/features/architecture-lab/components/learning-timeline";
import { EngineeringPrinciples } from "@/features/architecture-lab/components/engineering-principles";
import { engineeringModules } from "../../../content/perspectives/engineering-modules";

import { ErrorBoundary } from "@/shared/components/error-boundary/error-boundary";

export const metadata: Metadata = {
  title: "Architecture Lab",
  description: "Dedicated engineering workspace and architectural deep-dives.",
};

export default function ArchitectureLabPage() {
  return (
    <>
      <div className="flex flex-col gap-24 pt-8 md:pt-12">
        {/* Page Header */}
        <div className="flex flex-col w-full py-8 group relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text relative">
            <span className="block transition-opacity duration-300">
              Architecture Lab
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted mt-6 max-w-2xl">
            A dedicated engineering workspace exploring system design, backend architectures, and technical growth.
          </p>
        </div>

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
