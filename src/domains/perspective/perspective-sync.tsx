"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { usePerspectiveStore, usePerspectiveStoreApi } from "./store-provider";
import { writePerspectiveCookie } from "./persistence";
import { perspectiveSchema } from "@/lib/validation/perspective.schema";
import { usePerspectiveShortcut } from "@/features/perspective/hooks/use-perspective-shortcut";
import { setAnalyticsContext, track } from "@/lib/analytics/client";

/**
 * Keeps three things in agreement after hydration:
 *   store  →  URL   (shareable links)
 *   store  →  cookie (remembered on the next full load)
 *   URL    →  store (client-side navigations that carry ?perspective=)
 *
 * The *initial* value is no longer read here: `src/proxy.ts` resolves it
 * before render and the layout seeds the store, so the first paint is right.
 */
function SyncLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const perspective = usePerspectiveStore((state) => state.perspective);
  // Imperative handle: lets the URL→store effect read the *current* value
  // without depending on it. (If it did depend on `perspective`, toggling to
  // Recruiter while the URL still said "architecture" would snap it back.)
  const storeApi = usePerspectiveStoreApi();

  usePerspectiveShortcut();

  // URL → store
  useEffect(() => {
    const param = searchParams.get("perspective");
    if (!param) return;

    const current = storeApi.getState().perspective;
    const parsed = perspectiveSchema.safeParse(param);
    if (!parsed.success) {
      console.warn(
        `[PerspectiveSync] Invalid URL param: "${param}". Falling back to '${current}'.`
      );
      return; // store→URL effect below cleans the bad param off the URL
    }
    if (parsed.data !== current) {
      storeApi.getState().setPerspective(parsed.data, "url");
    }
  }, [searchParams, storeApi]);

  // store → URL
  useEffect(() => {
    const currentParam = searchParams.get("perspective");

    // Keep Recruiter URLs clean: no param at all.
    if (perspective === "overview" && !currentParam) return;
    if (perspective === currentParam) return;

    const params = new URLSearchParams(searchParams.toString());
    if (perspective === "overview") {
      params.delete("perspective");
    } else {
      params.set("perspective", perspective);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [perspective, pathname, searchParams, router]);

  // store → cookie + <html> class (server sets both on full loads; this covers
  // client-side switches).
  useEffect(() => {
    writePerspectiveCookie(perspective);
    document.documentElement.classList.toggle(
      "perspective-architecture",
      perspective === "architecture"
    );
  }, [perspective]);

  // store → analytics. The single place switches are reported: call sites only
  // declare a `source`. Every later event also carries the current perspective,
  // so any PostHog chart can be split by Recruiter vs Engineer.
  const previousPerspective = useRef(perspective);
  useEffect(() => {
    setAnalyticsContext({ perspective });

    const from = previousPerspective.current;
    previousPerspective.current = perspective;
    if (from === perspective) return; // initial mount, not a switch

    track("perspective_switched", {
      from,
      to: perspective,
      source: storeApi.getState().lastSwitchSource ?? "toggle",
    });
  }, [perspective, storeApi]);

  return null;
}

export function PerspectiveSync() {
  return (
    <Suspense fallback={null}>
      <SyncLogic />
    </Suspense>
  );
}
