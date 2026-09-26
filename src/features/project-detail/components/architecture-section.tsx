import * as React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx/mdx-components";

interface ArchitectureSectionProps {
  content: string;
}

/**
 * Long-form `# Architecture` MDX. Visibility is decided by the
 * <PerspectiveGater /> in the page, not here.
 */
export function ArchitectureSection({ content }: ArchitectureSectionProps) {
  if (!content) return null;

  return (
    <section className="mb-12 rounded-xl border border-border bg-surface/30 p-6 md:p-8">
      <h2 className="mb-6 font-sans text-2xl font-bold tracking-tight text-foreground">
        Architecture
      </h2>
      <div className="text-text">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </section>
  );
}
