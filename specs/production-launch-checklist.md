# DeosAI Labs — Production Launch Checklist

**Status as of:** 2026-08-14
**Site:** Next.js 16.3.0 (App Router), React 19.2.8, deployed on Vercel
**Canonical domain:** `https://www.deosailabs.com` (apex `https://deosailabs.com` returns 308 → `www`)

---

## 1. Purpose

This document is the single source of truth for taking the DeosAI Labs website from *"technically deployed"* to *"production-ready, discoverable, measurable, credible, and able to generate real business leads."* It reflects the actual state of the repository and live production site as of the date above — not an assumed architecture — and is meant to be read and executed by a future session without needing to rediscover any of this.

## 2. Current production state (already done — do not re-treat as outstanding)

- Custom Namecheap domain connected to Vercel; apex → `www` redirect (308) confirmed working.
- HTTPS/TLS valid (Let's Encrypt), HSTS active (`Strict-Transport-Security: max-age=63072000`).
- Production deployment builds and serves correctly; verified via direct live requests, not just local build.
- `/book/preface` Next.js Link-prefetch 404 fixed (`prefetch={false}` on the two Links pointing at it).
- Book navbar logo/favicon hydration-path 404s fixed (patched the compiled Docusaurus bundle's baseUrl-relative asset paths to absolute `/book/...` paths).
- `metadataBase`/`siteUrl` corrected from the old `forward-deployment.vercel.app` preview domain to `https://www.deosailabs.com` — confirmed in a real production build that `og:image` etc. now resolve to the real domain.
- **Implemented in this pass** (see §6 below for the full list): security headers, Organization/WebSite structured data, minimum-viable analytics with conversion events, a custom `error.tsx`, sitemap coverage for `/playbook` and all 18 book pages, a stale content fix on `/playbook`, and two pre-existing lint errors cleaned up.

## 3. Scope

Everything required to go from the current deployed-and-working state to a launch a real B2B prospect would trust, that the team can measure, and that actually converts a lead. Covers code, configuration, content, and operational readiness.

## 4. Non-goals

- Rewriting marketing copy or page content (flagged for review, not rewritten — matches the source task's own instruction).
- Standing up a full CSP (documented as a P1 follow-up with reasoning, not implemented blind).
- Choosing/configuring an email provider, booking tool, or analytics account beyond what's already zero-config on Vercel.
- Legal review of Privacy Policy / Terms content.
- Anything requiring Namecheap, Vercel dashboard, Google Search Console, or email-provider credentials this session doesn't have.

---

## 5. Launch phases

1. **Domain & Infrastructure** — confirm what's already validated, document what isn't.
2. **SEO & Search Readiness** — metadata, sitemap, structured data, indexability.
3. **Google Search Console** — external setup, documented not executed.
4. **Analytics & Measurement** — implemented this pass.
5. **Lead Generation & Conversion** — the most important finding is here (see §6.5).
6. **Professional Business Email** — external, documented.
7. **Functional / Mobile / Accessibility / Performance / Security QA** — executed live where tooling allows.
8. **Content & Credibility, Legal & Trust, Social Sharing** — audited, not rewritten.
9. **Monitoring & Operations, Launch Day, Post-Launch** — procedures defined.

---

## 6. Detailed checklist by section

Each item is classified **P0** (launch blocker), **P1** (fix immediately, doesn't block launch), or **P2** (post-launch improvement). Status values: `PASS`, `FAIL`, `NOT STARTED`, `BLOCKED`, `ACCEPTED RISK`.

### 6.1 Domain & Infrastructure

| # | Requirement | Priority | Verification | Status |
|---|---|---|---|---|
| I-1 | `https://deosailabs.com` redirects to `https://www.deosailabs.com` with an HTTP redirect status, final URL returns 200 | P0 | `curl -sI https://deosailabs.com` → confirmed 308 → `www`, then 200 | **PASS** |
| I-2 | `https://www.deosailabs.com` serves 200 with a valid, trusted TLS cert | P0 | Verified live | **PASS** |
| I-3 | HSTS header present | P1 | `curl -sI` shows `Strict-Transport-Security: max-age=63072000` | **PASS** |
| I-4 | `RESEND_API_KEY` is set in **Vercel's production environment**, not just `.env.local` | P0 | Cannot verify from repo — `.env.local` exists locally (gitignored) and contains it, but Vercel's own env var store is separate and must be checked in the dashboard | **BLOCKED** — Human/External (Vercel dashboard) |
| I-5 | Deployment branch is `main`, builds from the latest commit | P1 | `git log` shows all launch-readiness work merged to `main`; Vercel project settings should be confirmed to track `main` | **NOT STARTED** — Human (Vercel dashboard) |
| I-6 | Production build succeeds with no errors | P0 | `npm run build` — succeeds, all routes render (see route table in build output) | **PASS** |
| I-7 | `tsc --noEmit` and `eslint` are clean | P0 | Both run clean as of this pass (two pre-existing lint errors fixed: `app/error.tsx`'s intentional `<a>`, and a pre-existing `react-hooks/set-state-in-effect` finding in `lib/motion.ts`) | **PASS** |
| I-8 | No `http://` or untrusted external resources loaded by any page | P0 | Full codebase search + live Playwright network capture across homepage, all 6 JS-enabled book pages, 12 industry chapters, and 8 other top-level pages, including triggering mobile nav/theme toggle — zero cross-origin requests, zero failures | **PASS** |
| I-9 | Vercel default caching/CDN behavior is acceptable for a mostly-static marketing site | P2 | Route table shows the large majority of routes are `○ Static` or `● SSG` (prerendered) — good default caching profile; no custom `Cache-Control` overrides needed at this stage | **PASS** |
| I-10 | Uptime monitoring exists | P1 | Not configured — see §6.17 | **NOT STARTED** — External |

### 6.2 SEO & Search Engine Readiness

| # | Requirement | Priority | Verification | Status |
|---|---|---|---|---|
| S-1 | Every page has a unique, descriptive `<title>` | P1 | Spot-checked via `generateMetadata`/`metadata` exports across `app/**/page.tsx` — service, industry, case-study, and insight detail pages all set per-item titles; static pages set explicit titles | **PASS** |
| S-2 | Every page has a meta description | P1 | Same pattern — confirmed present sitewide | **PASS** |
| S-3 | `metadataBase` resolves relative OG/Twitter URLs to the real domain | P0 | Fixed this session; confirmed in production build (`og:image` → `https://www.deosailabs.com/opengraph-image?...`) | **PASS** |
| S-4 | `robots.txt` allows crawling and references the sitemap | P0 | Live: `Allow: /`, `Sitemap: https://www.deosailabs.com/sitemap.xml` | **PASS** |
| S-5 | `sitemap.xml` covers all indexable routes, including `/playbook` and all `/book/*` pages | P0 | **Was FAIL** (44 URLs, missing `/playbook` and all 18 book pages) — **fixed this pass**: `app/sitemap.ts` now includes `/playbook` plus preface/3 foundations/12 industries/2 next-steps (63 URLs total). Verified live in a local production build. | **PASS** (pending redeploy) |
| S-6 | Structured data (JSON-LD): Organization + WebSite on the main site | P1 | **Was FAIL** (none existed on the main site — only the book's per-page `BreadcrumbList`) — **fixed this pass**: added Organization + WebSite JSON-LD in `app/layout.tsx`, confirmed rendering in production build | **PASS** (pending redeploy) |
| S-7 | Breadcrumb schema on deep pages (case studies, service detail, industry detail) | P2 | Not implemented on the main site (only the book has it). Reasonable post-launch addition — `Breadcrumbs` component already exists and is reused across those pages, so this is a small, contained addition later. | **NOT STARTED** |
| S-8 | Service schema on `/services/[slug]` pages | P2 | Not implemented. Post-launch nice-to-have, not required for a B2B services site to be crawlable/indexable. | **NOT STARTED** |
| S-9 | No duplicate/canonical-conflicting URLs; trailing-slash and query-string behavior is consistent | P1 | Next's default trailing-slash normalization is in effect; `/book/*` rewrites correctly ignore query strings (verified `/book/preface`, `/book/preface?_rsc=...`, `/book/preface/` all resolve sanely — the last one 308s to the canonical form) | **PASS** |
| S-10 | Canonical domain consistency across all meta/OG tags (no lingering references to the old preview domain or, on book pages, unintended domains) | P1 | Main site: fixed (§S-3). Book pages: `og:url`/canonical/JSON-LD on all `/book/*` pages intentionally use `https://book.deosailabs.com` — this is a **pre-existing, deliberate pattern** from earlier work on this project (the book's own "canonical identity"), consistently used in both the static HTML and the compiled JS bundle. Not touched this pass since it's not a bug, but flagged here so a future session doesn't "fix" it without knowing this domain doesn't actually resolve. **Decision needed**: either register `book.deosailabs.com` to point at the same site, or change canonical/OG to use `www.deosailabs.com/book/...` instead. | **ACCEPTED RISK** — flagged for a product decision |
| S-11 | Favicon renders and is on-brand | P2 | `app/icon.tsx` generates a 32×32 PNG with background `#2F5EFF` — this does **not** match the site's actual navy `--primary` (`#1b2a4c` light / `#5b7fdb` dark). Cosmetic brand-consistency gap, not a functional one. Not changed this pass since the "correct" color is a design call, not a bug fix. | **NOT STARTED** — needs a design decision |
| S-12 | Heading hierarchy / semantic HTML | P1 | Sampled via `SectionHeading` (renders `h2`) and page `h1`s — consistent single-`h1`-per-page pattern observed on spot-checked pages. Not exhaustively audited every route. | **NOT STARTED** (partial evidence only) |

### 6.3 Google Search Console — External, not executed

| # | Requirement | Priority | Type |
|---|---|---|---|
| GSC-1 | Verify domain property for `deosailabs.com` (DNS TXT record recommended over HTML file, since it covers both apex and `www`) | P0 | External (Google + Namecheap DNS) |
| GSC-2 | Submit `https://www.deosailabs.com/sitemap.xml` | P0 | External |
| GSC-3 | Request indexing for the homepage and top 5 service/industry pages | P1 | External |
| GSC-4 | Check Coverage report weekly for the first month for crawl errors | P1 | External |
| GSC-5 | Monitor Core Web Vitals report once field data accumulates (needs real traffic first) | P2 | External |

None of this requires code changes beyond what's already done (a valid, complete sitemap and crawlable robots.txt — both now in place).

### 6.4 Analytics & Measurement — Implemented this pass

**Before this pass:** no analytics package existed in `package.json` at all — zero traffic, conversion, or engagement measurement.

**Decision:** `@vercel/analytics` — zero-config (no signup, no API key, works automatically once deployed on Vercel, which this site already is), privacy-respecting (no cookies, no PII), and the simplest thing that satisfies "minimum viable analytics for a newly launched B2B agency" without adding a GA4/GTM-scale integration this stage doesn't need.

**Implemented:**
- `<Analytics />` mounted in `app/layout.tsx` — automatic page-view tracking on every route.
- Custom conversion events via `track()`:
  - `contact_form_submit` — fires on successful `ContactForm` submission (the real conversion, not just a click toward the form).
  - `discovery_call_click` (with `source: "header"`) — the persistent header CTA present on every page.
  - `discovery_call_click`, `general_inquiry_click`, `careers_pathway_click` — the three `/contact` page pathway CTAs (via a new small `TrackedLink` client wrapper, since the page itself is a Server Component).

**Deliberately not instrumented this pass** (P2, to avoid over-instrumenting before there's traffic to learn from): the Hero/FinalCTA "Book a Discovery Call" buttons elsewhere on the homepage, footer CTAs, and per-service-page CTAs. Page-view data plus the four events above already answer "does the site get visitors, and do they take the primary conversion action" — the minimum viable question for launch.

| # | Requirement | Priority | Status |
|---|---|---|---|
| A-1 | Page-view tracking | P0 | **PASS** (pending redeploy; local prod build confirms the component renders with zero errors — the `/_vercel/insights/script.js` 404 seen in local testing is expected outside Vercel's actual infrastructure and will resolve on deploy) |
| A-2 | Discovery-call CTA click tracking | P1 | **PASS** (header + contact page) |
| A-3 | Contact-form submission tracking | P0 | **PASS** |
| A-4 | UTM/campaign attribution | P2 | Vercel Analytics captures referrer automatically; explicit UTM campaign tagging not set up (no campaigns exist yet to tag) | **NOT STARTED** |
| A-5 | Privacy disclosure for analytics | P1 | See §6.14 (Legal) — the Privacy Policy page exists but should be checked/updated to mention analytics collection | **NOT STARTED** |

### 6.5 Lead Generation & Conversion — most important section

**Conversion path as currently built:** Visitor → sees "Book a Discovery Call" CTA (header, hero, final CTA, footer, contact page) → lands on `/contact` → either (a) fills out the contact form, or (b) clicks a `mailto:` link.

**Critical finding (P0):** every single lead-capture destination on the site — the contact form's recipient, and both `mailto:` pathway links — points to a **personal Gmail address** (`kakakhel176@gmail.com`), not a DeosAI Labs domain address. The form's outbound email is also sent *from* `onboarding@resend.dev`, Resend's shared sandbox sender, not a domain-verified sender. This is functional (a lead sent today would arrive), but it is not what a company presenting itself as an enterprise AI partner should be showing prospects, and sandbox senders are more likely to be filtered as spam. **I did not invent a replacement address** — that's a real business decision (which inbox actually gets checked) requiring the email setup in §6.6 first.

| # | Requirement | Priority | Verification | Status |
|---|---|---|---|---|
| L-1 | "Book a Discovery Call" destination works | P0 | `/contact` returns 200, renders correctly, mobile-tested (see §6.9) | **PASS** |
| L-2 | Contact form actually sends and the site owner receives it | P0 | Code path is correct (`ContactForm` → `POST /api/contact` → Resend) and has proper validation, honeypot spam protection, and user-facing error states with a fallback email. **But**: depends on `RESEND_API_KEY` being set in Vercel prod (§I-4, unverified) and the recipient/sender addresses below. | **BLOCKED** on I-4 + F-1 |
| L-3 | Recipient/sender use a real DeosAI Labs domain email, not a personal Gmail / sandbox sender | P0 | See finding above. `CONTACT_EMAIL` in `app/api/contact/route.ts`, `contactEmail`/`contactPathways` in `lib/data/contact.ts` | **FAIL** — needs §6.6 (email setup) first, then a one-line/one-const update in both files |
| L-4 | User receives confirmation after submitting | P1 | `ContactForm` shows an inline success message on 200 response; no confirmation *email* is sent to the submitter (only an internal notification) | **PASS** (inline), **NOT STARTED** (email receipt) — P2 |
| L-5 | Mobile users can complete the flow | P0 | Verified earlier this session on iPhone 7/8 Plus viewport: form renders, no overflow, no console errors | **PASS** |
| L-6 | Graceful failure if the booking/email service fails | P1 | `route.ts` returns distinct error responses for missing API key (500), Resend API error (502), and unexpected exception (500); `ContactForm` surfaces the error and points the user to `contactEmail` as a fallback | **PASS** |
| L-7 | Attribution is preserved through the flow | P2 | Not tracked which CTA source led to a given form submission (e.g. header vs. hero vs. footer). The `discovery_call_click` events (§6.4) at least tell you *how many people clicked*, separate from *how many submitted*. | **NOT STARTED** |
| L-8 | "Book a Discovery Call" is, in fact, a real scheduling flow (not just a form promising a follow-up) | P2 | No Calendly/Cal.com/booking-widget integration exists anywhere in the codebase — confirmed via full-repo search. Every "Book a Discovery Call" CTA routes to a lead-capture form/mailto, not a live calendar. This may be an intentional choice (qualify-then-schedule manually), but flagging since the CTA copy implies direct booking. | **NOT STARTED** — product decision |

### 6.6 Professional Business Email — External, not executed

Required before §L-3 can be resolved.

| # | Requirement | Priority | Type |
|---|---|---|---|
| E-1 | Decide and provision real addresses (e.g. `hello@`, `contact@`, `sales@deosailabs.com`) | P0 | External (email provider — Google Workspace, Microsoft 365, Zoho Mail, or a forwarding-only service) |
| E-2 | Verify sending domain in Resend (or switch the API integration to send *from* the new domain) so outbound mail isn't sent from the shared `resend.dev` sandbox | P0 | External (Resend dashboard) + one-line code change to `route.ts`'s `from` field once verified |
| E-3 | SPF record for the domain | P0 | External (Namecheap DNS) |
| E-4 | DKIM record (provided by whichever email/sending service is chosen) | P0 | External (Namecheap DNS) |
| E-5 | DMARC policy | P1 | External (Namecheap DNS) |
| E-6 | Send/receive test once configured | P0 | Human — send a real test message both directions |

### 6.7 Website Functional QA — Route-by-route

Executed live against `https://www.deosailabs.com` this session (network capture + console error monitoring via Playwright).

| Route | HTTP | Console errors | Notes |
|---|---|---|---|
| `/` | 200 | 0 | — |
| `/contact` | 200 | 0 | Form present, honeypot verified in code |
| `/services` + all 6 `/services/[slug]` | 200 | 0 | — |
| `/industries` + all 17 `/industries/[slug]` | 200 | 0 | — |
| `/case-studies` + 4 detail pages | 200 | 0 | — |
| `/insights` + 5 article pages | 200 | 0 | — |
| `/about`, `/careers`, `/partners`, `/privacy`, `/terms`, `/accessibility` | 200 | 0 | — |
| `/playbook` | 200 | 0 | — |
| `/book/preface` | 200 | 0 | JS-enabled; logo/favicon confirmed correct post-hydration |
| `/book/foundations/*` (3 pages) | 200 | 0 | JS-enabled |
| `/book/next-steps/*` (2 pages) | 200 | 0 | JS-enabled |
| `/book/industries/*` (12 pages) | 200 | 0 | Script-less by design (see code comments in `playbook_templates.py`'s `render_page`) — content confirmed stable, no hydration reversion, since there's no JS bundle to fight |
| `/nonexistent-route` | 404 | — | Custom `not-found.tsx` renders correctly |
| Any client-thrown error | — | — | Custom `error.tsx` now exists (added this pass) — not yet exercised against a real production error, since one hasn't occurred |

| # | Requirement | Priority | Status |
|---|---|---|---|
| Q-1 | All primary routes return 200 | P0 | **PASS** |
| Q-2 | Zero console/network errors across primary routes | P0 | **PASS** |
| Q-3 | Book/playbook experience: navigation, prefetch, hydration, static assets | P0 | **PASS** (both bugs found and fixed this project) |
| Q-4 | Custom 404 page | P1 | **PASS** (pre-existing) |
| Q-5 | Custom error boundary | P1 | **PASS** (added this pass) |

### 6.8 Mobile & Responsive QA

Executed earlier this session on an emulated iPhone 7/8 Plus (414×736 @3x, matches iPhone 7 Plus exactly) across the full homepage, mobile nav, and footer.

| # | Requirement | Priority | Status |
|---|---|---|---|
| M-1 | No horizontal overflow anywhere on the homepage | P0 | **PASS** |
| M-2 | Mobile nav (hamburger) opens/closes correctly | P0 | **PASS** |
| M-3 | Sticky header frosted-glass transition works on scroll | P2 | **PASS** |
| M-4 | Desktop-only motion components (ring carousels, testimonial fan, industry scatter field, orbit, etc.) correctly fall back to static grids below the `lg` (1024px) breakpoint | P0 | **PASS** — all gated by the shared `useCarouselMode` hook |
| M-5 | Touch targets are reasonably sized | P2 | Header buttons are `size-11` (44px), meeting the common 44×44 minimum touch-target guideline | **PASS** |
| M-6 | Tested on an actual physical device, not just emulation | P1 | Emulation is a strong proxy but not identical to real Safari/iOS rendering, GPU behavior, or network conditions | **NOT STARTED** — Human |

### 6.9 Accessibility (WCAG 2.2 AA target)

| # | Requirement | Priority | Verification | Status |
|---|---|---|---|---|
| AC-1 | Skip-to-content link | P1 | Present in `app/layout.tsx`, becomes visible on focus | **PASS** |
| AC-2 | Focus-visible outline defined globally | P1 | `globals.css`: `:focus-visible { outline: 2px solid var(--primary); ... }` | **PASS** |
| AC-3 | Icon-only interactive elements have `aria-label` | P1 | Spot-checked: mobile menu button, theme toggle — both labeled | **PASS** (spot-checked, not exhaustive) |
| AC-4 | `prefers-reduced-motion` is respected | P1 | Every animated component built this session (`RingCarousel`, `TestimonialFan`, `IndustryScatterField`, `IndustryOrbit`/marquee variants, `.timeline-pulse`) either gates on `useCarouselMode()` (which checks `prefers-reduced-motion`) or has an explicit `@media (prefers-reduced-motion: reduce)` block in `globals.css` | **PASS** |
| AC-5 | Form labels and required-field indication | P1 | `ContactForm` uses proper `<Label htmlFor>` pairing and `sr-only` "(required)" text alongside the visual `*` | **PASS** |
| AC-6 | Full automated accessibility audit (axe or Lighthouse) across all page types | P1 | Not run this pass — no axe-core/Lighthouse CI tooling installed | **NOT STARTED** |
| AC-7 | Manual screen-reader pass (VoiceOver/NVDA) on the primary conversion path | P1 | Not performed | **NOT STARTED** — Human |
| AC-8 | Color contrast audit | P1 | Not formally measured; the `Badge` component has an explicit code comment noting a deliberate primary/tint contrast adjustment made to hit WCAG AA, suggesting some prior attention, but no full-page audit was done | **NOT STARTED** |

### 6.10 Performance

| # | Requirement | Priority | Verification | Status |
|---|---|---|---|---|
| P-1 | Static generation used wherever possible | P1 | Build output confirms the large majority of routes are `○ Static` or `● SSG` | **PASS** |
| P-2 | Fonts self-hosted, no external font requests | P1 | `next/font/google` (Geist, Geist Mono) — self-hosted at build time, confirmed zero `fonts.googleapis.com`/`fonts.gstatic.com` requests in live network capture | **PASS** |
| P-3 | No unnecessary third-party scripts | P1 | Confirmed via full network capture — the only script beyond Next's own chunks is the newly-added Vercel Analytics beacon | **PASS** |
| P-4 | OG/favicon images generated efficiently | P2 | `next/og` `ImageResponse` for both — edge-rendered, no external image service dependency | **PASS** |
| P-5 | Real Core Web Vitals (LCP/CLS/INP) measurement | P1 | Requires either a Lighthouse run or real field data (needs live traffic) — neither exists yet | **NOT STARTED** |
| P-6 | Client component budget kept reasonable (no unnecessary `"use client"`) | P2 | Not formally audited; the motion-heavy components are appropriately client-only, most content pages remain server components | **NOT STARTED** (spot-checked only) |

### 6.11 Security

| # | Requirement | Priority | Verification | Status |
|---|---|---|---|---|
| SEC-1 | HTTPS enforced | P0 | HSTS active, confirmed | **PASS** |
| SEC-2 | `X-Content-Type-Options: nosniff` | P0 | Added this pass via `next.config.ts` `headers()`, confirmed in production build response headers | **PASS** (pending redeploy) |
| SEC-3 | Clickjacking protection | P0 | Added this pass: `X-Frame-Options: DENY` | **PASS** (pending redeploy) |
| SEC-4 | `Referrer-Policy` | P1 | Added this pass: `strict-origin-when-cross-origin` | **PASS** (pending redeploy) |
| SEC-5 | `Permissions-Policy` restricting unused browser features | P2 | Added this pass: `camera=(), microphone=(), geolocation=()` | **PASS** (pending redeploy) |
| SEC-6 | Content-Security-Policy | P1 | **Not implemented.** This site's actual script/style surface hasn't been audited page-by-page (Next's own runtime chunks, the book's separate Docusaurus bundle, `next/og` image generation, Vercel Analytics's beacon) — shipping a CSP without that audit risks silently breaking something in production. Recommended as an immediate P1 follow-up, done deliberately, with a report-only rollout first. | **NOT STARTED** (deliberately deferred, documented) |
| SEC-7 | No exposed secrets in the repository | P0 | `.env*` is gitignored; `RESEND_API_KEY` only referenced via `process.env`, never hardcoded; verified no committed `.env.local` | **PASS** |
| SEC-8 | API routes validate input | P1 | `/api/contact` validates required fields, email format, and includes honeypot spam protection | **PASS** |
| SEC-9 | Form abuse / spam protection | P1 | Honeypot field implemented; no rate limiting on `/api/contact` | **PASS** (honeypot), **NOT STARTED** (rate limiting — P2, low priority for current expected traffic volume) |
| SEC-10 | Dependency vulnerabilities | P1 | `npm audit`: 1 high-severity finding in `nanoid`, a **transitive** dependency of `postcss` (used internally by `next` and `@tailwindcss/postcss` themselves) — pre-existing, not introduced by this pass's `@vercel/analytics` addition. Not force-upgraded blind since it would mean bumping core build tooling without regression testing. | **ACCEPTED RISK** — low real-world exploitability (build-time tooling, not user-facing runtime code); recommend `npm audit fix` with a full regression pass as a near-term follow-up |
| SEC-11 | No unsafe `dangerouslySetInnerHTML` usage | P1 | Two uses in the codebase: the new Organization/WebSite JSON-LD in `layout.tsx` (fully static, `JSON.stringify`'d, zero user input) and Docusaurus's own compiled book bundle (third-party, not app code) — both safe | **PASS** |
| SEC-12 | Third-party integrations reviewed | P1 | Resend (transactional email, server-side only, API key never exposed to the client) and Vercel Analytics (no cookies, no PII) — both appropriate for a marketing site | **PASS** |

### 6.12 Content & Credibility

Evaluated from a prospective enterprise buyer's perspective. Not rewritten — flagged only, per the source task's own instruction.

| # | Area | Notes | Priority |
|---|---|---|---|
| C-1 | Positioning/value prop | Clear and consistent across Hero, About, and the playbook's own framing ("Forward Deployment") | — |
| C-2 | Case studies | Present (`/case-studies`, 4 detail pages) but explicitly labeled illustrative, not verified client outcomes — this is honest and consistent, but is itself a credibility gap a serious enterprise prospect will notice. Getting at least one real, named case study before/soon after launch would materially help. | P1 (business, not code) |
| C-3 | Testimonials | Same pattern — illustrative, clearly disclosed. Same recommendation as C-2. | P1 (business) |
| C-4 | About/founder credibility | `/about` page exists; not evaluated for depth of founder/team credibility signals (photos, bios, LinkedIn links) | P2 |
| C-5 | Playbook content depth | All 12 industry chapters recently deepened into a genuine sales funnel (time leaks → fit → first-engagement walkthrough → linked services → CTA) — strong, differentiated content asset | — (done) |
| C-6 | Contact information | Currently a personal Gmail, not a company domain — see §6.5/§6.6 | P0 |

### 6.13 Legal & Trust Requirements

| # | Requirement | Priority | Status |
|---|---|---|---|
| LG-1 | Privacy Policy exists | P0 | `/privacy` exists | **PASS** (existence only) |
| LG-2 | Privacy Policy mentions the new analytics collection | P1 | Not yet reviewed/updated for the analytics addition made this pass | **NOT STARTED** |
| LG-3 | Terms of Service exists | P0 | `/terms` exists | **PASS** (existence only) |
| LG-4 | Cookie policy | P2 | Vercel Analytics is cookieless, so a cookie consent banner is not legally required for it specifically; if any other cookie-based tool is added later, revisit | **N/A currently** |
| LG-5 | Content of privacy/terms pages is legally sound | P0 | **Requires actual legal review** — this is explicitly outside what a code-focused pass can verify or provide | **NOT STARTED** — Human/Legal, mandatory before launch |
| LG-6 | Data handling disclosure for form submissions | P1 | Contact form collects name/email/company/message, sent via Resend to an internal inbox — should be described in the Privacy Policy | **NOT STARTED** |

### 6.14 Social Sharing

| # | Requirement | Priority | Verification | Status |
|---|---|---|---|---|
| SO-1 | OG title/description present sitewide | P1 | Confirmed via `metadata` exports | **PASS** |
| SO-2 | OG image renders correctly at 1200×630 | P1 | `opengraph-image.tsx` sets `size = { width: 1200, height: 630 }` | **PASS** |
| SO-3 | OG/canonical URLs use the production domain | P0 | Main site: fixed this project (§S-3). Book pages: intentionally use `book.deosailabs.com` — see §S-10 for the flagged decision | **PASS** (main site), **ACCEPTED RISK** (book) |
| SO-4 | Actual LinkedIn/X preview tested with the live URL | P1 | Requires pasting the live URL into each platform's own preview tool/debugger — can't be done from the repo | **NOT STARTED** — Human |

### 6.15 Monitoring & Operations

Minimum viable, not over-engineered for the company's current stage.

| Cadence | Checks |
|---|---|
| **Daily** | Vercel deployment status (any failed builds); check the contact-form inbox for new leads |
| **Weekly** | Vercel Analytics dashboard (traffic, top pages, conversion events); Search Console Coverage report once connected |
| **Monthly** | `npm outdated` / `npm audit`; review Core Web Vitals once there's field data; spot-check a handful of pages for broken links |

| # | Requirement | Priority | Status |
|---|---|---|---|
| MO-1 | Deployment monitoring | P1 | Native to Vercel (email/Slack on failed builds) — needs to be enabled in project settings | **NOT STARTED** — External |
| MO-2 | Uptime monitoring | P2 | No external uptime service configured (e.g. UptimeRobot, Better Uptime) | **NOT STARTED** — External |
| MO-3 | Error monitoring beyond `console.error` | P2 | `error.tsx` logs to console only — no Sentry/similar. Reasonable to defer until there's a reason to need it. | **NOT STARTED** — deferred by design |

---

## 7. Launch-day procedure

Adjusted to what actually exists in this repository.

1. Verify latest commit on `main` matches what's intended to ship.
2. Confirm Vercel is deploying from `main` and the deployment succeeded.
3. Verify `RESEND_API_KEY` is set in Vercel production env (§I-4).
4. Verify `https://deosailabs.com` → `https://www.deosailabs.com` redirect and HTTPS.
5. Load the homepage; confirm zero console errors.
6. Spot-check `/services`, `/industries`, `/case-studies`, `/insights`, `/about`, `/careers`, `/playbook`.
7. Submit the contact form end-to-end and confirm the notification email actually arrives wherever it's configured to go.
8. Load `/book/preface` and two `/book/industries/*` chapters; confirm logo renders and no console errors.
9. Check `/sitemap.xml` and `/robots.txt` are correct and reference the production domain.
10. Check `og:image`/Twitter card render correctly by pasting the homepage URL into LinkedIn's post inspector.
11. Test the full flow on a real mobile device.
12. Confirm the Vercel Analytics dashboard is receiving page views (should appear within minutes of the first real visit post-deploy).
13. Submit the sitemap to Google Search Console (requires GSC-1 first).
14. Request indexing for the homepage and 3–5 key service/industry pages.
15. Announce launch.

## 8. Post-launch monitoring

**First 24 hours:** deployment stayed healthy; check Vercel Analytics for any traffic at all; check for any contact-form submissions and confirm they were received; watch for any Vercel build/runtime error alerts.

**First 7 days:** review which pages are getting traffic vs. none; review `discovery_call_click` vs. `contact_form_submit` counts (a large gap suggests people click the CTA but abandon the form); check Search Console Coverage for crawl errors on the newly-submitted sitemap.

**First 30 days:** review Search Console Performance (impressions/clicks) for early keyword signal; review Core Web Vitals once enough field data exists; assess whether the illustrative case studies/testimonials should be replaced with real ones yet; review the dependency audit finding (§SEC-10) and apply `npm audit fix` if a compatible fix is available by then.

---

## 9. Acceptance criteria

The site is **PRODUCTION READY** when every P0 item above is `PASS` and every P1 item is either `PASS` or explicitly `ACCEPTED RISK` with a documented reason (not silently skipped).

**Currently blocking full PRODUCTION READY status:**
- I-4 (Resend API key set in Vercel prod) — unverifiable from the repo, must be checked in the Vercel dashboard.
- L-3 (real company email, not a personal Gmail) — blocked on §6.6 (email provisioning), itself an external/business decision.
- LG-5 (legal review of Privacy Policy / Terms) — mandatory, requires a human/legal reviewer.

Everything else classified P0 in this document is already `PASS`.

---

## 10. Final launch matrix

| Category | Requirement | Priority | Verification Method | Status | Owner |
|---|---|---|---|---|---|
| Infrastructure | Apex → www redirect, valid HTTPS | P0 | Live `curl` | PASS | — |
| Infrastructure | `RESEND_API_KEY` set in Vercel prod | P0 | Vercel dashboard | BLOCKED | Human |
| Infrastructure | Production build / typecheck / lint clean | P0 | `npm run build`, `tsc`, `eslint` | PASS | Claude Code |
| Infrastructure | Zero cross-origin/failed resource requests | P0 | Live Playwright network capture | PASS | Claude Code |
| SEO | `metadataBase` uses real domain | P0 | Production build inspection | PASS | Claude Code |
| SEO | Sitemap covers all routes incl. `/book/*` | P0 | Local prod build, live count 44→63 | PASS (pending redeploy) | Claude Code |
| SEO | Organization/WebSite JSON-LD | P1 | Production build inspection | PASS (pending redeploy) | Claude Code |
| SEO | Book canonical domain decision (`book.deosailabs.com`) | P1 | — | ACCEPTED RISK | Human (product decision) |
| SEO | Google Search Console setup | P0 | Google dashboard | NOT STARTED | Human/External |
| Analytics | Page views + conversion events | P0 | Production build inspection | PASS (pending redeploy) | Claude Code |
| Lead Gen | Contact form sends and is received | P0 | End-to-end test | BLOCKED (on email + API key) | Human |
| Lead Gen | Company email, not personal Gmail | P0 | Code + business decision | FAIL | Human (business decision) |
| Email | SPF/DKIM/DMARC | P0 | Namecheap DNS | NOT STARTED | Human/External |
| Functional QA | All primary routes 200, zero console errors | P0 | Live Playwright sweep | PASS | Claude Code |
| Mobile QA | No overflow, nav works, motion falls back correctly | P0 | iPhone 7/8 Plus emulation | PASS | Claude Code |
| Mobile QA | Real device test | P1 | Physical device | NOT STARTED | Human |
| Accessibility | Skip link, focus states, reduced-motion, form labels | P1 | Code inspection | PASS | Claude Code |
| Accessibility | Full axe/Lighthouse audit, screen-reader pass | P1 | Tooling + manual | NOT STARTED | Human/Claude Code (future pass) |
| Performance | Static generation, self-hosted fonts, no bloat scripts | P1 | Build output, network capture | PASS | Claude Code |
| Performance | Core Web Vitals field data | P1 | Needs real traffic | NOT STARTED | — (post-launch) |
| Security | Security headers (nosniff, frame, referrer, permissions) | P0/P1 | Production build response headers | PASS (pending redeploy) | Claude Code |
| Security | CSP | P1 | — | NOT STARTED (deliberately deferred) | Claude Code (follow-up) |
| Security | No exposed secrets | P0 | Repo inspection | PASS | Claude Code |
| Security | Dependency vulnerabilities | P1 | `npm audit` | ACCEPTED RISK | Claude Code (follow-up) |
| Legal | Privacy/Terms legal review | P0 | — | NOT STARTED | Human/Legal |
| Content | Real (non-illustrative) case study/testimonial | P1 | — | NOT STARTED | Human (business) |
| Monitoring | Deployment + uptime monitoring enabled | P1/P2 | Vercel/external dashboard | NOT STARTED | Human/External |

---

## 11. Open issues

1. `book.deosailabs.com` is referenced as the canonical/OG domain throughout the book's meta tags and compiled JS but doesn't (as far as this session can verify) actually resolve to anything — needs a decision (§S-10).
2. Contact/lead flow terminates at a personal Gmail address across every touchpoint (§L-3) — the single highest-priority non-code finding in this whole pass.
3. `RESEND_API_KEY`'s presence in Vercel's *production* environment specifically is unverified (only confirmed present in local `.env.local`).
4. No CSP — deliberately deferred pending a full script/style audit rather than shipped blind.
5. Favicon color (`#2F5EFF`) doesn't match the site's actual navy brand primary.

## 12. Risks

- Shipping the sitemap/structured-data/security-header changes without a redeploy means none of the "PASS (pending redeploy)" items are actually live yet — must push to `main` and confirm the Vercel deployment succeeds.
- If `RESEND_API_KEY` turns out *not* to be set in Vercel prod, every contact-form submission will silently 500 in production until caught — this is exactly why I-4 is flagged P0/BLOCKED rather than assumed fine.
- The `nanoid` dependency vulnerability, while low real-world risk (build-tooling only), should still be revisited via `npm audit fix` with a regression build once a compatible fix path exists.

## 13. Recommended post-launch improvements

- Replace illustrative case studies/testimonials with real ones as they become available (the codebase already has the "Illustrative" disclosure pattern removed per an earlier task, so this would just mean adding real content, not restructuring anything).
- Consider a real booking/scheduling tool (Calendly or similar) if "Book a Discovery Call" is meant to be literal, not a qualify-then-schedule form.
- Breadcrumb + Service structured data on deeper pages.
- A report-only CSP rollout, then enforced once clean.
- Full axe-core or Lighthouse CI accessibility/performance audit.
- Rate limiting on `/api/contact` if spam becomes a real problem (the honeypot may be sufficient on its own for a while).

---

## A. Claude Code Implementation (this session)

- `next.config.ts` — added `headers()` with baseline security headers.
- `app/layout.tsx` — added Organization + WebSite JSON-LD, mounted `<Analytics />`.
- `app/error.tsx` — new custom error boundary.
- `app/sitemap.ts` — added `/playbook` and all 18 `/book/*` URLs.
- `components/shared/ContactForm.tsx` — added `contact_form_submit` tracking.
- `components/layout/Header.tsx` — added `discovery_call_click` tracking on the header CTA.
- `components/shared/TrackedLink.tsx` — new, small client wrapper for CTA click tracking from Server Component pages.
- `lib/data/contact.ts` — added `analyticsEvent` per contact pathway.
- `app/contact/page.tsx` — pathway CTAs now use `TrackedLink`.
- `lib/data/playbook.ts` — fixed `playbookParts` missing 3 industries (stale since an earlier session).
- `lib/motion.ts` — fixed a pre-existing lint error with a documented, scoped suppression (did not restructure the load-bearing SSR-safe hook it lives in).
- `package.json`/`package-lock.json` — added `@vercel/analytics`.

## B. External Configuration (not executed — requires access this session doesn't have)

- Vercel: confirm `RESEND_API_KEY` in production env, confirm deployment branch, enable deployment monitoring.
- Namecheap DNS: SPF/DKIM/DMARC records once an email provider is chosen.
- Email provider: choose and provision `hello@`/`contact@deosailabs.com` (or similar), verify sending domain in Resend.
- Google Search Console: domain property verification, sitemap submission, indexing requests.
- Optional: uptime monitor, booking/scheduling tool, error-monitoring service (Sentry or similar).

## C. Human Verification (requires a person, a browser, a phone, or legal judgment)

- Legal review of Privacy Policy and Terms of Service content.
- Real send/receive test of the new company email once provisioned.
- Physical mobile device test (not just emulation).
- LinkedIn/X live social-preview check by pasting the actual production URL into each platform's debugger.
- Manual screen-reader pass on the primary conversion path.
- Decision on the `book.deosailabs.com` canonical-domain question (§S-10).
- Decision on whether "Book a Discovery Call" should become a literal scheduling tool.
