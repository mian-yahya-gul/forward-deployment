import type { NextConfig } from "next";

/**
 * Security headers for a marketing site with no user sessions, no first-party
 * iframes, and a small, known set of third parties (Google Analytics, Vercel
 * Analytics). The CSP keeps 'unsafe-inline' for scripts/styles because Next's
 * bootstrap, next-themes, GA's snippet and the static Docusaurus book under
 * /book all rely on inline code; everything else (frames, plugins, base tag,
 * form targets, off-list origins) is locked down. Tighten to nonces if the
 * inline surface is ever removed. Production only: dev needs eval for HMR.
 */
const isProd = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://vitals.vercel-insights.com",
  "frame-src https://cal.com https://app.cal.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  ...(isProd ? [{ key: "Content-Security-Policy", value: contentSecurityPolicy }] : []),
];

const nextConfig: NextConfig = {
  // Don't advertise the framework in an X-Powered-By header.
  poweredByHeader: false,
  // Dev-only: lets the dev server's JS/HMR assets load when the site is
  // opened from this machine's LAN IP (e.g. testing on a phone on the same
  // WiFi) instead of localhost — Next blocks cross-origin dev asset
  // requests by default. Ignored in production builds. Update the IP here
  // if this machine's local address changes.
  allowedDevOrigins: ["192.168.18.17"],
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // API responses can carry per-visitor content; never let a shared cache keep them.
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
  /**
   * The Forward Deployment Playbook is a static Docusaurus export sitting in
   * public/book/ (each page is its own <slug>/index.html, extension-less
   * "clean" URLs). Next's static file server doesn't do directory-index
   * resolution, so requests to those clean URLs 404 without an explicit
   * rewrite to the matching index.html.
   *
   * The book's own generated homepage is skipped on purpose: Docusaurus's
   * client router registers it at exactly baseUrl ("/book/", trailing slash
   * required), which fights Next's own default trailing-slash normalization
   * (an infinite-redirect standoff) — and this site's /playbook page already
   * covers that "landing page" role. So bare "/book" and "/book/" redirect
   * straight to the first real chapter instead of trying to render it.
   */
  async redirects() {
    return [
      { source: "/book", destination: "/book/preface", permanent: false },
      { source: "/book/", destination: "/book/preface", permanent: false },
    ];
  },
  async rewrites() {
    return [
      { source: "/book/preface", destination: "/book/preface/index.html" },
      { source: "/book/foundations/:slug", destination: "/book/foundations/:slug/index.html" },
      { source: "/book/industries/:slug", destination: "/book/industries/:slug/index.html" },
      { source: "/book/next-steps/:slug", destination: "/book/next-steps/:slug/index.html" },
    ];
  },
};

export default nextConfig;
