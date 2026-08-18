import type { Perspective } from "@/domains/perspective/types";

export interface PerspectiveToggleProps {
  perspective: Perspective;
  onChange: (perspective: Perspective) => void;
  className?: string;
}

/**
 * Desktop-specific perspective slider.
 * Visible on md (768px) and up.
 */
export function PerspectiveToggleDesktop({
  perspective,
  onChange,
  className = "",
}: PerspectiveToggleProps) {
  return (
    <div
      role="group"
      aria-label="Perspective View Mode"
      className={`relative inline-flex h-9 items-center rounded-full bg-surface p-1 shadow-sm border border-border ${className}`}
    >
      <button
        onClick={() => onChange("overview")}
        aria-pressed={perspective === "overview"}
        className={`relative z-10 flex items-center justify-center rounded-full px-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          perspective === "overview" ? "text-text" : "text-muted hover:text-text"
        }`}
      >
        Overview
      </button>

      <button
        onClick={() => onChange("architecture")}
        aria-pressed={perspective === "architecture"}
        className={`relative z-10 flex items-center justify-center rounded-full px-4 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
          perspective === "architecture" ? "text-text" : "text-muted hover:text-text"
        }`}
      >
        Architecture
      </button>

      {/* Highlight Background */}
      <div
        className={`absolute top-1 bottom-1 w-[calc(50%-0.25rem)] rounded-full bg-primary shadow transition-transform duration-300 ease-in-out ${
          perspective === "overview" ? "translate-x-0" : "translate-x-full ml-1"
        }`}
      />
    </div>
  );
}
