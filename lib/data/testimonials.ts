/**
 * No real client testimonials are published yet, so these are clearly labeled
 * illustrative quotes (generalized role/industry attribution, no fabricated
 * names, titles, or metrics) rather than real client endorsements — replace
 * with verified testimonials as they become available for publication. See
 * the same pattern in lib/data/stories.ts.
 */
export interface Testimonial {
  quote: string;
  role: string;
  industry: string;
}

export const testimonialsIntro = {
  eyebrow: "Testimonials",
  headline: "What partners are telling us",
  description:
    "We're early in publishing client feedback, so the quotes below are illustrative of the kind of impact our engagements are designed to deliver rather than verified client endorsements.",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The discovery process actually mapped how our teams work day to day, instead of handing us a generic roadmap we'd never act on.",
    role: "VP of Operations",
    industry: "Manufacturing",
  },
  {
    quote:
      "We finally have one place to search instead of asking around the office for answers only a couple of people ever knew.",
    role: "Director of Clinical Operations",
    industry: "Healthcare",
  },
  {
    quote:
      "The workflow automation handles the routine approvals on its own and flags the judgment calls for us — it doesn't try to replace the decision, just the busywork around it.",
    role: "Head of Supply Chain",
    industry: "Logistics & Supply Chain",
  },
  {
    quote:
      "Rolling it out to one queue first, before touching everything else, was the right call. It gave the team time to trust it.",
    role: "Customer Service Manager",
    industry: "Retail & E-commerce",
  },
  {
    quote:
      "Every flagged document comes with a clear reason and an audit trail, which matters as much to our compliance team as the speed does.",
    role: "Compliance Officer",
    industry: "Financial Services",
  },
  {
    quote:
      "It integrated into the systems we already use instead of becoming one more tab our team has to remember to check.",
    role: "IT Director",
    industry: "Government",
  },
  {
    quote:
      "The quarterly review cadence is the part I didn't know we needed — it catches drift before adoption quietly drops off.",
    role: "Chief Operating Officer",
    industry: "Education",
  },
  {
    quote:
      "We'd tried AI pilots before that never left the demo stage. This was the first one that made it into daily operations.",
    role: "Plant Manager",
    industry: "Agriculture",
  },
  {
    quote:
      "Having a person still in the loop for every decision was non-negotiable for us, and that was built in from day one rather than bolted on.",
    role: "Senior Underwriter",
    industry: "Financial Services",
  },
];
