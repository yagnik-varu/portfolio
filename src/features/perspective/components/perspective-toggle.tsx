import type { Perspective } from "@/domains/perspective/types";
import { PerspectiveToggleDesktop } from "./perspective-toggle-desktop";
import { PerspectiveToggleMobile } from "./perspective-toggle-mobile";

interface PerspectiveToggleProps {
  perspective: Perspective;
  onChange: (perspective: Perspective) => void;
}

/**
 * Responsive compound component that renders the appropriate toggle variant
 * based on the viewport width using CSS media queries.
 */
export function PerspectiveToggle({ perspective, onChange }: PerspectiveToggleProps) {
  return (
    <>
      <PerspectiveToggleDesktop
        perspective={perspective}
        onChange={onChange}
        className="hidden md:inline-flex"
      />
      <PerspectiveToggleMobile
        perspective={perspective}
        onChange={onChange}
        className="flex md:hidden"
      />
    </>
  );
}
