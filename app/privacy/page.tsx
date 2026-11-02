import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { CookieSettingsButton } from "@/components/shared/CookieConsent";
import { PageHero } from "@/components/shared/PageHero";
import { contactEmail } from "@/lib/data/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — DeosAI Labs",
  description:
    "What personal information DeosAI Labs collects through this website and about business contacts we research and contact, why we use it, who processes it, and your rights.",
  path: "/privacy",
});

const lastUpdated = "2 November 2026";
/** Shown on the page so the version in use can be verified against the version recorded in our records. */
const noticeVersion = "2026-11-02.1";

const providers = [
  { name: "Vercel", purpose: "Hosting and cookie-free page-view analytics" },
  { name: "Resend", purpose: "Delivering the emails our forms send us, and the business emails we send" },
  { name: "Cal.com", purpose: "Scheduling discovery calls and sending booking emails" },
  { name: "Google", purpose: "Google Analytics, Google Calendar and Meet for scheduled calls, and the mailbox that receives our business email" },
  { name: "OpenAI", purpose: "Generating answers in the website assistant" },
  { name: "Namecheap", purpose: "Our domain, and forwarding mail sent to our business address" },
  {
    name: "Anthropic",
    purpose:
      "An AI assistant we use internally to help read public web pages, organise research notes and draft business messages (see Business contacts and prospects)",
  },
];

function Section({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-12 scroll-mt-24 first:mt-0">
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
        description={`Last updated ${lastUpdated} (version ${noticeVersion}). This page explains what information this website collects, what we hold about business contacts we research and contact, and who processes it.`}
      />

      <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Section title="Who we are">
          <p>
            This website is operated by DeosAI Labs, based in Islamabad, Pakistan. DeosAI Labs is also responsible for the
            information described in the section on business contacts and prospects below. If you have a question about this
            policy, want to ask about your information, want to use any of your rights or want to object to our marketing,
            email us at{" "}
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
          <p>We use this information to run the site, respond to inquiries and understand how the site is used.</p>
          <p>
            Separately, we hold limited information about people at businesses we research and may contact. That is explained
            in <a href="#business-contacts" className="font-medium text-primary underline-offset-4 hover:underline">Business contacts and prospects</a>.
          </p>
        </Section>

        <Section title="Business contacts and prospects" id="business-contacts">
          <p>
            This section applies if you work for, or run, a business that we may contact about our services or a possible
            partnership, or that we have researched as a possible customer or partner. We have not collected this
            information from you directly, so this explains what we hold, where it comes from, why we use it and what your
            rights are.
          </p>

          <h3 className="pt-2 text-base font-semibold text-foreground">What we hold</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>Your name, job title and company.</li>
            <li>The business email address or telephone number your company publishes, and a link to your public professional profile.</li>
            <li>For a company director, the name shown on the public company register.</li>
            <li>A short note on why your company may be relevant to us, taken from its public website.</li>
            <li>A record of the messages we send, your replies, and any objection or request to stop.</li>
            <li>The source of the information and the date we collected it.</li>
          </ul>

          <h3 className="pt-2 text-base font-semibold text-foreground">Where it comes from</h3>
          <p>
            Only public sources: your company&apos;s own website (such as its contact and team pages), public registers such
            as Companies House, and professional platforms such as LinkedIn where your profile is public. We read these pages
            ourselves. We do not buy contact lists, and we do not use automated tools to collect data from LinkedIn.
          </p>

          <h3 className="pt-2 text-base font-semibold text-foreground">Why we use it, and our lawful basis</h3>
          <p>
            We use it to research businesses that may need AI engineering or a white-label engineering partner, to decide
            whether to contact them, to send a small number of individually written messages, and to keep a record so that we
            respect your choices.
          </p>
          <p>
            For people in the United Kingdom and the European Economic Area, our lawful basis is legitimate interests: our
            interest in developing our business by offering our services to companies that are likely to find them useful. We
            have weighed this against your rights and expectations, and we keep a written assessment, which you can ask to
            see. Where the law of the country where you are based requires your consent before we send marketing messages, we
            do not send them without it.
          </p>

          <h3 className="pt-2 text-base font-semibold text-foreground">Your right to object to direct marketing</h3>
          <p>
            You have an absolute right to object, at any time and without giving a reason, to our use of your information for
            direct marketing. If you object, we stop straight away and do not contact you again. To make sure we keep our
            word, we keep a minimal record of your objection (your email address, your company&apos;s website domain and your
            name). You can object by replying &quot;no thanks&quot; to any message from us, or by emailing{" "}
            <a href={`mailto:${contactEmail}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {contactEmail}
            </a>
            .
          </p>

          <h3 className="pt-2 text-base font-semibold text-foreground">How we handle it and who receives it</h3>
          <p>
            We keep this information in a customer-records database on our own computer. A person reviews every message
            before it is sent. We send email through Resend and receive replies through our business address (see the list of
            services below). We use an AI assistant provided by Anthropic to help read public web pages, organise research
            notes and draft messages, so information such as names, job titles and company details taken from public sources
            may be processed by that provider. We do not deliberately give it non-public information about you. We do not sell
            your information or share it with others for their own marketing. The AI assistant does not make decisions about
            you; we may rank companies with a simple score to decide whom to research first.
          </p>

          <h3 className="pt-2 text-base font-semibold text-foreground">Transfers outside your country</h3>
          <p>
            We are in Pakistan, and our service providers may process information in other countries, including the United
            States and Japan. The legal safeguards depend on the provider and the country. You can ask us which apply to your
            information.
          </p>

          <h3 className="pt-2 text-base font-semibold text-foreground">How long we keep it</h3>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              If you do not reply, we delete your personal details (your name, job title and contact details) within 6 months
              of our last message. We may keep the company&apos;s name and website.
            </li>
            <li>If we research your company but never contact you, we delete your personal details within 6 months of collecting them.</li>
            <li>If a conversation continues, we keep your details while it is relevant, and for up to 24 months after our last contact.</li>
            <li>
              If you object to marketing or ask us to stop, we keep only the minimal record described above, for as long as
              we need it to honour your objection.
            </li>
          </ul>

          <h3 className="pt-2 text-base font-semibold text-foreground">Your other rights and complaints</h3>
          <p>
            You can ask us for a copy of the information we hold about you, to correct it, to delete it, or to restrict how we
            use it, and you can withdraw consent where we rely on it. Email{" "}
            <a href={`mailto:${contactEmail}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {contactEmail}
            </a>{" "}
            and we will respond within one month. You can also complain to the Information Commissioner&apos;s Office
            (ico.org.uk) or to the data-protection authority in your own country.
          </p>
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
            corrected or deleted, and to object to how it is used. You always have the right to object to direct marketing.
            Email{" "}
            <a href={`mailto:${contactEmail}`} className="font-medium text-primary underline-offset-4 hover:underline">
              {contactEmail}
            </a>{" "}
            and we will respond.
          </p>
        </Section>

        <Section title="Security and changes">
          <p>
            This website is served over HTTPS, so information you send is encrypted in transit. We may update this policy
            from time to time; the date and version at the top show when it last changed.
          </p>
        </Section>
      </div>
    </>
  );
}
