import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { LegalContent } from "@/components/shared/LegalContent";
import { PageHero } from "@/components/shared/PageHero";
import { privacyPolicy } from "@/lib/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy — DeosAI Labs",
  description: privacyPolicy.description,
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />}
        eyebrow={privacyPolicy.eyebrow}
        title={privacyPolicy.title}
        description={privacyPolicy.description}
      />
      <section className="border-t border-border py-20 sm:py-28">
        <LegalContent
          lastUpdated={privacyPolicy.lastUpdated}
          draftNotice={privacyPolicy.draftNotice}
          sections={privacyPolicy.sections}
        />
      </section>
    </>
  );
}
