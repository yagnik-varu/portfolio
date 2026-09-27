# 19-analytics.md

# Analytics & Traffic Attribution

## Purpose

Answer three questions about visitors, without a cookie banner:

1. **Where did they come from?** Referrers plus UTM-tagged links.
2. **Which lens did they use?** Recruiter vs Engineer, and what made them switch.
3. **Did they act?** Resume downloads, contact clicks, project repo/live clicks.

---

# 1. Tools

| Tool | Role |
|---|---|
| **PostHog** (`posthog-js`) | Behaviour: custom events, funnels, UTM attribution |
| **Vercel Web Analytics** (`@vercel/analytics`) | Traffic overview and Core Web Vitals in the Vercel dashboard |

PostHog is the source of truth for behaviour. Vercel Analytics remains for
the zero-setup traffic view and Speed Insights.

---

# 2. How it is wired

```text
src/instrumentation-client.ts   → initAnalytics() once, before hydration
src/lib/analytics/events.ts      → typed event catalogue + analyticsAttrs()
src/lib/analytics/client.ts      → track(), setAnalyticsContext(), lazy PostHog load
next.config.ts                   → /ingest/* rewritten to PostHog (ad-block safe)
src/proxy.ts                     → matcher skips /ingest
```

Rules:

* **Never breaks the site.** No key, non-production build, blocked script, or
  offline: every call becomes a no-op.
* **Loads late.** The SDK is dynamically imported when the browser is idle.
  Events fired earlier are queued.
* **Cookieless.** `cookieless_mode: "always"`: no cookies, no local storage.
  Identity is a daily privacy-preserving hash computed by PostHog. Cookieless
  mode **must also be enabled in the PostHog project settings** or events are
  dropped.
* **Same-origin.** Requests go to `/ingest` on our own domain, so blocklists
  aimed at `*.posthog.com` do not undercount the engineers we most want to
  measure.

---

# 3. Event catalogue

Pageviews (`$pageview`, `$pageleave`), referrer and UTM parameters are captured
automatically. Every event also carries a `perspective` property with the lens
active at that moment.

| Event | Properties | Fired from |
|---|---|---|
| `perspective_switched` | `from`, `to`, `source` | `PerspectiveSync` (single reporting point) |
| `intro_dialog_closed` | `choice` (continue / switch / dismiss), `shown_as` | `PerspectiveIntroDialog` |
| `resume_downloaded` | `location` (contact_section / footer / shortcut) | Resume links, `R` shortcut |
| `contact_clicked` | `channel` (email / linkedin / github), `location` | Contact section, footer |
| `project_link_clicked` | `slug`, `link` (repository / live) | Project hero |

`perspective_switched.source` values: `toggle`, `shortcut`, `intro_dialog`,
`hero_cta`, `project_teaser`, `route`, `url`.

## Adding an event

1. Add it to `AnalyticsEvents` in `src/lib/analytics/events.ts`.
2. **Client component:** `track("event_name", { ...props })`.
3. **Server Component link:** spread `analyticsAttrs("event_name", { ...props })`
   onto the element. A delegated click listener sends it, so the component
   stays a Server Component.

---

# 4. UTM links

UTM parameters tell PostHog where a visitor came from when the referrer is
missing or vague (PDFs, apps, email, WhatsApp). They are read on the landing
page and attached to every event in that visit.

## Naming rules

* `utm_source`: **where** the link lives (`linkedin`, `github`, `resume`).
* `utm_medium`: **what kind** of placement (`profile`, `post`, `readme`, `pdf`).
* `utm_campaign`: optional, **which specific** one (`notifyme-launch`, a company name).
* Lowercase only, hyphens not spaces. `LinkedIn` and `linkedin` would be
  counted as two different sources.

## Ready-made links

Replace the domain if production differs from `NEXT_PUBLIC_APP_URL`.

| Where you paste it | Link |
|---|---|
| LinkedIn profile (website / Featured) | `https://yagnikvaru.dev/?utm_source=linkedin&utm_medium=profile` |
| LinkedIn post | `https://yagnikvaru.dev/?utm_source=linkedin&utm_medium=post&utm_campaign=<post-topic>` |
| GitHub profile README | `https://yagnikvaru.dev/?utm_source=github&utm_medium=profile` |
| A project repo README | `https://yagnikvaru.dev/projects/<slug>?utm_source=github&utm_medium=readme&utm_campaign=<slug>` |
| Resume PDF | `https://yagnikvaru.dev/?utm_source=resume&utm_medium=pdf` |
| Naukri profile | `https://yagnikvaru.dev/?utm_source=naukri&utm_medium=profile` |
| Job application email | `https://yagnikvaru.dev/?utm_source=email&utm_medium=application&utm_campaign=<company>` |
| Email signature | `https://yagnikvaru.dev/?utm_source=email&utm_medium=signature` |
| Instagram bio | `https://yagnikvaru.dev/?utm_source=instagram&utm_medium=bio` |
| WhatsApp message | `https://yagnikvaru.dev/?utm_source=whatsapp&utm_medium=message` |

UTM parameters combine with the perspective parameter. To send engineers
straight to Engineer view:

```text
https://yagnikvaru.dev/?perspective=architecture&utm_source=linkedin&utm_medium=post
```

---

# 5. Setup checklist

1. Create a free PostHog project (US or EU region).
2. **Project settings → enable cookieless tracking.** Required.
3. In Vercel → Project → Environment Variables (Production):
   * `NEXT_PUBLIC_POSTHOG_KEY` = the project API key (`phc_...`)
   * `NEXT_PUBLIC_POSTHOG_REGION` = `us` or `eu` (defaults to `us`)
4. Redeploy. `NEXT_PUBLIC_*` values are inlined at build time, so a redeploy
   is required after changing them.
5. Open the live site, click around, and check PostHog → Activity.

Local `npm run dev` never sends events. A local `npm start` does if the key is
set, so filter by `$host` if you test that way.

---

# 6. Where to look in PostHog

* **Web analytics** dashboard: visitors, top pages, channels, UTM sources.
* **Insight → Trends**, `resume_downloaded`, broken down by `utm_source`:
  which channel produces resume downloads.
* **Insight → Funnel**: `$pageview` → `perspective_switched` (to = architecture)
  → `project_link_clicked` or `resume_downloaded`.
* **Insight → Trends**, `intro_dialog_closed`, broken down by `choice`: whether
  the first-visit dialog helps or just gets dismissed.
