import { perspectives } from "../../../content/perspectives/perspectives";
import type { Perspective, PerspectiveConfig } from "./types";

/**
 * Pure lookup helpers over the perspective content config.
 * Domain layer: no React, no UI. Consumers get copy from here instead of
 * hardcoding "Overview" / "Architecture" strings.
 */
export function getPerspectiveConfig(id: Perspective): PerspectiveConfig {
  const config = perspectives.find((p) => p.id === id);
  if (!config) {
    // Content bug: fail loudly at build/dev time rather than render blanks.
    throw new Error(`[perspective] No config found for perspective "${id}".`);
  }
  return config;
}

export function getOtherPerspective(id: Perspective): Perspective {
  return id === "overview" ? "architecture" : "overview";
}

export function getPerspectiveLabel(id: Perspective): string {
  return getPerspectiveConfig(id).label;
}
