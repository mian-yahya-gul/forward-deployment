# Homepage Section Specification
Project: DeosAI Labs Website
Document: homepage/05-industries.md
Version: 1.0
Status: Draft

---

# 1. Purpose

This section demonstrates that DeosAI Labs understands the operational realities of different industries.

The objective is not to claim expertise in every possible sector.

Instead, it should communicate that every AI engagement begins with understanding the business context before recommending technology.

Visitors should quickly recognize their own industry and feel that DeosAI Labs understands the unique challenges they face.

---

# 2. Business Objective

The Industry section should:

• Increase credibility.

• Demonstrate domain awareness.

• Reduce buyer uncertainty.

• Encourage visitors to explore industry-specific pages.

• Reinforce that every deployment is tailored to operational needs.

---

# 3. User Psychology

At this stage the visitor is asking:

"Can they understand my business?"

They are no longer evaluating AI.

They are evaluating industry experience.

This section should answer:

"We understand how organizations like yours operate."

---

# 4. Core Message

Every industry has unique workflows, regulations, terminology, risks, and success metrics.

Our approach begins by understanding your business before recommending AI solutions.

---

# 5. Industry Selection Principles

Industries should only be included when DeosAI Labs intends to create dedicated content for them.

Avoid creating a long list simply to appear comprehensive.

Quality is more important than quantity.

---

# 6. Homepage Industry Cards

The homepage should initially feature six industries.

Recommended placeholders:

• Healthcare

• Education

• Retail & E-commerce

• Manufacturing

• Logistics & Supply Chain

• Financial Services

Additional industries can be introduced as dedicated pages become available.

---

# 7. Industry Card Structure

Each industry card should contain:

Industry Icon

↓

Industry Name

↓

One-sentence operational challenge

↓

Primary business outcome

↓

"Explore Industry"

Example:

Healthcare

"Improve access to clinical knowledge and streamline administrative workflows."

Outcome:

More time for patient care.

The copy should remain concise and business-focused.

---

# 8. Business Context Mapping

Each industry page should be developed using a common framework.

For every industry document, define:

## Operational Environment

How work is typically performed.

---

## Typical Stakeholders

Examples:

Executives

Managers

Frontline Staff

Operations Teams

IT Teams

Customers

---

## Common Operational Challenges

Examples:

Manual approvals

Knowledge silos

Disconnected systems

Compliance overhead

Repetitive administrative work

Poor reporting

Delayed decisions

---

## AI Opportunities

Examples:

Knowledge assistants

Workflow automation

Decision support

Document intelligence

Predictive analytics

Operational dashboards

---

## Expected Business Outcomes

Examples:

Reduced operating costs

Improved service quality

Higher employee productivity

Faster turnaround times

Better compliance

Improved customer satisfaction

---

## Typical Integrations

Examples:

ERP

CRM

HR Systems

Document Management

Email

Scheduling

Internal Portals

---

## Regulatory Considerations

Where applicable, note industry-specific compliance requirements.

Avoid making legal claims.

---

## Success Metrics

Examples:

Time saved

Processing speed

Customer satisfaction

Employee productivity

Operational efficiency

Error reduction

---

# 9. Layout

Desktop

Section Heading

↓

Supporting Description

↓

Industry Grid (3 × 2)

↓

Explore Industries CTA

Tablet

2-column grid

Mobile

Single-column cards

---

# 10. Visual Strategy

Industry cards should use simple visual cues.

Avoid industry clichés.

Examples to avoid:

• Stethoscopes

• Shopping carts

• Factory smoke

Instead use clean icons and abstract illustrations that represent workflows, people, or systems.

---

# 11. Typography

Industry Name

Prominent

Operational Challenge

Short paragraph

Outcome

Small highlighted label

CTA

Text link or subtle button

---

# 12. Interaction Design

Hover:

Card elevation

Border emphasis

Icon animation

Click:

Navigate to industry page

Animation should remain subtle and consistent with the Design System.

---

# 13. Component Architecture

IndustriesSection

├── SectionHeading

├── SectionDescription

├── IndustryGrid

│   ├── IndustryCard
│   ├── IndustryCard
│   ├── IndustryCard
│   ├── IndustryCard
│   ├── IndustryCard
│   └── IndustryCard

└── CTA

All cards should be generated from structured data.

---

# 14. Responsive Behaviour

Desktop

Three-column grid.

Tablet

Two-column grid.

Mobile

Single-column layout.

Cards should maintain equal height where appropriate.

---

# 15. Accessibility

Every industry card should support:

Keyboard navigation

Visible focus indicators

Descriptive link text

Semantic headings

Meaningful alt text for illustrations

---

# 16. SEO

The homepage should introduce industries without attempting to rank for every industry-specific keyword.

Dedicated industry pages should provide deeper content and target detailed search intent.

Use descriptive headings and natural language.

---

# 17. Analytics

Track:

Industry card clicks

Most viewed industries

CTA clicks

Scroll depth

Navigation to industry pages

Use this data to understand which industries generate the greatest interest.

---

# 18. Content Governance

Every industry page should answer four questions:

1. What challenges are common in this industry?

2. How can AI improve operations?

3. What measurable outcomes can organizations expect?

4. How does DeosAI Labs approach this industry?

Do not structure industry pages around technologies.

Structure them around operational improvements.

---

# 19. Claude Code Implementation Notes

Requirements:

• Industry cards must be data-driven.

• Content should come from a centralized configuration or CMS.

• Icons should be configurable.

• Layout should reuse shared Card components.

• Support adding or removing industries without changing layout code.

• Use semantic design tokens.

• Follow shared motion utilities.

---

# 20. Future Expansion

The architecture should support:

• Industry-specific case studies

• Industry playbooks

• Research reports

• Industry events

• Regulatory resources

• Customer success stories

• Downloadable guides

Each new resource should connect back to its respective industry page.

---

# 21. Acceptance Criteria

✓ Visitors can quickly identify their industry.

✓ Messaging focuses on operational context.

✓ Industry cards are reusable and responsive.

✓ Accessibility requirements are met.

✓ Navigation encourages exploration of dedicated industry pages.

✓ Analytics events are implemented.

✓ Future expansion is supported.

---

# 22. Next Document

Proceed to:

homepage/06-process.md

This specification defines the client engagement journey, explaining what organizations can expect when working with DeosAI Labs—from the initial discovery conversation through implementation, adoption, and continuous improvement.