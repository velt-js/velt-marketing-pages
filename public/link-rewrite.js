document.addEventListener('click', function(e) {
  var link = e.target.closest('a');
  if (!link) return;
  var href = link.getAttribute('href') || link.href;
  if (!href) return;

  // Rewrite velt.dev links to local paths
  var match = href.match(/^https?:\/\/(?:www\.)?velt\.dev(\/.*)$/);
  if (match) {
    e.preventDefault();
    e.stopImmediatePropagation();
    var dest = match[1].replace(/\.html$/, '').replace(/\/$/, '') || '/';
    window.location.href = dest;
    return;
  }

  // Force full page navigation for blog links (prevent Framer client-side routing)
  var resolved = new URL(href, window.location.origin).pathname;
  if (resolved.startsWith('/blog') || resolved.startsWith('/studio')) {
    e.preventDefault();
    e.stopImmediatePropagation();
    window.location.href = resolved;
  }
}, true);
