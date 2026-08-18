import type { Perspective } from "@/domains/perspective/types";

export interface PerspectiveToggleProps {
  perspective: Perspective;
  onChange: (perspective: Perspective) => void;
  className?: string;
}

/**
 * Mobile-specific perspective toggle designed for touch interfaces.
 * Replaces the desktop slider on viewports < 768px.
 * Features 44px+ hit targets to prevent fat-finger errors per WCAG guidelines.
 */
export function PerspectiveToggleMobile({
  perspective,
  onChange,
  className = "",
}: PerspectiveToggleProps) {
  return (
    <div
      role="group"
      aria-label="Perspective View Mode"
      className={`flex w-full rounded-xl bg-surface p-1 shadow-sm border border-border ${className}`}
    >
      <button
        onClick={() => onChange("overview")}
        aria-pressed={perspective === "overview"}
        // min-h-[44px] guarantees the 44x44px minimum touch target size
        className={`flex-1 min-h-[44px] px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          perspective === "overview"
            ? "bg-primary text-text shadow"
            : "text-muted hover:text-text"
        }`}
      >
        Overview
      </button>

      <button
        onClick={() => onChange("architecture")}
        aria-pressed={perspective === "architecture"}
        className={`flex-1 min-h-[44px] px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          perspective === "architecture"
            ? "bg-primary text-text shadow"
            : "text-muted hover:text-text"
        }`}
      >
        Architecture
      </button>
    </div>
  );
}
