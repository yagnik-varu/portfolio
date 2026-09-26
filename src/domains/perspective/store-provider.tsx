"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { useStore } from "zustand";
import {
  createPerspectiveStore,
  type PerspectiveState,
  type PerspectiveStore,
} from "./store";
import type { Perspective } from "./types";

const PerspectiveStoreContext = createContext<PerspectiveStore | null>(null);

interface PerspectiveStoreProviderProps {
  /** Resolved server-side (proxy → header → layout). Seeds the store. */
  initialPerspective: Perspective;
  children: ReactNode;
}

/**
 * Creates one store per React tree (per request on the server, per page load
 * on the client). Because both sides seed from the same `initialPerspective`,
 * the server HTML and the first client render agree, so there is no
 * Recruiter-mode flash before hydration.
 */
export function PerspectiveStoreProvider({
  initialPerspective,
  children,
}: PerspectiveStoreProviderProps) {
  // Lazy initializer: the factory runs exactly once per mounted tree, and the
  // store instance never changes afterwards (we never call the setter).
  const [store] = useState(() => createPerspectiveStore(initialPerspective));

  return (
    <PerspectiveStoreContext.Provider value={store}>
      {children}
    </PerspectiveStoreContext.Provider>
  );
}

/**
 * Escape hatch for reading state imperatively (e.g. inside effects) without
 * subscribing to re-renders: `usePerspectiveStoreApi().getState().perspective`.
 */
export function usePerspectiveStoreApi(): PerspectiveStore {
  const store = useContext(PerspectiveStoreContext);
  if (!store) {
    throw new Error(
      "usePerspectiveStoreApi must be used inside <PerspectiveStoreProvider> (mounted in app/layout.tsx)."
    );
  }
  return store;
}

/**
 * Same call signature as the previous singleton hook:
 *   usePerspectiveStore((s) => s.perspective)
 *   usePerspectiveStore()            // whole state
 */
export function usePerspectiveStore(): PerspectiveState;
export function usePerspectiveStore<T>(selector: (state: PerspectiveState) => T): T;
export function usePerspectiveStore<T>(selector?: (state: PerspectiveState) => T) {
  const store = useContext(PerspectiveStoreContext);
  if (!store) {
    throw new Error(
      "usePerspectiveStore must be used inside <PerspectiveStoreProvider> (mounted in app/layout.tsx)."
    );
  }
  return useStore(store, selector ?? ((state) => state as unknown as T));
}
