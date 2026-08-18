import { create } from "zustand";
import type { Perspective } from "./types";

interface PerspectiveState {
  perspective: Perspective;
  setPerspective: (perspective: Perspective) => void;
  toggle: () => void;
}

export const usePerspectiveStore = create<PerspectiveState>((set) => ({
  perspective: "overview",
  setPerspective: (perspective) => set({ perspective }),
  toggle: () =>
    set((state) => ({
      perspective:
        state.perspective === "overview" ? "architecture" : "overview",
    })),
}));
