"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { trackEvent, trackLead } from "@/lib/analytics";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { budgetOptions, contactEmail, enquiryTypes, timelineOptions } from "@/lib/data/contact";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

interface ContactFormProps {
  /** "partnership" locks the enquiry type and adjusts the wording for agencies. */
  variant?: "general" | "partnership";
  /** Prefix for field ids, so two forms can exist on one page. */
  idPrefix?: string;
}

const required = (
  <>
    <span className="text-primary" aria-hidden>
      {" "}
      *
    </span>
    <span className="sr-only"> (required)</span>
  </>
);

export function ContactForm({ variant = "general", idPrefix = "contact" }: ContactFormProps) {
  const isPartner = variant === "partnership";
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const typeRef = useRef<HTMLSelectElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const id = (name: string) => `${idPrefix}-${name}`;

  // Package CTAs link here with ?type=automation|application so the right enquiry type is pre-selected.
  useEffect(() => {
    if (isPartner || !typeRef.current) return;
    const requested = new URLSearchParams(window.location.search).get("type");
    if (requested && enquiryTypes.some((type) => type.value === requested && type.value !== "partnership")) {
      typeRef.current.value = requested;
    }
  }, [isPartner]);

  useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status]);

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
          enquiryType: isPartner ? "partnership" : data.get("enquiryType"),
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          country: data.get("country"),
          website: data.get("website"),
          message: data.get("message"),
          budget: data.get("budget"),
          timeline: data.get("timeline"),
          nickname: data.get("nickname"), // honeypot
        }),
      });

      let result: { error?: string } = {};
      try {
        result = await response.json();
      } catch {
        // Non-JSON error body (e.g. a gateway error): fall through to the generic message.
      }

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setSubmittedName(String(data.get("name") ?? ""));
      setSubmittedEmail(String(data.get("email") ?? ""));
      setStatus("success");
      trackEvent(isPartner ? "partner_form_submit" : "contact_form_submit");
      trackLead(isPartner ? "partner_form" : "contact_form");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-md)] border border-border bg-surface p-8" role="status">
        <CheckCircle2 className="size-8 text-primary" aria-hidden />
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          Thank you{submittedName ? `, ${submittedName.split(" ")[0]}` : ""}. Your enquiry has been sent.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          We will review what you shared and reply by email to {submittedEmail || "the address you provided"}. If you
          have not heard from us, check your spam folder or write to {contactEmail}.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact#book" className={buttonVariants({ variant: "primary" })}>
            Book a Discovery Call
          </Link>
          <Button type="button" variant="secondary" onClick={() => setStatus("idle")}>
            Send another enquiry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-busy={status === "submitting"}>
      {/* Honeypot: hidden from real visitors, but bots that auto-fill every field trip it. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      >
        <label htmlFor={id("nickname")}>Leave this field empty</label>
        <input id={id("nickname")} name="nickname" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {!isPartner && (
        <div>
          <Label htmlFor={id("type")}>Enquiry type{required}</Label>
          <Select id={id("type")} name="enquiryType" ref={typeRef} required defaultValue="" className="mt-2">
            <option value="" disabled>
              Select an enquiry type
            </option>
            {enquiryTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("name")}>Full name{required}</Label>
          <Input id={id("name")} name="name" autoComplete="name" required maxLength={100} className="mt-2" />
        </div>
        <div>
          <Label htmlFor={id("email")}>Business email{required}</Label>
          <Input id={id("email")} name="email" type="email" autoComplete="email" required maxLength={254} className="mt-2" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("company")}>{isPartner ? "Agency / company" : "Company"}{required}</Label>
          <Input id={id("company")} name="company" autoComplete="organization" required maxLength={150} className="mt-2" />
        </div>
        <div>
          <Label htmlFor={id("country")}>Country{required}</Label>
          <Input id={id("country")} name="country" autoComplete="country-name" required maxLength={80} className="mt-2" />
        </div>
      </div>

      <div>
        <Label htmlFor={id("website")}>Website (optional)</Label>
        <Input
          id={id("website")}
          name="website"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="yourcompany.com"
          maxLength={200}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor={id("message")}>{isPartner ? "Describe the client work" : "Project description"}{required}</Label>
        <Textarea
          id={id("message")}
          name="message"
          required
          maxLength={5000}
          rows={5}
          className="mt-2"
          placeholder={
            isPartner
              ? "What does your client need, and what would you want us to deliver? You do not need to name the client."
              : "What process or problem are you trying to improve, and which tools do you use today?"
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor={id("budget")}>Budget (optional)</Label>
          <Select id={id("budget")} name="budget" defaultValue="" className="mt-2">
            <option value="">Prefer not to say</option>
            {budgetOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor={id("timeline")}>Timeline (optional)</Label>
          <Select id={id("timeline")} name="timeline" defaultValue="" className="mt-2">
            <option value="">Prefer not to say</option>
            {timelineOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div>
        <Button type="submit" size="lg" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : isPartner ? "Send Partnership Enquiry" : "Send Enquiry"}
        </Button>

        {status === "error" && (
          <p
            ref={errorRef}
            tabIndex={-1}
            className={cn("mt-3 text-sm font-medium text-danger focus:outline-none")}
            role="alert"
          >
            {errorMessage} You can also email us directly at {contactEmail}.
          </p>
        )}
      </div>
    </form>
  );
}
