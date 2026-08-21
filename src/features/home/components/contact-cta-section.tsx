"use client";

import React, { useRef } from "react";
import { profile } from "../../../../content/profile/profile";
import { Card } from "@/shared/components/card/card";
import { Button } from "@/shared/components/button/button";
import { StaggeredSection, StaggeredItem } from "./staggered-section";
import { MagneticWrapper } from "@/shared/components/magnetic-wrapper";

export function ContactCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--x", `${x}px`);
    containerRef.current.style.setProperty("--y", `${y}px`);
  };

  return (
    <div
      id="contact"
      className="w-full flex flex-col items-start gap-12 pt-16 border-t border-white/10 scroll-mt-24"
    >
      <div className="flex flex-col gap-4 max-w-3xl">
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative group w-fit"
        >
          <h2 
            id="contact-cta-heading" 
            className="text-5xl md:text-7xl font-black tracking-tighter text-text leading-[0.9] transition-opacity duration-300 group-hover:opacity-20"
          >
            Let&apos;s Build Something Scalable
          </h2>
          <h2 
            className="absolute inset-0 text-5xl md:text-7xl font-black tracking-tighter text-primary leading-[0.9] pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            style={{ 
              maskImage: `radial-gradient(150px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`,
              WebkitMaskImage: `radial-gradient(150px circle at var(--x, 50%) var(--y, 50%), black 0%, transparent 100%)`
            }}
            aria-hidden="true"
          >
            Let&apos;s Build Something Scalable
          </h2>
        </div>
            <p className="text-lg md:text-xl text-muted/90 leading-relaxed font-light">
              Interested in backend architecture, modular systems, or full-stack collaboration? 
              Reach out directly or connect across platforms.
            </p>
          </div>

        <div className="flex flex-wrap items-center gap-6">
          <MagneticWrapper strength={15}>
            <a href={`mailto:${profile.email}`} className="block">
              <Button variant="primary" size="lg" className="h-16 px-10 text-lg rounded-none bg-text text-background hover:bg-[#EA4335] hover:text-white transition-colors duration-300">
                Contact via Email
              </Button>
            </a>
          </MagneticWrapper>

            {profile.resumeUrl && (
            <MagneticWrapper strength={15}>
              <a 
                href={profile.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" size="lg" className="h-16 px-10 text-lg rounded-none border-text text-text hover:bg-surface transition-colors duration-300">
                  Download Resume
                </Button>
              </a>
            </MagneticWrapper>
            )}

          {profile.githubUrl && (
            <MagneticWrapper strength={10}>
              <a 
                href={profile.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="ghost" size="lg" className="h-16 px-10 text-lg rounded-none text-text hover:bg-[#24292e] hover:text-white transition-colors duration-300">
                  GitHub Profile
                </Button>
              </a>
            </MagneticWrapper>
          )}

          <MagneticWrapper strength={10}>
            <a 
              href={profile.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <Button variant="ghost" size="lg" className="h-16 px-10 text-lg rounded-none text-text hover:bg-[#0A66C2] hover:text-white transition-colors duration-300">
                Connect on LinkedIn →
              </Button>
            </a>
          </MagneticWrapper>
        </div>
    </div>
  );
}
