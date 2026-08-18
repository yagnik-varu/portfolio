"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "../../../../content/navigation/navigation";
import { isItemVisible } from "@/domains/perspective/visibility";
import type { Perspective } from "@/domains/perspective/types";

interface NavigationProps {
  perspective: Perspective;
  className?: string;
}

export function Navigation({ perspective, className = "" }: NavigationProps) {
  const pathname = usePathname();

  // Filter items using pure domain logic based on the active perspective
  const visibleItems = navigation.filter((item) =>
    isItemVisible(item.perspectives, perspective)
  );

  return (
    <nav className={`flex items-center gap-6 ${className}`}>
      {visibleItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname?.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={isActive ? "true" : undefined}
            className={`nav-link text-sm font-medium transition-colors hover:text-primary ${
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
