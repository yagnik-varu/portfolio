import { createStore } from "zustand/vanilla";
import type { Perspective } from "./types";

export interface PerspectiveState {
  perspective: Perspective;
  perspectiveShortcutCount: number;
  setPerspective: (perspective: Perspective) => void;
  toggle: () => void;
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
    perspectiveShortcutCount: 0,
    setPerspective: (perspective) => {
      if (get().perspective === perspective) return;
      set({ perspective });
    },
    toggle: () => {
      const next = get().perspective === "overview" ? "architecture" : "overview";
      set({ perspective: next });
    },
    incrementShortcutCount: () => {
      set((state) => ({
        perspectiveShortcutCount: state.perspectiveShortcutCount + 1,
      }));
    },
  }));
}
