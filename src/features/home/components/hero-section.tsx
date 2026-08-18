import type { Perspective } from "@/domains/perspective/types";
import { profile } from "../../../../content/profile/profile";
import { PerspectiveTransition } from "@/features/perspective/components/perspective-transition";
import { Button } from "@/shared/components/button/button";
import Link from "next/link";

interface HeroSectionProps {
  perspective: Perspective;
  onPerspectiveChange: (p: Perspective) => void;
}

export function HeroSection({ perspective, onPerspectiveChange }: HeroSectionProps) {
  // Core identity remains fixed outside the transformation animation
  const { name } = profile;

  return (
    <section className="w-full py-20 md:py-32 flex flex-col gap-6">
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-text">
        {name}
      </h1>

      <PerspectiveTransition perspective={perspective}>
        {perspective === "overview" ? (
          <div className="flex flex-col gap-8 items-start">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl md:text-3xl font-medium text-primary">
                {profile.title}
              </h2>
              <p className="text-lg text-muted max-w-2xl leading-relaxed">
                {profile.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/projects" passHref legacyBehavior>
                <Button variant="primary" size="lg">
                  View Projects
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onPerspectiveChange("architecture")}
              >
                Explore Architecture Perspective
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8 items-start">
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl md:text-3xl font-medium text-primary font-mono">
                System Architect & {profile.title}
              </h2>
              <div className="flex flex-col gap-3">
                <p className="text-xs font-bold text-muted uppercase tracking-widest">
                  Current Technical Focus
                </p>
                <ul className="flex flex-wrap gap-2">
                  {profile.currentFocus.map((tech) => (
                    <li
                      key={tech}
                      className="px-3 py-1.5 bg-surface border border-border rounded-md text-sm font-mono text-text shadow-sm"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/architecture-lab" passHref legacyBehavior>
                <Button variant="primary" size="lg">
                  Enter Architecture Lab
                </Button>
              </Link>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => onPerspectiveChange("overview")}
              >
                Return to Overview
              </Button>
            </div>
          </div>
        )}
      </PerspectiveTransition>
    </section>
  );
}
