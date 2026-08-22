import { profile } from "../../../../content/profile/profile";
import { PetToggleFooterLink } from "@/features/portfolio-pet/components/pet-toggle-footer-link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-surface py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <p className="text-sm text-muted">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
          <div className="text-xs text-muted/60 font-mono flex flex-wrap gap-x-2 gap-y-1">
            <span>Press <kbd className="px-1 py-0.5 rounded-sm bg-border/50 border border-border/80 font-mono text-[10px] text-text">C</kbd> to cycle theme</span>
            <span>&bull;</span>
            <span><kbd className="px-1 py-0.5 rounded-sm bg-border/50 border border-border/80 font-mono text-[10px] text-text">R</kbd> for Resume</span>
            <span>&bull;</span>
            <span><kbd className="px-1 py-0.5 rounded-sm bg-border/50 border border-border/80 font-mono text-[10px] text-text">H</kbd> <kbd className="px-1 py-0.5 rounded-sm bg-border/50 border border-border/80 font-mono text-[10px] text-text">P</kbd> <kbd className="px-1 py-0.5 rounded-sm bg-border/50 border border-border/80 font-mono text-[10px] text-text">A</kbd> to navigate</span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="text-sm font-medium text-muted hover:text-primary transition-colors"
          >
            Email
          </a>
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              Resume
            </a>
          )}
          <PetToggleFooterLink />
        </nav>
      </div>
    </footer>
  );
}
