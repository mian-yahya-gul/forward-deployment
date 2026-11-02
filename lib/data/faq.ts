import { offers } from "@/lib/data/offers";
import { siteRegions } from "@/lib/data/site";

/**
 * Answer-first FAQs for search and AI answer engines. Prices and timelines are read from offers.ts
 * so they can never disagree with the packages section. Every answer is visible on its page (the
 * FAQPage schema is only emitted for content that is rendered).
 */
const [sprint, application, whiteLabel] = offers;

export interface FaqEntry {
  question: string;
  answer: string;
}

export const homeFaqs: FaqEntry[] = [
  {
    question: "What does DeosAI Labs do?",
    answer:
      "DeosAI Labs is an AI engineering, business automation and forward deployment company. We map how a business workflow runs today, then build the automation, custom application or AI integration that improves it, connected to the software the business already uses. We also provide white-label AI and software engineering to agencies.",
  },
  {
    question: "How much does AI workflow automation cost?",
    answer: `Our AI Workflow Automation Sprint has an indicative starting range of ${sprint.price} (USD) for one well-defined workflow. Custom Business Applications are indicatively ${application.price}, and White-label AI Engineering is ${whiteLabel.price.toLowerCase()}. These are indicative starting ranges, not quotations. Hosting, third-party API usage and ongoing maintenance are scoped separately.`,
  },
  {
    question: "How long does an automation or custom application take?",
    answer: `As indicative estimates only: an automation sprint takes approximately 1 to 2 weeks, a custom business application approximately 2 to 4 weeks, and small white-label pieces approximately 1 to 3 weeks once scope is agreed. These are not guaranteed delivery dates and are confirmed after project discovery.`,
  },
  {
    question: "Which countries do you work with?",
    answer: `DeosAI Labs is based in ${siteRegions.base.locality}, ${siteRegions.base.country}, and works remotely with businesses and agencies in the UAE, Saudi Arabia, the UK, the USA and Pakistan. Work is run in English, prices are in US dollars, and discovery calls are bookable in your own time zone.`,
  },
  {
    question: "Do you work with agencies as a white-label partner?",
    answer:
      "Yes. Software development agencies, AI agencies, ERP implementers, digital transformation consultancies and IT service providers can use DeosAI Labs as a white-label engineering partner for AI agents, RAG systems, MCP and API integrations, custom software, testing and deployment. The client relationship stays with the agency.",
  },
  {
    question: "Do you replace staff with AI?",
    answer:
      "No. Each workflow defines which steps are automated and which stay with a person, and exceptions and judgment calls are routed to people by design.",
  },
];

export const servicesFaqs: FaqEntry[] = [
  homeFaqs[1],
  homeFaqs[2],
  {
    question: "What is not included in the package prices?",
    answer:
      "Hosting and infrastructure, third-party service usage such as AI model or messaging APIs (billed by the provider), and ongoing maintenance and support are all scoped separately. Work beyond the agreed scope is quoted separately rather than absorbed.",
  },
  {
    question: "Are the prices fixed quotes?",
    answer:
      "No. They are indicative starting ranges in US dollars. After a discovery conversation we send a written scope and price. The ranges do not imply unlimited work.",
  },
  {
    question: "What is the difference between a workflow automation sprint and a custom business application?",
    answer:
      "A sprint automates one defined workflow, often connecting tools you already use. A custom business application is a purpose-built web application, such as an internal tool, dashboard or operational system, with its own screens, data and, where needed, generated documents.",
  },
];

export const partnerFaqs: FaqEntry[] = [
  homeFaqs[4],
  {
    question: "What does white-label AI engineering cost?",
    answer: `It starts from $600 (indicative, USD) for small, well-defined pieces of work and is priced per project from a written scope. It is not a day rate or a retainer, and hosting, third-party API usage and ongoing maintenance are scoped separately.`,
  },
  {
    question: "Do you take over the client relationship?",
    answer:
      "No. We work behind the scenes. You control client communication and we route updates and questions through you. Confidentiality and white-label terms are agreed in writing for each engagement.",
  },
  {
    question: "Do you list partner agencies or client logos?",
    answer:
      "No. We do not claim existing agency partnerships and show no partner logos. We are building the programme deliberately, starting with a small number of good fits.",
  },
];
