import type { NextConfig } from "next";

// PostHog reverse proxy (docs/19-analytics.md). Analytics requests go to our
// own domain under /ingest and are rewritten to PostHog, so privacy/ad-block
// lists that block *.posthog.com don't silently drop visitors.
const posthogRegion = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `https://${posthogRegion}-assets.i.posthog.com/static/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `https://${posthogRegion}.i.posthog.com/:path*`,
      },
    ];
  },
  // PostHog API paths end with a trailing slash (e.g. /ingest/e/); don't
  // redirect them away.
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
