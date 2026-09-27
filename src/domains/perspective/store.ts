import { createStore } from "zustand/vanilla";
import type { Perspective } from "./types";
import type { PerspectiveSwitchSource } from "@/lib/analytics/events";

export interface PerspectiveState {
  perspective: Perspective;
  /**
   * What caused the most recent switch (toggle, Shift+P, intro dialog, ...).
   * Purely descriptive: `PerspectiveSync` reads it to report the switch to
   * analytics in one place, so call sites only declare a source.
   */
  lastSwitchSource: PerspectiveSwitchSource | null;
  perspectiveShortcutCount: number;
  setPerspective: (perspective: Perspective, source?: PerspectiveSwitchSource) => void;
  toggle: (source?: PerspectiveSwitchSource) => void;
  incrementShortcutCount: () => void;
}

export type PerspectiveStore = ReturnType<typeof createPerspectiveStore>;

/**
 * Factory instead of a module-level singleton.
 *
 * A singleton is shared by every request rendering on the server, so it could
 * never hold "this visitor's" perspective. The factory is called once per
 * request (server) and once per page load (client) by `PerspectiveStoreProvider`,
 * seeded with the perspective the proxy resolved from URL / route / cookie.
 */
export function createPerspectiveStore(initialPerspective: Perspective) {
  return createStore<PerspectiveState>()((set, get) => ({
    perspective: initialPerspective,
    lastSwitchSource: null,
    perspectiveShortcutCount: 0,
    setPerspective: (perspective, source = "toggle") => {
      if (get().perspective === perspective) return;
      set({ perspective, lastSwitchSource: source });
    },
    toggle: (source = "toggle") => {
      const next = get().perspective === "overview" ? "architecture" : "overview";
      set({ perspective: next, lastSwitchSource: source });
    },
    incrementShortcutCount: () => {
      set((state) => ({
        perspectiveShortcutCount: state.perspectiveShortcutCount + 1,
      }));
    },
  }));
}
