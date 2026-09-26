import type { Perspective } from "./types";

/**
 * Cookie contract shared by the proxy (server) and the client sync.
 * Not httpOnly on purpose: the client writes it directly on every switch so
 * the next full page load renders the remembered perspective.
 */
export const PERSPECTIVE_COOKIE = "perspective";
export const PERSPECTIVE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

/** Request header the proxy uses to hand the resolved perspective to the layout. */
export const PERSPECTIVE_HEADER = "x-perspective";

export function writePerspectiveCookie(perspective: Perspective): void {
  if (typeof document === "undefined") return;
  try {
    document.cookie = `${PERSPECTIVE_COOKIE}=${perspective}; Path=/; Max-Age=${PERSPECTIVE_COOKIE_MAX_AGE}; SameSite=Lax`;
  } catch {
    // Cookies can be blocked (privacy modes). The perspective still works for
    // this page; it just won't be remembered. Never crash for persistence.
  }
}
