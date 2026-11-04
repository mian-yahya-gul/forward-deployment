## Task: Diagnose and Fix "Broken HTTPS" on Production Website

You are working on the DeosAI Labs website, a Next.js application deployed to Vercel at:

* `https://www.deosailabs.com`
* Apex domain: `https://deosailabs.com`

The Vercel domain configuration and SSL certificate are already valid.

### Confirmed facts

Vercel shows:

* `deosailabs.com` → Valid Configuration → redirects with 308 to `www.deosailabs.com`
* `www.deosailabs.com` → Valid Configuration → Production
* SSL certificate is valid and trusted
* Certificate is issued by Let's Encrypt for `www.deosailabs.com`
* TLS connection is secure

Chrome DevTools → Security reports:

> This page is not secure (broken HTTPS).

Specifically:

> Resources — active content with certificate errors

Chrome also reports:

> You have recently allowed content loaded with certificate errors (such as scripts or iframes) to run on this site.

The browser therefore considers the main HTTPS connection valid, but some resource loaded by the website has a certificate error.

I also checked the Network panel for `http:` requests and found zero results, so do NOT assume this is ordinary HTTP mixed content.

There is also a separate existing 404:

`GET https://www.deosailabs.com/book/preface?... 404 (Not Found)`

This `/book/preface` issue is separate from the broken HTTPS issue. Do not confuse the two problems.

---

## Your objective

Find the exact resource causing the certificate error and fix it in the codebase.

### Step 1 — Inspect the entire project

First inspect the repository structure and identify:

* Next.js version
* App Router vs Pages Router
* layout files
* pages
* components
* `next.config.*`
* environment files
* public assets
* external scripts
* external fonts
* analytics
* iframe usage
* embeds
* book/document viewer implementation
* API endpoints
* image/font/script loading
* any hardcoded external URLs
* any `http://` or suspicious HTTPS URLs
* any custom middleware
* CSP/security headers
* third-party libraries that inject external resources

Do not make changes yet.

### Step 2 — Search specifically for certificate-risk resources

Search the complete codebase for:

* `http://`
* `https://`
* external domains
* `<script`
* `iframe`
* `src=`
* `href=`
* `next/script`
* `dangerouslySetInnerHTML`
* external fonts
* external analytics
* external APIs
* external book/document resources
* PDF/document viewers
* embedded content
* dynamically generated URLs
* environment variables containing URLs

Pay particular attention to resources loaded on the homepage.

The problematic resource may itself use `https://`, but its certificate may be invalid, expired, mismatched, self-signed, or otherwise rejected by Chrome.

### Step 3 — Trace resources loaded by the homepage

Determine exactly which resources are requested when:

`https://www.deosailabs.com`

loads.

Prioritize resources that can qualify as **active content**, especially:

1. JavaScript
2. iframes
3. scripts
4. API calls used during initial rendering
5. document/book viewers
6. external widgets
7. dynamically injected scripts

Do not only search for HTTP URLs. An HTTPS resource with a bad certificate is the likely cause.

### Step 4 — Check the book implementation

The website contains a Forward Deployment Playbook/book experience.

Inspect all code related to:

* `/book`
* `/book/preface`
* book navigation
* book content
* book viewer
* document loading
* external book assets
* dynamic routes
* client-side prefetching

The current production site generates:

`GET /book/preface?... 404`

Determine why this route is being requested and whether it is supposed to exist.

Again, the 404 itself is NOT the certificate problem, but inspect the book implementation because it may load external resources.

### Step 5 — Reproduce and identify the certificate error

Use the available development/build tooling to reproduce the issue where possible.

Run appropriate commands such as:

* production build
* lint/typecheck if configured
* local production server
* inspect generated HTML
* inspect Next.js configuration

If browser tooling is available, use it to identify the exact failing external resource.

Look specifically for errors such as:

* `ERR_CERT_AUTHORITY_INVALID`
* `ERR_CERT_COMMON_NAME_INVALID`
* `ERR_CERT_DATE_INVALID`
* `ERR_CERT_REVOKED`
* `ERR_CERT_INVALID`
* other certificate/TLS errors

Do not simply suppress or bypass certificate validation.

### Step 6 — Fix the root cause

Once the offending resource is identified:

* replace it with a trusted HTTPS source, OR
* use a local/self-hosted version where appropriate, OR
* remove the unnecessary external resource, OR
* correct the URL/domain configuration, OR
* use the appropriate Next.js mechanism for safely loading the resource.

Do NOT:

* disable HTTPS
* disable certificate validation
* add browser security exceptions
* configure Vercel to bypass SSL
* use `http://` as a workaround
* tell the user to ignore the browser warning
* add insecure CSP exceptions
* install an SSL certificate manually on Namecheap

The production site must remain fully HTTPS-secure.

### Step 7 — Fix the `/book/preface` 404 separately

After resolving the certificate problem, inspect and fix the `/book/preface` 404 if the route is intended to exist.

If the intended architecture does not require `/book/preface`, remove or correct the code that is attempting to prefetch/navigate to it.

Do not create a fake route merely to hide the 404.

The implementation should match the intended book architecture.

### Step 8 — Validate

After making changes:

1. Run the production build.
2. Run lint/typecheck if configured.
3. Verify there are no broken imports.
4. Verify there are no invalid external resource URLs.
5. Verify no active resources use invalid certificates.
6. Verify the homepage loads without certificate errors.
7. Verify the `/book` experience still works.
8. Verify `/book/preface` behaves correctly.
9. Verify there are no new console errors.
10. Verify the site remains compatible with Vercel production deployment.

### Important constraint

Do not modify Namecheap DNS or Vercel domain/SSL configuration.

Those are already confirmed valid.

The goal is to fix the **application-level resource causing Chrome to report "broken HTTPS"**.

### Before editing

First give me a concise diagnosis containing:

* the exact resource/domain causing the certificate error
* where in the codebase it is referenced
* why Chrome considers it insecure
* the proposed fix

Then implement the fix.

After implementation, summarize:

* files changed
* exact root cause
* exact fix
* validation performed
* whether the `/book/preface` 404 was also fixed
* any remaining issues
