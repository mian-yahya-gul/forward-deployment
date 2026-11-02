"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
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
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    // Remember what opened the menu so focus can go back there, then move focus into the dialog.
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;

      // Keep Tab / Shift+Tab inside the open dialog.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      opener?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      id="mobile-nav"
      // Closed: remove from the tab order and the accessibility tree (it is only visually hidden otherwise).
      inert={!open}
      aria-hidden={!open}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className={cn(
        "fixed inset-0 z-[60] flex flex-col bg-background transition-opacity duration-[var(--duration-normal)] ease-[var(--ease-out)] lg:hidden",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
      style={{ paddingTop: "var(--header-height)" }}
    >
      <div className="absolute top-0 left-4 flex h-[var(--header-height)] items-center">
        <ThemeToggle />
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute top-0 right-0 flex h-[var(--header-height)] w-[var(--header-height)] items-center justify-center text-foreground"
      >
        <X className="size-6" aria-hidden />
      </button>

      <nav aria-label="Mobile primary" className="flex flex-1 flex-col justify-center gap-2 px-8 pb-16">
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
