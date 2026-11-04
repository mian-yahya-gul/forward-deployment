Update the DeosAI Labs industry playbook chapters by adding a new section titled **“What gets connected”** to every industry chapter.

## Scope

Apply this change to **all existing industry chapters in the playbook**, not just Healthcare or Airline & Ticketing.

First inspect the existing playbook structure and identify all industry chapters and their corresponding HTML files under:

`public/book/**/index.html`

Follow the existing implementation pattern. Do **not** modify generated/build copies, shared website components, or unrelated files.

## Placement

In every industry chapter, insert the new section:

**`## What gets connected`**

immediately **after “Where forward deployment fits”** and immediately **before “What stays human.”**

Preserve the existing order of all other sections.

The resulting structure for each industry should be:

1. Where time leaks today
2. Where forward deployment fits
3. **What gets connected**
4. What stays human
5. Signals you're ready
6. What a first engagement looks like
7. Where to start with DeosAI Labs

## Content requirements

Do NOT copy the same generic list into every industry.

For each industry, infer the systems, data sources, operational platforms, and enterprise infrastructure that a real FDE deployment would realistically need to connect to.

The section should answer the prospect's immediate question:

> “How would this actually work inside my existing operation?”

Use approximately **8–12 relevant connections per industry**, depending on the industry.

Examples:

### Healthcare

Possible connections include:

* EHR / EMR systems
* Practice management systems
* Claims and revenue-cycle systems
* Payer / insurance systems
* LIS / LIMS
* Pharmacy systems
* Referral management systems
* Document management systems
* Provider credentialing systems
* Scheduling and patient communication platforms
* Quality and regulatory reporting systems
* HR / workforce systems

### Airline & Ticketing

Possible connections include:

* Passenger Service Systems (PSS)
* Reservation systems
* Departure Control Systems (DCS)
* Revenue management systems
* Global Distribution Systems (GDS)
* Customer relationship management (CRM)
* Loyalty platforms
* Baggage tracking systems
* Payment and fraud systems
* Airport operational systems
* Partner/interline settlement systems
* Contact-center platforms

### Chemical Recycling

Possible connections include:

* SCADA / PLC systems
* Industrial historians
* LIMS / laboratory systems
* ERP
* MES
* IoT sensors
* Maintenance / CMMS systems
* Weighing systems
* Quality management systems
* Energy monitoring systems
* Supply-chain / procurement systems
* Environmental and emissions monitoring systems

Generate equivalent, industry-specific connections for every other chapter.

## Writing style

Match the existing playbook's tone and level of specificity.

Each bullet should contain:

**System / data source** — what relevant operational information it provides.

For example:

* **EHR / EMR systems** — clinical notes, patient records, orders, diagnoses, encounters, and care documentation.

Avoid generic technical jargon such as:

* APIs
* databases
* cloud
* Python
* machine learning models

unless the connection itself is genuinely relevant to the industry's operational architecture.

The section should focus on **systems that exist in the customer's real workflow**, not DeosAI's internal technology stack.

## Add a short closing paragraph

After the bullets, add a short paragraph tailored to the industry explaining the FDE principle:

DeosAI connects intelligence into the systems where work already happens rather than creating another standalone tool for employees to check.

Do NOT copy the Healthcare wording verbatim across every chapter. Rewrite the paragraph appropriately for each industry's context.

The message should communicate:

> DeosAI integrates with the client's existing operational environment and deploys intelligence into the workflow rather than asking the organization to replace its core systems.

## Important constraints

* Do not rewrite the existing industry content.
* Do not change the existing “Where forward deployment fits” sections.
* Do not change the existing “What stays human” sections.
* Do not change the existing “Signals you're ready” sections.
* Do not change the existing “What a first engagement looks like” sections.
* Do not change the existing “Where to start with DeosAI Labs” sections.
* Do not change service URLs.
* Do not modify `components/shared/PlaybookCover.tsx`.
* Do not modify `lib/data/playbook.ts`.
* Do not modify generated/build directories.
* Do not create a new content-management system or refactor the existing playbook architecture.
* Preserve the existing HTML structure, CSS classes, typography, spacing, navigation, and styling.
* Preserve existing anchors, IDs, navigation links, and table-of-contents behavior unless a new anchor is required for the inserted section.
* Maintain the existing visual style of the playbook.

## Before editing

1. Inspect the playbook directory structure.
2. Identify every industry chapter.
3. Inspect several representative chapters to confirm that the section structure is consistent.
4. Determine the correct HTML pattern used for existing `##` sections.
5. Determine whether the playbook has per-chapter navigation/TOC entries that also need the new section added.

## After editing

Verify that:

* Every industry chapter has exactly one “What gets connected” section.
* It appears between “Where forward deployment fits” and “What stays human.”
* The content is specific to that industry.
* No existing sections were accidentally modified.
* Internal navigation/TOC links remain functional.
* HTML remains valid.
* The site still renders correctly.
* No generated/build files were edited.

Finally, provide a concise summary containing:

1. Number of industry chapters updated.
2. List of updated chapter paths.
3. Any chapters that did not follow the standard structure and therefore required special handling.
4. Any issues or ambiguities discovered.
