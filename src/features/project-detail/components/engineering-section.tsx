import * as React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/lib/mdx/mdx-components";
import { Badge } from "@/shared/components/badge/badge";
import type { EngineeringSection as DomainEngineeringSection } from "@/lib/mdx/section-splitter";

interface EngineeringSectionProps {
  section: DomainEngineeringSection;
}

export function EngineeringSection({ section }: EngineeringSectionProps) {
  return (
    <section className="rounded-xl border border-border bg-surface/30 p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h3 className="font-sans text-xl font-bold tracking-tight text-foreground">
          {section.title}
        </h3>
        {/* Reuse the existing architecture badge for a technical label */}
        <Badge variant="architecture" className="uppercase tracking-wider">
          {section.type.replace(/-/g, ' ')}
        </Badge>
      </div>
      <div className="text-text">
        <MDXRemote source={section.content} components={mdxComponents} />
      </div>
    </section>
  );
}
