/**
 * Content pulled directly from the built book (see the `build/` export,
 * a Docusaurus site titled "The Forward Deployment Playbook") — titles,
 * chapter structure, and the preface excerpt below are the book's own
 * words, not invented. The book itself is hosted as a static export at
 * /book (see public/book/), rewritten from its original absolute-path
 * baseUrl "/" onto "/book/" so its internal navigation and assets resolve
 * correctly when served from this site instead of book.deosailabs.com.
 */
export const playbookIntro = {
  eyebrow: "Free Resource",
  title: "The Forward Deployment Playbook",
  description:
    "A workflow-by-workflow, industry-by-industry guide to where Digital FTEs belong inside the operations you already run.",
  pullQuote:
    "Most companies do not have an AI problem. They have a workflow visibility problem.",
  supporting:
    "Each chapter takes one industry, breaks it into the workflows that actually consume your team's time, and shows where a forward-deployed AI system can be integrated into the process you already run — without asking you to rip out your existing tools or retrain your organization from scratch.",
  readingHref: "/book/preface",
  primaryCta: { label: "Start Reading", href: "/book/preface" },
  secondaryCta: { label: "Book a Discovery Call", href: "/contact" },
};

export interface PlaybookPart {
  part: string;
  chapters: string[];
}

export const playbookParts: PlaybookPart[] = [
  {
    part: "Part One — Foundations",
    chapters: ["Workflows, Not Tools", "The Forward Deployment Model", "How to Use This Book"],
  },
  {
    part: "Part Two — Industries",
    chapters: [
      "Healthcare",
      "Education",
      "Retail & E-commerce",
      "Manufacturing",
      "Logistics & Supply Chain",
      "Financial Services",
      "Government",
      "Agriculture",
      "Aviation",
      "Airline & Ticketing",
      "Oil & Gas",
      "Professional Services",
    ],
  },
  {
    part: "Part Three — Next Steps",
    chapters: ["Choosing Your Starting Workflow", "Working With DeosAI Labs"],
  },
];
