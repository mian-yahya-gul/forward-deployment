import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { LegalContent } from "@/components/shared/LegalContent";
import { PageHero } from "@/components/shared/PageHero";
import { accessibilityStatement } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Accessibility Statement — DeosAI Labs",
  description: accessibilityStatement.description,
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero
        breadcrumbs={
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Accessibility Statement" }]} />
        }
        eyebrow={accessibilityStatement.eyebrow}
        title={accessibilityStatement.title}
        description={accessibilityStatement.description}
      />
      <section className="border-t border-border py-20 sm:py-28">
        <LegalContent
          lastUpdated={accessibilityStatement.lastUpdated}
          draftNotice={accessibilityStatement.draftNotice}
          sections={accessibilityStatement.sections}
        />
      </section>
    </>
  );
}
