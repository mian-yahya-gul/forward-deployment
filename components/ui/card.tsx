import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group rounded-[var(--radius-lg)] border border-border bg-background p-6 transition-[transform,border-color,box-shadow] duration-[var(--duration-normal)] ease-[var(--ease-out)] hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.25)]",
        className,
      )}
      {...props}
    />
  );
}

export { Card };
