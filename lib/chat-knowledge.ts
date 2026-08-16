import { site } from "@/lib/data/site";
import { services } from "@/lib/data/services";
import { industries } from "@/lib/data/industries";
import { methodologyPhases } from "@/lib/data/methodology";
import { aboutHero, companyStory, missionVision } from "@/lib/data/about";
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
    .map((p) => `${p.number}. ${p.title} — ${p.objective} (${p.outcome})`)
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

## Services (/services)
${servicesList}

## Industries (/industries)
${industriesList}

## Methodology — how engagements run (/#methodology)
${methodologyList}

## The Forward Deployment Playbook (/book, free resource)
${playbookIntro.description}

## Getting in touch (/contact)
${contactList}

## How to answer
Answer only questions about DeosAI Labs — its services, industries, methodology, the playbook, careers, or how to get in touch. Keep answers to 2-4 sentences, direct and concrete, grounded only in the facts above. When relevant, point to the specific page (e.g. "/services/ai-strategy-discovery" or "/contact") rather than restating the whole site. If a question is unrelated to DeosAI Labs (general knowledge, coding help, other companies, etc.), briefly decline and redirect to what you can help with. Never invent pricing, timelines, client names, or capabilities not listed above. Do not use markdown formatting — plain sentences only, since the answer renders in a plain-text panel.`;
}

export const chatKnowledgeBase = buildKnowledgeBase();
