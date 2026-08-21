"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Navigation } from "./navigation";
import type { Perspective } from "@/domains/perspective/types";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useMotionPreference } from "@/shared/hooks/use-motion-preference";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  perspective: Perspective;
}

export function MobileMenu({ isOpen, onClose, perspective }: MobileMenuProps) {
  const shouldReduceMotion = useMotionPreference();

  // Prevent scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  };

  const menuVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut",
        staggerChildren: 0.1 
      } 
    },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-background/95 backdrop-blur-3xl"
          variants={shouldReduceMotion ? undefined : overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex h-24 items-center justify-end px-6">
            <button
              onClick={onClose}
              className="p-2 text-muted hover:text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          <motion.div 
            className="flex flex-1 flex-col items-center justify-center pb-24"
            variants={shouldReduceMotion ? undefined : menuVariants}
          >
            {/* 
              We reuse the Navigation component but style it vertically for mobile.
              We can pass a custom class to override the horizontal flex layout. 
            */}
            <div onClick={onClose} className="text-2xl text-center">
              <Navigation 
                perspective={perspective} 
                className="flex-col gap-10 !text-2xl" 
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
