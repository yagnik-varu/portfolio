"use client";

import { usePerspectiveStore } from "@/domains/perspective/store";
import { HeroSection } from "@/features/home/components/hero-section";

export default function Home() {
  const perspective = usePerspectiveStore((state) => state.perspective);
  const setPerspective = usePerspectiveStore((state) => state.setPerspective);

  return (
    <div className="container mx-auto px-4 md:px-6">
      <HeroSection 
        perspective={perspective} 
        onPerspectiveChange={setPerspective} 
      />
    </div>
  );
}
