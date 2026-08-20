"use client";

import * as React from "react";
import type { Perspective } from "@/domains/perspective/types";
import { usePerspectiveStore } from "@/domains/perspective/store";

interface PerspectiveGaterProps {
  children: React.ReactNode;
  requiredPerspective: Perspective;
}

/**
 * A Client Component that conditionally renders its children based on the current perspective.
 * This allows Server Components to be passed as children and conditionally mounted in the DOM
 * without passing client state as props to Server Components.
 */
export function PerspectiveGater({ children, requiredPerspective }: PerspectiveGaterProps) {
  const perspective = usePerspectiveStore((state) => state.perspective);

  if (perspective !== requiredPerspective) {
    return null;
  }

  return <>{children}</>;
}
