"use client";

import { useState, useRef, useEffect } from "react";
import { usePetStore } from "../hooks/use-pet-store";

export function PetMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const setVisible = usePetStore((s) => s.setVisible);
  const menuRef = useRef<HTMLDivElement>(null);

  const hidePet = () => {
    try {
      localStorage.setItem("portfolio_pet_disabled", "true");
    } catch (e) {
      // Private browsing support
    }
    setVisible(false);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      window.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="absolute -top-2 -right-2 z-50" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-6 h-6 bg-surface border border-border rounded-full flex items-center justify-center text-muted hover:text-text shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-base"
        aria-label="Pet options"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Menu</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
      </button>

      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-32 bg-surface border border-border rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
          <button 
            onClick={hidePet}
            className="w-full text-left px-4 py-2 text-sm text-text hover:bg-muted/10 transition-colors"
          >
            Hide pet
          </button>
        </div>
      )}
    </div>
  );
}
