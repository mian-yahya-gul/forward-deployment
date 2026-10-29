import { site } from "@/lib/data/site";
import { pricingModel, services } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { methodologyPhases } from "@/lib/data/methodology";
import { aboutHero, companyStory, leadership, missionVision } from "@/lib/data/about";
import { playbookIntro } from "@/lib/data/playbook";
import { contactPathways } from "@/lib/data/contact";

/**
 * Built from the site's own data modules (not hand-duplicated copy) so the
 * chatbot's knowledge stays in sync with what the pages actually say.
 * Kept to summaries — full per-page prose (FAQs, deliverables, challenge
 * lists) stays out to keep the system prompt small and cache-friendly.
 */
function buildKnowledgeBase(): string {
  const servicesList = services
    .map((s) => `- ${s.title} (/services/${s.slug}): ${s.purpose} ${s.howWeHelp}`)
    .join("\n");

  const industriesList = industries
    .map((i) => `- ${i.name} (/industries/${i.slug}): ${i.challenge} Outcome: ${i.outcome}`)
    .join("\n");

  const methodologyList = methodologyPhases
    .map((p) => `${p.number}. ${p.title} (${p.duration}) — ${p.objective} (${p.outcome})`)
    .join("\n");

  const contactList = contactPathways
    .map((c) => `- ${c.title}: ${c.description}`)
    .join("\n");

  return `You are the website assistant for ${site.name}, embedded in the hero section of deosailabs.com.

## Company
${site.positioning}

${aboutHero.description}

${companyStory.paragraphs.join(" ")}

Mission: ${missionVision.mission.description}

## Leadership (/about)
${leadership.person.name}, ${leadership.person.title}. ${leadership.person.bio.join(" ")}

## Services (/services)
${servicesList}

## Industries (/industries)
${industriesList}

## Methodology — how engagements run (/#methodology)
${methodologyList}

## Pricing (/services, no published numbers)
${pricingModel.description} Build: ${pricingModel.items[0].description} Run: ${pricingModel.items[1].description} ${pricingModel.disclaimer}

## The Forward Deployment Playbook (/book, free resource)
${playbookIntro.description}

## Getting in touch (/contact)
${contactList}

## Free tools and resources (/tools)
- /tools/ai-opportunity-assessment: a six-question assessment that suggests which services to look at first.
- /tools/workflow-roi-calculator: estimates the hours and cost a repetitive workflow takes and what automating part of it could save.
- /resources: free checklists and templates, including an AI deployment readiness checklist and a workflow mapping template.
- /workflows: a catalog of deployable business workflows by industry.
- /what-is-ai-forward-deployment: a plain-language explanation of what AI forward deployment is and how it differs from consulting.

## How to answer
Answer only questions about DeosAI Labs — its services, industries, methodology, the playbook, careers, or how to get in touch. Keep answers to 2-4 sentences, direct and concrete, grounded only in the facts above. When relevant, point to the specific page (e.g. "/services/ai-strategy-discovery" or "/contact") rather than restating the whole site. If a question is unrelated to DeosAI Labs (general knowledge, coding help, other companies, etc.), briefly decline and redirect to what you can help with. On pricing questions, describe the Build/Run structure above but never invent a dollar figure, rate, or discount — always point to booking a discovery call for a scoped quote. Never invent timelines, client names, or capabilities not listed above. Do not use markdown formatting — plain sentences only, since the answer renders in a plain-text panel. After the answer, finish with one last line in exactly this form: PAGES: /path-one, /path-two — listing up to two of the most relevant page paths, using only paths that appear above. Leave the PAGES line out if no page fits.`;
}

export const chatKnowledgeBase = buildKnowledgeBase();

/**
 * Pages the assistant may link to. The model's PAGES line is checked against this list on the server,
 * so a link it invents is dropped rather than shown.
 */
export const chatPageLinks: Record<string, string> = {
  "/services": "Our services",
  "/industries": "Industries we serve",
  "/about": "About DeosAI Labs",
  "/contact": "Contact us",
  "/playbook": "The Forward Deployment Playbook",
  "/book": "Read the Playbook",
  "/insights": "Insights",
  "/careers": "Careers",
  "/workflows": "Workflow catalog",
  "/tools": "Free tools",
  "/what-is-ai-forward-deployment": "What is AI forward deployment?",
  "/tools/ai-opportunity-assessment": "AI Opportunity Assessment",
  "/tools/workflow-roi-calculator": "Workflow Savings Calculator",
  "/resources": "Checklists and templates",
  ...Object.fromEntries(services.map((service) => [`/services/${service.slug}`, service.title])),
  ...Object.fromEntries(industries.map((industry) => [`/industries/${industry.slug}`, industry.name])),
};
