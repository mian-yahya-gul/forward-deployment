"use client";

import { usePathname } from "next/navigation";

/** Renders its children everywhere except the owner-only /admin pages, which have their own plain layout. */
export function HideOnAdmin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin" || pathname?.startsWith("/admin/")) return null;
  return <>{children}</>;
}
