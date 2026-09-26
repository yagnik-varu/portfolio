import type { Perspective } from "@/domains/perspective/types";
import { perspectives } from "../../../../content/perspectives/perspectives";

export interface PerspectiveToggleProps {
  perspective: Perspective;
  onChange: (perspective: Perspective) => void;
  className?: string;
}

/**
 * Mobile perspective toggle for touch interfaces (< 768px).
 * 40px+ hit targets per WCAG. Labels come from the perspectives content config.
 */
export function PerspectiveToggleMobile({
  perspective,
  onChange,
  className = "",
}: PerspectiveToggleProps) {
  const labels = perspectives.map((p) => p.label).join(" or ");

  return (
    <div
      role="group"
      aria-label={`View as ${labels}`}
      className={`rounded-xl bg-surface p-1 shadow-sm border border-border ${className}`}
    >
      {perspectives.map((config) => {
        const isActive = config.id === perspective;
        return (
          <button
            key={config.id}
            type="button"
            onClick={() => onChange(config.id)}
            aria-pressed={isActive}
            className={`flex-1 min-h-[40px] px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              isActive ? "bg-primary text-text shadow" : "text-muted hover:text-text"
            }`}
          >
            {config.label}
          </button>
        );
      })}
    </div>
  );
}
