import type { Metadata } from "next";

import { LogoMarquee } from "@/components/shared/LogoMarquee";

/**
 * Local preview only — intentionally not linked from nav/sitemap and not
 * meant to be pushed live. Swap DUMMY_LOGOS in LogoMarquee.tsx for real
 * client wordmarks/logos before wiring this into an actual page.
 */
export const metadata: Metadata = {
  title: "Logo marquee preview",
  robots: { index: false, follow: false },
};

export default function LogoMarqueePreviewPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-28">
      <p className="mb-3 text-sm font-medium tracking-wide text-primary uppercase">Preview — not live</p>
      <h1 className="text-2xl font-semibold text-foreground">Logo marquee (dummy placeholders)</h1>
      <p className="mt-2 max-w-xl text-sm text-muted">
        Placeholder names for reviewing the animation and layout only. Do not wire this into a real page until
        there are real client logos.
      </p>
      <div className="mt-12 border-y border-border py-8">
        <LogoMarquee />
      </div>
    </div>
  );
}
