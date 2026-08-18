import type { Perspective } from "./types";

/**
 * Determines if a navigation item or generic feature is visible in the current perspective.
 * If no specific perspectives are defined, the item is globally visible.
 */
export function isItemVisible(
  itemPerspectives: Perspective[] | undefined,
  currentPerspective: Perspective
): boolean {
  if (!itemPerspectives || itemPerspectives.length === 0) {
    return true;
  }
  return itemPerspectives.includes(currentPerspective);
}

/**
 * Determines if an engineering module (e.g., Database Design, System Architecture)
 * is visible. These are strictly limited to the architecture perspective.
 */
export function isEngineeringModuleVisible(
  currentPerspective: Perspective
): boolean {
  return currentPerspective === "architecture";
}
