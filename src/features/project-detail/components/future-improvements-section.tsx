import * as React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx/mdx-components";

interface FutureImprovementsSectionProps {
  content: string;
}

export function FutureImprovementsSection({ content }: FutureImprovementsSectionProps) {
  if (!content) return null;

  return (
    <section className="mb-12">
      <h2 className="mb-6 font-sans text-2xl font-bold tracking-tight text-foreground">
        Future Improvements
      </h2>
      <div className="text-text">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </section>
  );
}
