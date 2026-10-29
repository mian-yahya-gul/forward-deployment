"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent, trackLead } from "@/lib/analytics";
import type { Answers } from "@/lib/assessment";

type Status = "idle" | "sending" | "sent" | "error";

type Payload = { kind: "resource"; slug: string } | { kind: "assessment"; answers: Answers };

interface EmailCopyFormProps {
  payload: Payload;
  /** Short name used in the label and analytics, e.g. "checklist" or "results". */
  noun: string;
  id: string;
}

/** Sends the visitor a copy by email. The server rebuilds the content from ids; nothing free-form is trusted. */
export function EmailCopyForm({ payload, noun, id }: EmailCopyFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/tool-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, email: data.get("email"), nickname: data.get("nickname") }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) throw new Error(result.error || "Something went wrong. Please try again.");

      setStatus("sent");
      trackEvent("tool_email_sent", { tool: payload.kind });
      trackLead("tool_email");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <p className="text-sm font-medium text-primary" role="status">
        Sent — check your inbox for your {noun}.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" aria-busy={status === "sending"}>
      {/* Honeypot: hidden from visitors; bots that fill every field trip it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}>
        <label htmlFor={`${id}-nickname`}>Leave this field empty</label>
        <input id={`${id}-nickname`} name="nickname" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Label htmlFor={`${id}-email`}>Email me a copy of the {noun}</Label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="you@company.com"
          className="sm:max-w-xs"
        />
        <Button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send it to me"}
        </Button>
      </div>
      {status === "error" && (
        <p className="text-sm font-medium text-danger" role="alert">
          {message}
        </p>
      )}
      <p className="text-xs text-muted">We&apos;ll send this one email. No newsletter unless you ask for one.</p>
    </form>
  );
}
