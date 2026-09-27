"use client";

import { motion } from "framer-motion";
import type { Perspective } from "@/domains/perspective/types";
import { perspectives } from "../../../../content/perspectives/perspectives";
import { KbdHint } from "@/shared/components/kbd-hint";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import { cn } from "@/lib/utils/cn";
import { PERSPECTIVE_ICONS } from "./perspective-icons";

export interface PerspectiveToggleProps {
  perspective: Perspective;
  onChange: (perspective: Perspective) => void;
  className?: string;
}

/**
 * Desktop perspective switch (768px and up): icon + label for both lenses,
 * with a spring pill that slides to the active one. Hovering a lens shows who
 * it is for; the first-visit explanation lives in <PerspectiveIntroDialog />.
 */
export function PerspectiveToggleDesktop({
  perspective,
  onChange,
  className = "",
}: PerspectiveToggleProps) {
  const shouldReduceMotion = useMotionPreference();
  const labels = perspectives.map((p) => p.label).join(" or ");

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        role="group"
        aria-label={`View as ${labels}`}
        className="relative flex h-9 items-center rounded-full border border-border bg-surface/80 p-0.5 shadow-sm"
      >
        {perspectives.map((config) => {
          const isActive = config.id === perspective;
          const Icon = PERSPECTIVE_ICONS[config.id];

          return (
            <button
              key={config.id}
              type="button"
              onClick={() => onChange(config.id)}
              aria-pressed={isActive}
              title={config.audience}
              className={cn(
                "relative z-10 flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-colors duration-200",
                isActive ? "text-background" : "text-muted hover:text-text"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="perspective-toggle-desktop-pill"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full bg-primary shadow-md"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 350, damping: 30 }
                  }
                />
              )}
              <Icon aria-hidden="true" size={15} strokeWidth={2.25} />
              {config.label}
            </button>
          );
        })}
      </div>

      <div className="hidden xl:flex">
        <KbdHint>Shift+P</KbdHint>
      </div>
    </div>
  );
}
