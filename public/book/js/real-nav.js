// Links marked data-real-nav point outside the book (to the main site) but
// share its origin now that the book lives at /book on the same domain.
// Docusaurus's client router treats any same-origin href as an internal
// route to resolve against the book's own baseUrl, which mis-resolves
// these into the book's own pages instead of leaving the book. Attached on
// `document` in the capture phase, this runs before Docusaurus's own
// (bubble-phase) click handler ever sees the event, so stopping propagation
// here reliably hands the click back to the browser's normal navigation.
document.addEventListener(
  "click",
  function (event) {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target.closest("a[data-real-nav]");
    if (!link) return;
    event.stopPropagation();
  },
  true,
);
