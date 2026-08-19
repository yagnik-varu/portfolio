import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** The controlled text value of the search input */
  value: string;
  /** Callback fired when the input value changes */
  onChange: (value: string) => void;
}

/**
 * A reusable, purely presentational search input component.
 * Maintains no internal state or search logic.
 */
export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value, onChange, placeholder = "Search...", ...props }, ref) => {
    return (
      <div className={cn("relative flex items-center w-full max-w-md", className)}>
        {/* Search Icon (Heroicons: magnifying-glass) */}
        <svg
          className="absolute left-3 h-4 w-4 text-muted pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

        <input
          ref={ref}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "flex h-10 w-full rounded-md border border-border bg-surface pl-9 pr-4 text-sm text-text",
            "transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
            "disabled:cursor-not-allowed disabled:opacity-50"
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";
