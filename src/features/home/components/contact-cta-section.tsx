import * as React from "react";
import { profile } from "../../../../content/profile/profile";
import { Card } from "@/shared/components/card/card";
import { Button } from "@/shared/components/button/button";
import { StaggeredSection, StaggeredItem } from "./staggered-section";

export function ContactCTASection() {
  return (
    <StaggeredSection
      className="w-full flex flex-col gap-6 scroll-mt-24"
    >
      <div id="contact" className="absolute -translate-y-24" aria-hidden="true" />
      <StaggeredItem>
        <Card
          variant="elevated"
          className="relative overflow-hidden p-8 md:p-12 border-border/80 flex flex-col items-center text-center gap-6"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[250px] -z-10 blur-3xl opacity-20"
            style={{
              background: "radial-gradient(ellipse at center, var(--color-primary), transparent 70%)",
            }}
          />

          <div className="flex flex-col gap-3 max-w-2xl">
            <h2 
              id="contact-cta-heading" 
              className="text-3xl md:text-4xl font-bold tracking-tight text-text"
            >
              Let&apos;s Build Something Scalable
            </h2>
            <p className="text-base md:text-lg text-muted leading-relaxed">
              Interested in backend architecture, modular systems, or full-stack collaboration? 
              Reach out directly or connect across platforms.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a href={`mailto:${profile.email}`}>
              <Button variant="primary" size="lg" className="font-semibold shadow-sm">
                Contact via Email
              </Button>
            </a>

            {profile.resumeUrl && (
              <a 
                href={profile.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" className="font-semibold">
                  Download Resume
                </Button>
              </a>
            )}

            <a 
              href={profile.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="lg" className="font-semibold text-text hover:text-primary">
                Connect on LinkedIn →
              </Button>
            </a>
          </div>
        </Card>
      </StaggeredItem>
    </StaggeredSection>
  );
}
