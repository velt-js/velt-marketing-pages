document.addEventListener('click', function(e) {
  var link = e.target.closest('a');
  if (!link) return;
  var href = link.getAttribute('href') || link.href;
  if (!href) return;
  var match = href.match(/^https?:\/\/(?:www\.)?velt\.dev(\/.*)$/);
  if (match) {
    e.preventDefault();
    var dest = match[1].replace(/\.html$/, '').replace(/\/$/, '') || '/';
    window.location.href = dest;
  }
}, true);
