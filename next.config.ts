import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
