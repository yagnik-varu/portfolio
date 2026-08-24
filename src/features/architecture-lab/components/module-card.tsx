import * as React from "react";
import Link from "next/link";
import type { EngineeringModule } from "@/lib/validation/engineering-module.schema";

interface ModuleCardProps {
  module: EngineeringModule;
  actionText?: string;
}

export function ModuleCard({ module, actionText = "Explore" }: ModuleCardProps) {
  return (
    <Link
      href={module.route}
      className="block h-full rounded-lg group"
    >
      <div
        className="relative p-6 sm:p-8 flex flex-col justify-between gap-6 h-full rounded-2xl border border-white/5 bg-surface/30 group-hover:bg-surface/60 group-focus:bg-surface/60 group-hover:border-white/10 group-focus:border-white/10 group-hover:-translate-y-1 group-focus:-translate-y-1 group-hover:shadow-2xl group-focus:shadow-2xl transition-all duration-500 overflow-hidden"
      >
        {/* Subtle top gradient accent on hover */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500" />
        
        <div className="flex flex-col gap-3 relative z-10">
          <h3 className="text-xl font-bold font-sans text-text group-hover:text-primary group-focus:text-primary transition-colors duration-300">
            {module.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed font-sans line-clamp-3">
            {module.description}
          </p>
        </div>

        <div className="pt-4 mt-auto text-sm font-mono font-medium text-muted flex items-center gap-2 group-hover:text-primary group-focus:text-primary transition-colors duration-300 relative z-10">
          {actionText}
          <span aria-hidden="true" className="group-hover:translate-x-1 group-focus:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  );
}
