'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export function CursorSpotlight() {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsHoverable(window.matchMedia("(hover: hover)").matches);
  }, []);

  useEffect(() => {
    if (!mounted || !isHoverable || prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted, isHoverable, prefersReducedMotion]);

  if (!mounted || !isHoverable || prefersReducedMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{
        background: `radial-gradient(400px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), color-mix(in srgb, var(--color-primary-500) 15%, transparent), transparent 100%)`
      }}
      aria-hidden="true"
    />
  );
}
