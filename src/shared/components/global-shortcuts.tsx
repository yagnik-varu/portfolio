"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { profile } from "../../../content/profile/profile";

// const THEMES = [
//   { name: "Emerald", hex: "#10b981" },
//   { name: "Electric Blue", hex: "#3b82f6" },
//   { name: "Neon Violet", hex: "#8b5cf6" },
//   { name: "Vibrant Amber", hex: "#f59e0b" },
//   { name: "Crimson Rose", hex: "#f43f5e" },
//   { name: "Cyberpunk Pink", hex: "#ec4899" },
//   { name: "Mint Green", hex: "#14b8a6" },
//   { name: "Sunset Orange", hex: "#f97316" },
//   { name: "Arctic Cyan", hex: "#06b6d4" },
//   { name: "Hacker Terminal", hex: "#84cc16" }
// ];

// const THEMES = [
//   { name: "Emerald Pro", hex: "#10b981" },
//   { name: "Royal Sapphire", hex: "#2563eb" },
//   { name: "Deep Violet", hex: "#7c3aed" },
//   { name: "Electric Indigo", hex: "#6366f1" },
//   { name: "Cyber Cyan", hex: "#06b6d4" },
//   { name: "Aurora Green", hex: "#22c55e" },
//   { name: "Neon Lime", hex: "#84cc16" },
//   { name: "Sunset Gold", hex: "#f59e0b" },
//   { name: "Volcanic Orange", hex: "#f97316" },
//   { name: "Ruby Red", hex: "#ef4444" },
//   { name: "Rose Fusion", hex: "#f43f5e" },
//   { name: "Magenta Pulse", hex: "#d946ef" },
//   { name: "Arctic Blue", hex: "#38bdf8" },
//   { name: "Plasma Purple", hex: "#a855f7" },
//   { name: "Matrix Green", hex: "#00ff88" }
// ];

// const THEMES = [
//   { name: "Laser Lime", hex: "#a3ff12" }, // hyper-saturated yellow-green, sharper than lime-500
//   { name: "Cobalt Blaze", hex: "#1e6fff" }, // punchier, more saturated than royal/electric blue
//   { name: "Hyper Violet", hex: "#9d4dff" }, // brighter/cooler than deep violet or plasma purple
//   { name: "Signal Teal", hex: "#00e0c6" }, // vivid cyan-teal, more distinct than cyber cyan
//   { name: "Molten Coral", hex: "#ff5f4d" }, // bright warm red-orange, punchier than ruby/rose
//   { name: "Solar Amber", hex: "#ffb020" }, // saturated gold-orange, warmer/brighter than sunset gold
//   { name: "Ion Pink", hex: "#ff3ea5" }, // hot pink-magenta, more electric than rose fusion
//   { name: "Reactor Green", hex: "#00ffa3" }, // bright mint-green, close to matrix green but less "hacker"
//   { name: "Ultraviolet", hex: "#c04dff" }, // bright blue-purple, distinct from indigo/violet
//   { name: "Flash Yellow", hex: "#f4ff2e" }, // near-neon yellow, rarely used as a portfolio primary
//   { name: "Vivid Sky", hex: "#22c9ff" }, // brighter, more saturated than arctic blue
//   { name: "Hot Tangerine", hex: "#ff7a1a" }, // more saturated than volcanic orange, less common
// ];


const THEMES = [
  { "name": "Electric Purple", "hex": "#6C5CE7" },
  { "name": "Neon Pink", "hex": "#FF007F" },
  { "name": "Cyan Flare", "hex": "#00CEC9" },
  { "name": "Hot Coral", "hex": "#FF4757" },
  { "name": "Bright Sunflower", "hex": "#FFA502" },
  { "name": "Vivid Teal", "hex": "#10AC84" },
  { "name": "Vibrant Orange", "hex": "#FF6B6B" },
  { "name": "Magenta Fusion", "hex": "#D63031" },
  { "name": "Electric Violet", "hex": "#E056FD" },
  { "name": "Acid Lime", "hex": "#CCFF00" },
  { "name": "Hyper Blue", "hex": "#0047FF" }
]


export function GlobalShortcuts() {
  const router = useRouter();
  const [themeIndex, setThemeIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState<React.ReactNode>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Ignore if modifier keys are pressed (e.g. Ctrl+R, Cmd+R for refresh)
      if (e.ctrlKey || e.metaKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();

      // 'c' or 'C' key - Change Color
      if (key === 'c') {
        setThemeIndex((prev) => {
          const nextIndex = (prev + 1) % THEMES.length;
          const nextTheme = THEMES[nextIndex];

          document.documentElement.style.setProperty('--color-primary-base', nextTheme.hex);
          
          setToastMessage(
            <>
              <div 
                className="w-3 h-3 rounded-full shadow-sm"
                style={{ backgroundColor: nextTheme.hex }}
              />
              <span>Theme: {nextTheme.name}</span>
            </>
          );
          setShowToast(true);

          return nextIndex;
        });
        return;
      }

      // 'r' or 'R' key - Resume
      if (key === 'r') {
        if (profile.resumeUrl) {
          window.open(profile.resumeUrl, "_blank");
          setToastMessage(<span>Opening Resume...</span>);
          setShowToast(true);
        }
        return;
      }

      // 'h' or 'H' key - Home
      if (key === 'h') {
        router.push('/');
        setToastMessage(<span>Navigating to Home</span>);
        setShowToast(true);
        return;
      }

      // 'p' or 'P' key - Projects
      if (key === 'p') {
        router.push('/projects');
        setToastMessage(<span>Navigating to Projects</span>);
        setShowToast(true);
        return;
      }

      // 'a' or 'A' key - Architecture Lab
      if (key === 'a') {
        router.push('/architecture-lab');
        setToastMessage(<span>Navigating to Architecture Lab</span>);
        setShowToast(true);
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast, themeIndex, toastMessage]);

  if (!showToast) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300 pointer-events-none">
      <div className="bg-surface/90 backdrop-blur-sm border border-border px-4 py-2 rounded-full shadow-lg flex items-center gap-3">
        <span className="text-sm font-medium font-mono text-text flex items-center gap-3">
          {toastMessage}
        </span>
      </div>
    </div>
  );
}
