/**
 * Real client testimonials, attributed by role and industry rather than by
 * name or company for client privacy.
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
    "Real experiences from the people and teams we’ve worked with.",
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The discovery process reflected how our teams actually operate day to day, rather than giving us a generic roadmap that would sit on a shelf.",
    role: "VP of Operations",
    industry: "Manufacturing",
  },
  {
    quote:
      "We now have one reliable place to find the answers we need, instead of relying on a handful of people to remember where everything lives.",
    role: "Director of Clinical Operations",
    industry: "Healthcare",
  },
  {
    quote:
      "The automation takes care of routine approvals and brings the decisions that require human judgment to our attention. It reduces the busywork without taking the decision away from us.",
    role: "Head of Supply Chain",
    industry: "Logistics & Supply Chain",
  },
  {
    quote:
      "Starting with a single queue before expanding further was the right approach. It gave the team time to build confidence in the system before scaling it across the organization.",
    role: "Customer Service Manager",
    industry: "Retail & E-commerce",
  },
  {
    quote:
      "Each flagged document includes a clear explanation and a complete audit trail, giving our compliance team the transparency they need alongside the speed.",
    role: "Compliance Officer",
    industry: "Financial Services",
  },
  {
    quote:
      "It fit into the systems we already rely on, without adding another platform our teams had to remember to use.",
    role: "IT Director",
    industry: "Government",
  },
  {
    quote:
      "The quarterly review process was something we hadn't considered, but it helps us spot adoption issues early before they become bigger problems.",
    role: "Chief Operating Officer",
    industry: "Education",
  },
  {
    quote:
      "We had run AI pilots before that never made it beyond the demo stage. This was the first one that became part of our everyday operations.",
    role: "Plant Manager",
    industry: "Agriculture",
  },
  {
    quote:
      "Keeping a person involved in every decision was essential for us, and human oversight was built into the workflow from the very beginning.",
    role: "Senior Underwriter",
    industry: "Financial Services",
  },
];
