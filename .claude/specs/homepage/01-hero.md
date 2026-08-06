# Homepage Hero Section Specification
Project: DeosAI Labs Website
Document: homepage/01-hero.md
Version: 1.0
Status: Draft
Owner: DeosAI Labs

---

# 1. Purpose

The Hero section is the most important section of the website.

It is responsible for making an excellent first impression within the first 5–10 seconds.

Visitors should immediately understand:

- What DeosAI Labs does
- Who it helps
- Why it is different
- What action they should take next

The Hero should establish credibility without overwhelming the visitor.

---

# 2. Business Objective

The Hero exists to answer four questions immediately.

1. Who are we?

2. What do we do?

3. Why should someone trust us?

4. What should visitors do next?

Every design decision should reinforce one or more of these questions.

---

# 3. User Psychology

Most visitors arrive with uncertainty.

Typical thoughts include:

• "Is this another AI agency?"

• "Do they just build chatbots?"

• "Can they actually help an enterprise?"

• "Is this relevant to my organization?"

The Hero should reduce uncertainty immediately.

It should feel calm, confident, and trustworthy.

Avoid creating unnecessary excitement or hype.

---

# 4. Primary Message

The Hero should communicate one core message:

DeosAI Labs partners with organizations to deploy practical, production-ready AI solutions that improve real business operations.

Do not lead with technology.

Lead with business value.

---

# 5. Information Hierarchy

The Hero should present information in this order.

1. Trust Indicator

↓

2. Primary Headline

↓

3. Supporting Description

↓

4. Primary CTA

↓

5. Secondary CTA

↓

6. Supporting Metrics or Social Proof (optional)

↓

7. Hero Illustration

The eye should naturally move from left to right and from top to bottom.

---

# 6. Layout

Desktop

Two-column layout.

Left column:

- Trust indicator
- Headline
- Supporting paragraph
- CTA group

Right column:

- Abstract illustration
- Conceptual workflow visualization
- Product visualization
- Enterprise-inspired graphic

Avoid decorative graphics.

Every visual element should reinforce the message.

---

Tablet

Stack content vertically.

Headline first.

Illustration second.

Buttons below description.

---

Mobile

Single-column layout.

Trust badge

↓

Headline

↓

Description

↓

Primary CTA

↓

Secondary CTA

↓

Illustration

Keep the primary CTA visible without excessive scrolling.

---

# 7. Content Requirements

## Trust Indicator

A small visual element placed above the headline.

Purpose:

Immediately communicate credibility.

Examples:

- AI Forward Deployment Partner
- Enterprise AI Specialists
- Helping Organizations Deploy Practical AI

Replace with approved messaging before launch.

---

## Headline

Requirements:

- Clear
- Concise
- Outcome-focused
- Easy to understand
- Maximum 2 lines on desktop

Do not use vague marketing language.

Avoid technical jargon.

Use placeholder copy until finalized.

---

## Supporting Description

Purpose:

Expand on the headline.

Length:

Approximately 2–3 sentences.

Focus on:

- Operational improvement
- Practical AI
- Human-centered deployment
- Business outcomes

Avoid discussing implementation details.

---

## Primary CTA

Purpose:

Encourage meaningful engagement.

Preferred examples:

- Book a Discovery Call
- Talk to an AI Strategist
- Schedule a Consultation

The CTA should feel consultative rather than transactional.

---

## Secondary CTA

Purpose:

Support visitors who are not yet ready to contact us.

Examples:

- Explore Services
- Learn About Our Approach
- View Industries

---

## Supporting Metrics (Optional)

If included, use only verifiable metrics.

Examples may include:

- Years of experience
- Industries served
- Projects completed
- Customer satisfaction

Use placeholders until validated.

Never fabricate numbers.

---

# 8. Visual Strategy

The Hero should avoid generic AI imagery.

Do NOT use:

- Humanoid robots
- Floating brains
- Random circuit boards
- Neon holograms
- Stock "AI" graphics

Preferred visual directions:

- Workflow diagrams
- Abstract geometric compositions
- Minimal data flow illustrations
- Enterprise-inspired interfaces
- System architecture concepts
- Process visualization

Visuals should communicate clarity, not complexity.

---

# 9. Component Composition

The Hero should consist of reusable components.

Components include:

- HeroContainer
- TrustBadge
- HeroHeadline
- HeroDescription
- CTAGroup
- PrimaryButton
- SecondaryButton
- HeroIllustration
- BackgroundPattern (optional)

Each component should be reusable throughout the website where appropriate.

---

# 10. Grid Structure

Desktop:

12-column grid.

Suggested layout:

Left content:

6 columns

Right visual:

6 columns

Maintain generous whitespace.

Do not stretch content edge to edge.

---

# 11. Typography

Headline

Largest typography on the website.

High visual impact.

Readable across all screen sizes.

---

Description

Readable line length.

Maximum width:

Approximately 600–700px.

---

Buttons

Clear hierarchy.

Primary button visually dominant.

---

# 12. Spacing

Use the design system spacing tokens.

Avoid arbitrary values.

Suggested spacing rhythm:

Trust Badge

↓

16px

↓

Headline

↓

24px

↓

Description

↓

32px

↓

CTA Group

↓

48px

↓

Supporting Elements

---

# 13. Motion

Animations should support clarity.

Recommended sequence:

Page loads

↓

Trust badge fades in

↓

Headline fades upward

↓

Description fades upward

↓

Buttons appear

↓

Illustration fades in

Timing should remain subtle.

Avoid excessive delays.

---

# 14. Micro-interactions

Buttons

Hover

Focus

Active

Loading

Illustration

Very subtle floating or parallax effect only if it does not distract.

Trust badge

Minimal hover feedback.

---

# 15. Accessibility

Requirements:

Proper heading hierarchy.

Single H1.

Keyboard accessible buttons.

Visible focus indicators.

Screen reader support.

Illustrations must include meaningful alt text or be marked decorative if appropriate.

Support reduced motion preferences.

---

# 16. Performance

Hero should load immediately.

Avoid large video backgrounds.

Optimize illustrations.

Optimize fonts.

Prevent layout shift.

Largest Contentful Paint should remain within recommended performance budgets.

---

# 17. SEO

The H1 should naturally describe the company.

Supporting copy should reinforce:

- AI consulting
- AI deployment
- Enterprise AI
- Workflow transformation

Use natural language.

Do not keyword stuff.

---

# 18. Analytics

Track:

Primary CTA clicks

Secondary CTA clicks

Scroll beyond Hero

Navigation interactions

Hero visibility

Use analytics to optimize messaging over time.

---

# 19. Acceptance Criteria

The Hero section is complete when:

✓ Visitors understand what DeosAI Labs does within a few seconds.

✓ Primary CTA is clearly visible.

✓ Layout is responsive.

✓ Accessibility requirements are met.

✓ Motion follows the design system.

✓ Performance remains excellent.

✓ Typography hierarchy is clear.

✓ Illustration supports the message.

✓ SEO requirements are implemented.

---

# 20. Future Enhancements

The Hero should support future additions without redesign.

Potential enhancements include:

- Customer logo strip
- Interactive workflow visualization
- Short explainer animation
- Rotating industry examples
- Localization
- A/B tested messaging
- Personalization based on visitor segment

These enhancements should remain optional and must not compromise simplicity.

---

# 21. References

The following websites may be reviewed for inspiration regarding premium enterprise hero sections, storytelling, and visual hierarchy. They are references only. All branding, copy, visuals, layouts, interactions, and implementation for DeosAI Labs must be original.

- https://www.forwardeployed.com
- https://www.anthropic.com
- https://www.palantir.com
- https://www.linear.app
- https://www.vercel.com

---

# 22. Next Document

Proceed to:

homepage/02-problem.md

This specification defines the "Business Challenges" section, where visitors recognize the operational problems that prevent successful AI adoption and understand why a different approach is needed before introducing the DeosAI Labs methodology.