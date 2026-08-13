// Situations where a click needs to bypass Docusaurus's client router and
// fall back to a normal browser navigation:
//
// 1. Links that point outside the book (to the main site) but share its
//    origin now that the book lives at /book on the same domain. Docusaurus
//    treats any same-origin href as one of its own internal routes and
//    mis-resolves it against the book's own baseUrl.
// 2. Links to any Part Two — Industries chapter. All 12 of those pages are
//    served script-less (see render_page in the build tooling): the 3 added
//    after this book was built have no compiled route/chunk at all, and the
//    9 expanded ones DO have a route, but its compiled MDX-to-JSX component
//    still holds the old short content — hydrating either one replaces the
//    correct page with either a client "Not Found" or stale content a
//    moment after it loads. This script only runs on the 6 pages that still
//    load Docusaurus's bundle (Preface, Foundations, Next Steps); the
//    industry pages themselves have no JS to fight in the first place.
//
// Originally these were matched via a data-real-nav attribute added to the
// hand-authored HTML, but React's hydration re-renders the sidebar/pagination
// nav from its own component data — and strips attributes it doesn't
// recognize as a prop in the process. The `href` itself is real data, though,
// and survives every re-render, so matching against a fixed set of
// destination paths is what actually holds up post-hydration. Attached on
// `document` in the capture phase and taking the navigation over completely
// (rather than trusting stopPropagation alone) so Docusaurus's own click
// handler never gets a chance to act on it either.
(function () {
  var REAL_NAV_PATHS = [
    "/",
    "/contact",
    "/book/industries/healthcare",
    "/book/industries/education",
    "/book/industries/retail-ecommerce",
    "/book/industries/manufacturing",
    "/book/industries/logistics-supply-chain",
    "/book/industries/financial-services",
    "/book/industries/government",
    "/book/industries/agriculture",
    "/book/industries/aviation",
    "/book/industries/airline-ticketing",
    "/book/industries/oil-gas",
    "/book/industries/professional-services",
  ];

  document.addEventListener(
    "click",
    function (event) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      var link = event.target.closest("a[href]");
      if (!link) return;
      var href = link.getAttribute("href");
      if (REAL_NAV_PATHS.indexOf(href) === -1) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.assign(href);
    },
    true,
  );
})();
