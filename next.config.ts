import type { NextConfig } from "next";

/**
 * Baseline security headers for a marketing site with no user sessions,
 * no first-party iframes, and no third-party embeds. Deliberately not a
 * full CSP: this site's script/style surface (Next's own chunks, inline
 * styles from Tailwind/CSS-in-JS-free components) hasn't been audited
 * page-by-page for a directive list that wouldn't risk breaking something —
 * see the production launch checklist for that as a tracked follow-up.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  // Dev-only: lets the dev server's JS/HMR assets load when the site is
  // opened from this machine's LAN IP (e.g. testing on a phone on the same
  // WiFi) instead of localhost — Next blocks cross-origin dev asset
  // requests by default. Ignored in production builds. Update the IP here
  // if this machine's local address changes.
  allowedDevOrigins: ["192.168.18.17"],
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
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
