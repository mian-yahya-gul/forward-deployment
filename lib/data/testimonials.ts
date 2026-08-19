/**
 * Illustrative testimonials, not verified quotes from named clients — the
 * one verified, named case study is Indus Health (see stories.ts).
 */
export interface Testimonial {
  quote: string;
  name: string;
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
    name: "Salar Achakzai",
    role: "VP of Operations",
    industry: "Manufacturing",
  },
  {
    quote:
      "We now have one reliable place to find the answers we need, instead of relying on a handful of people to remember where everything lives.",
    name: "Dr. Hasham Khan",
    role: "Director of Clinical Operations",
    industry: "Healthcare",
  },
  {
    quote:
      "The automation takes care of routine approvals and brings the decisions that require human judgment to our attention. It reduces the busywork without taking the decision away from us.",
    name: "Saqlain Lashari",
    role: "Head of Supply Chain",
    industry: "Logistics & Supply Chain",
  },
  {
    quote:
      "Starting with a single queue before expanding further was the right approach. It gave the team time to build confidence in the system before scaling it across the organization.",
    name: "Zubair Umer",
    role: "Customer Service Manager",
    industry: "Retail & E-commerce",
  },
  {
    quote:
      "Each flagged document includes a clear explanation and a complete audit trail, giving our compliance team the transparency they need alongside the speed.",
    name: "Kindy Lawrance",
    role: "Compliance Officer",
    industry: "Financial Services",
  },
  {
    quote:
      "It fit into the systems we already rely on, without adding another platform our teams had to remember to use.",
    name: "Philips Morgan",
    role: "IT Director",
    industry: "Government",
  },
  {
    quote:
      "The quarterly review process was something we hadn't considered, but it helps us spot adoption issues early before they become bigger problems.",
    name: "Sachin Pandy",
    role: "Chief Operating Officer",
    industry: "Education",
  },
  {
    quote:
      "We had run AI pilots before that never made it beyond the demo stage. This was the first one that became part of our everyday operations.",
    name: "Arjun Patel",
    role: "Plant Manager",
    industry: "Agriculture",
  },
  {
    quote:
      "Keeping a person involved in every decision was essential for us, and human oversight was built into the workflow from the very beginning.",
    name: "Canady Opirus",
    role: "Senior Underwriter",
    industry: "Financial Services",
  },
];
