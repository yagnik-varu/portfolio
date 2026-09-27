import { BriefcaseBusiness, CodeXml, type LucideIcon } from "lucide-react";
import type { Perspective } from "@/domains/perspective/types";

/**
 * Presentation-only: the icon that represents each lens in the switch.
 * Kept out of the content config because icons are UI, not data.
 */
export const PERSPECTIVE_ICONS: Record<Perspective, LucideIcon> = {
  overview: BriefcaseBusiness,
  architecture: CodeXml,
};
