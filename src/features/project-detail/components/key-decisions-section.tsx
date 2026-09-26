import * as React from "react";
import type { ProjectArchitecture } from "@/lib/validation/project.schema";

interface KeyDecisionsSectionProps {
  architecture?: ProjectArchitecture;
}

/**
 * Scannable architecture decisions from frontmatter (docs/14 §5 "architecture").
 * Sits above the long-form `# Architecture` MDX in the Engineer perspective.
 * Server Component: content only, no client JS.
 */
export function KeyDecisionsSection({ architecture }: KeyDecisionsSectionProps) {
  // Graceful degradation: older case studies may not have the block yet.
  if (!architecture || architecture.decisions.length === 0) return null;

  return (
    <section aria-labelledby="key-decisions-heading" className="mb-12">
      <h2 id="key-decisions-heading" className="mb-2 font-sans text-2xl font-bold tracking-tight text-foreground">
        Key Decisions
      </h2>
      <p className="mb-6 text-muted leading-relaxed">{architecture.summary}</p>

      <ol className="grid grid-cols-1 gap-4">
        {architecture.decisions.map((decision, index) => (
          <li
            key={decision.title}
            className="rounded-xl border border-border bg-surface/30 p-5 flex gap-4"
          >
            <span
              aria-hidden="true"
              className="shrink-0 font-mono text-sm text-primary pt-0.5"
            >
              0{index + 1}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-text">{decision.title}</h3>
              <dl className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted pt-0.5">Choice</dt>
                <dd className="text-text/90">{decision.choice}</dd>
                <dt className="font-mono text-[11px] uppercase tracking-wider text-muted pt-0.5">Trade-off</dt>
                <dd className="text-muted">{decision.tradeoff}</dd>
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
