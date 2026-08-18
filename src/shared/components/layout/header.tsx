"use client";

import Link from "next/link";
import { Navigation } from "./navigation";
import { PerspectiveToggle } from "@/features/perspective/components/perspective-toggle";
import { usePerspectiveStore } from "@/domains/perspective/store";

export function Header() {
  const perspective = usePerspectiveStore((state) => state.perspective);
  const setPerspective = usePerspectiveStore((state) => state.setPerspective);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="font-bold tracking-tight text-text text-lg">
          Yagnik Varu
        </Link>

        {/* Desktop Navigation */}
        <Navigation perspective={perspective} className="hidden md:flex flex-1 justify-center" />

        {/* Perspective Toggle (Responsive compound component) */}
        <PerspectiveToggle perspective={perspective} onChange={setPerspective} />
      </div>
    </header>
  );
}
