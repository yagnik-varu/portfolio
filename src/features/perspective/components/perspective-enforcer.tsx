"use client";

import { useEffect } from "react";
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store-provider";

/**
 * Forces a perspective for the page it is mounted on.
 *
 * Full page loads are already handled by `src/proxy.ts` (engineer routes
 * resolve to "architecture" before render). This covers *client-side*
 * navigations: the root layout does not re-render on those, so the store
 * would otherwise keep the previous page's perspective.
 */
export function PerspectiveEnforcer({ perspective }: { perspective: Perspective }) {
  const setPerspective = usePerspectiveStore((state) => state.setPerspective);

  useEffect(() => {
    setPerspective(perspective);
  }, [perspective, setPerspective]);

  return null;
}
