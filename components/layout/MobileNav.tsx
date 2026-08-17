"use client";

import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { primaryNav, navCta } from "@/lib/data/nav";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-nav"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-background transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-out)] md:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{ paddingTop: "var(--header-height)" }}
    >
      <div className="absolute top-0 left-4 flex h-[var(--header-height)] items-center">
        <ThemeToggle />
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-0 right-0 flex h-[var(--header-height)] w-[var(--header-height)] items-center justify-center text-foreground"
      >
        <X className="size-6" aria-hidden />
      </button>

      <nav className="flex flex-1 flex-col justify-center gap-2 px-8 pb-16">
        {primaryNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="border-b border-border py-4 text-2xl font-medium text-foreground transition-colors duration-[var(--duration-fast)] hover:text-primary"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={navCta.href}
          onClick={onClose}
          className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full")}
        >
          {navCta.label}
        </Link>
      </nav>
    </div>
  );
}
