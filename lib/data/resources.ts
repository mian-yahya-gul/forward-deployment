/**
 * Free resources. The full content lives on the page (crawlable, citable); the email option only
 * sends the visitor a copy. Written as general practice, with no claims about results.
 */

export interface ResourceSection {
  title: string;
  intro?: string;
  items: string[];
}

export interface Resource {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  eyebrow: string;
  readingTime: string;
  intro: string;
  sections: ResourceSection[];
  faqs: { question: string; answer: string }[];
}

export const resources: Resource[] = [
  {
    slug: "ai-deployment-readiness-checklist",
    title: "AI Deployment Readiness Checklist",
    shortTitle: "AI Deployment Readiness Checklist",
    eyebrow: "Checklist",
    readingTime: "5 min",
    description:
      "A practical checklist for deciding whether a workflow is ready for AI: the process, the data, the people, the risks and how it will run once it's live.",
    intro:
      "Use this before you commit budget to an AI project. If you can't answer most of these questions yet, that is useful information: it tells you what to settle first. There are no scores, only questions worth answering honestly.",
    sections: [
      {
        title: "1. The workflow",
        items: [
          "The workflow has a clear start, a clear end and a named owner.",
          "You know roughly how many times it runs each month.",
          "You know how long one run takes today, including waiting time.",
          "There is a measurable goal, such as time, cost, error rate or response time.",
          "The people who do the work today agree this is a real problem.",
        ],
      },
      {
        title: "2. Data and systems",
        items: [
          "You know where the information the workflow needs is stored.",
          "The systems involved can be connected, through an API, a database, files or email.",
          "Someone has checked the quality of the data: duplicates, gaps, out-of-date records.",
          "Sensitive or regulated data in the workflow has been identified.",
          "You know who can grant access to each system, and how long that takes.",
        ],
      },
      {
        title: "3. People and process",
        items: [
          "A person is named to review the AI's output, at least at the start.",
          "There is a defined path for cases the AI should not handle.",
          "The team affected knows what is changing and why.",
          "Someone owns the change on the business side, not only the technical side.",
        ],
      },
      {
        title: "4. Risk and governance",
        items: [
          "You have listed the ways the AI could be wrong and what each would cost.",
          "The points where a person must approve a decision are decided in advance.",
          "Privacy, security and any regulatory requirements have been reviewed.",
          "You know how the AI's work will be logged so it can be audited later.",
          "You have agreed how the system will be tested before launch and checked after it.",
        ],
      },
      {
        title: "5. Running it after launch",
        items: [
          "Someone is responsible for watching quality and cost once it is live.",
          "There is an easy way for users to report a bad result.",
          "You have planned a regular review to improve it, not a one-off build.",
          "The budget covers running and improving the system, not just building it.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does it mean for a workflow to be ready for AI?",
        answer:
          "It means the process is defined and measurable, the data and systems it needs can be reached, someone owns it, and you have decided how the AI's work will be reviewed and tested. A workflow doesn't need to be perfect, but it does need these basics.",
      },
      {
        question: "Do we need clean data before starting?",
        answer:
          "Not perfect data, but you should know where it is, who can access it and what the main quality problems are. Many projects start by fixing the specific data the workflow depends on rather than cleaning everything.",
      },
      {
        question: "Who should review the AI's output?",
        answer:
          "Someone who already understands the work, such as the person or team who does it today. Most deployments keep a person in the loop for higher-risk decisions and reduce review only as quality is shown to be consistent.",
      },
    ],
  },
  {
    slug: "workflow-mapping-template",
    title: "Workflow Mapping Template",
    shortTitle: "Workflow Mapping Template",
    eyebrow: "Template",
    readingTime: "6 min",
    description:
      "A step-by-step template for mapping one business workflow so you can see where AI could help: the trigger, inputs, steps, exceptions, volumes and review points.",
    intro:
      "Map one workflow at a time. Fill these in with the people who do the work, not from memory. Where a step is unclear, write that down: gaps in the map are often the first thing worth fixing.",
    sections: [
      {
        title: "1. Name it",
        items: [
          "Workflow name, in plain words (for example, 'Customer refund requests').",
          "Owner: the person accountable for how it runs.",
          "Team or teams involved.",
        ],
      },
      {
        title: "2. Trigger and inputs",
        items: [
          "What starts the workflow? (An email, a form, a ticket, a schedule, a phone call.)",
          "What information arrives with it?",
          "Where does that information come from, and in what format?",
        ],
      },
      {
        title: "3. The steps",
        items: [
          "List each step in order, with who or what does it.",
          "For each step, note the system used and roughly how long it takes.",
          "Mark steps where work waits for someone else.",
          "Mark steps that are the same every time, and steps that need judgment.",
        ],
      },
      {
        title: "4. Decisions and exceptions",
        items: [
          "What decisions are made along the way, and by whom?",
          "What rules do people follow to make them?",
          "What are the common exceptions, and what happens to them?",
          "What happens when something goes wrong?",
        ],
      },
      {
        title: "5. Volume and time",
        items: [
          "How many times does this run per month?",
          "How many minutes of people's time does one run take, start to finish?",
          "What does that time cost? (Use a rough hourly figure.)",
          "How often are there mistakes or rework?",
        ],
      },
      {
        title: "6. Where AI could help",
        intro: "For each step, ask which of these it would be:",
        items: [
          "Reading and extracting information from emails, forms or documents.",
          "Sorting or classifying requests.",
          "Drafting a reply or document for a person to approve.",
          "Finding the right information in your own knowledge sources.",
          "Helping with a decision by pulling the facts together.",
          "Not a good fit: rare, high-stakes or purely relational steps stay with people.",
        ],
      },
      {
        title: "7. Review and risk",
        items: [
          "Which steps need a person to approve the AI's work?",
          "What is the worst result if the AI is wrong at each step?",
          "What must be logged so the work can be audited?",
          "How will you tell if the new version is better than the old one?",
        ],
      },
    ],
    faqs: [
      {
        question: "Why map a workflow before using AI?",
        answer:
          "Because AI works inside a process. Mapping shows where time is lost, which steps are repetitive and which need judgment, so you can choose where AI helps and where a person should stay in charge.",
      },
      {
        question: "How detailed should the map be?",
        answer:
          "Detailed enough that someone who doesn't do the work could follow it. Capture the steps, systems, decisions and exceptions, but you don't need a formal diagram. A written list is fine.",
      },
      {
        question: "Should we map every workflow first?",
        answer:
          "No. Start with one workflow that is frequent, measurable and painful. A single well-mapped workflow teaches you more than a shallow map of everything.",
      },
    ],
  },
];

export function getResourceBySlug(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}

/** Plain-text version for the emailed copy. */
export function resourceToText(resource: Resource): string {
  const body = resource.sections
    .map((section) => {
      const lines = section.items.map((item) => `  [ ] ${item}`);
      return [section.title, section.intro, ...lines].filter(Boolean).join("\n");
    })
    .join("\n\n");

  return [resource.title, "", resource.intro, "", body, "", "— DeosAI Labs · https://www.deosailabs.com"].join("\n");
}
