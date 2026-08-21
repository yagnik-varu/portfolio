import * as React from "react";
import { profile } from "../../../../content/profile/profile";
import { Badge } from "@/shared/components/badge/badge";
import { SectionHeader } from "@/shared/components/section-header/section-header";
import { MagneticWrapper } from "@/shared/components/magnetic-wrapper";
import { TextHoverFill } from "@/shared/components/motion/text-hover-fill";

export function CurrentFocusSection() {
  const { currentFocus } = profile;

  if (!currentFocus || currentFocus.length === 0) {
    return null;
  }

  return (
    <section 
      aria-labelledby="current-focus-heading"
      className="w-full flex flex-col gap-8"
    >
      <div className="border-t border-white/10 pt-8 mb-4">
        <h2 id="current-focus-heading" className="text-2xl font-bold text-text mb-2">
          Current Focus
        </h2>
        <p className="text-muted text-lg">Technologies, architectural patterns, and engineering domains I am actively exploring and applying.</p>
      </div>

      <ul className="flex flex-wrap gap-3 items-center">
        {currentFocus.map((topic) => (
          <MagneticWrapper key={topic} strength={8}>
            <li>
              <span className="text-lg md:text-xl font-mono text-text/80 hover:text-text transition-colors cursor-default block p-2">
                <TextHoverFill>{topic}</TextHoverFill>
              </span>
            </li>
          </MagneticWrapper>
        ))}
      </ul>
    </section>
  );
}
