# Homepage Section Specification
Project: DeosAI Labs Website
Document: homepage/02-problem.md
Version: 1.0
Status: Draft

---

# 1. Purpose

This section establishes relevance.

Before introducing DeosAI Labs or its services, visitors should recognize the operational challenges that prevent successful AI adoption.

The goal is not to create fear.

The goal is to create recognition.

Visitors should think:

> "This describes our organization."

Only after this emotional connection should the homepage transition into the DeosAI Labs methodology.

---

# 2. Business Objective

This section exists to:

• Demonstrate understanding of enterprise challenges

• Position DeosAI Labs as a business partner rather than a technology vendor

• Build credibility through empathy

• Prepare visitors for the next section (Our Approach)

---

# 3. User Psychology

Enterprise buyers usually arrive believing they have a technology problem.

In reality they often struggle with:

Disconnected systems

Manual processes

Scattered knowledge

Poor visibility

Slow decisions

Low AI adoption

Resistance to change

The visitor should gradually realize:

"Our biggest challenge isn't AI.

It's operational complexity."

---

# 4. Emotional Goal

Move visitors from:

Curiosity

↓

Recognition

↓

Understanding

↓

Readiness

Do not create anxiety.

Create clarity.

---

# 5. Core Message

Artificial Intelligence is rarely the hardest part.

The real challenge is integrating it into existing people, processes, and systems in a way that creates measurable business value.

---

# 6. Visitor Questions

By the end of this section, visitors should feel these questions have been answered:

Why haven't our AI initiatives delivered results?

Why are our workflows still manual?

Why do employees avoid new tools?

Why does implementation take so long?

Why do our systems remain disconnected?

---

# 7. Section Layout

Desktop

Headline

↓

Supporting paragraph

↓

Problem cards (3x2 grid)

↓

Transition statement

Tablet

Headline

↓

Paragraph

↓

2-column cards

↓

Transition

Mobile

Headline

↓

Paragraph

↓

Single-column cards

↓

Transition

Maintain generous spacing.

---

# 8. Content Hierarchy

Headline

↓

Supporting description

↓

Problem grid

↓

Business impact summary

↓

Transition to next section

---

# 9. Headline Guidelines

The headline should focus on operational reality.

Examples (replace before launch):

<PLACEHOLDER>

Avoid:

Technology-first messaging

Fear-based language

Buzzwords

---

# 10. Supporting Copy

Length:

Approximately 2–3 short paragraphs.

Focus on:

Business operations

Employee experience

Decision-making

Workflow efficiency

Operational complexity

Avoid discussing DeosAI Labs yet.

This section is about the visitor.

---

# 11. Problem Cards

Recommended:

Six cards.

Each card explains one common operational challenge.

Example structure:

Title

↓

Short explanation

↓

Business impact

Potential categories:

Disconnected Systems

Knowledge Silos

Manual Workflows

Slow Decision Making

Inconsistent Processes

AI Pilot Fatigue

Replace all copy with approved messaging before launch.

---

# 12. Business Impact

Following the cards, summarize the consequences.

Possible themes:

Lost productivity

Higher operating costs

Employee frustration

Poor customer experience

Missed opportunities

Delayed decisions

This summary should naturally lead into the next section.

---

# 13. Transition Statement

The final sentence should create curiosity.

Example direction:

"Successful AI adoption begins by improving the way work flows through an organization."

This prepares visitors for the methodology section.

---

# 14. Visual Strategy

Avoid decorative illustrations.

Preferred visuals:

Simple workflow diagrams

Abstract process illustrations

Connected systems

Information flow

Business operations

Minimal line graphics

Do not use robots or generic AI imagery.

---

# 15. Components

SectionContainer

SectionHeading

SectionDescription

ProblemGrid

ProblemCard

ImpactSummary

TransitionBanner

Each component should be reusable.

---

# 16. Card Design

Cards should include:

Icon

Title

Description

Business impact

Hover state

Equal height

Consistent spacing

Avoid large shadows.

---

# 17. Typography

Headline

Large

Clear

Readable

Body

Medium width

Easy scanning

Card titles

Bold

Descriptions

Short paragraphs

---

# 18. Motion

Section enters on scroll.

Cards animate with subtle stagger.

Hover states:

Small elevation

Border transition

Background tint

No dramatic animations.

---

# 19. Accessibility

Cards must remain readable.

Icons should not be the only communication method.

Maintain:

Keyboard navigation

Focus states

Proper heading hierarchy

Screen reader compatibility

---

# 20. Responsive Behaviour

Desktop

Three columns

Tablet

Two columns

Mobile

Single column

Cards should maintain consistent spacing.

---

# 21. SEO

Natural keywords may include:

Operational efficiency

Business workflows

AI implementation

Digital transformation

Enterprise operations

Avoid forced keyword repetition.

---

# 22. Analytics

Track:

Problem card clicks

Scroll depth

Time spent in section

Transition engagement

CTA interaction after this section

These metrics help evaluate whether visitors connect with the messaging.

---

# 23. Content Governance

Future edits should continue focusing on business challenges rather than product features.

Do not replace problem statements with marketing claims.

Each challenge should reflect a real operational issue that organizations commonly experience.

Review messaging periodically to ensure relevance as AI adoption evolves.

---

# 24. Implementation Notes for Claude Code

The section should be built from reusable components.

Recommended component hierarchy:

ProblemSection
├── SectionHeading
├── SectionDescription
├── ProblemGrid
│   ├── ProblemCard
│   ├── ProblemCard
│   ├── ProblemCard
│   ├── ProblemCard
│   ├── ProblemCard
│   └── ProblemCard
├── ImpactSummary
└── TransitionStatement

Requirements:

- Data-driven card configuration.
- Responsive CSS Grid.
- Shared spacing tokens from the Design System.
- Consistent typography tokens.
- Motion should use the shared animation utilities.
- No hardcoded colors; use semantic design tokens.

---

# 25. Acceptance Criteria

This section is complete when:

✓ Visitors recognize common operational challenges.

✓ The messaging is empathetic rather than promotional.

✓ Cards are reusable and responsive.

✓ Accessibility requirements are satisfied.

✓ Visual hierarchy follows the Design System.

✓ The transition naturally introduces the next section.

✓ Analytics events are implemented.

---

# 26. References

This section may draw inspiration from enterprise consulting websites for storytelling structure and information hierarchy. Any copy, layout, visuals, or interactions created for DeosAI Labs must remain original.

Suggested references for design patterns:

- https://www.forwardeployed.com
- https://www.palantir.com
- https://www.anthropic.com

---

# 27. Next Document

Proceed to:

homepage/03-forward-deployment.md

This section introduces the DeosAI Labs methodology, explaining how the company partners with organizations to move from AI experimentation to production-ready operational systems.