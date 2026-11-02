import { homeFaqs, partnerFaqs, servicesFaqs } from "@/lib/data/faq";
import { markets } from "@/lib/data/markets";
import { offers, packagesDisclaimer } from "@/lib/data/offers";
import { services } from "@/lib/data/services";
import { contactEmail } from "@/lib/data/contact";
import { site, siteRegions, siteUrl } from "@/lib/data/site";
import { categoryMeta, stories } from "@/lib/data/stories";

// A fuller, citation-friendly summary for AI answer engines. Built from the same data modules as the
// pages, so prices, timelines and claims cannot drift from what the site says.
export const dynamic = "force-static";

const bullets = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

export function GET() {
  const published = stories.filter((story) => story.status === "published");

  const body = `# DeosAI Labs: full summary

> ${site.positioning}

Website: ${siteUrl}
Contact: ${contactEmail}
Base: ${siteRegions.base.locality}, ${siteRegions.base.country}. Works remotely with businesses and agencies in ${siteRegions.summary}. Work is run in English; prices are in US dollars.
Founder: Mian Yahya, CEO & Forward Deployed Engineer.
Book a discovery call: ${siteUrl}/contact#book

## What DeosAI Labs does
${site.hero.description} We help businesses discover and improve operational workflows, build production-ready AI systems, automate business processes, develop custom business applications, integrate AI into existing software and infrastructure, and provide white-label AI and software engineering to agencies.

## Engagement packages (indicative starting ranges in USD, not quotations)
${offers
  .map(
    (offer) => `### ${offer.title}: ${offer.price}
${offer.tagline} ${offer.priceNote}
Ideal for:
${bullets(offer.idealFor)}
Included:
${bullets(offer.included)}
Not included:
${bullets(offer.excluded)}
Indicative timeline: ${offer.timeline}`,
  )
  .join("\n\n")}

### What the prices do not include
${bullets(packagesDisclaimer.points)}

## Capability areas
${services.map((service) => `- ${service.title} (${siteUrl}/services/${service.slug}): ${service.purpose}`).join("\n")}

## Markets
${markets
  .map(
    (market) =>
      `- ${market.countryName} (${siteUrl}/markets/${market.slug}): ${market.timeZone.zone}, ${market.timeZone.utc}. ${market.timeZone.versusPakistan}`,
  )
  .join("\n")}

## Portfolio (labelled by type; no client names, testimonials or unverified results are published)
${Object.values(categoryMeta)
  .map((meta) => `${meta.label}: ${meta.description}`)
  .join("\n")}
Published entries:
${published.map((story) => `- ${story.title} (${categoryMeta[story.category].shortLabel}): ${story.summary}`).join("\n")}

## Agency partnerships
White-label AI and software engineering for software agencies, AI agencies, ERP implementers, digital transformation consultancies and IT service providers (${siteUrl}/partners). No existing partnerships are claimed.

## Frequently asked questions
${[...homeFaqs, ...servicesFaqs, ...partnerFaqs]
  .filter((faq, index, all) => all.findIndex((other) => other.question === faq.question) === index)
  .map((faq) => `Q: ${faq.question}\nA: ${faq.answer}`)
  .join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
