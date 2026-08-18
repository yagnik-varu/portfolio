import * as React from "react";

import { cn } from "@/lib/utils/cn";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ className, title, description, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex flex-col gap-2", className)} {...props}>
        <h2 className="text-2xl font-bold tracking-tight text-text">{title}</h2>
        {description && <p className="text-base text-muted">{description}</p>}
      </div>
    );
  }
);
SectionHeader.displayName = "SectionHeader";

export { SectionHeader };
