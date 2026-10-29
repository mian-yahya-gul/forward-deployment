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
  {
    slug: "how-to-choose-an-ai-implementation-partner",
    category: "AI Strategy",
    title: "How to choose an AI implementation partner",
    summary:
      "Six questions that separate a partner who will put AI into your daily operations from one who will hand you a report, plus the red flags worth walking away from.",
    readingTime: "3 min read",
    author: AUTHOR,
    publishedDate: "2026-10-29",
    href: "/insights/how-to-choose-an-ai-implementation-partner",
    featured: false,
    relatedServiceSlugs: ["ai-strategy-discovery", "intelligent-business-workflows"],
    relatedIndustrySlugs: [],
    body: [
      {"type": "heading", "text": "Start with what you are actually buying"},
      {"type": "paragraph", "text": "Before comparing firms, decide what you want at the end. Some organizations want a strategy and a roadmap. Others want a working system running inside a real workflow, with people using it every day. Those are different purchases, and many disappointing AI engagements happen when a buyer wanted the second and paid for the first."},
      {"type": "paragraph", "text": "A useful test: ask each candidate to describe what exists on the last day of the engagement. A document? A prototype? A system in production that your team operates? The answer tells you more than any capabilities slide."},
      {"type": "heading", "text": "Six questions worth asking"},
      {"type": "paragraph", "text": "1. Will you work inside our workflows, or advise from outside them? A partner who maps how work is really done, which systems it touches and who decides, is far more likely to build something people actually use than one who starts from a technology."},
      {"type": "paragraph", "text": "2. Where do people stay in control? Ask which steps the AI handles, which steps stay with a person, and how the system hands off. A credible answer is specific to your workflow. Vague reassurance about human oversight is a warning sign."},
      {"type": "paragraph", "text": "3. How will we know it worked? Good partners agree measures with you before building: time per task, error or rework rates, response times, cost per case. If success is described only in terms of activity (number of models, number of automations), keep asking."},
      {"type": "paragraph", "text": "4. Who owns what? Clarify ownership of the system, the data, the prompts and configuration, and any code. Ask what it would take to move to another provider or bring the work in-house."},
      {"type": "paragraph", "text": "5. What happens after launch? AI systems change as data, policies and usage change. Ask who monitors quality, how problems are reported, and how improvement is priced. A project that ends at launch can quietly decay."},
      {"type": "paragraph", "text": "6. How is our data handled? Ask where data is stored and processed, which third-party services touch it, who can access it, and how it is logged. Ask for the answers in writing, and have your security or legal team review them."},
      {"type": "heading", "text": "Red flags"},
      {"type": "paragraph", "text": "Promises of specific savings before anyone has seen your workflow. A tool-first pitch where the product is decided before the problem is understood. Pricing that is an open-ended hourly meter with no cap or scope. No mention of review, testing or evaluation. And no way to see evidence: ask for references, or at least a detailed example of a comparable workflow and how it was measured."},
      {"type": "heading", "text": "A reasonable way to start"},
      {"type": "paragraph", "text": "Pick one workflow that is frequent, measurable and painful, and scope a small first engagement around it. A single well-chosen workflow teaches both sides how they work together, and it produces a real result you can judge before committing further."},
      {"type": "paragraph", "text": "This is how DeosAI Labs approaches engagements: a structured path from discovery to deployment for one workflow at a time, with a fixed fee to build and an ongoing cost to run. You can read the approach on our page explaining AI forward deployment, and try the free AI Opportunity Assessment to see where a good first workflow might be."},
    ],
  },
  {
    slug: "ai-governance-checklist-for-us-companies",
    category: "AI Governance",
    title: "An AI governance checklist for US companies",
    summary:
      "A practical checklist for putting basic governance around AI before it scales: ownership, risk, oversight, testing, logging and vendors, anchored to NIST's AI Risk Management Framework.",
    readingTime: "3 min read",
    author: AUTHOR,
    publishedDate: "2026-10-29",
    href: "/insights/ai-governance-checklist-for-us-companies",
    featured: false,
    relatedServiceSlugs: ["ai-governance-evaluation"],
    relatedIndustrySlugs: [],
    body: [
      {"type": "paragraph", "text": "This is general guidance, not legal advice. Requirements depend on your industry, your states and the data involved, so involve qualified counsel for decisions that carry legal risk."},
      {"type": "heading", "text": "Why governance comes before scale"},
      {"type": "paragraph", "text": "One AI assistant in one team is easy to supervise informally. Ten of them across departments, using different data and different vendors, is not. Governance is the set of simple, written decisions that keep AI use visible, owned and checked as it grows. It is much cheaper to set up early than to untangle later."},
      {"type": "heading", "text": "The checklist"},
      {"type": "paragraph", "text": "1. Keep an inventory. List every AI system or AI-enabled tool in use: what it does, which data it touches, who owns it, and which vendor supplies it. You can't govern what you can't see."},
      {"type": "paragraph", "text": "2. Name an owner for each system. One accountable person on the business side, not only the technical side."},
      {"type": "paragraph", "text": "3. Classify by impact. A tool that drafts internal meeting notes is not the same as one that influences who gets a loan, a job, a claim decision or medical attention. Apply more review where the consequences for people are greater."},
      {"type": "paragraph", "text": "4. Decide where a person must approve. Define in advance which decisions the AI may make on its own, which it may only recommend, and which stay entirely with people."},
      {"type": "paragraph", "text": "5. Test before launch and keep testing. Agree how quality will be measured, using realistic examples including difficult ones, and re-check on a schedule, not just once."},
      {"type": "paragraph", "text": "6. Keep logs you can audit. Record what the system was asked, what it produced and what a person did with it, so a decision can be reviewed later."},
      {"type": "paragraph", "text": "7. Review data handling and privacy. Check what personal or regulated data enters the system, where it is stored and processed, and who can see it. If you handle protected health information, HIPAA considerations apply."},
      {"type": "paragraph", "text": "8. Review your vendors. Understand what each vendor does with your data, how they handle incidents, and what your contract says about it."},
      {"type": "paragraph", "text": "9. Plan for problems. Decide how issues are reported, who investigates, and when a system is paused or rolled back."},
      {"type": "paragraph", "text": "10. Train the people involved. Staff should know what the system is for, what it can't do and when to escalate."},
      {"type": "heading", "text": "Frameworks worth anchoring to"},
      {"type": "paragraph", "text": "The NIST AI Risk Management Framework (AI RMF 1.0, published by the U.S. National Institute of Standards and Technology in 2023) organizes AI risk work into four functions: Govern, Map, Measure and Manage. It is voluntary, widely referenced, and a sensible vocabulary to use with your leadership and auditors. ISO/IEC 42001 is an international standard for an AI management system, useful if customers or regulators ask for something certifiable."},
      {"type": "heading", "text": "Laws and regulation"},
      {"type": "paragraph", "text": "Rules on automated decision-making and AI use are developing, and several U.S. states have introduced their own requirements. They differ and change, and sector regulators add their own expectations. Treat this as a standing item for your legal team, not a one-time check."},
      {"type": "paragraph", "text": "DeosAI Labs offers AI Governance & Evaluation as a service, and you can use our free AI deployment readiness checklist as a starting point for the workflow-level questions."},
    ],
  },
  {
    slug: "how-to-estimate-ai-workflow-automation-roi",
    category: "Workflow Automation",
    title: "How to estimate the ROI of AI workflow automation",
    summary:
      "A simple, honest way to estimate what automating part of a workflow could save, with a worked example and the mistakes that make most estimates too optimistic.",
    readingTime: "2 min read",
    author: AUTHOR,
    publishedDate: "2026-10-29",
    href: "/insights/how-to-estimate-ai-workflow-automation-roi",
    featured: false,
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-strategy-discovery"],
    relatedIndustrySlugs: [],
    body: [
      {"type": "heading", "text": "Start with the workflow, not the technology"},
      {"type": "paragraph", "text": "A credible estimate starts with one workflow and four numbers you can find or measure: how many times it runs each month, how long one run takes, what an hour of that work costs, and how much of it AI could realistically handle."},
      {"type": "heading", "text": "The arithmetic"},
      {"type": "paragraph", "text": "Hours before = tasks per month × minutes per task ÷ 60. Hours automated = hours before × the share AI handles. Review hours = hours automated × the review time needed. Net hours saved = hours automated − review hours. Monthly saving = net hours saved × cost per hour. Annual saving = monthly saving × 12."},
      {"type": "heading", "text": "A worked example"},
      {"type": "paragraph", "text": "Illustrative numbers only: 2,000 requests a month, 12 minutes each, at 25 dollars an hour. That is 400 hours of work. If AI handles half of it, 200 hours are automated. If a person spends 15 percent of that time reviewing, 30 hours go to review, leaving 170 hours saved: about 4,250 dollars a month, or 51,000 dollars a year."},
      {"type": "paragraph", "text": "You can try your own numbers in our free Workflow Savings Calculator, which shows the same formula and lets you change the assumptions."},
      {"type": "heading", "text": "Mistakes that make estimates too optimistic"},
      {"type": "paragraph", "text": "Assuming 100 percent automation. Most workflows have exceptions and judgment calls that stay with people. Start with a conservative share and test a lower figure as well."},
      {"type": "paragraph", "text": "Ignoring review time. When a person checks the AI's work, that time is real. Leaving it out makes the work look free."},
      {"type": "paragraph", "text": "Leaving out cost to build and run. A saving is only meaningful against what it costs to deliver and operate. Compare the net saving to the full cost, not just to the first invoice."},
      {"type": "paragraph", "text": "Counting only hours. Faster turnaround, fewer errors, better consistency and less rework are often worth more than raw time saved, but they need their own measures."},
      {"type": "paragraph", "text": "Using averages that hide the spread. If a few complex cases consume most of the time, automating the simple majority may save less than the average suggests."},
      {"type": "heading", "text": "Measure before and after"},
      {"type": "paragraph", "text": "The most reliable estimate comes from measuring the workflow today. Time a sample of real cases, record error and rework rates, and use those numbers. After launch, track the same measures so you can compare honestly."},
      {"type": "paragraph", "text": "An estimate like this is a way to decide whether a workflow is worth exploring, not a promise of results. A short discovery conversation is where assumptions get tested against your actual process."},
    ],
  },
  {
    slug: "ai-deployment-considerations-for-mena-organizations",
    category: "Regional Considerations",
    title: "AI deployment considerations for organizations in the Middle East and North Africa",
    summary:
      "Data protection, data residency, Arabic-language quality and bilingual workflows: the regional questions worth settling before an AI system goes live in MENA.",
    readingTime: "3 min read",
    author: AUTHOR,
    publishedDate: "2026-10-29",
    href: "/insights/ai-deployment-considerations-for-mena-organizations",
    featured: false,
    relatedServiceSlugs: ["ai-governance-evaluation", "ai-platform-integration"],
    relatedIndustrySlugs: [],
    body: [
      {"type": "paragraph", "text": "This is general guidance, not legal advice. Rules differ by country and sector and change over time, so confirm current requirements with local counsel before you deploy."},
      {"type": "heading", "text": "Data protection rules differ by country"},
      {"type": "paragraph", "text": "Many countries in the region now have personal data protection laws, and they are not identical. Examples include the UAE's federal data protection law, Saudi Arabia's Personal Data Protection Law, Qatar's data privacy law and Egypt's data protection law, along with separate regimes in some financial free zones. They differ on consent, on rights of individuals and on moving data across borders."},
      {"type": "paragraph", "text": "The practical consequence: an AI system that is fine in one country may need changes in another. Treat each country you operate in as its own question."},
      {"type": "heading", "text": "Where data is stored and processed"},
      {"type": "paragraph", "text": "Some countries and sectors, especially government, healthcare and financial services, restrict where certain data may be stored or processed, or require specific approvals to transfer it abroad. Before choosing a platform or model provider, find out where data is stored, where it is processed, which sub-processors are involved and whether you can choose a region."},
      {"type": "paragraph", "text": "If a requirement can't be met by a particular provider, it is better to learn that in the design phase than after launch."},
      {"type": "heading", "text": "Arabic is not one language setting"},
      {"type": "paragraph", "text": "Modern Standard Arabic is used in writing and formal communication, while spoken Arabic varies widely by country and community. Customers and staff may write in MSA, in dialect, in English, or mix them in one message. Names can be transliterated several ways, which affects searching and matching records."},
      {"type": "paragraph", "text": "Test with real examples from your own channels, not a generic benchmark. Include dialect, mixed Arabic and English, and the misspellings people actually use, then measure quality separately for each language you support."},
      {"type": "heading", "text": "Interfaces and documents"},
      {"type": "paragraph", "text": "If staff or customers use Arabic, check right-to-left layout, mixed-direction text such as numbers and Latin names inside Arabic sentences, and how documents, forms and PDFs are read and generated. These details are easy to miss in an English-first build."},
      {"type": "heading", "text": "Keep people in the loop"},
      {"type": "paragraph", "text": "The same principles apply here as anywhere: define which steps the AI handles, which stay with a person, and how it hands off. Where decisions affect customers or citizens, plan for review by someone who understands the local language and context."},
      {"type": "heading", "text": "A short regional checklist"},
      {"type": "paragraph", "text": "Which countries will the system serve, and which data protection law applies in each? Where will data be stored and processed? Are there sector rules for this data? Which languages and dialects must it handle, and how will quality be measured in each? Who reviews its work, in which language? Who owns the system after launch?"},
      {"type": "paragraph", "text": "DeosAI Labs works with organizations across the United States and the Middle East and North Africa, in English. If you are planning a deployment in the region, our AI Governance & Evaluation and AI Platform Integration services cover many of these questions."},
    ],
  },
  {
    slug: "ai-automation-for-insurance-claims",
    category: "Industry Insights",
    title: "Where AI helps in insurance claims, and where people should decide",
    summary:
      "A practical look at which parts of the claims workflow suit AI (intake, document handling, triage, status updates) and which decisions should stay with people.",
    readingTime: "2 min read",
    author: AUTHOR,
    publishedDate: "2026-10-29",
    href: "/insights/ai-automation-for-insurance-claims",
    featured: false,
    relatedServiceSlugs: ["intelligent-business-workflows", "ai-governance-evaluation"],
    relatedIndustrySlugs: ["insurance"],
    body: [
      {"type": "heading", "text": "Claims are a workflow, not one task"},
      {"type": "paragraph", "text": "A claim passes through many steps: first notice of loss, document collection, coverage review, investigation, evaluation, communication and payment or denial. Each step has different volume, different information and different risk. That is why the useful question is not whether to use AI in claims, but which steps."},
      {"type": "heading", "text": "Steps that often suit AI"},
      {"type": "paragraph", "text": "Intake. Reading a first report, extracting key details and checking what is missing, so adjusters don't start from a blank form."},
      {"type": "paragraph", "text": "Document handling. Pulling facts out of emails, photos, estimates and forms, and filing them against the right claim."},
      {"type": "paragraph", "text": "Triage and routing. Sorting claims by type and complexity so simple ones move quickly and complex ones reach the right person sooner."},
      {"type": "paragraph", "text": "Preparation for people. Gathering policy details, claim history and relevant notes into one view for the adjuster."},
      {"type": "paragraph", "text": "Status communication. Drafting routine updates for a person to approve or send, so customers aren't left waiting for news."},
      {"type": "paragraph", "text": "Signals for review. Flagging unusual patterns for a specialist to examine. A flag is a prompt for a person to look, not a conclusion."},
      {"type": "heading", "text": "Decisions that should stay with people"},
      {"type": "paragraph", "text": "Coverage determinations, denials, settlement decisions and anything contested or sensitive. These affect people's finances and rights, and they are where judgment, empathy and accountability matter most. Designing the workflow so the AI hands these over, with the facts already assembled, is usually more valuable than trying to automate the decision."},
      {"type": "heading", "text": "Regulation and oversight"},
      {"type": "paragraph", "text": "Insurers face expectations about fairness, transparency and record-keeping in how they use automated tools. In the United States, the National Association of Insurance Commissioners has published a model bulletin on insurers' use of AI systems, and many states have adopted guidance based on it. Requirements vary by state and line of business, so involve your compliance and legal teams early, and keep logs that show what the system did and what a person decided."},
      {"type": "heading", "text": "How to measure it"},
      {"type": "paragraph", "text": "Pick measures before you build: time from first notice to first contact, time spent per claim, the number of times a claim is touched, rework and error rates, and customer satisfaction on claims. Measure a baseline now so you can compare honestly after launch."},
      {"type": "heading", "text": "Where to start"},
      {"type": "paragraph", "text": "Choose one frequent, well-understood claim type and one or two steps, such as intake and document extraction, rather than the whole process. Keep adjusters involved from the first week, and review outputs together."},
      {"type": "paragraph", "text": "You can read more in the insurance chapter of our free Forward Deployment Playbook and on our insurance industry page, or try the free AI Opportunity Assessment to see which services fit your situation."},
    ],
  },
];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
