"use client";

import { useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { usePerspectiveStore } from "./store";
import { perspectiveSchema } from "@/lib/validation/perspective.schema";
import { usePerspectiveShortcut } from "@/features/perspective/hooks/use-perspective-shortcut";

function SyncLogic() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const perspective = usePerspectiveStore((state) => state.perspective);
  const setPerspective = usePerspectiveStore((state) => state.setPerspective);
  const isInitialized = useRef(false);

  // Initialize global keyboard shortcut (Shift + P)
  usePerspectiveShortcut();

  // Initialize from URL on mount
  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      const param = searchParams.get("perspective");

      if (param) {
        const parsed = perspectiveSchema.safeParse(param);
        if (parsed.success) {
          setPerspective(parsed.data);
        } else {
          console.warn(
            `[PerspectiveSync] Invalid URL param: "${param}". Falling back to 'overview'.`
          );
          // Fall back gracefully without crashing
          setPerspective("overview");
        }
      }
    }
  }, [searchParams, setPerspective]);

  // Sync store changes to the URL
  useEffect(() => {
    if (!isInitialized.current) return;

    const currentParam = searchParams.get("perspective");

    // Do not force '?perspective=overview' if it's already missing to keep URLs clean
    if (perspective === "overview" && !currentParam) {
      return;
    }

    // Do nothing if it's already perfectly in sync
    if (perspective === currentParam) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    if (perspective === "overview") {
      params.delete("perspective");
    } else {
      params.set("perspective", perspective);
    }

    const newQuery = params.toString();
    const newUrl = newQuery ? `${pathname}?${newQuery}` : pathname;

    // Use replace to update URL without adding garbage to browser history
    router.replace(newUrl, { scroll: false });
  }, [perspective, pathname, searchParams, router]);

  
  // Sync typography class to document root
  useEffect(() => {
    if (perspective === "architecture") {
      document.documentElement.classList.add("perspective-architecture");
    } else {
      document.documentElement.classList.remove("perspective-architecture");
    }
  }, [perspective]);

  return null;
}

export function PerspectiveSync() {
  return (
    <Suspense fallback={null}>
      <SyncLogic />
    </Suspense>
  );
}
