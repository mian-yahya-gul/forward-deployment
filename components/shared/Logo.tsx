import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

/** AI and the dot use text-primary, adapting to the active theme. */
export function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "text-lg font-semibold tracking-tight text-foreground",
        className
      )}
    >
      Deos<span className="text-primary">Ai</span> Labs
      <span className="ml-[1px] text-primary">.</span>
    </Link>
  );
}