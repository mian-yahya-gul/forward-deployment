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
 * These pages describe the site as it's actually built today rather than
 * generic boilerplate — e.g. the contact form has no backend, so there's
 * nothing to disclose about server-side storage of form submissions.
 * Both privacy and terms are marked as drafts pending real legal review
 * before launch; accessibility is a good-faith statement of current
 * practice, not an audited certification.
 */
export const privacyPolicy: LegalPage = {
  eyebrow: "Legal",
  title: "Privacy Policy",
  description: "How this website handles information from visitors.",
  lastUpdated: "2026-08-06",
  draftNotice:
    "This is a draft policy describing the site as currently built. It has not been reviewed by legal counsel and should not be treated as final before launch.",
  sections: [
    {
      heading: "What this site collects",
      paragraphs: [
        "This website does not currently use cookies, analytics, or third-party tracking scripts.",
        "The contact form on this site does not transmit your information to a server. Submitting it opens your device's default email application with your message pre-filled, addressed to our team — the data stays on your device until you choose to send that email yourself.",
      ],
    },
    {
      heading: "Information you send us directly",
      paragraphs: [
        "If you email us — whether through the contact form's mail handoff or directly — we retain that correspondence in order to respond to you and keep a record of the conversation, consistent with normal business email practices.",
        "We do not sell or share your information with third parties for marketing purposes.",
      ],
    },
    {
      heading: "Future changes",
      paragraphs: [
        "If this site adds analytics, cookies, or other data collection in the future, this policy will be updated to disclose it before that change goes live.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Questions about this policy can be sent to hello@deosailabs.com.",
      ],
    },
  ],
};

export const termsOfUse: LegalPage = {
  eyebrow: "Legal",
  title: "Terms of Use",
  description: "The terms that govern use of this website.",
  lastUpdated: "2026-08-06",
  draftNotice:
    "This is a draft, generic terms document. It has not been reviewed by legal counsel, does not specify a governing jurisdiction, and should not be treated as final before launch.",
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
      heading: "Intellectual property",
      paragraphs: [
        "Unless otherwise noted, the content, design, and branding on this site belong to DeosAI Labs. You may not reproduce or redistribute it without permission.",
      ],
    },
    {
      heading: "No warranty",
      paragraphs: [
        "This site is provided as-is. We try to keep it accurate and up to date, but we don't guarantee that it's free of errors or that it will always be available.",
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
      paragraphs: ["Questions about these terms can be sent to hello@deosailabs.com."],
    },
  ],
};

export const accessibilityStatement: LegalPage = {
  eyebrow: "Legal",
  title: "Accessibility Statement",
  description: "Our approach to building an accessible website.",
  lastUpdated: "2026-08-06",
  draftNotice:
    "This statement reflects our current implementation and good-faith intent — it isn't the result of a formal third-party accessibility audit. We'll update it as we conduct further review.",
  sections: [
    {
      heading: "Our commitment",
      paragraphs: [
        "We aim to meet WCAG 2.1 AA guidelines across this site, and we treat accessibility as a requirement rather than an enhancement added at the end.",
      ],
    },
    {
      heading: "What we've built in",
      paragraphs: [
        "Semantic HTML and a logical heading structure throughout the site.",
        "Keyboard navigation and visible focus indicators on all interactive elements, including navigation, buttons, cards, and the FAQ accordions.",
        "Support for reduced-motion preferences — scroll-triggered animations are disabled for visitors who have that preference set at the operating system level.",
        "A skip-to-content link, ARIA landmarks, and alt text conventions for meaningful imagery.",
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
      paragraphs: [
        "Report accessibility issues to hello@deosailabs.com and we'll work to address them.",
      ],
    },
  ],
};
