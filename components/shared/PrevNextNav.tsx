import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PrevNextItem {
  slug: string;
  title: string;
}

interface PrevNextNavProps {
  items: PrevNextItem[];
  currentSlug: string;
  basePath: string;
}

export function PrevNextNav({ items, currentSlug, basePath }: PrevNextNavProps) {
  const index = items.findIndex((item) => item.slug === currentSlug);
  if (index === -1) return null;

  const prev = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];

  return (
    <nav
      aria-label="More in this section"
      className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 border-t border-border px-6 py-12 sm:grid-cols-2"
    >
      <Link
        href={`${basePath}/${prev.slug}`}
        className="group flex flex-col rounded-[var(--radius-md)] border border-border p-5 transition-colors duration-[var(--duration-fast)] hover:border-primary/40"
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted uppercase">
          <ArrowLeft className="size-3.5" aria-hidden />
          Previous
        </span>
        <span className="mt-2 text-base font-semibold text-foreground">{prev.title}</span>
      </Link>

      <Link
        href={`${basePath}/${next.slug}`}
        className="group flex flex-col items-end rounded-[var(--radius-md)] border border-border p-5 text-right transition-colors duration-[var(--duration-fast)] hover:border-primary/40"
      >
        <span className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-muted uppercase">
          Next
          <ArrowRight className="size-3.5" aria-hidden />
        </span>
        <span className="mt-2 text-base font-semibold text-foreground">{next.title}</span>
      </Link>
    </nav>
  );
}
