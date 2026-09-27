"use client";

import { motion } from "framer-motion";
import type { Perspective } from "@/domains/perspective/types";
import { perspectives } from "../../../../content/perspectives/perspectives";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import { cn } from "@/lib/utils/cn";
import { PERSPECTIVE_ICONS } from "./perspective-icons";

export interface PerspectiveToggleProps {
  perspective: Perspective;
  onChange: (perspective: Perspective) => void;
  className?: string;
}

/**
 * Compact mobile switch (< 768px), sized to share a phone-width header with
 * the logo and menu button.
 *
 * The active lens shows icon + label, the inactive one is icon-only. The
 * label always tells the visitor which lens they are in, and the icon of the
 * other one reads as "tap to switch". A spring pill slides between them.
 *
 * Both buttons keep a visible or accessible name (`aria-label`) and a
 * 36px+ touch target.
 */
export function PerspectiveToggleMobile({
  perspective,
  onChange,
  className = "",
}: PerspectiveToggleProps) {
  const shouldReduceMotion = useMotionPreference();
  const labels = perspectives.map((p) => p.label).join(" or ");

  return (
    <div
      role="group"
      aria-label={`View as ${labels}`}
      className={cn(
        "relative items-center h-9 rounded-full border border-border bg-surface/80 p-0.5",
        className
      )}
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
            aria-label={`View as ${config.label}`}
            className={cn(
              "relative z-10 flex h-8 items-center justify-center gap-1.5 rounded-full transition-colors duration-200",
              isActive ? "px-3 text-background" : "w-9 text-muted hover:text-text"
            )}
          >
            {isActive && (
              <motion.span
                layoutId="perspective-toggle-mobile-pill"
                aria-hidden="true"
                className="absolute inset-0 -z-10 rounded-full bg-primary shadow-sm"
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 30 }
                }
              />
            )}
            <Icon aria-hidden="true" size={15} strokeWidth={2.25} />
            {isActive && (
              <span className="text-xs font-semibold leading-none">{config.label}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
