import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDropdownProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  /** Accessible label for the dropdown */
  label: string;
  /** Available options to select */
  options: FilterOption[];
  /** Controlled value */
  value: string;
  /** Callback fired when a new option is selected */
  onChange: (value: string) => void;
  /** Hide the visual label (still accessible to screen readers) */
  hideLabel?: boolean;
}

/**
 * A reusable, purely presentational single-select filter dropdown.
 * 
 * Note: If future requirements necessitate multi-select capabilities, 
 * this component should be refactored or a separate MultiSelectDropdown 
 * component should be created, as native HTML selects are not ideal for 
 * accessible multi-select UX.
 */
export const FilterDropdown = React.forwardRef<HTMLSelectElement, FilterDropdownProps>(
  ({ label, options, value, onChange, hideLabel = false, className, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col gap-1.5 w-full max-w-[200px]", className)}>
        <label 
          htmlFor={props.id || label.toLowerCase().replace(/\s+/g, '-')} 
          className={cn(
            "text-xs font-semibold text-text",
            hideLabel && "sr-only"
          )}
        >
          {label}
        </label>
        
        <div className="relative">
          <select
            ref={ref}
            id={props.id || label.toLowerCase().replace(/\s+/g, '-')}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "appearance-none flex h-10 w-full rounded-md border border-border bg-surface pl-3 pr-9 text-sm text-text",
              "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          {/* Custom Dropdown Chevron Icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              className="h-4 w-4 text-muted"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
);

FilterDropdown.displayName = "FilterDropdown";
