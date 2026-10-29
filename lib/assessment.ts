import { industries } from "@/lib/data/industries";
import { services } from "@/lib/data/services";

/**
 * AI Opportunity Assessment: a short questionnaire scored with simple, visible rules. The same
 * `recommend()` runs in the browser (instant results) and on the server (emailed results), so answers
 * are never trusted as free text — only as ids from these option lists.
 */

export interface Option {
  id: string;
  label: string;
}

export interface Question {
  id: "industry" | "func" | "challenge" | "stage" | "systems" | "outcome";
  prompt: string;
  help?: string;
  multiple?: boolean;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: "industry",
    prompt: "Which industry are you in?",
    options: [
      ...industries.map((industry) => ({ id: industry.slug, label: industry.name })),
      { id: "other", label: "Something else" },
    ],
  },
  {
    id: "func",
    prompt: "Which area do you want to improve first?",
    options: [
      { id: "customer-support", label: "Customer service and support" },
      { id: "operations", label: "Operations and coordination" },
      { id: "finance", label: "Finance and back office" },
      { id: "sales-marketing", label: "Sales and marketing" },
      { id: "compliance", label: "Compliance and documents" },
      { id: "it-knowledge", label: "IT and internal knowledge" },
      { id: "other", label: "Something else" },
    ],
  },
  {
    id: "challenge",
    prompt: "What is the biggest problem today?",
    options: [
      { id: "manual-work", label: "Too much repetitive manual work" },
      { id: "scattered-info", label: "Information is scattered across systems" },
      { id: "errors", label: "Inconsistent quality or frequent errors" },
      { id: "scale", label: "We can't scale without hiring more people" },
      { id: "compliance", label: "Compliance and audit burden" },
      { id: "unclear", label: "We're not sure where AI fits" },
    ],
  },
  {
    id: "stage",
    prompt: "Where are you with AI today?",
    options: [
      { id: "none", label: "Not started yet" },
      { id: "pilots", label: "Running experiments or pilots" },
      { id: "production", label: "Some AI is in production" },
      { id: "scaling", label: "Scaling AI across teams" },
    ],
  },
  {
    id: "systems",
    prompt: "Which systems would this need to work with?",
    help: "Select all that apply.",
    multiple: true,
    options: [
      { id: "crm", label: "CRM" },
      { id: "erp", label: "ERP or finance systems" },
      { id: "ticketing", label: "Ticketing or helpdesk" },
      { id: "documents", label: "Email, documents or files" },
      { id: "data", label: "Databases or a data warehouse" },
      { id: "legacy", label: "Legacy or custom-built systems" },
    ],
  },
  {
    id: "outcome",
    prompt: "What outcome matters most?",
    options: [
      { id: "speed", label: "Faster response and turnaround" },
      { id: "cost", label: "Lower operating cost" },
      { id: "quality", label: "Fewer errors, more consistency" },
      { id: "visibility", label: "Better visibility into the work" },
      { id: "risk", label: "Safer, more controlled AI use" },
    ],
  },
];

export type Answers = Partial<Record<Question["id"], string | string[]>>;

type ServiceSlug = (typeof services)[number]["slug"];
type Weights = Partial<Record<ServiceSlug, number>>;

const S = "ai-strategy-discovery";
const W = "intelligent-business-workflows";
const K = "enterprise-knowledge-systems";
const A = "ai-assistants-copilots";
const I = "ai-platform-integration";
const G = "ai-governance-evaluation";
const C = "continuous-optimization";

const weights: Record<string, Record<string, Weights>> = {
  func: {
    "customer-support": { [A]: 2, [K]: 1 },
    operations: { [W]: 2 },
    finance: { [W]: 2, [G]: 1 },
    "sales-marketing": { [A]: 1, [W]: 1 },
    compliance: { [G]: 2, [K]: 1 },
    "it-knowledge": { [K]: 2, [I]: 1 },
    other: { [S]: 1 },
  },
  challenge: {
    "manual-work": { [W]: 3, [A]: 1 },
    "scattered-info": { [K]: 3, [I]: 1 },
    errors: { [W]: 1, [G]: 2, [C]: 1 },
    scale: { [A]: 2, [W]: 2 },
    compliance: { [G]: 3, [K]: 1 },
    unclear: { [S]: 4 },
  },
  stage: {
    none: { [S]: 3 },
    pilots: { [S]: 1, [G]: 1, [I]: 1 },
    production: { [C]: 3, [G]: 1 },
    scaling: { [C]: 2, [G]: 2, [I]: 1 },
  },
  systems: {
    crm: { [I]: 1 },
    erp: { [I]: 1 },
    ticketing: { [I]: 1, [A]: 1 },
    documents: { [I]: 1, [K]: 1 },
    data: { [I]: 1 },
    legacy: { [I]: 2 },
  },
  outcome: {
    speed: { [A]: 1, [W]: 1 },
    cost: { [W]: 2 },
    quality: { [G]: 1, [C]: 1 },
    visibility: { [K]: 1, [C]: 1 },
    risk: { [G]: 3 },
  },
};

const stageNextStep: Record<string, string> = {
  none: "You haven't started yet, so the highest-value first step is a short discovery to map where AI fits your existing workflows, before anything is built.",
  pilots:
    "You already have experiments running. The next step is usually deciding which pilot is worth taking into production, and what it needs to get there safely.",
  production:
    "You already run AI in production, so the focus is making it measurably better: evaluating it, monitoring it, and improving it on a regular cycle.",
  scaling:
    "You're scaling AI across teams. The priorities are consistent governance, shared integrations, and a way to evaluate quality as usage grows.",
};

export interface Recommendation {
  slug: string;
  title: string;
  href: string;
  purpose: string;
  score: number;
}

export interface AssessmentResult {
  recommendations: Recommendation[];
  nextStep: string;
  industry?: { name: string; href: string };
  summary: string;
}

function labelOf(question: Question["id"], answers: Answers): string {
  const q = questions.find((item) => item.id === question)!;
  const value = answers[question];
  const ids = Array.isArray(value) ? value : value ? [value] : [];
  return ids.map((id) => q.options.find((option) => option.id === id)?.label ?? id).join(", ") || "Not answered";
}

/** Keeps only ids that exist in the option lists, so crafted input can't reach the scoring or the email. */
export function sanitizeAnswers(input: unknown): Answers {
  const clean: Answers = {};
  if (typeof input !== "object" || input === null) return clean;

  for (const question of questions) {
    const raw = (input as Record<string, unknown>)[question.id];
    const valid = new Set(question.options.map((option) => option.id));
    if (question.multiple) {
      const list = Array.isArray(raw) ? raw.filter((id): id is string => typeof id === "string" && valid.has(id)) : [];
      if (list.length) clean[question.id] = [...new Set(list)];
    } else if (typeof raw === "string" && valid.has(raw)) {
      clean[question.id] = raw;
    }
  }
  return clean;
}

export function recommend(answers: Answers): AssessmentResult {
  const scores = new Map<string, number>(services.map((service) => [service.slug, 0]));

  for (const [questionId, byOption] of Object.entries(weights)) {
    const value = answers[questionId as Question["id"]];
    const selected = Array.isArray(value) ? value : value ? [value] : [];
    for (const optionId of selected) {
      for (const [slug, points] of Object.entries(byOption[optionId] ?? {})) {
        scores.set(slug, (scores.get(slug) ?? 0) + (points ?? 0));
      }
    }
  }

  const recommendations = services
    .map((service, index) => ({ service, index, score: scores.get(service.slug) ?? 0 }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, 3)
    .map(({ service, score }) => ({
      slug: service.slug,
      title: service.title,
      href: `/services/${service.slug}`,
      purpose: service.purpose,
      score,
    }));

  const industrySlug = typeof answers.industry === "string" ? answers.industry : undefined;
  const industry = industries.find((item) => item.slug === industrySlug);
  const stage = typeof answers.stage === "string" ? answers.stage : "none";

  const summary = [
    `Industry: ${labelOf("industry", answers)}`,
    `Focus area: ${labelOf("func", answers)}`,
    `Main problem: ${labelOf("challenge", answers)}`,
    `AI today: ${labelOf("stage", answers)}`,
    `Systems: ${labelOf("systems", answers)}`,
    `Priority outcome: ${labelOf("outcome", answers)}`,
    `Suggested services: ${recommendations.map((r) => r.title).join("; ")}`,
  ].join("\n");

  return {
    recommendations,
    nextStep: stageNextStep[stage] ?? stageNextStep.none,
    industry: industry ? { name: industry.name, href: `/industries/${industry.slug}` } : undefined,
    summary,
  };
}

export function isComplete(answers: Answers): boolean {
  return questions.every((question) => {
    const value = answers[question.id];
    return Array.isArray(value) ? value.length > 0 : Boolean(value);
  });
}
