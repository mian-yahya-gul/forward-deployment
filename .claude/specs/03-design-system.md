# 03 — Design System
Project: DeosAI Labs Website
Version: 1.0
Status: Draft
Document Type: Design System Specification
Owner: DeosAI Labs

---

# 1. Purpose

This document defines the complete visual language of the DeosAI Labs website.

Its purpose is to ensure consistency, scalability, accessibility, and maintainability across every page, component, and future product.

This document acts as the single source of truth for designers and developers.

No UI element should be created without following this specification.

---

# 2. Design Philosophy

The DeosAI Labs interface should communicate confidence through simplicity.

The visual design should never compete with the content.

Every interface decision should support comprehension.

Whitespace is intentional.

Typography is the primary visual element.

Motion supports communication rather than entertainment.

Every screen should feel:

• Premium

• Calm

• Modern

• Enterprise

• Technical

• Human

---

# 3. Design Principles

Every interface should follow these principles.

## Simplicity

Remove unnecessary decoration.

If an element doesn't help the user accomplish a task, question whether it belongs.

---

## Consistency

Every page should feel like part of the same product.

Spacing

Typography

Buttons

Cards

Icons

Animations

All should follow shared patterns.

---

## Clarity

Users should immediately understand:

Where they are

What they can do

What happens next

---

## Accessibility

Every interface should be usable regardless of device or ability.

Accessibility is a requirement, not an enhancement.

---

## Performance

Beautiful interfaces should remain fast.

Never sacrifice responsiveness for visual effects.

---

# 4. Layout Grid

Use a responsive 12-column layout.

Maximum content width:

1280px

Standard content width:

1200px

Reading width:

720–760px

Never allow long paragraphs to span the entire screen.

---

# 5. Responsive Breakpoints

Recommended breakpoints:

Mobile

0–639px

Tablet

640–1023px

Laptop

1024–1279px

Desktop

1280–1535px

Large Desktop

1536px+

Layouts should adapt gracefully across all breakpoints.

---

# 6. Spacing System

Adopt an 8px spacing system.

Approved spacing values:

4

8

12

16

24

32

40

48

64

80

96

128

160

Spacing should always use these values.

Avoid arbitrary spacing.

---

# 7. Typography

Typography is the strongest visual element.

Use a modern sans-serif font family.

Suggested placeholders:

Heading Font:

<PLACEHOLDER>

Body Font:

<PLACEHOLDER>

Mono Font:

<PLACEHOLDER>

---

# 8. Typography Scale

Display XL

Hero headlines

Display Large

Section headers

Heading 1

Major page titles

Heading 2

Section titles

Heading 3

Subsections

Heading 4

Component titles

Body Large

Primary paragraphs

Body

Default content

Small

Supporting information

Caption

Metadata

Every typography style should define:

Weight

Line height

Letter spacing

Responsive scaling

---

# 9. Color System

Create semantic color tokens rather than hardcoded colors.

Primary

<PRIMARY>

Secondary

<SECONDARY>

Accent

<ACCENT>

Surface

<SURFACE>

Background

<BACKGROUND>

Text Primary

<TEXT>

Text Secondary

<TEXT_MUTED>

Border

<BORDER>

Success

<SUCCESS>

Warning

<WARNING>

Danger

<ERROR>

Information

<INFO>

Never reference colors directly inside components.

Always use semantic tokens.

---

# 10. Elevation

Use elevation sparingly.

Recommended levels:

Level 0

Flat

Level 1

Cards

Level 2

Dropdowns

Level 3

Dialogs

Avoid excessive shadows.

Premium interfaces rely on spacing more than shadows.

---

# 11. Border Radius

Small

Buttons

Medium

Cards

Large

Dialogs

Extra Large

Hero visuals

Keep radius consistent.

Avoid mixing styles.

---

# 12. Iconography

Use a single icon library.

Recommended:

Lucide

Icons should:

Remain consistent

Never become decorative

Support comprehension

Avoid mixing multiple icon styles.

---

# 13. Illustration Style

Use abstract conceptual illustrations.

Avoid:

Robot imagery

AI brains

Circuit backgrounds

Neon effects

Stock futuristic graphics

Illustrations should explain ideas rather than decorate pages.

---

# 14. Photography

Photography should be authentic.

Prefer:

Teams collaborating

Engineers

Operations

Manufacturing

Education

Healthcare

Business environments

Avoid generic stock imagery whenever possible.

---

# 15. Buttons

Primary

Filled

Secondary

Outline

Ghost

Minimal

Destructive

Confirmation dialogs only

Icon Button

Utility actions

Every button should include:

Hover state

Focus state

Disabled state

Loading state

---

# 16. Forms

Inputs should include:

Label

Helper text

Validation

Error message

Success state

Focus state

Required indicator

Large touch targets

---

# 17. Cards

Standard Card

Feature Card

Service Card

Industry Card

Case Study Card

Insight Card

Statistic Card

Team Card

Every card should share a common visual language.

---

# 18. Tables

Enterprise-friendly.

Support:

Sorting

Filtering

Pagination

Responsive behavior

Avoid excessive borders.

---

# 19. Badges

Status

Category

Industry

Technology

Article Tags

Use semantic colors.

---

# 20. Alerts

Information

Success

Warning

Error

Every alert should contain:

Icon

Title

Description

Optional action

---

# 21. Empty States

Every empty state should include:

Illustration

Headline

Supporting text

Primary action

Never display blank screens.

---

# 22. Loading States

Prefer skeleton loading.

Avoid:

Large spinners

Blocking overlays

Loading should preserve layout.

---

# 23. Error States

Every error should explain:

What happened

Why

Possible solution

Recovery action

Avoid technical error messages.

---

# 24. Motion Principles

Animation should support understanding.

Never distract.

Recommended:

Fade

Slide

Scale

Opacity

Subtle transforms

Avoid:

Long animations

Bouncing

Rotating

Flashy transitions

---

# 25. Motion Timing

Fast

100–200ms

Standard

250–350ms

Complex

400–600ms

Maintain consistency.

---

# 26. Accessibility

Minimum contrast ratio:

WCAG AA

Keyboard support

Visible focus indicators

Screen reader labels

Logical heading order

Reduced motion support

Proper ARIA attributes

---

# 27. Component Naming

Every reusable component should follow consistent naming.

Examples:

HeroSection

FeatureCard

IndustryGrid

CaseStudyCard

CTASection

InsightCard

StatisticGrid

Timeline

Avoid ambiguous names.

---

# 28. Tailwind Guidelines

Prefer utility classes.

Avoid inline styles.

Extract repeated patterns into reusable components.

Keep component styling centralized.

---

# 29. ShadCN Guidelines

Use ShadCN as the design foundation.

Customize components through theme tokens.

Do not heavily modify component structure unless required.

Maintain consistency with the overall design language.

---

# 30. Dark Mode

The design system should support dark mode.

Use semantic tokens.

Never hardcode colors.

Ensure accessibility in both themes.

---

# 31. Performance

Prefer CSS over JavaScript where possible.

Optimize images.

Reduce layout shift.

Lazy-load below-the-fold content.

Minimize animation overhead.

---

# 32. Future Expansion

The design system should support future additions including:

Dashboard

Documentation

Client Portal

Knowledge Base

AI Academy

Developer Portal

Community Platform

Without requiring redesign.

---

# 33. Acceptance Criteria

The design system is complete when:

✓ Layout grid is defined.

✓ Typography system is documented.

✓ Color tokens are established.

✓ Components follow consistent rules.

✓ Accessibility requirements are documented.

✓ Responsive behavior is defined.

✓ Motion principles are documented.

✓ Tailwind implementation guidance is included.

✓ Future scalability has been considered.

---

# 34. References

The following organizations may be studied for inspiration regarding enterprise design quality, visual systems, and interaction patterns. They are references only. The design language for DeosAI Labs must remain original.

- https://www.forwardeployed.com
- https://linear.app
- https://vercel.com
- https://www.anthropic.com
- https://www.palantir.com

---

# 35. Next Document

Proceed to:

04-homepage-spec.md

This document defines the homepage section by section, including business objectives, content hierarchy, layout behavior, interactions, animation guidance, responsive considerations, accessibility requirements, and acceptance criteria for every homepage section.