import { contactEmail } from "@/lib/data/contact";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalPage {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  draftNotice?: string;
  sections: LegalSection[];
}

/**
 * These pages describe the site as it's actually built today — the contact
 * form now has a real backend (app/api/contact/route.ts via Resend), and
 * Vercel Analytics is live (see app/layout.tsx) — rather than generic
 * boilerplate or a description of an earlier, simpler version of the site.
 * None of these three have been reviewed by a lawyer; that's a real step
 * still owed before relying on them in a regulated context.
 */
export const privacyPolicy: LegalPage = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  description: "How this website handles information from visitors.",
  lastUpdated: "2026-08-15",
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "This policy explains what information DeosAI Labs collects through this website, why, and how it's used. It covers www.deosailabs.com and the Forward Deployment Playbook hosted at /book, but not any external site we link to.",
      ],
    },
    {
      heading: "Information you provide directly",
      paragraphs: [
        "When you submit the contact form, we collect your name, email address, and message, plus your company name if you provide one. That information is sent to our team by email so we can respond to your inquiry, and we keep the correspondence for as long as is reasonably useful for that purpose — the same way we'd keep any other business email.",
        "We don't sell your information, and we don't share it with third parties for their own marketing purposes.",
      ],
    },
    {
      heading: "Information collected automatically",
      paragraphs: [
        "We use Vercel Analytics to understand how the site is used — which pages get visited, what a visitor came from, and general technical details like device type. This is cookie-free: it doesn't set tracking cookies, doesn't build a profile of you across other websites, and reports aggregated data rather than identifying individual visitors.",
        "We also track a small number of specific actions as anonymous, aggregate counts — for example, how often the \"Book a Discovery Call\" button or the contact form get used — so we can tell which parts of the site are actually driving inquiries. These are counts of events, not records tied to who performed them.",
      ],
    },
    {
      heading: "Cookies and local storage",
      paragraphs: [
        "This site does not use cookies. The one thing it stores in your browser is your light/dark theme preference, saved to local storage on your own device so the site remembers your choice on your next visit — that value never gets sent to us.",
      ],
    },
    {
      heading: "Third-party service providers",
      paragraphs: [
        "We use Vercel to host this site and run its analytics, and Resend to deliver the email generated when you submit the contact form. Both process data on our behalf as part of providing those services, under their own respective privacy and security practices.",
      ],
    },
    {
      heading: "Your choices",
      paragraphs: [
        "You can browse this site without submitting any personal information — the analytics described above don't require it. If you've contacted us and want that correspondence deleted, or have another request about your information, email us and we'll act on it. We don't currently have an automated self-service process for this; requests are handled directly.",
      ],
    },
    {
      heading: "Children's privacy",
      paragraphs: [
        "This site is intended for business audiences and isn't directed at children. We don't knowingly collect information from anyone under 16.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "If what we collect or how we use it changes — for example, if we add a new analytics or marketing tool — we'll update this page to reflect that before the change goes live, and update the date below.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`Questions about this policy can be sent to ${contactEmail}.`],
    },
  ],
};

export const termsOfUse: LegalPage = {
  eyebrow: "Legal",
  title: "Terms of Use",
  description: "The terms that govern use of this website.",
  lastUpdated: "2026-08-15",
  sections: [
    {
      heading: "Acceptance of terms",
      paragraphs: [
        "By accessing this website, you agree to use it in accordance with these terms. If you don't agree with them, please don't use the site.",
      ],
    },
    {
      heading: "Use of this website",
      paragraphs: [
        "Content on this site — including service descriptions, industry pages, case studies, and insights articles — is provided for general informational purposes and does not constitute a binding proposal, quote, or professional engagement. Actual engagements are governed by separate signed agreements.",
      ],
    },
    {
      heading: "The Forward Deployment Playbook",
      paragraphs: [
        "The Playbook (hosted at /book) is offered as general educational content about applying AI to specific industries and workflows. It's not tailored advice for your organization, and reading it doesn't create an advisory or client relationship between you and DeosAI Labs.",
      ],
    },
    {
      heading: "Contact form and inquiries",
      paragraphs: [
        "Submitting the contact form sends your message to our team so we can respond — it's an inquiry, not an offer, acceptance, or any other kind of binding commitment on either side. An actual engagement only exists once both parties sign a separate agreement covering its scope and terms.",
      ],
    },
    {
      heading: "Intellectual property",
      paragraphs: [
        "Unless otherwise noted, the content, design, and branding on this site belong to DeosAI Labs. You may not reproduce or redistribute it without permission.",
      ],
    },
    {
      heading: "Illustrative content",
      paragraphs: [
        "Some case studies and testimonials on this site illustrate the kind of outcome our engagements are designed to produce rather than a specific, verified client result, and are labeled as such where they appear. They describe intent, not a guarantee.",
      ],
    },
    {
      heading: "No warranty",
      paragraphs: [
        "This site is provided as-is. We try to keep it accurate and up to date, but we don't guarantee that it's free of errors or that it will always be available.",
      ],
    },
    {
      heading: "Limitation of liability",
      paragraphs: [
        "To the fullest extent permitted by law, DeosAI Labs isn't liable for any indirect, incidental, or consequential damages arising from your use of this website. Nothing here limits liability that can't be limited by law.",
      ],
    },
    {
      heading: "Governing law",
      paragraphs: [
        "These terms are governed by the laws of the State of Delaware, without regard to its conflict-of-law principles.",
      ],
    },
    {
      heading: "Changes to these terms",
      paragraphs: [
        "We may update these terms as the site evolves. Continued use of the site after a change means you accept the updated terms.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`Questions about these terms can be sent to ${contactEmail}.`],
    },
  ],
};

export const accessibilityStatement: LegalPage = {
  eyebrow: "Legal",
  title: "Accessibility Statement",
  description: "Our approach to building an accessible website.",
  lastUpdated: "2026-08-15",
  draftNotice:
    "This statement reflects our current implementation and good-faith intent — it isn't the result of a formal third-party accessibility audit. We'll update it as we conduct further review.",
  sections: [
    {
      heading: "Our commitment",
      paragraphs: [
        "We aim to meet WCAG 2.2 AA guidelines across this site, and we treat accessibility as a requirement rather than an enhancement added at the end.",
      ],
    },
    {
      heading: "What we've built in",
      paragraphs: [
        "Semantic HTML and a logical heading structure throughout the site.",
        "Keyboard navigation and visible focus indicators on all interactive elements, including navigation, buttons, cards, the contact form, and the FAQ accordions.",
        "Support for reduced-motion preferences — scroll reveals and the site's animated elements, including its 3D and carousel-style sections, are disabled or simplified for visitors who have that preference set at the operating system level.",
        "A skip-to-content link, ARIA landmarks, and alt text conventions for meaningful imagery.",
      ],
    },
    {
      heading: "Known limitation in the Playbook",
      paragraphs: [
        "The Forward Deployment Playbook (/book) runs on a separate content platform from the rest of the site. On its industry-chapter pages specifically, the light/dark toggle and mobile menu button are currently inactive due to a technical constraint in how those pages are served — the content itself, its navigation links, and keyboard access all work normally. We consider this an open item, not an accepted limitation.",
      ],
    },
    {
      heading: "Ongoing work",
      paragraphs: [
        "This is a new site, and we haven't yet commissioned a formal third-party accessibility audit. If you encounter a barrier using this site, we want to know about it.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [`Report accessibility issues to ${contactEmail} and we'll work to address them.`],
    },
  ],
};
