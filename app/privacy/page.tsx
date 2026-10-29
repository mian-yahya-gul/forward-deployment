import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CookieSettingsButton } from "@/components/shared/CookieConsent";
import { PageHero } from "@/components/shared/PageHero";
import { contactEmail } from "@/lib/data/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — DeosAI Labs",
  description:
    "What personal information DeosAI Labs collects through this website, why we collect it, and the services that process it.",
  path: "/privacy",
});

const lastUpdated = "29 October 2026";

const providers = [
  { name: "Vercel", purpose: "Hosting and cookie-free page-view analytics" },
  { name: "Resend", purpose: "Delivering the emails our forms send us" },
  { name: "Cal.com", purpose: "Scheduling discovery calls and sending booking emails" },
  { name: "Google", purpose: "Google Analytics, and Google Calendar and Meet for scheduled calls" },
  { name: "OpenAI", purpose: "Generating answers in the website assistant" },
  { name: "Namecheap", purpose: "Our domain, and forwarding mail sent to our business address" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="text-xl font-semibold tracking-tight text-foreground">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />}
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated ${lastUpdated}. This page explains what information this website collects and who processes it.`}
      />

      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Section title="Who we are">
          <p>
            This website is operated by DeosAI Labs. If you have a question about this policy or want to ask about your
            information, email us at{" "}
            <a href={`mailto:${contactEmail}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {contactEmail}
            </a>
            .
          </p>
        </Section>

        <Section title="What we collect, and why">
          <ul className="list-disc space-y-3 pl-5">
            <li>
              <strong className="font-medium text-foreground">Contact form.</strong> Your name, work email, company,
              optional website and message. We receive it by email and use it to reply to you.
            </li>
            <li>
              <strong className="font-medium text-foreground">Booking a discovery call.</strong> The details you enter in
              the booking calendar (such as name, email, company and the answers to our booking questions) are processed
              by Cal.com and our calendar to schedule the call. Cal.com emails you a confirmation, and we receive a
              notification email with the booking details.
            </li>
            <li>
              <strong className="font-medium text-foreground">Playbook access.</strong> If you enter your email address to
              open the Forward Deployment Playbook, we receive that address by email.
            </li>
            <li>
              <strong className="font-medium text-foreground">Emailed copies.</strong> If you ask us to email you a
              checklist, template or your assessment result, we use your email address to send it, and we receive a
              notification that you asked. The assessment and calculator themselves run in your browser and don&apos;t
              store your answers unless you request that email.
            </li>
            <li>
              <strong className="font-medium text-foreground">Website assistant.</strong> Questions you type into the
              assistant are sent to OpenAI to generate a reply. Please don&apos;t enter confidential or sensitive
              information.
            </li>
            <li>
              <strong className="font-medium text-foreground">Analytics.</strong> We use Google Analytics to see which
              pages are visited, roughly where visitors are located, and what device and browser they use. We also use
              Vercel Web Analytics, which counts page views without cookies.
            </li>
          </ul>
          <p>We use this information to run the site, respond to enquiries and understand how the site is used.</p>
        </Section>

        <Section title="Cookies and your choice">
          <p>
            Google Analytics uses cookies. If you are in the United Kingdom or the European Economic Area, Switzerland
            included, analytics cookies stay off until you choose Accept in the banner. Elsewhere they are on by default
            and you can choose Decline in the banner at any time. We do not use advertising cookies, and advertising storage
            is denied in this site&apos;s consent settings.
          </p>
          <p>Your choice is stored in your browser. You can change it here:</p>
          <div>
            <CookieSettingsButton />
          </div>
        </Section>

        <Section title="Who processes your information">
          <p>We rely on these services to run the site. They process information on our behalf, or under their own terms:</p>
          <ul className="list-disc space-y-2 pl-5">
            {providers.map((provider) => (
              <li key={provider.name}>
                <strong className="font-medium text-foreground">{provider.name}</strong> — {provider.purpose}
              </li>
            ))}
          </ul>
          <p>
            These providers may process information in countries other than your own. We do not sell your personal
            information.
          </p>
        </Section>

        <Section title="How long we keep it">
          <p>
            Google Analytics data is kept for 14 months. Messages, booking details and email correspondence are kept for
            as long as we need them to respond to you and follow up on the conversation, or as the law requires. You can
            ask us to delete them.
          </p>
        </Section>

        <Section title="Your rights">
          <p>
            Depending on where you live, you may have the right to ask what information we hold about you, to have it
            corrected or deleted, and to object to how it is used. Email{" "}
            <a href={`mailto:${contactEmail}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {contactEmail}
            </a>{" "}
            and we will respond.
          </p>
        </Section>

        <Section title="Security and changes">
          <p>
            This website is served over HTTPS, so information you send is encrypted in transit. We may update this policy
            from time to time; the date at the top shows when it last changed.
          </p>
        </Section>
      </div>
    </>
  );
}
