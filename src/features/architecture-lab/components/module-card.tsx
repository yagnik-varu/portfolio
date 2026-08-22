import * as React from "react";
import Link from "next/link";
import type { EngineeringModule } from "@/lib/validation/engineering-module.schema";

interface ModuleCardProps {
  module: EngineeringModule;
  actionText?: string;
}

export function ModuleCard({ module, actionText = "Explore →" }: ModuleCardProps) {
  return (
    <Link
      href={module.route}
      className="block h-full focus:outline-none focus:ring-2 focus:ring-primary rounded-lg group"
    >
      <div
        className="relative p-6 sm:p-8 flex flex-col justify-between gap-6 h-full rounded-2xl border border-white/5 bg-surface/30 hover:bg-surface/60 hover:border-white/10 hover:-translate-y-1 hover:shadow-2xl transition-all duration-500 overflow-hidden group/card"
      >
        {/* Subtle top gradient accent on hover */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
        
        <div className="flex flex-col gap-3 relative z-10">
          <h3 className="text-xl font-bold font-sans text-text group-hover:text-primary transition-colors duration-300">
            {module.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed font-sans line-clamp-3">
            {module.description}
          </p>
        </div>

        <div className="pt-4 mt-auto text-sm font-mono font-medium text-muted flex items-center gap-2 group-hover:text-primary transition-colors duration-300 relative z-10">
          {actionText}
          <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
        </div>
      </div>
    </Link>
  );
}
