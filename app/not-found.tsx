import Link from "next/link";
import { Compass } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-var(--header-height))] items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-surface">
          <Compass className="size-6 text-primary" aria-hidden />
        </div>
        <p className="mt-6 text-sm font-medium tracking-wide text-primary uppercase">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-balance text-foreground">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          The page you&apos;re looking for may have moved or doesn&apos;t exist. Here are a few places
          to pick back up.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            Back to Home
          </Link>
          <Link href="/contact" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
