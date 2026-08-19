"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const UNLOCK_KEY = "deosai-playbook-unlocked";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isPlaybookUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(UNLOCK_KEY) === "1";
  } catch {
    return false;
  }
}

function markPlaybookUnlocked() {
  try {
    window.localStorage.setItem(UNLOCK_KEY, "1");
  } catch {
    // Storage unavailable (private browsing, etc.) — the reader still gets
    // through this visit, they'll just see the gate again next time.
  }
}

interface PlaybookGateModalProps {
  /** Where to send the reader once they've entered an email (or already unlocked). */
  destination: string;
  onClose: () => void;
}

/**
 * Email gate shown before a first-time visitor reaches the Playbook.
 * Submission only ever notifies the site owner (see /api/playbook-lead) —
 * reading access is never blocked on that call succeeding, so a Resend
 * outage costs a lead-list entry, not a reader.
 */
export function PlaybookGateModal({ destination, onClose }: PlaybookGateModalProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const proceed = () => {
    markPlaybookUnlocked();
    window.location.href = destination;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      await fetch("/api/playbook-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, website: company }),
      });
    } catch {
      // Best-effort — see the component doc comment.
    }

    proceed();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="playbook-gate-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-[var(--radius-lg)] border border-border bg-background p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="playbook-gate-title" className="text-lg font-semibold text-foreground">
            Get the Playbook
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
          >
            <X className="size-5" aria-hidden />
          </button>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted">
          Enter your email and we&rsquo;ll take you straight to the book — free to read, no spam.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3" noValidate>
          <input
            type="email"
            required
            autoFocus
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {/* Honeypot — hidden from real visitors, bots tend to fill every field. */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="hidden"
            aria-hidden
          />

          {error && <p className="text-xs text-danger">{error}</p>}

          <button type="submit" disabled={submitting} className={cn(buttonVariants({ size: "lg" }), "w-full")}>
            {submitting ? "Unlocking…" : "Start Reading"}
          </button>
        </form>
      </div>
    </div>
  );
}
