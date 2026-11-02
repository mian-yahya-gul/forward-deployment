import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { ORGANIZATION_ID, absoluteUrl } from "@/lib/seo";
import { buildMetadata } from "@/lib/seo";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalEmbed } from "@/components/shared/CalEmbed";
import { ContactForm } from "@/components/shared/ContactForm";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { contactEmail, contactHero, contactPathways } from "@/lib/data/contact";
import { cn, glowCardClass } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Contact & Book a Discovery Call — DeosAI Labs",
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
            contactPoint: { "@type": "ContactPoint", contactType: "sales", email: contactEmail },
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
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {contactPathways
              .filter((pathway) => pathway.href.startsWith("#") || pathway.href.startsWith("/partners"))
              .map((pathway, index) => (
                <ScrollReveal as="li" key={pathway.title} delay={index * 80}>
                  <Card className={cn("flex h-full flex-col", glowCardClass)}>
                    <pathway.icon className="size-6 text-primary" aria-hidden />
                    <h2 className="mt-4 text-base font-semibold text-foreground">{pathway.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{pathway.description}</p>
                    <TrackedLink
                      href={pathway.href}
                      event={pathway.analyticsEvent}
                      className={cn(
                        buttonVariants({ variant: index === 0 ? "primary" : "secondary" }),
                        "mt-6 self-start",
                      )}
                    >
                      {pathway.actionLabel}
                    </TrackedLink>
                  </Card>
                </ScrollReveal>
              ))}
          </ul>
          <p className="mt-8 text-sm text-muted">
            Interested in joining the team?{" "}
            <TrackedLink href="/careers" event="careers_pathway_click" className="font-medium text-primary">
              View open roles
            </TrackedLink>
          </p>
        </div>
      </section>

      <section id="book" className="scroll-mt-[var(--header-height)] border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Book a Discovery Call"
            title="Choose a time that works for you"
            description="A 30-minute conversation about your workflows and where AI could help. Available times are shown in your local time zone, whether you are in the US, the UK, the Middle East & North Africa or Pakistan, and you will get a confirmation email with a link to reschedule or cancel."
          />
          <div className="mt-10">
            <CalEmbed calLink={process.env.NEXT_PUBLIC_CAL_LINK} />
          </div>
        </div>
      </section>

      <section id="message" className="scroll-mt-[var(--header-height)] border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeading
            eyebrow="Project Enquiry"
            title="Tell us about your project"
            description={`Not ready to schedule? Share a few details and we will review them and reply by email. You can also write to ${contactEmail}.`}
          />
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
