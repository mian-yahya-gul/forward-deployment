import { AlertTriangle } from "lucide-react";

import type { LegalSection } from "@/lib/data/legal";

interface LegalContentProps {
  lastUpdated: string;
  draftNotice?: string;
  sections: LegalSection[];
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function LegalContent({ lastUpdated, draftNotice, sections }: LegalContentProps) {
  return (
    <div className="mx-auto max-w-2xl px-6">
      <p className="text-sm text-muted">Last updated: {formatDate(lastUpdated)}</p>

      {draftNotice && (
        <div className="mt-6 flex gap-3 rounded-[var(--radius-md)] border border-warning/30 bg-warning/10 p-4">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning" aria-hidden />
          <p className="text-sm leading-relaxed text-foreground">{draftNotice}</p>
        </div>
      )}

      <div className="mt-10 space-y-10">
        {sections.map((section) => (
          <div key={section.heading}>
            <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
