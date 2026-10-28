import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { footerContact } from "@/lib/data/footer";
import { ORGANIZATION_ID, absoluteUrl } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/shared/ContactForm";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { contactHero, contactPathways } from "@/lib/data/contact";
import { cn, glowCardClass } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Book a Discovery Call — DeosAI Labs",
  description: contactHero.description,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: "Contact DeosAI Labs",
          url: absoluteUrl("/contact"),
          about: { "@id": ORGANIZATION_ID },
          mainEntity: {
            "@type": "Organization",
            "@id": ORGANIZATION_ID,
            contactPoint: { "@type": "ContactPoint", contactType: "sales", email: footerContact.email },
          },
        }}
      />
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />}
        eyebrow={contactHero.eyebrow}
        title={contactHero.title}
        description={contactHero.description}
      />

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {contactPathways.map((pathway, index) => (
              <ScrollReveal as="li" key={pathway.title} delay={index * 80}>
                <Card className={cn("flex h-full flex-col", glowCardClass)}>
                  <pathway.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-4 text-base font-semibold text-foreground">{pathway.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                    {pathway.description}
                  </p>
                  <TrackedLink
                    href={pathway.href}
                    event={pathway.analyticsEvent}
                    className="mt-4 inline-flex items-center text-sm font-medium text-primary"
                  >
                    {pathway.actionLabel}
                  </TrackedLink>
                </Card>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeading
            eyebrow="Send a Message"
            title="Tell us about your organization"
            description="Share a few details and we'll follow up to schedule time."
          />
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
