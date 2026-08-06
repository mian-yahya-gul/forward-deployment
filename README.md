# DeosAI Labs Website

The marketing website for DeosAI Labs, an AI Forward Deployment consultancy. Built from the product
specs in [`.claude/specs/`](.claude/specs/) — see `00-project-overview.md` there for the business
context this site is designed around.

## Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `app/globals.css`)
- Hand-rolled **shadcn/ui-style primitives** (`components/ui/`) using `class-variance-authority`
- **lucide-react** for icons
- No animation library — scroll reveals are CSS transitions driven by a small `IntersectionObserver`
  hook (`lib/motion.ts`), respecting `prefers-reduced-motion`
- Dark mode via `prefers-color-scheme` (no toggle UI)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000 (or next available port)
npm run build    # production build + typecheck
npm run lint
```

## Project structure

```
app/                    Routes (App Router). Static pages + dynamic [slug] routes for
                         services, industries, case-studies, and insights.
components/
  layout/                Header, MobileNav, Footer
  sections/               Homepage-only sections (Hero, ProblemSection, etc.)
  shared/                 Reusable across homepage + listing/detail pages
                          (cards, PageHero, Breadcrumbs, FAQAccordion, CTASection, ...)
  ui/                      Design-system primitives (Button, Card, Badge, Input, ...)
lib/
  data/                    All site content — see below
  relatedContent.ts        Tag-based "related services/industries/stories/insights" matching
  motion.ts, utils.ts
```

## Content model

**All copy lives in `lib/data/*.ts`, not in components.** Every page component reads from a typed
data file and renders it — there's no copy hardcoded into JSX. To edit content, find the relevant
file in `lib/data/` rather than the page component.

To add a new item to a collection (a service, an industry, a case study, an insights article), add
an entry to the corresponding array — `services.ts`, `industries.ts`, `stories.ts`, `insights.ts` —
and the listing page, detail route (`generateStaticParams`), sitemap, and any "related content"
cross-links pick it up automatically. Cross-linking between services/industries/stories/insights
works via `relatedServiceSlugs` / `relatedIndustrySlugs` arrays on each item; `lib/relatedContent.ts`
matches on those tags with a fallback so a section is never empty.

## What's real vs. placeholder

This was built without a design system, brand assets, or CMS to start from, so a fair amount of the
content is deliberate first-draft placeholder rather than approved final copy:

- **Design tokens** (`app/globals.css`): colors, fonts, spacing are an original placeholder system,
  not an approved brand — swap the CSS variables at the top of the file for real brand values.
- **Hero headline/tagline, case study "stories," and insights articles** are original placeholder
  copy written to match the brand voice guidelines, not reviewed/approved marketing copy.
- **No backend.** The contact form hands off to the visitor's email client via `mailto:` rather than
  submitting anywhere — there's no server, database, or email service wired up.
- **Case studies are labeled "Illustrative Scenario"** — no real client engagements are published
  yet, so these are generalized, non-specific narratives rather than verified outcomes.
- **Careers "Open Positions" and About's "Leadership"/"Partnerships"/"Community"** sections were
  deliberately left as honest empty states or omitted entirely rather than filled with invented
  people, roles, or affiliations.
- **Privacy Policy and Terms of Use** (`lib/data/legal.ts`) are drafts describing the site as
  currently built, explicitly marked as pending real legal review.

## Verification

Every page has been checked with a real headless-browser pass (not just `next build`): desktop/
mobile/dark-mode screenshots, keyboard focus order, and an `axe-core` WCAG 2.1 AA accessibility
scan (currently passing with zero violations across the pages audited).
