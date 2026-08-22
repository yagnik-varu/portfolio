import { create } from "zustand";
import type { Perspective } from "./types";

interface PerspectiveState {
  perspective: Perspective;
  perspectiveShortcutCount: number;
  setPerspective: (perspective: Perspective) => void;
  toggle: () => void;
  incrementShortcutCount: () => void;
}

export const usePerspectiveStore = create<PerspectiveState>((set, get) => ({
  perspective: "overview",
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
    set((state) => ({ perspectiveShortcutCount: state.perspectiveShortcutCount + 1 }));
  },
}));
