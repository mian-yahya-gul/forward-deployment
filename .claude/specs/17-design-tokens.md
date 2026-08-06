# Design Tokens Specification
Project: DeosAI Labs Website
Document: 17-design-tokens.md
Version: 1.0
Status: Draft
Owner: DeosAI Labs

---

# 1. Purpose

This specification defines the centralized design tokens used across the entire DeosAI Labs ecosystem.

Design tokens provide a single source of truth for visual properties such as colors, typography, spacing, sizing, shadows, borders, motion, breakpoints, and elevation.

All UI components should reference design tokens rather than hard-coded values.

---

# 2. Objectives

The token system should:

• Ensure visual consistency.

• Simplify theming.

• Improve maintainability.

• Enable dark mode.

• Support future brand evolution.

• Reduce duplicated styling.

---

# 3. Token Philosophy

Every visual decision should originate from a reusable token.

Design decisions should never be duplicated across components.

The hierarchy should be:

Global Tokens

↓

Semantic Tokens

↓

Component Tokens

↓

Component Styles

---

# 4. Token Categories

The system should define tokens for:

• Colors

• Typography

• Font Families

• Font Sizes

• Font Weights

• Line Heights

• Letter Spacing

• Spacing

• Border Radius

• Borders

• Shadows

• Elevation

• Opacity

• Motion

• Breakpoints

• Z-index

---

# 5. Color Tokens

Support:

Primary

Secondary

Accent

Success

Warning

Danger

Info

Background

Surface

Border

Muted

Text Primary

Text Secondary

Text Inverse

Dark Theme equivalents

Use semantic names rather than brand-specific color values.

---

# 6. Typography Tokens

Support:

Display XL

Display L

Heading 1

Heading 2

Heading 3

Heading 4

Heading 5

Heading 6

Body Large

Body

Small

Caption

Label

Code

---

# 7. Font Families

Define:

Primary Sans Serif

Secondary Serif (optional)

Monospace

Future Variable Font support

---

# 8. Spacing Scale

Use a consistent spacing system.

Example scale:

4

8

12

16

20

24

32

40

48

64

80

96

128

Avoid arbitrary spacing values.

---

# 9. Border Radius

Support:

None

Small

Medium

Large

Extra Large

Full

Radius should communicate consistency across the platform.

---

# 10. Shadows

Support multiple elevation levels.

Examples:

Level 1

Level 2

Level 3

Level 4

Level 5

Avoid excessive shadow usage.

---

# 11. Elevation

Define elevation tokens for:

Cards

Dropdowns

Navigation

Dialogs

Tooltips

Notifications

Drawers

Maintain consistent visual hierarchy.

---

# 12. Motion Tokens

Reference the Motion System specification.

Support:

Duration

Delay

Easing

Transitions

Animation Curves

Reduced Motion

Motion tokens should never be duplicated.

---

# 13. Breakpoints

Support responsive breakpoints for:

Mobile

Tablet

Laptop

Desktop

Large Desktop

Ultra-wide

Breakpoint values should remain centralized.

---

# 14. Z-Index Scale

Define standardized stacking layers.

Examples:

Base

Dropdown

Sticky Header

Modal

Drawer

Popover

Tooltip

Notification

Avoid arbitrary z-index values.

---

# 15. Theme Tokens

Support:

Light Theme

Dark Theme

System Theme

Future Client Themes

Themes should override semantic tokens rather than component styles.

---

# 16. Accessibility

Token choices should maintain:

Readable typography

Accessible contrast

Comfortable spacing

Visible focus indicators

Reduced motion support

WCAG AA compliance

---

# 17. Component Consumption

Every reusable component should consume tokens instead of raw CSS values.

No component should define its own visual constants unless explicitly documented.

---

# 18. Documentation

Each token should include:

Name

Purpose

Usage

Dependencies

Examples

Deprecated status (if applicable)

Maintain a living token library.

---

# 19. Claude Code Implementation Notes

Requirements:

• Token-first styling.

• CSS variables support.

• Tailwind configuration compatibility.

• Design system integration.

• Theme-aware architecture.

• Future Figma synchronization.

---

# 20. Acceptance Criteria

✓ All visual properties reference tokens.

✓ Tokens support theming.

✓ Accessibility is considered.

✓ Responsive breakpoints are centralized.

✓ Motion references the Motion System.

✓ Components avoid hard-coded values.

---

# 21. References

This specification should align with:

• Global Components Specification

• Motion System Specification

• Brand Strategy

• Design System

Design tokens serve as the visual foundation for every interface across the DeosAI Labs ecosystem.

---

# 22. Next Document

Proceed to:

22-motion-system.md

This specification defines animation principles, transitions, interaction feedback, micro-interactions, loading states, accessibility considerations, and motion design standards used throughout the DeosAI Labs platform.