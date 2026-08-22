import { profile } from "../../../../content/profile/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border bg-surface py-8 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <p className="text-sm text-muted">
            &copy; {currentYear} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted/60 font-mono">
            Press <kbd className="px-1.5 py-0.5 rounded-sm bg-border/50 border border-border/80 font-mono text-[10px] text-text">C</kbd> to cycle theme colors
          </p>
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
        </nav>
      </div>
    </footer>
  );
}
