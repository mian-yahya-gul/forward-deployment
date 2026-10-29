"use client";

import { useState, type FormEvent } from "react";
import { trackEvent, trackLead } from "@/lib/analytics";

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
          website: data.get("website"),
          message: data.get("message"),
          nickname: data.get("nickname"), // honeypot
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      trackEvent("contact_form_submit");
      trackLead("contact_form");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-busy={status === "submitting"}>
      {/* Honeypot: hidden from real visitors, but bots that auto-fill every field trip it. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      >
        <label htmlFor="nickname">Leave this field empty</label>
        <input id="nickname" name="nickname" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">
            Full Name <span className="text-primary">*</span>
            <span className="sr-only"> (required)</span>
          </Label>
          <Input id="name" name="name" autoComplete="name" required maxLength={100} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="email">
            Work Email <span className="text-primary">*</span>
            <span className="sr-only"> (required)</span>
          </Label>
          <Input id="email" name="email" type="email" autoComplete="email" required maxLength={254} className="mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="company">
            Company <span className="text-primary">*</span>
            <span className="sr-only"> (required)</span>
          </Label>
          <Input id="company" name="company" autoComplete="organization" required maxLength={150} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="contact-website">Website (optional)</Label>
          <Input
            id="contact-website"
            name="website"
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="yourcompany.com"
            maxLength={200}
            className="mt-2"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="message">
          Message <span className="text-primary">*</span>
          <span className="sr-only"> (required)</span>
        </Label>
        <Textarea id="message" name="message" required maxLength={5000} className="mt-2" rows={5} />
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
