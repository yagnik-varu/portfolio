"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { usePerspectiveStore } from "@/domains/perspective/store-provider";
import { getOtherPerspective, getPerspectiveLabel } from "@/domains/perspective/config";
import { perspectives } from "../../../../content/perspectives/perspectives";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";
import { Button } from "@/shared/components/button/button";
import { KbdHint } from "@/shared/components/kbd-hint";
import { track } from "@/lib/analytics/client";

const STORAGE_KEY = "perspective-intro-seen";
const OPEN_DELAY_MS = 1000;
/** Matches Tailwind's `md` breakpoint, where the full desktop toggle appears. */
const MOBILE_MAX_WIDTH_PX = 767;

function hasSeenIntro(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    // Storage blocked (private mode): treat as seen so we never nag every load.
    return true;
  }
}

function markIntroSeen(): void {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    // Ignore: persistence is a convenience, never a requirement.
  }
}

/**
 * One-time chooser shown on a visitor's first load (docs/02 §3, Perspective
 * Discovery). Explains both lenses side by side and lets the visitor pick.
 * Replaces the earlier pulse + tooltip affordances.
 */
export function PerspectiveIntroDialog() {
  const perspective = usePerspectiveStore((state) => state.perspective);
  const setPerspective = usePerspectiveStore((state) => state.setPerspective);
  const shouldReduceMotion = useMotionPreference();

  const [isOpen, setIsOpen] = useState(false);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  // Open once, after a short delay, if never seen. Desktop/tablet only: on a
  // phone the side-by-side comparison becomes a full-screen scrolling wall
  // that blocks the first impression, and the header toggle already explains
  // itself with icons. Not marked as seen, so the same visitor still gets it
  // later on a larger screen.
  useEffect(() => {
    if (window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`).matches) return;
    if (hasSeenIntro()) return;
    const timer = setTimeout(() => setIsOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  // `choice` tells us whether the dialog actually helps visitors pick a lens
  // (continue / switch) or just gets closed (dismiss).
  const close = useCallback(
    (choice: "continue" | "switch" | "dismiss") => {
      track("intro_dialog_closed", { choice, shown_as: perspective });
      markIntroSeen();
      setIsOpen(false);
    },
    [perspective]
  );

  const switchAndClose = useCallback(() => {
    close("switch");
    setPerspective(getOtherPerspective(perspective), "intro_dialog");
  }, [perspective, setPerspective, close]);

  // Escape closes; lock body scroll; move focus into the dialog.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close("dismiss");
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    primaryButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const currentLabel = getPerspectiveLabel(perspective);
  const otherLabel = getPerspectiveLabel(getOtherPerspective(perspective));

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="perspective-intro"
          className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4 bg-background/80 backdrop-blur-md"
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, transition: { duration: 0.2 } }}
          onClick={() => close("dismiss")}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="perspective-intro-title"
            aria-describedby="perspective-intro-description"
            onClick={(event) => event.stopPropagation()}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-3xl rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={() => close("dismiss")}
              aria-label="Dismiss"
              className="absolute right-4 top-4 p-2 rounded-full text-muted hover:text-text transition-colors"
            >
              <X size={20} />
            </button>

            <p className="text-[11px] font-mono uppercase tracking-wider text-muted mb-2">
              One portfolio, two lenses
            </p>
            <h2 id="perspective-intro-title" className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
              Who are you visiting as?
            </h2>
            <p id="perspective-intro-description" className="mt-2 text-muted leading-relaxed">
              Same projects, same person. The view you pick changes how much engineering
              detail is shown. You can switch any time from the header
              <span className="hidden lg:inline">
                {" "}or with <KbdHint>Shift+P</KbdHint>
              </span>
              .
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {perspectives.map((config) => {
                const isActive = config.id === perspective;
                return (
                  <div
                    key={config.id}
                    className={`rounded-xl border p-5 flex flex-col gap-3 transition-colors ${
                      isActive ? "border-primary bg-primary/5" : "border-border bg-background/40"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-text">{config.label}</h3>
                      {isActive && (
                        <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-mono text-muted">{config.audience}</p>
                    <p className="text-sm text-text/90 leading-relaxed">{config.description}</p>
                    <ul className="mt-1 flex flex-col gap-1.5">
                      {config.unlocks.map((item) => (
                        <li key={item} className="flex gap-2 text-sm text-muted">
                          <span aria-hidden="true" className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
              <Button variant="outline" size="lg" onClick={switchAndClose}>
                Switch to {otherLabel}
              </Button>
              <Button ref={primaryButtonRef} variant="primary" size="lg" onClick={() => close("continue")}>
                Continue as {currentLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
