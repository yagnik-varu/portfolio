"use client";

import { motion } from "framer-motion";
import type { Perspective } from "@/domains/perspective/types";
import { perspectives } from "../../../../content/perspectives/perspectives";
import { KbdHint } from "@/shared/components/kbd-hint";

export interface PerspectiveToggleProps {
  perspective: Perspective;
  onChange: (perspective: Perspective) => void;
  className?: string;
}

const SEGMENT_WIDTH = 92;

/**
 * Desktop perspective segmented control with a spring-animated active pill.
 * Visible on md (768px) and up. Labels come from the perspectives content
 * config; the first-visit explanation lives in <PerspectiveIntroDialog />.
 */
export function PerspectiveToggleDesktop({
  perspective,
  onChange,
  className = "",
}: PerspectiveToggleProps) {
  const activeIndex = perspectives.findIndex((p) => p.id === perspective);
  const labels = perspectives.map((p) => p.label).join(" or ");

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* "View as" is conveyed by the group label + button titles; a visible
          prefix made the header overflow at common desktop widths. */}
      <div
        role="group"
        aria-label={`View as ${labels}`}
        className="relative flex h-9 items-center rounded-full bg-surface p-1 shadow-sm border border-border"
      >
        {perspectives.map((config) => {
          const isActive = config.id === perspective;
          return (
            <button
              key={config.id}
              type="button"
              onClick={() => onChange(config.id)}
              aria-pressed={isActive}
              title={config.audience}
              style={{ width: SEGMENT_WIDTH }}
              className={`relative z-10 flex items-center justify-center rounded-full px-3 text-sm font-medium transition-colors duration-200 ${
                isActive ? "text-text" : "text-muted hover:text-text"
              }`}
            >
              {config.label}
            </button>
          );
        })}

        {/* Spring physics active pill */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ x: Math.max(activeIndex, 0) * SEGMENT_WIDTH }}
          transition={{ type: "spring", stiffness: 250, damping: 25 }}
          style={{ width: SEGMENT_WIDTH }}
          className="absolute top-1 bottom-1 left-1 rounded-full bg-primary shadow-md"
        />
      </div>

      <div className="hidden xl:flex">
        <KbdHint>Shift+P</KbdHint>
      </div>
    </div>
  );
}
