import { Plus } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FaqItem[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground marker:content-none">
            {item.question}
            <Plus
              className="size-4 shrink-0 text-muted transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] group-open:rotate-45"
              aria-hidden
            />
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
