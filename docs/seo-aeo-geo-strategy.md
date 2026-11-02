# SEO, AEO and GEO strategy: DeosAI Labs

Target markets: UAE, Saudi Arabia, UK, USA, Pakistan. Single English site, USD prices, remote delivery from Islamabad.

## What is implemented in the site (technical)
- **International targeting.** `<html lang="en">`, hreflang `en` + `x-default` on every page, one canonical per URL. Search Console's old country-targeting tool is retired, so signals come from content, hreflang and structured data.
- **Market pages.** `/markets` plus `/markets/{uae,saudi-arabia,uk,usa,pakistan}`. Each has a unique H1, time-zone overlap with Islamabad, working-week note, data-protection orientation (not legal advice), the three packages, related industries and market-specific FAQs. No local clients, offices or certifications are claimed.
- **Structured data.** Organization + ProfessionalService (founder, offer catalog, `areaServed` with real country names, not ISO codes), WebSite, Service + Offer (indicative minimum USD price) for the three packages, FAQPage on home, services, partners and market pages, BreadcrumbList, ItemList, Article, Person, ContactPage.
- **Answer-engine (AEO) content.** Answer-first FAQs on home, services, partners and every market page, generated from `lib/data/offers.ts` so prices and timelines cannot drift.
- **Generative engine (GEO).** `/llms.txt` and `/llms-full.txt` (built from the same data modules), AI search crawlers allowed in `robots.txt`, consistent entity facts everywhere (name, founder, base, markets, prices flagged as indicative).
- **Titles and descriptions.** All pages 25 to 60 character titles, 70 to 165 character descriptions, no duplicates (checked across all non-Playbook pages).
- **Performance.** Hero content no longer waits for hydration (LCP 4.2 s to 1.3 s in a throttled lab test). Google Analytics loads after the page is interactive.

## Off-site actions (cannot be done in code)
1. **Search Console + Bing Webmaster Tools:** submit `https://www.deosailabs.com/sitemap.xml` (now includes `/markets/*`). Use URL Inspection on `/`, `/services`, `/partners` and the five market pages, then Request Indexing.
2. **Google Business Profile:** create a profile for the Islamabad base as a *service-area business* (hide the address if it is not a public premises). Categories: Software company, Business automation service. Keep name, website and phone identical to the site. Do not claim UAE, Saudi, UK or US addresses you do not have.
3. **Consistent entity profiles:** LinkedIn company page (already linked), YouTube (linked), Crunchbase, GitHub organisation. Use the exact positioning line: "AI Engineering, Business Automation & Forward Deployment".
4. **Review and directory presence (earn genuine reviews only):** Clutch, GoodFirms, DesignRush, and agency-facing directories. Never publish unverified testimonials; ask real clients for consent first.
5. **Alternate Perfumes case study:** once you approve identifying details, publishing it is the single strongest proof asset for AI answers and for buyers. Set `status: "published"` in `lib/data/stories.ts`.
6. **Digital PR / citations:** guest posts and interviews on automation, ERP and agency-delivery topics; LinkedIn posts that link to the Insights articles.

## Content roadmap (next 90 days)
Write for intent that buyers actually search. One article per fortnight, each linking to a package and one market page.
- *US/UK SMB:* "How much does workflow automation cost?" (use the indicative ranges), "Zapier vs a custom automation: when to switch", "Replace spreadsheets with a custom internal tool".
- *Agencies (all markets):* "White-label AI development: how it works and how to price it", "How an agency can add AI agents without hiring".
- *Gulf:* "Preparing a business for AI automation in the UAE / Saudi Arabia" (data residency and bilingual workflows, building on the existing MENA article).
- *Pakistan:* "Automating WhatsApp-and-spreadsheet operations for Pakistani businesses".
- *AEO format:* open each article with a 40 to 60 word direct answer, then headed sections, a short FAQ and a data table where numbers exist.

## Language and local-search considerations
- **Arabic:** an Arabic version (`/ar/`, RTL, hreflang `ar`) would meaningfully help Saudi and UAE reach. Do it only with human-quality translation of the market pages, services and FAQs; machine-translated Arabic hurts trust. Not built yet.
- **UK spelling:** the site uses US spelling. Acceptable for all markets; localise only if UK conversion data suggests it matters.
- **Currency:** USD only, by design.

## How to measure
- Search Console: filter Performance by country (AE, SA, GB, US, PK) and watch impressions and clicks for `/markets/*`.
- Track `generate_lead` events (contact_form, partner_form, discovery_call_booking) by country in GA4.
- AI visibility: monthly, ask ChatGPT, Perplexity, Gemini and Claude "who offers white-label AI engineering for agencies" and "AI workflow automation company Islamabad" and record whether DeosAI Labs is cited and how it is described.
- Core Web Vitals: check PageSpeed Insights field data for `/` after two to four weeks of real traffic; lab scores on a throttled emulator overstate main-thread time.
