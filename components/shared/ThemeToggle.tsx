"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  // Avoids a hydration mismatch: resolvedTheme is undefined on the server
  // and on first client render, so nothing theme-dependent renders until mounted.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Mount-detection has no external system to synchronize with — the effect's
    // only job is marking that hydration finished, so this one-time setState is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      className={cn(
        "flex size-9 items-center justify-center rounded-full border border-border text-foreground transition-colors duration-[var(--duration-fast)] hover:border-primary/40 hover:text-primary",
        className,
      )}
    >
      {mounted && (isDark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />)}
    </button>
  );
}
