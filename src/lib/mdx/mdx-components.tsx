import * as React from "react";
import { cn } from "@/lib/utils/cn";

/**
 * A custom component for MDX authors to call out architectural decisions, trade-offs, or important notes.
 * Usage in MDX: <ArchitectureCallout title="Trade-off: Database Choice">We chose Postgres over Mongo because...</ArchitectureCallout>
 */
export function ArchitectureCallout({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("my-6 rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-text", className)}>
      {title && <div className="mb-2 font-mono font-bold text-primary">{title}</div>}
      <div className="prose-sm prose-p:leading-relaxed [&>p:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

/**
 * Component mapping object passed to next-mdx-remote or native MDX renderer.
 * This intercepts standard markdown elements and maps them to our Design System components.
 */
export const mdxComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn("mt-8 mb-4 font-sans text-3xl font-bold tracking-tight text-foreground", className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn("mt-8 mb-4 font-sans text-2xl font-bold tracking-tight text-foreground", className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn("mt-6 mb-3 font-sans text-xl font-bold tracking-tight text-foreground", className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn("mb-4 font-sans text-base leading-7 text-text", className)} {...props} />
  ),
  a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className={cn("font-medium text-primary underline underline-offset-4 hover:text-primary/80", className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("mb-4 ml-6 list-disc font-sans text-text space-y-2", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("mb-4 ml-6 list-decimal font-sans text-text space-y-2", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn("leading-7", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className={cn("mt-6 border-l-2 border-border pl-6 italic text-muted", className)} {...props} />
  ),
  // Inline code
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code className={cn("relative rounded bg-surface px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-text", className)} {...props} />
  ),
  // Code blocks
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className={cn("mb-4 mt-6 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-sm", className)} {...props} />
  ),
  // Custom MDX Components
  ArchitectureCallout,
};
