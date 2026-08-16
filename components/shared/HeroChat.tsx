"use client";

import { useState, type FormEvent } from "react";
import { Sparkles, X } from "lucide-react";

import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "answered" | "error";

export function HeroChat() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const message = query.trim();
    if (!message || status === "loading") return;

    setStatus("loading");
    setAnswer("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = (await res.json()) as { answer?: string; error?: string };

      if (!res.ok || !data.answer) {
        setAnswer(data.error ?? "Something went wrong. Try again.");
        setStatus("error");
        return;
      }

      setAnswer(data.answer);
      setStatus("answered");
    } catch {
      setAnswer("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  function reset() {
    setQuery("");
    setAnswer("");
    setStatus("idle");
  }

  const isOpen = status !== "idle";

  return (
    <div className="mt-6 max-w-[520px]">
      <form
        onSubmit={handleSubmit}
        className="group relative flex items-center rounded-[var(--radius-md)] border border-primary/50 bg-surface px-4 transition-[box-shadow,border-color] duration-[var(--duration-normal)] ease-[var(--ease-out)] focus-within:border-primary"
        style={{
          boxShadow:
            "0 0 0 1px color-mix(in srgb, var(--primary) 25%, transparent), 0 0 16px -2px color-mix(in srgb, var(--primary) 55%, transparent), 0 0 36px -6px color-mix(in srgb, var(--primary) 40%, transparent)",
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[var(--radius-md)] opacity-0 transition-opacity duration-[var(--duration-normal)] group-focus-within:opacity-100"
          style={{
            boxShadow:
              "0 0 0 3px color-mix(in srgb, var(--primary) 22%, transparent), 0 0 28px -4px color-mix(in srgb, var(--primary) 65%, transparent)",
          }}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask about our services, playbook, or how we can help…"
          aria-label="Ask DeosAI Labs a question"
          maxLength={400}
          className="relative h-12 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
        />
        <button
          type="submit"
          disabled={!query.trim() || status === "loading"}
          aria-label="Ask"
          className="relative flex size-8 shrink-0 items-center justify-center rounded-full text-primary transition-opacity duration-[var(--duration-fast)] disabled:opacity-40"
        >
          <Sparkles
            className={cn("size-4", status === "loading" && "animate-pulse")}
            aria-hidden
          />
        </button>
      </form>

      <div
        className="grid transition-[grid-template-rows] duration-[var(--duration-slow)] ease-[var(--ease-out)]"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "mt-3 rounded-[var(--radius-md)] border border-border bg-background p-4 text-sm leading-relaxed transition-opacity duration-[var(--duration-normal)]",
              isOpen ? "opacity-100" : "opacity-0",
              status === "error" ? "text-muted" : "text-foreground",
            )}
          >
            {status === "loading" ? (
              <span className="text-muted">Thinking…</span>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <p>{answer}</p>
                <button
                  type="button"
                  onClick={reset}
                  aria-label="Clear answer"
                  className="shrink-0 text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
                >
                  <X className="size-4" aria-hidden />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
