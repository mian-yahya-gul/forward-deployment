import Link from "next/link";
import { Globe2 } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { markets } from "@/lib/data/markets";

export function MarketsStrip() {
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-[1280px] px-6">
        <SectionHeading
          eyebrow="Markets We Serve"
          title="Working with businesses in the UAE, Saudi Arabia, the UK, the USA and Pakistan."
          description="Based in Islamabad and working remotely. Work is run in English, prices are in USD, and discovery calls are bookable in your time zone."
        />
        <ul className="mt-8 flex flex-wrap gap-3">
          {markets.map((market) => (
            <li key={market.slug}>
              <Link
                href={`/markets/${market.slug}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                <Globe2 className="size-4 text-primary" aria-hidden />
                {market.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
