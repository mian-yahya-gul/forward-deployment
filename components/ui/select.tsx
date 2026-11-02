import * as React from "react";

import { cn } from "@/lib/utils";

/** Native <select> styled to match Input, so it stays accessible and keyboard-friendly. */
const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-[var(--radius-sm)] border border-border bg-background px-3 text-sm text-foreground transition-colors duration-[var(--duration-fast)] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  ),
);
Select.displayName = "Select";

export { Select };
