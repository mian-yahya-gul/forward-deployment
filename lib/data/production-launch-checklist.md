# Task: Create the Production Launch Checklist Specification

You are working on the **DeosAI Labs** website, a production Next.js website deployed on Vercel with the custom domain:

`https://deosailabs.com`

The website represents **DeosAI Labs**, an AI Forward Deployment Engineering agency focused on deploying production-grade AI systems inside existing business workflows.

The website is now technically deployed and the custom domain/HTTPS configuration is working.

Your task is to create a **comprehensive Production Launch Checklist Specification Document** for the website.

## IMPORTANT

Do NOT implement any changes.

Do NOT modify application code.

Do NOT modify DNS.

Do NOT modify Vercel configuration.

Do NOT install packages.

Do NOT create new features.

Your job in this task is to **inspect the existing repository and produce a detailed production-launch specification document** that can later be used by Claude Code to execute the launch process safely.

---

# 1. First inspect the existing project

Before writing the specification, inspect the repository thoroughly.

Understand:

* Next.js version
* App Router or Pages Router
* project structure
* routes
* components
* layouts
* metadata configuration
* `next.config.*`
* environment variables
* API routes
* forms
* CTA buttons
* booking functionality
* contact functionality
* analytics
* SEO implementation
* sitemap
* robots.txt
* favicon
* Open Graph metadata
* Twitter/X metadata
* structured data
* images
* fonts
* external resources
* book/playbook implementation
* `/book` routes
* deployment configuration
* Vercel configuration
* security headers
* CSP if present
* redirects
* middleware
* error pages
* 404 page
* 500/error handling
* mobile navigation
* responsive behavior
* accessibility implementation

Also inspect the Git history and most recent production-related changes so the specification reflects the current state rather than an assumed architecture.

---

# 2. Understand the current production state

The following has already been completed and should NOT be treated as outstanding:

* Custom Namecheap domain connected to Vercel
* Vercel domain configuration validated
* HTTPS working
* Let's Encrypt certificate valid
* Production deployment working
* Incognito HTTPS test successful
* Book `/book/preface` prefetch 404 fixed
* Book logo/favicon path issues fixed
* `metadataBase` / `siteUrl` updated from the old Vercel preview domain to `https://www.deosailabs.com`
* Production build succeeds
* TypeScript validation succeeds
* Production site has been tested

The specification should therefore focus on the **remaining production-readiness and launch-readiness work**.

---

# 3. Create the Production Launch Checklist

The document should cover the complete journey from:

**"Website technically deployed"**

to:

**"Website is production-ready, discoverable, measurable, credible, and ready to generate real business leads."**

Organize the checklist into logical phases.

At minimum include:

## Phase 1 — Domain & Infrastructure

Verify:

* canonical domain
* www vs apex behavior
* HTTPS
* redirects
* SSL
* DNS
* Vercel production deployment
* environment variables
* production environment configuration
* deployment branch
* build configuration
* runtime configuration
* caching
* CDN behavior
* error handling
* uptime considerations

Do not recommend changes that are already confirmed working.

---

# 4. SEO & Search Engine Readiness

Create a detailed checklist for:

* title tags
* meta descriptions
* canonical URLs
* `metadataBase`
* Open Graph metadata
* Twitter/X metadata
* `og:image`
* image dimensions
* favicon
* robots.txt
* sitemap.xml
* canonical domain consistency
* internal linking
* heading hierarchy
* semantic HTML
* structured data / JSON-LD
* Organization schema
* WebSite schema where appropriate
* Service schema where appropriate
* breadcrumb schema where appropriate
* indexability
* noindex rules
* crawlability
* duplicate URLs
* trailing slash behavior
* query-string behavior
* book/playbook pages
* service pages
* case studies
* blogs/insights
* careers pages

Specify how each item should be verified.

---

# 5. Google Search Console

Include a complete launch specification for:

* creating/verifying the domain property
* preferred verification method
* sitemap submission
* URL inspection
* homepage indexing request
* important service-page indexing
* checking crawl errors
* checking indexing coverage
* checking Core Web Vitals
* monitoring search performance

Do not require implementation of Google Search Console inside the codebase unless technically necessary.

Clearly distinguish:

**Code changes**

from:

**External dashboard actions**

---

# 6. Analytics & Measurement

Specify what analytics should be implemented.

Evaluate the existing codebase first.

Cover:

* traffic measurement
* page views
* CTA clicks
* discovery-call clicks
* contact-form submissions
* email clicks
* book/playbook engagement
* service-page engagement
* outbound links
* conversion events
* campaign attribution
* UTM parameters
* referrer tracking
* privacy considerations

Define the minimum viable analytics system for a newly launched B2B AI/FDE agency.

Avoid unnecessary analytics complexity.

---

# 7. Lead Generation & Conversion

This is one of the most important sections.

Analyze every major CTA on the website.

Especially:

**Book a Discovery Call**

Determine:

* where it currently goes
* whether the destination works
* whether the flow is production-ready
* whether the user receives confirmation
* whether DeosAI Labs receives the lead
* whether attribution is preserved
* whether mobile users can complete the flow
* what happens if the booking service fails

Also inspect:

* contact forms
* email links
* service CTAs
* case-study CTAs
* book/playbook CTAs
* footer CTAs
* navigation CTAs

Define the desired conversion path:

**Visitor → Interest → CTA → Lead → Qualification → Discovery Call**

---

# 8. Professional Business Email

Create a launch requirement for professional email addresses using the DeosAI Labs domain.

Examples:

* `hello@deosailabs.com`
* `contact@deosailabs.com`
* `sales@deosailabs.com`

Do not assume a specific email provider.

Specify:

* required addresses
* forwarding requirements
* sending requirements
* receiving requirements
* SPF
* DKIM
* DMARC
* domain reputation
* testing

Clearly separate DNS/email-provider configuration from application code.

---

# 9. Website Functional QA

Create a route-by-route testing matrix.

For every important page verify:

* HTTP status
* HTTPS
* page rendering
* navigation
* responsive layout
* CTA functionality
* images
* fonts
* animations
* forms
* external links
* internal links
* metadata
* console errors
* network errors

Include the book/playbook experience separately.

Pay particular attention to:

* `/book`
* book chapters
* book navigation
* mobile book navigation
* hydration
* static assets
* favicon
* logo
* client-side navigation
* prefetch behavior

---

# 10. Mobile & Responsive QA

Define testing requirements for:

* mobile
* tablet
* desktop

Cover:

* navigation
* hero
* typography
* CTA buttons
* book mockup
* service cards
* case studies
* forms
* footer
* animations
* horizontal overflow
* touch targets
* viewport behavior

Specify critical breakpoints based on the existing design system rather than inventing arbitrary ones.

---

# 11. Accessibility

Audit:

* keyboard navigation
* focus states
* semantic HTML
* heading hierarchy
* alt text
* buttons
* links
* forms
* labels
* contrast
* reduced-motion behavior
* screen-reader behavior
* ARIA usage
* mobile accessibility

Use WCAG 2.2 AA as the target where practical.

Do not recommend adding ARIA where semantic HTML already solves the problem.

---

# 12. Performance

Define a practical performance launch checklist.

Cover:

* Core Web Vitals
* LCP
* CLS
* INP
* image optimization
* font loading
* JavaScript bundle size
* unnecessary client components
* lazy loading
* preloading
* third-party scripts
* caching
* static generation
* server rendering
* image dimensions
* above-the-fold content

Use the existing architecture.

Do not recommend premature optimization.

---

# 13. Security

Audit:

* HTTPS
* security headers
* CSP if appropriate
* X-Content-Type-Options
* Referrer-Policy
* Permissions-Policy
* clickjacking protection
* exposed secrets
* environment variables
* API endpoints
* form abuse
* spam protection
* dependency vulnerabilities
* unsafe HTML
* external scripts
* third-party integrations

Clearly distinguish:

**required before launch**

from:

**recommended later**

Do not introduce excessive security complexity for a marketing website.

---

# 14. Content & Credibility

Evaluate the website from the perspective of a potential enterprise client.

Verify:

* company positioning
* value proposition
* services
* industries
* case studies
* methodology
* book/playbook
* about/company information
* contact information
* trust signals
* social proof
* founder/company credibility
* clear explanation of Forward Deployment Engineering

Identify any missing content that would prevent a serious prospect from trusting the company.

Do not rewrite content in this task.

Only specify what should be checked or improved.

---

# 15. Legal & Trust Requirements

Create a practical checklist covering:

* privacy policy
* cookie policy where applicable
* terms of service
* contact/company information
* third-party services
* analytics disclosure
* data collection
* form submission handling
* booking data
* external service privacy implications

Clearly label anything that requires legal review rather than pretending to provide legal advice.

---

# 16. Social Sharing

Verify:

* LinkedIn preview
* X/Twitter preview
* Facebook/Meta preview where relevant
* OG title
* OG description
* OG image
* canonical URL
* image dimensions
* branding

Ensure previews use the production DeosAI Labs domain rather than the old Vercel preview domain.

---

# 17. Monitoring & Operations

Specify the minimum monitoring required after launch.

Include:

* Vercel deployment monitoring
* uptime monitoring
* error monitoring
* analytics
* Search Console
* broken-link monitoring
* form/booking monitoring
* domain/SSL monitoring
* dependency updates
* backup/recovery considerations

Define what should be checked:

**daily**

**weekly**

**monthly**

Do not over-engineer monitoring for the current stage of the company.

---

# 18. Launch Day Procedure

Create a precise launch-day sequence.

For example:

1. Verify latest production commit
2. Verify production deployment
3. Verify domain
4. Verify HTTPS
5. Verify redirects
6. Verify homepage
7. Verify all primary pages
8. Verify CTAs
9. Verify booking/contact
10. Verify book/playbook
11. Verify analytics
12. Verify sitemap
13. Verify robots.txt
14. Verify metadata
15. Verify social preview
16. Verify mobile
17. Verify no critical console/network errors
18. Submit sitemap
19. Request indexing for key pages
20. Announce launch

Adjust the sequence based on what actually exists in the repository.

---

# 19. Post-Launch Monitoring

Create a:

### First 24 Hours

checklist.

Then:

### First 7 Days

checklist.

Then:

### First 30 Days

checklist.

Include:

* traffic
* leads
* CTA conversion
* booking conversion
* errors
* SEO indexing
* search impressions
* Core Web Vitals
* user behavior
* broken links
* deployment issues

---

# 20. Launch Severity Classification

Every checklist item should be classified as one of:

### P0 — Launch Blocker

The website should NOT launch if this fails.

### P1 — Important

Should be fixed immediately, but may not block launch depending on impact.

### P2 — Post-launch

Useful improvement that does not need to block launch.

This distinction is extremely important.

Do not create a checklist where every small improvement becomes a launch blocker.

---

# 21. Acceptance Criteria

Create explicit acceptance criteria for the entire production launch.

The website should only be considered:

**PRODUCTION READY**

when all P0 items are complete and all critical P1 issues have either been resolved or explicitly accepted.

Include measurable criteria such as:

* HTTPS works
* canonical domain works
* redirects work
* production deployment succeeds
* no critical console errors
* no broken primary routes
* primary CTAs work
* discovery-call flow works
* contact flow works
* analytics works
* sitemap exists
* robots.txt exists
* metadata is correct
* OG preview is correct
* mobile experience works
* book/playbook works
* no exposed secrets
* no critical security findings
* no critical accessibility failures

---

# 22. Create a Final Launch Matrix

At the end, create a table with:

| Category | Requirement | Priority | Verification Method | Status | Owner |
| -------- | ----------- | -------- | ------------------- | ------ | ----- |

Use statuses:

* NOT STARTED
* IN PROGRESS
* PASS
* FAIL
* BLOCKED
* ACCEPTED RISK

Do not mark anything PASS unless it has actually been verified from the repository or available production evidence.

---

# 23. Implementation Boundary

The final specification must clearly separate three categories:

### A. Claude Code Implementation

Things Claude Code can safely implement in the repository.

### B. External Configuration

Things requiring Namecheap, Vercel, Google Search Console, email provider, analytics provider, booking provider, etc.

### C. Human Verification

Things that require manually checking the live website, phone, browser, email inbox, booking flow, etc.

This separation is mandatory.

---

# 24. Output Requirements

Create a single Markdown specification document.

Recommended filename:

`specs/production-launch-checklist.md`

The document should contain:

1. Purpose
2. Current production state
3. Scope
4. Non-goals
5. Launch phases
6. Detailed checklist
7. P0/P1/P2 classification
8. Verification procedures
9. External configuration requirements
10. Human verification requirements
11. Launch-day procedure
12. Post-launch monitoring
13. Acceptance criteria
14. Final launch matrix
15. Open issues
16. Risks
17. Recommended post-launch improvements

Use clear technical language.

Make every requirement actionable and testable.

Avoid vague statements such as:

> "Make sure the website is good."

Instead use:

> "Verify that `https://deosailabs.com` redirects to the canonical production URL with the expected status code and that the final URL returns HTTP 200."

The specification should be detailed enough that a future Claude Code session can read it and execute the launch process systematically without needing to rediscover the requirements.

## Critical instruction

Do not implement anything during this task.

Only inspect the existing project and create the specification document.
