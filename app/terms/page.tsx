import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { LegalContent } from "@/components/shared/LegalContent";
import { PageHero } from "@/components/shared/PageHero";
import { termsOfUse } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Terms of Use — DeosAI Labs",
  description: termsOfUse.description,
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Terms of Use" }]} />}
        eyebrow={termsOfUse.eyebrow}
        title={termsOfUse.title}
        description={termsOfUse.description}
      />
      <section className="border-t border-border py-20 sm:py-28">
        <LegalContent
          lastUpdated={termsOfUse.lastUpdated}
          draftNotice={termsOfUse.draftNotice}
          sections={termsOfUse.sections}
        />
      </section>
    </>
  );
}
