import { create } from "zustand";
import type { Perspective } from "./types";

interface PerspectiveState {
  perspective: Perspective;
  setPerspective: (perspective: Perspective) => void;
  toggle: () => void;
}

export const usePerspectiveStore = create<PerspectiveState>((set, get) => ({
  perspective: "overview",
  setPerspective: (perspective) => {
    if (get().perspective === perspective) return;
    set({ perspective });
  },
  toggle: () => {
    const next = get().perspective === "overview" ? "architecture" : "overview";
    set({ perspective: next });
  },
}));
