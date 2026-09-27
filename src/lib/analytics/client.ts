import type { PostHog } from "posthog-js";
import {
  ANALYTICS_ATTR_EVENT,
  ANALYTICS_ATTR_PROP_PREFIX,
  type AnalyticsEventName,
  type AnalyticsEvents,
} from "./events";

/**
 * Thin, failure-proof wrapper around PostHog (docs/19-analytics.md).
 *
 * Design rules:
 * - **Never break the site.** Every call is a no-op when the key is missing,
 *   outside production, or if PostHog fails to load. All calls are wrapped.
 * - **Load late.** The ~50 KB SDK is imported dynamically after the browser is
 *   idle, so it never competes with first paint or hydration.
 * - **Never lose early events.** Calls made before the SDK finishes loading
 *   are queued and replayed.
 * - **Cookieless.** `cookieless_mode: "always"` sets no cookies and uses no
 *   storage, so no consent banner is needed. Must also be enabled in the
 *   PostHog project settings, or events are dropped.
 */

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const REGION = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

/** Same-origin path, rewritten to PostHog in next.config.ts (dodges ad blockers). */
export const ANALYTICS_INGEST_PATH = "/ingest";

type QueuedCall = (posthog: PostHog) => void;

let client: PostHog | null = null;
let initStarted = false;
const queue: QueuedCall[] = [];

export function isAnalyticsEnabled(): boolean {
  return Boolean(KEY) && process.env.NODE_ENV === "production";
}

function run(call: QueuedCall): void {
  if (!isAnalyticsEnabled() || typeof window === "undefined") return;
  if (client) {
    try {
      call(client);
    } catch (error) {
      console.warn("[analytics] call failed", error);
    }
    return;
  }
  queue.push(call);
}

/** Read utm_* from the landing URL so every event in this visit carries them. */
function readUtmParams(): Record<string, string> {
  const utm: Record<string, string> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const [key, value] of params) {
      if (key.startsWith("utm_") && value) utm[key] = value;
    }
  } catch {
    // Malformed URL: attribution is a nice-to-have.
  }
  return utm;
}

function onDocumentClick(event: MouseEvent): void {
  const target = event.target as Element | null;
  const el = target?.closest?.(`[${ANALYTICS_ATTR_EVENT}]`);
  if (!el) return;

  const name = el.getAttribute(ANALYTICS_ATTR_EVENT) as AnalyticsEventName | null;
  if (!name) return;

  const properties: Record<string, string> = {};
  for (const attr of Array.from(el.attributes)) {
    if (attr.name === ANALYTICS_ATTR_EVENT) continue;
    if (!attr.name.startsWith(ANALYTICS_ATTR_PROP_PREFIX)) continue;
    const key = attr.name.slice(ANALYTICS_ATTR_PROP_PREFIX.length).replace(/-/g, "_");
    properties[key] = attr.value;
  }
  run((posthog) => posthog.capture(name, properties));
}

/** Called once from src/instrumentation-client.ts. */
export function initAnalytics(): void {
  if (initStarted || !isAnalyticsEnabled() || typeof window === "undefined") return;
  initStarted = true;

  // Capture phase so clicks on links that navigate away are still seen.
  document.addEventListener("click", onDocumentClick, { capture: true });

  const utm = readUtmParams();

  const load = () => {
    import("posthog-js")
      .then(({ default: posthog }) => {
        posthog.init(KEY as string, {
          api_host: ANALYTICS_INGEST_PATH,
          ui_host: REGION === "eu" ? "https://eu.posthog.com" : "https://us.posthog.com",
          defaults: "2026-08-30", // includes capture_pageview: "history_change" for App Router
          cookieless_mode: "always",
          person_profiles: "identified_only",
          capture_pageleave: true,
        });
        if (Object.keys(utm).length > 0) posthog.register(utm);
        client = posthog;
        for (const call of queue.splice(0)) {
          try {
            call(posthog);
          } catch (error) {
            console.warn("[analytics] queued call failed", error);
          }
        }
      })
      .catch((error) => {
        // Blocked or offline: the site works exactly the same without it.
        console.warn("[analytics] PostHog failed to load", error);
        queue.length = 0;
      });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(load, { timeout: 3000 });
  } else {
    setTimeout(load, 1500);
  }
}

/** Send a typed custom event. Safe to call anywhere on the client. */
export function track<E extends AnalyticsEventName>(
  event: E,
  properties: AnalyticsEvents[E]
): void {
  run((posthog) => posthog.capture(event, properties));
}

/**
 * Properties attached to every later event (e.g. current perspective), so any
 * chart can be split by "Recruiter vs Engineer" without extra work.
 */
export function setAnalyticsContext(properties: Record<string, string>): void {
  run((posthog) => posthog.register(properties));
}
