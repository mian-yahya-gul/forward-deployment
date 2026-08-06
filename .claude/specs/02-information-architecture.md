# 02 - Information Architecture
Project: DeosAI Labs Website
Version: 1.0
Status: Draft
Document Type: Information Architecture Specification
Owner: DeosAI Labs

---

# 1. Purpose

This document defines the complete information architecture of the DeosAI Labs website.

Its purpose is to organize information in a way that enables visitors to quickly understand:

- Who we are
- What we do
- Why organizations need AI Forward Deployment
- Which industries we serve
- How we work
- Why they should trust us
- How they can engage with us

This document serves as the blueprint for navigation, page hierarchy, user journeys, internal linking, and future scalability.

Every future page must conform to this architecture unless formally revised.

---

# 2. Information Architecture Principles

The architecture should follow these principles.

## Clarity

Visitors should never wonder where information is located.

Every page should have a clearly defined purpose.

---

## Progressive Disclosure

Present information gradually.

Visitors should never be overwhelmed.

Start with high-level concepts.

Allow users to drill deeper only when interested.

---

## Business Before Technology

Structure the website around business problems rather than technologies.

Avoid navigation such as:

❌ AI Agents

❌ RAG

❌ MCP

Prefer:

✓ Services

✓ Industries

✓ Solutions

✓ Resources

---

## Decision-Oriented Navigation

Every page should help visitors make one decision:

Continue exploring

OR

Contact DeosAI Labs.

---

## Scalability

The architecture should allow new services, industries, research papers, events, and products to be added without redesigning the site.

---

# 3. Primary Navigation

The primary navigation should remain simple and uncluttered.

Recommended structure:

Home

Services

Industries

Insights

About

Contact

Primary CTA

Book Discovery Call

---

# 4. Navigation Behavior

Desktop

Sticky navigation.

Transparent initially.

Solid background after scrolling.

Navigation height:

72–80px

---

Mobile

Hamburger navigation.

Full-screen drawer.

Large touch targets.

Easy thumb navigation.

---

# 5. Sitemap

Home

├── Services

│   ├── AI Strategy & Discovery

│   ├── AI Forward Deployment

│   ├── Enterprise AI Systems

│   ├── Workflow Automation

│   ├── AI Knowledge Platforms

│   ├── AI Copilots

│   ├── AI Agents

│   ├── AI Operations

│   ├── AI Governance

│   └── AI Training

│

├── Industries

│   ├── Education

│   ├── Healthcare

│   ├── Retail

│   ├── Manufacturing

│   ├── Logistics

│   ├── Travel

│   ├── Financial Services

│   ├── Government

│   └── Construction

│

├── Insights

│   ├── Articles

│   ├── Playbooks

│   ├── Case Studies

│   ├── Research

│   ├── Whitepapers

│   ├── Podcasts

│   └── Events

│

├── About

│   ├── Our Story

│   ├── Mission

│   ├── Leadership

│   ├── Careers

│   └── Partners

│

└── Contact

    ├── Discovery Call

    ├── General Inquiry

    └── Careers

---

# 6. Homepage Information Flow

The homepage should tell a complete story.

Recommended sequence:

Hero

↓

Problem

↓

Our Approach

↓

Services

↓

Industries

↓

How We Work

↓

Why DeosAI Labs

↓

Featured Case Studies

↓

Insights

↓

Call to Action

↓

Footer

The visitor should understand the business before seeing technical details.

---

# 7. User Personas

The architecture should support multiple visitor types.

## Enterprise Executive

Looking for:

Business value

ROI

Trust

Case studies

Strategy

---

## Technical Leader

Looking for:

Architecture

Capabilities

Deployment process

Technology

Governance

---

## Operations Manager

Looking for:

Workflow improvement

Automation

Efficiency

Implementation

---

## Potential Employee

Looking for:

Culture

Mission

Engineering quality

Open positions

---

## Technology Partner

Looking for:

Partnership opportunities

Capabilities

Industry focus

---

# 8. User Journeys

## Journey 1 – Executive

Landing Page

↓

Business Problem

↓

Services

↓

Case Study

↓

Discovery Call

---

## Journey 2 – Technical Leader

Landing Page

↓

How We Work

↓

Architecture

↓

Services

↓

Insights

↓

Contact

---

## Journey 3 – Industry Visitor

Landing Page

↓

Industry

↓

Industry Challenges

↓

Solutions

↓

Case Study

↓

Book Consultation

---

## Journey 4 – Recruit

Landing Page

↓

About

↓

Culture

↓

Careers

↓

Application

---

# 9. Internal Linking Strategy

Every page should connect naturally to related content.

Example

Service Page

↓

Relevant Industry

↓

Related Case Study

↓

Relevant Insight

↓

Contact CTA

Avoid dead-end pages.

Every page should provide a logical next step.

---

# 10. Page Templates

Every page should use reusable templates.

Examples:

Service Template

Industry Template

Case Study Template

Article Template

Landing Page Template

Research Template

Career Template

Reusable templates improve consistency and scalability.

---

# 11. Search Strategy

The architecture should support future global search.

Searchable content:

Articles

Services

Industries

Case Studies

Playbooks

Research

Documentation

Podcasts

Search should remain extensible.

---

# 12. URL Structure

Keep URLs simple.

Examples

/services/ai-forward-deployment

/services/workflow-automation

/industries/education

/industries/retail

/case-studies/

 /insights/

 /about/

 /contact/

Avoid deeply nested URLs.

---

# 13. Breadcrumb Strategy

Breadcrumbs should appear on all secondary pages.

Example

Home

>

Services

>

Workflow Automation

Breadcrumbs improve usability and SEO.

---

# 14. Footer Architecture

Footer should contain:

Company

Services

Industries

Resources

Legal

Social Links

Newsletter

Contact Information

Do not overload the footer.

---

# 15. Calls to Action

Every major page should end with a relevant CTA.

Examples

Book Discovery Call

Discuss Your Workflow

Read Related Insight

Explore Industry Solutions

Talk to Our Team

Download Playbook

CTA wording should align with the Brand Strategy document.

---

# 16. Future Expansion

The architecture should support additional sections without major restructuring.

Potential future additions:

Academy

Community

Documentation

Developer Portal

Partner Portal

Customer Portal

Open Source

Research Lab

Product Catalog

Events

AI Marketplace

---

# 17. Content Relationships

Content should reinforce each other.

Example

Insight

↓

Links to Service

↓

Links to Industry

↓

Links to Case Study

↓

CTA

This creates a connected knowledge ecosystem.

---

# 18. Navigation Principles

Navigation labels should use business language.

Prefer:

Services

Industries

Insights

Avoid technical jargon.

Navigation should remain under seven primary items.

---

# 19. Accessibility

Navigation should support:

Keyboard navigation

Screen readers

Visible focus states

Skip links

ARIA landmarks

Logical heading hierarchy

---

# 20. Performance Considerations

Navigation should remain lightweight.

Avoid mega menus unless content volume requires them.

Lazy-load secondary navigation assets where appropriate.

---

# 21. Acceptance Criteria

This specification is complete when:

✓ Sitemap is finalized.

✓ Navigation hierarchy is defined.

✓ User journeys are documented.

✓ Internal linking strategy is established.

✓ URL conventions are documented.

✓ Future scalability has been considered.

✓ CTA flow is defined.

✓ Page relationships are documented.

---

# 22. References

The following websites may be reviewed to understand effective enterprise information architecture, navigation patterns, and content organization. They are references for inspiration only. The structure, copy, visuals, and implementation for DeosAI Labs must remain original.

- https://www.forwardeployed.com
- https://www.palantir.com
- https://linear.app
- https://vercel.com
- https://www.anthropic.com

---

# 23. Next Document

Proceed to:

03-design-system.md

This specification defines the complete visual language of the DeosAI Labs website, including typography, color system, spacing, layout grids, components, icons, motion foundations, accessibility, and reusable design principles.