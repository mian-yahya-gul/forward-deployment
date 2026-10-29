"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { ScrollReveal } from "@/components/shared/ScrollReveal";
import { WorkflowCard } from "@/components/shared/WorkflowCard";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  deploymentComplexityLevels,
  workflowCategories,
  type DeploymentComplexity,
  type PublicWorkflow,
  type WorkflowCategory,
} from "@/lib/data/workflows";

interface WorkflowCatalogProps {
  workflows: PublicWorkflow[];
  industryNames: string[];
  /** Preselects the industry filter — used when embedding the catalog on an industry-scoped view. */
  initialIndustry?: string;
}

const ALL = "All";

const selectClass =
  "h-11 rounded-[var(--radius-sm)] border border-border bg-background px-3.5 text-sm text-foreground transition-colors duration-[var(--duration-fast)] focus-visible:border-primary focus-visible:outline-none";

export function WorkflowCatalog({ workflows, industryNames, initialIndustry }: WorkflowCatalogProps) {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState(initialIndustry ?? ALL);
  const [category, setCategory] = useState<WorkflowCategory | typeof ALL>(ALL);
  const [complexity, setComplexity] = useState<DeploymentComplexity | typeof ALL>(ALL);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return workflows.filter((workflow) => {
      if (industry !== ALL && workflow.industryName !== industry) return false;
      if (category !== ALL && workflow.category !== category) return false;
      if (complexity !== ALL && workflow.deploymentComplexity !== complexity) return false;
      if (query) {
        const haystack = [workflow.workflowName, workflow.shortDescription, ...workflow.tags].join(" ").toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [workflows, search, industry, category, complexity]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <div className="relative flex-1 sm:min-w-[240px]">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" aria-hidden />
          <Input
            type="search"
            placeholder="Search workflows..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="pl-10"
            aria-label="Search workflows"
          />
        </div>

        <select
          value={industry}
          onChange={(event) => setIndustry(event.target.value)}
          className={selectClass}
          aria-label="Filter by industry"
        >
          <option value={ALL}>All industries</option>
          {industryNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as WorkflowCategory | typeof ALL)}
          className={selectClass}
          aria-label="Filter by category"
        >
          <option value={ALL}>All categories</option>
          {workflowCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={complexity}
          onChange={(event) => setComplexity(event.target.value as DeploymentComplexity | typeof ALL)}
          className={selectClass}
          aria-label="Filter by deployment complexity"
        >
          <option value={ALL}>All complexity levels</option>
          {deploymentComplexityLevels.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {filtered.length > 0 ? (
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((workflow, index) => (
            <ScrollReveal as="li" key={workflow.id} delay={(index % 3) * 80}>
              <WorkflowCard workflow={workflow} />
            </ScrollReveal>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-[var(--radius-lg)] border border-border bg-surface p-10 text-center">
          <p className="text-base font-semibold text-foreground">No published workflows match yet.</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            We&rsquo;re still expanding the catalog industry by industry. Tell us about the workflow you have in mind and
            we&rsquo;ll map it directly.
          </p>
          <Link href="/contact" className={cn(buttonVariants({ variant: "secondary" }), "mt-6")}>
            Discuss Your Workflow
          </Link>
        </div>
      )}
    </div>
  );
}
