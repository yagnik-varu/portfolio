import { initAnalytics } from "@/lib/analytics/client";

/**
 * Runs once in the browser, before React hydrates (Next.js convention).
 * `initAnalytics` only registers a click listener synchronously; the PostHog
 * SDK itself is loaded later, when the browser is idle.
 */
try {
  initAnalytics();
} catch (error) {
  console.warn("[instrumentation-client] analytics init failed", error);
}
