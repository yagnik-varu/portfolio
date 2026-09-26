import { perspectiveSchema } from "@/lib/validation/perspective.schema";
import type { Perspective } from "./types";

/**
 * Routes that only make sense in the Engineer perspective. Visiting one of
 * them switches the perspective automatically (docs/02 §7: "capabilities
 * unlocked", routes themselves stay public and shareable).
 */
export const ENGINEER_ROUTES = ["/architecture-lab", "/telemetry"] as const;

export function isEngineerRoute(pathname: string): boolean {
  return ENGINEER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

export interface ResolvePerspectiveInput {
  /** Raw `?perspective=` query value, if any. */
  param: string | null;
  /** Request pathname, e.g. "/projects/hisaabsync". */
  pathname: string;
  /** Raw cookie value, if any. */
  cookie: string | null;
}

function parseOrNull(value: string | null): Perspective | null {
  if (!value) return null;
  const parsed = perspectiveSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

/**
 * Single source of truth for "which perspective should this request render?"
 *
 * Precedence: valid URL param > engineer-only route > valid cookie > overview.
 * Invalid values never throw; they simply fall through to the next source
 * (AGENT.md §5: invalid perspective must silently fall back to overview).
 *
 * Pure function so it can run in the proxy (edge), on the server and in tests.
 */
export function resolvePerspective({
  param,
  pathname,
  cookie,
}: ResolvePerspectiveInput): Perspective {
  const fromParam = parseOrNull(param);
  if (fromParam) return fromParam;

  if (isEngineerRoute(pathname)) return "architecture";

  const fromCookie = parseOrNull(cookie);
  if (fromCookie) return fromCookie;

  return "overview";
}
