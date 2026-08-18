"use client";

import { useEffect } from "react";
import { usePerspectiveStore } from "@/domains/perspective/store";

/**
 * Global keyboard shortcut (Shift + P) to toggle the perspective.
 * Ignores keystrokes if the user is typing in an input field.
 */
export function usePerspectiveShortcut() {
  const toggle = usePerspectiveStore((state) => state.toggle);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "p") {
        const target = e.target as HTMLElement;

        // Prevent firing if the user is actively typing
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }

        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);
}
