"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "./navigation";
import { PerspectiveToggle } from "@/features/perspective/components/perspective-toggle";
import { usePerspectiveStore } from "@/domains/perspective/store";
import { useState } from "react";
import { Menu } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

export function Header() {
  const perspective = usePerspectiveStore((state) => state.perspective);
  const setPerspective = usePerspectiveStore((state) => state.setPerspective);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useMotionPreference();

  const { scrollY } = useScroll();
  // Dynamic floating pill styles based on scroll
  const headerWidth = useTransform(scrollY, [0, 100], ["100%", "95%"]);
  const headerY = useTransform(scrollY, [0, 100], [0, 8]);
  const headerShadow = useTransform(
    scrollY,
    [0, 100],
    [
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
    ]
  );
  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(24, 24, 27, 0.4)", "rgba(24, 24, 27, 0.7)"] // bg-surface with varying opacity
  );

  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 md:px-6 pointer-events-none">
        <motion.header
          style={
            shouldReduceMotion
              ? {}
              : {
                  width: headerWidth,
                  y: headerY,
                  boxShadow: headerShadow,
                  backgroundColor: headerBg,
                }
          }
          className="pointer-events-auto flex h-16 w-full max-w-5xl items-center justify-between rounded-full border border-white/[0.08] backdrop-blur-2xl px-6 transition-colors"
        >
          <Link href="/" className="font-bold tracking-tight text-text text-lg hover:text-primary transition-colors">
            Yagnik Varu
          </Link>

          {/* Desktop Navigation */}
          <Navigation perspective={perspective} className="hidden md:flex flex-1 justify-center" />

          <div className="flex items-center gap-4">
            {/* Perspective Toggle (Responsive compound component) */}
            <PerspectiveToggle perspective={perspective} onChange={setPerspective} />

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-muted hover:text-primary transition-colors focus:outline-none rounded-full"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </motion.header>
      </div>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        perspective={perspective} 
      />
    </>
  );
}
