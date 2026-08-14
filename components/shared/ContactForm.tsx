"use client";

import { useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactEmail } from "@/lib/data/contact";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          website: data.get("website"), // honeypot
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      track("contact_form_submit");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot: hidden from real visitors, but bots that auto-fill every field trip it. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      >
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">
            Full Name <span className="text-primary">*</span>
            <span className="sr-only"> (required)</span>
          </Label>
          <Input id="name" name="name" autoComplete="name" required className="mt-2" />
        </div>
        <div>
          <Label htmlFor="email">
            Email <span className="text-primary">*</span>
            <span className="sr-only"> (required)</span>
          </Label>
          <Input id="email" name="email" type="email" autoComplete="email" required className="mt-2" />
        </div>
      </div>

      <div>
        <Label htmlFor="company">Company</Label>
        <Input id="company" name="company" autoComplete="organization" className="mt-2" />
      </div>

      <div>
        <Label htmlFor="message">
          Message <span className="text-primary">*</span>
          <span className="sr-only"> (required)</span>
        </Label>
        <Textarea id="message" name="message" required className="mt-2" rows={5} />
      </div>

      <div>
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send Message"}
        </Button>

        {status === "success" && (
          <p className="mt-3 text-sm font-medium text-primary" role="status">
            Thanks — your message has been sent. We&apos;ll get back to you soon.
          </p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm font-medium text-danger" role="alert">
            {errorMessage} You can also email us directly at {contactEmail}.
          </p>
        )}
      </div>
    </form>
  );
}
