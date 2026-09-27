/**
 * The analytics event catalogue: every custom event the site sends, and the
 * properties each one carries. One typed list means a typo is a compile error,
 * not a silently-split chart in PostHog.
 *
 * Pageviews, referrers and UTM parameters are captured automatically by
 * PostHog; this file only covers the *behaviour* we care about.
 *
 * Pure module (no "use client"): Server Components use `analyticsAttrs()` to
 * tag links, and the client module reads those attributes on click.
 */

export type PerspectiveSwitchSource =
  | "toggle" // header segmented control
  | "shortcut" // Shift+P
  | "intro_dialog" // first-visit chooser
  | "hero_cta" // homepage hero buttons
  | "project_teaser" // Recruiter-mode teaser on a project page
  | "route" // auto-switch on /architecture-lab, /telemetry
  | "url"; // ?perspective= on a client-side navigation

export type LinkLocation = "contact_section" | "footer" | "shortcut" | "project_hero";

export interface AnalyticsEvents {
  perspective_switched: {
    from: "overview" | "architecture";
    to: "overview" | "architecture";
    source: PerspectiveSwitchSource;
  };
  intro_dialog_closed: {
    choice: "continue" | "switch" | "dismiss";
    shown_as: "overview" | "architecture";
  };
  resume_downloaded: { location: LinkLocation };
  contact_clicked: { channel: "email" | "linkedin" | "github"; location: LinkLocation };
  project_link_clicked: { slug: string; link: "repository" | "live" };
}

export type AnalyticsEventName = keyof AnalyticsEvents;

/** Prefix for declarative click tracking. */
export const ANALYTICS_ATTR_EVENT = "data-analytics-event";
export const ANALYTICS_ATTR_PROP_PREFIX = "data-analytics-";

/**
 * Declarative click tracking for Server Components (no "use client" needed):
 *
 *   <a href={resumeUrl} {...analyticsAttrs("resume_downloaded", { location: "footer" })}>
 *
 * A single delegated click listener (see client.ts) turns these attributes
 * back into a typed event.
 */
export function analyticsAttrs<E extends AnalyticsEventName>(
  event: E,
  properties: AnalyticsEvents[E]
): Record<string, string> {
  const attrs: Record<string, string> = { [ANALYTICS_ATTR_EVENT]: event };
  for (const [key, value] of Object.entries(properties)) {
    attrs[`${ANALYTICS_ATTR_PROP_PREFIX}${key.replace(/_/g, "-")}`] = String(value);
  }
  return attrs;
}
