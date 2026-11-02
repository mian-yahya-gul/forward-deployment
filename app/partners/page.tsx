import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ContactForm } from "@/components/shared/ContactForm";
import { PageHero } from "@/components/shared/PageHero";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import {
  agencyAudiences,
  agencyCapabilities,
  agencyHero,
  agencyProcess,
  agencyTerms,
  partnerEnquiryIntro,
} from "@/lib/data/partners";
import { buildMetadata } from "@/lib/seo";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { partnerFaqs } from "@/lib/data/faq";
import { cn, glowCardClass } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "White-label AI Engineering for Agencies — DeosAI Labs",
  description:
    "DeosAI Labs is a white-label AI and software engineering partner for agencies, ERP implementers and consultancies: AI agents, RAG, MCP and API integrations, custom software, testing and deployment.",
  path: "/partners",
});

export default function PartnersPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Agency Partnerships" }]} />}
        eyebrow={agencyHero.eyebrow}
        title={agencyHero.title}
        description={agencyHero.description}
        primaryCta={agencyHero.primaryCta}
        secondaryCta={agencyHero.secondaryCta}
      />

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="Who This Is For" title="Built for teams that sell and manage client delivery." />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {agencyAudiences.map((audience, index) => (
              <ScrollReveal as="li" key={audience.title} delay={(index % 4) * 80} className="h-full">
                <Card className={cn("h-full", glowCardClass)}>
                  <audience.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-4 text-sm font-semibold text-foreground">{audience.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{audience.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading
            eyebrow="What We Deliver"
            title="Engineering capabilities you can resell as your own."
            description="We work behind the scenes, so the client relationship and the brand stay yours."
          />
          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {agencyCapabilities.map((capability, index) => (
              <ScrollReveal as="li" key={capability.title} delay={(index % 3) * 80} className="h-full">
                <Card className="h-full bg-background">
                  <capability.icon className="size-6 text-primary" aria-hidden />
                  <h3 className="mt-4 text-base font-semibold text-foreground">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{capability.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-[1280px] px-6">
          <SectionHeading eyebrow="How It Works" title="From a client brief to a delivered system." />
          <ol className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {agencyProcess.map((step, index) => (
              <ScrollReveal as="li" key={step.title} delay={(index % 4) * 80} className="h-full">
                <Card className="h-full">
                  <p className="text-sm font-semibold text-primary">0{index + 1}</p>
                  <h3 className="mt-2 text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </Card>
              </ScrollReveal>
            ))}
          </ol>

          <Card className="mt-8 bg-surface">
            <h3 className="text-sm font-semibold text-foreground">{agencyTerms.title}</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted">
              {agencyTerms.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link
              href="/services#white-label-ai-engineering"
              className={cn(buttonVariants({ variant: "secondary" }), "mt-5")}
            >
              View the full white-label scope
            </Link>
          </Card>
        </div>
      </section>

      <section className="border-t border-border py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="FAQ" title="Partnership questions" />
          <div className="mt-10">
            <FAQAccordion items={partnerFaqs} />
          </div>
        </div>
      </section>

      <section
        id="partner-enquiry"
        className="scroll-mt-[var(--header-height)] border-t border-border bg-surface py-20 sm:py-28"
      >
        <div className="mx-auto max-w-2xl px-6">
          <SectionHeading
            eyebrow={partnerEnquiryIntro.eyebrow}
            title={partnerEnquiryIntro.title}
            description={partnerEnquiryIntro.description}
          />
          <div className="mt-10">
            <ContactForm variant="partnership" idPrefix="partner" />
          </div>
        </div>
      </section>
    </>
  );
}
