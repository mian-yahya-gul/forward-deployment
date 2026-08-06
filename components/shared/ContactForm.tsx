"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactEmail, contactFormNote } from "@/lib/data/contact";

/**
 * There's no backend or CMS behind this site yet, so submitting hands off
 * to the visitor's email client with the message pre-filled rather than
 * silently pretending a server received it — contactFormNote says this
 * explicitly in the UI.
 */
export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name")?.toString().trim() ?? "";
    const email = data.get("email")?.toString().trim() ?? "";
    const company = data.get("company")?.toString().trim() ?? "";
    const message = data.get("message")?.toString().trim() ?? "";

    const subject = `New inquiry from ${name || "the DeosAI Labs website"}`;
    const body = [company && `Company: ${company}`, email && `Email: ${email}`, "", message]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
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
        <Button type="submit" size="lg">
          Send Message
        </Button>
        <p className="mt-3 text-xs text-muted">{contactFormNote}</p>
        {submitted && (
          <p className="mt-2 text-xs font-medium text-primary" role="status">
            Opening your email client now — if nothing happens, email us directly at {contactEmail}.
          </p>
        )}
      </div>
    </form>
  );
}
