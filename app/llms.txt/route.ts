import { industries } from "@/lib/data/industries";
import { articles } from "@/lib/data/insights";
import { resources } from "@/lib/data/resources";
import { services } from "@/lib/data/services";
import { site, siteRegions, siteUrl } from "@/lib/data/site";
import { contactEmail } from "@/lib/data/contact";
import { offers } from "@/lib/data/offers";
import { tools } from "@/lib/data/tools";
import { getPublicWorkflows } from "@/lib/data/workflows";

// Built entirely from the site's own data modules, so it can't drift from what the pages say.
export const dynamic = "force-static";

const link = (title: string, path: string, note?: string) =>
  `- [${title}](${siteUrl}${path})${note ? `: ${note}` : ""}`;

export function GET() {
  const lines = [
    "# DeosAI Labs",
    "",
    `> ${site.positioning}`,
    "",
    `DeosAI Labs is based in ${siteRegions.base.locality}, ${siteRegions.base.country}, and works with organizations across ${siteRegions.summary}. Work is run in English. Contact: ${contactEmail}. Book a discovery call at ${siteUrl}/contact#book.`,
    "",
    "## Engagement packages (indicative starting ranges in USD, not quotations)",
    ...offers.map((offer) => link(offer.title, `/services#${offer.id}`, `${offer.price}. ${offer.tagline}`)),
    "",
    "## Services",
    ...services.map((service) => link(service.title, `/services/${service.slug}`, service.purpose)),
    "",
    "## Industries",
    ...industries.map((industry) => link(industry.name, `/industries/${industry.slug}`, industry.challenge)),
    "",
    "## Free tools and resources",
    ...tools.map((tool) => link(tool.title, tool.href, tool.description)),
    ...resources.map((resource) => link(resource.title, `/resources/${resource.slug}`, resource.description)),
    "",
    "## Workflow catalog",
    link("Deployable Workflow Catalog", "/workflows", "Business workflows by industry, showing what AI does and what stays with people"),
    ...getPublicWorkflows().map((workflow) => link(workflow.workflowName, `/workflows/${workflow.id}`, workflow.shortDescription)),
    "",
    "## The Forward Deployment Playbook (free online book)",
    link("Preface", "/book/preface"),
    ...industries.map((industry) => link(`${industry.name} chapter`, `/book/industries/${industry.slug}`)),
    "",
    "## Insights",
    ...articles.map((article) => link(article.title, `/insights/${article.slug}`, article.summary)),
    "",
    "## Company",
    link("What is AI forward deployment?", "/what-is-ai-forward-deployment", "The definition, approach and how it differs from consulting"),
    link("About", "/about"),
    link("Our work (real implementations, technical demonstrations and conceptual prototypes)", "/case-studies"),
    link("Agency white-label partnerships", "/partners"),
    link("Privacy policy", "/privacy"),
    link("Contact and booking", "/contact"),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
