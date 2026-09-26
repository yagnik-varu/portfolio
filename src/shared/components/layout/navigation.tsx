"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "../../../../content/navigation/navigation";
import { isItemVisible } from "@/domains/perspective/visibility";
import type { Perspective } from "@/domains/perspective/types";
import { cn } from "@/lib/utils/cn";

interface NavigationProps {
  perspective: Perspective;
  className?: string;
  onItemClick?: () => void;
}

export function Navigation({ perspective, className = "", onItemClick }: NavigationProps) {
  const pathname = usePathname();

  // Filter items using pure domain logic based on the active perspective
  const visibleItems = navigation.filter((item) =>
    isItemVisible(item.perspectives, perspective)
  );

  return (
    <nav className={cn("flex items-center gap-5 xl:gap-6", className)}>
      {visibleItems.map((item) => {
        const isActive =
          !item.href.includes("#") &&
          (pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href)));

        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={isActive ? "true" : undefined}
            onClick={() => {
              if (pathname === item.href) {
                window.dispatchEvent(new Event("trigger-scroll-top"));
              }
              onItemClick?.();
            }}
            className={`nav-link whitespace-nowrap text-sm font-medium transition-colors hover:text-primary rounded-md px-2 py-1 -mx-2 ${
              isActive ? "text-primary font-semibold" : "text-muted"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
