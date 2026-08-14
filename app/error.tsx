"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[calc(100vh-var(--header-height))] items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-surface">
          <TriangleAlert className="size-6 text-primary" aria-hidden />
        </div>
        <p className="mt-6 text-sm font-medium tracking-wide text-primary uppercase">Error</p>
        <h1 className="mt-3 text-3xl font-semibold text-balance text-foreground">
          Something went wrong.
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          We hit an unexpected error loading this page. Try again, or head back to the homepage.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" onClick={() => reset()}>
            Try Again
          </Button>
          {/* Plain <a>, not next/link: this boundary can be reached mid client-router
              failure, so recovery shouldn't depend on that same router working. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
            Back to Home
          </a>
        </div>
      </div>
    </section>
  );
}
