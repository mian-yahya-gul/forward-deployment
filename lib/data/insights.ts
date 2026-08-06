export interface ArticleBlock {
  type: "heading" | "paragraph";
  text: string;
}

export interface Article {
  slug: string;
  category: string;
  title: string;
  summary: string;
  readingTime: string;
  author: string;
  publishedDate: string;
  href: string;
  featured: boolean;
  body: ArticleBlock[];
  relatedServiceSlugs: string[];
  relatedIndustrySlugs: string[];
}

export const insightsIntro = {
  eyebrow: "Insights",
  headline: "Insights from the field, not the hype cycle.",
  description:
    "We write about what we're actually seeing while deploying AI inside real organizations — practical, technical, and honest.",
  cta: { label: "Explore Knowledge Center", href: "/insights" },
};

export const insightsLandingHero = {
  eyebrow: "Insights",
  title: "What we're actually seeing in the field.",
  description:
    "Short, practical notes from real engagements — not the hype cycle. We write about what worked, what didn't, and why.",
  primaryCta: { label: "Book a Discovery Call", href: "/contact" },
  secondaryCta: { label: "Explore Our Services", href: "/services" },
};

/** All authored by the team collectively — no individual bylines exist yet, so we don't invent named authors. */
const AUTHOR = "DeosAI Labs Team";

export const articles: Article[] = [
  {
    slug: "why-ai-pilots-never-reach-production",
    category: "AI Strategy",
    title: "Why most AI pilots never reach production",
    summary:
      "The gap between a promising demo and a production system is bigger than most teams expect. Here's what actually closes it.",
    readingTime: "4 min read",
    author: AUTHOR,
    publishedDate: "2026-02-18",
    href: "/insights/why-ai-pilots-never-reach-production",
    featured: true,
    relatedServiceSlugs: ["ai-strategy-discovery"],
    relatedIndustrySlugs: [],
    body: [
      { type: "heading", text: "The demo isn't the hard part" },
      {
        type: "paragraph",
        text: "Most AI pilots clear their first hurdle without much trouble. A model gets connected to some data, a prototype gets built, and it does something impressive enough to get budget approved for the next phase. That's usually where the momentum stops.",
      },
      { type: "heading", text: "What actually stalls production" },
      {
        type: "paragraph",
        text: "In our experience, pilots stall for a small number of recurring reasons: the workflow the pilot automated wasn't the one causing the most pain, the people expected to use it weren't involved early enough to trust it, or nobody defined what \"success\" meant in operational terms before building started.",
      },
      {
        type: "paragraph",
        text: "None of these are technology problems. A pilot can use a well-chosen model and still fail to reach production if it was never anchored to a real operational priority.",
      },
      { type: "heading", text: "What closes the gap" },
      {
        type: "paragraph",
        text: "The pilots that make it to production usually share three things: they started with a workflow someone was already actively frustrated by, they involved the people doing that work from the first week rather than the last, and they had an agreed, measurable definition of success before a line of code was written.",
      },
      {
        type: "paragraph",
        text: "None of this is exotic. It's closer to project discipline than machine learning expertise — which is exactly why it's easy to skip when the technology itself is the exciting part.",
      },
      { type: "heading", text: "Where to start" },
      {
        type: "paragraph",
        text: "If you're evaluating your own AI initiatives, the fastest diagnostic is to ask who specifically asked for this, and how you'll know if it worked. If either answer is vague, that's usually where the real work needs to happen before anything gets built.",
      },
    ],
  },
  {
    slug: "where-workflow-automation-pays-off",
    category: "Workflow Automation",
    title: "Where workflow automation actually pays off",
    summary: "Not every manual process is worth automating. Here's how to prioritize.",
    readingTime: "4 min read",
    author: AUTHOR,
    publishedDate: "2026-03-04",
    href: "/insights/where-workflow-automation-pays-off",
    featured: false,
    relatedServiceSlugs: ["intelligent-business-workflows"],
    relatedIndustrySlugs: [],
    body: [
      { type: "heading", text: "Not every manual process is worth automating" },
      {
        type: "paragraph",
        text: "It's tempting to treat automation as a universal good — if a task is manual, automate it. In practice, some manual processes are manual for good reasons: they're low volume, they require judgment that's genuinely hard to systematize, or the cost of getting them wrong is high enough that a human check is worth the time it takes.",
      },
      { type: "heading", text: "The pattern worth automating" },
      {
        type: "paragraph",
        text: "The workflows that pay off are usually high-frequency, well-defined, and low-judgment — the kind of task where the tenth time looks almost exactly like the first. Approvals that follow a consistent rule set, data entry between systems that don't talk to each other, and status updates that get manually copied from one place to another are common examples.",
      },
      { type: "heading", text: "Where automation alone isn't enough" },
      {
        type: "paragraph",
        text: "The workflows that look automatable but aren't usually involve judgment calls disguised as rules — an approval that's \"usually straightforward except when it isn't,\" for instance. Automating only the straightforward path and routing everything else to a person, rather than trying to automate the exception handling too, tends to work better than an all-or-nothing approach.",
      },
      { type: "heading", text: "How to prioritize" },
      {
        type: "paragraph",
        text: "A useful starting question is how often a task happens and how much judgment it actually requires — not how much judgment it appears to require on paper. High-frequency, low-judgment work is the clearest starting point. Everything else is worth a closer look before committing engineering time to it.",
      },
    ],
  },
  {
    slug: "building-human-oversight-from-day-one",
    category: "AI Governance",
    title: "Building human oversight into AI systems from day one",
    summary: "Governance isn't a phase-two concern — it shapes how a system should be designed.",
    readingTime: "5 min read",
    author: AUTHOR,
    publishedDate: "2026-04-15",
    href: "/insights/building-human-oversight-from-day-one",
    featured: false,
    relatedServiceSlugs: ["ai-assistants-copilots", "continuous-optimization"],
    relatedIndustrySlugs: [],
    body: [
      { type: "heading", text: "Governance isn't a phase-two concern" },
      {
        type: "paragraph",
        text: "It's common to treat governance as something to bolt on once a system is working — a review process, an approval gate, a compliance checklist added after the architecture is already set. By the time governance shows up this way, the system's design has usually already made certain oversight decisions much harder to add.",
      },
      { type: "heading", text: "What changes when oversight is designed in early" },
      {
        type: "paragraph",
        text: "When human review is part of the initial design, it shapes decisions that are difficult to retrofit: what information a reviewer needs to see, how disagreements between a system's output and a person's judgment get logged, and where the system should stop and ask rather than proceed automatically. Adding these after launch usually means redesigning an interface a user already relies on.",
      },
      { type: "heading", text: "What this looks like in practice" },
      {
        type: "paragraph",
        text: "Concretely, it means deciding early which decisions the system can make outright, which ones it should flag for review, and which ones it should never make without a person — and building the interface around that distinction from the start, rather than presenting everything as equally automated.",
      },
      {
        type: "paragraph",
        text: "It also means keeping a record of when a person overrode the system's suggestion, since that record is often the fastest way to spot where the system is systematically wrong.",
      },
      { type: "heading", text: "The trade-off worth making" },
      {
        type: "paragraph",
        text: "Designing for oversight from the start typically costs some speed early on — decisions about review points take time to work through. What it buys back is a system people actually trust enough to keep using, which matters more to long-term adoption than how fast the first version shipped.",
      },
    ],
  },
  {
    slug: "integrating-ai-into-legacy-systems",
    category: "Enterprise Architecture",
    title: "Integrating AI into systems you can't rip and replace",
    summary: "Most enterprise AI has to work alongside legacy systems, not instead of them.",
    readingTime: "5 min read",
    author: AUTHOR,
    publishedDate: "2026-05-20",
    href: "/insights/integrating-ai-into-legacy-systems",
    featured: false,
    relatedServiceSlugs: ["ai-platform-integration"],
    relatedIndustrySlugs: [],
    body: [
      { type: "heading", text: "Most enterprise AI has to coexist, not replace" },
      {
        type: "paragraph",
        text: "A lot of AI discourse assumes a green-field starting point — a new system, built cleanly, with AI native to the architecture. Most real deployments don't look like that. They have to work alongside an ERP that's been customized for a decade, a CRM full of institutional workarounds, and internal tools nobody wants to touch because nobody fully understands them anymore.",
      },
      { type: "heading", text: "Why \"just integrate it\" undersells the work" },
      {
        type: "paragraph",
        text: "Connecting to a legacy system is rarely just an API call. It usually means understanding data that was never structured with this use case in mind, working around systems with limited or fragile integration points, and being careful not to introduce a new failure mode into a system that, whatever its flaws, currently works.",
      },
      { type: "heading", text: "What tends to work" },
      {
        type: "paragraph",
        text: "The integrations that hold up long-term usually start narrow — one well-scoped read or write path into the legacy system, rather than a broad integration touching everything at once. That narrow scope makes it possible to validate the connection is reliable before expanding it, and it limits the blast radius if something needs to be rolled back.",
      },
      {
        type: "paragraph",
        text: "It also helps to treat the legacy system as the source of truth it already is, rather than trying to migrate its role to the new AI layer prematurely. The AI system earns a larger role over time, as it proves it can be trusted with one.",
      },
      { type: "heading", text: "The real constraint" },
      {
        type: "paragraph",
        text: "In most engagements, the technical integration turns out to be more tractable than the organizational question of who owns the legacy system and how change requests to it get approved. Planning for that process early tends to save more time than optimizing the integration architecture itself.",
      },
    ],
  },
  {
    slug: "why-internal-search-doesnt-work",
    category: "Enterprise Knowledge",
    title: "Why your internal search doesn't work (and what to do instead)",
    summary:
      "Search that returns documents instead of answers pushes employees back to asking a colleague. Here's the difference that actually fixes it.",
    readingTime: "4 min read",
    author: AUTHOR,
    publishedDate: "2026-06-10",
    href: "/insights/why-internal-search-doesnt-work",
    featured: false,
    relatedServiceSlugs: ["enterprise-knowledge-systems"],
    relatedIndustrySlugs: [],
    body: [
      { type: "heading", text: "The problem isn't that search is missing" },
      {
        type: "paragraph",
        text: "Almost every organization we work with already has some form of internal search — a wiki search bar, a document management system, a shared drive with a search field at the top. The problem isn't absence. It's that employees have learned these tools don't reliably answer the question they actually asked, so they stop using them.",
      },
      { type: "heading", text: "Documents versus answers" },
      {
        type: "paragraph",
        text: "Traditional search returns documents that contain a matching keyword. That's useful when you already know which document has your answer. It's much less useful when you have a question and no idea which of forty documents might address it — which is the more common situation.",
      },
      {
        type: "paragraph",
        text: "The gap between \"here are twelve documents that mention this term\" and \"here's the answer, drawn from these two documents\" is the entire difference in whether someone actually uses the tool a second time.",
      },
      { type: "heading", text: "What changes the outcome" },
      {
        type: "paragraph",
        text: "Closing that gap usually requires three things working together: content that's actually current and not scattered across five different systems of record, retrieval that understands the intent behind a question rather than just matching keywords, and answers that cite their source so people can verify rather than blindly trust.",
      },
      {
        type: "paragraph",
        text: "None of these individually is enough. Great retrieval over stale content just returns confident wrong answers faster. Fresh content without good retrieval is the same search problem you already have.",
      },
      { type: "heading", text: "Where to start" },
      {
        type: "paragraph",
        text: "The organizations that get the most value tend to start with one specific, high-friction question pattern — the kind of thing that generates a steady stream of messages to the same two people — rather than trying to index everything at once. Prove it works for one real bottleneck before expanding scope.",
      },
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
