"use client";

import { usePerspectiveStore } from "@/domains/perspective/store";
import { HeroSection } from "@/features/home/components/hero-section";
import { CurrentFocusSection } from "@/features/home/components/current-focus-section";

export default function Home() {
  const perspective = usePerspectiveStore((state) => state.perspective);
  const setPerspective = usePerspectiveStore((state) => state.setPerspective);

  return (
    <div className="container mx-auto px-4 md:px-6 flex flex-col gap-16 md:gap-24 pb-20">
      <HeroSection 
        perspective={perspective} 
        onPerspectiveChange={setPerspective} 
      />
      <CurrentFocusSection />
    </div>
  );
}
