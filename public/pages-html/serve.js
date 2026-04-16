const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const ROOT = __dirname;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "application/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);

  // Strip trailing slash for non-root paths
  if (urlPath !== "/" && urlPath.endsWith("/")) {
    urlPath = urlPath.slice(0, -1);
  }

  // Root
  if (urlPath === "/") {
    urlPath = "/index.html";
  }

  let filePath = path.join(ROOT, urlPath);

  // If path has no extension, try as directory with index.html
  if (!path.extname(filePath)) {
    const dirIndex = path.join(filePath, "index.html");
    if (fs.existsSync(dirIndex)) {
      filePath = dirIndex;
    }
  }

  // Strip .html extension requests — redirect /foo.html to /foo
  if (urlPath.endsWith(".html") && urlPath !== "/index.html") {
    const clean = urlPath.replace(/\.html$/, "");
    res.writeHead(301, { Location: clean });
    res.end();
    return;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const notFound = path.join(ROOT, "404.html");
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(fs.readFileSync(notFound));
    } else {
      res.writeHead(404);
      res.end("Not Found");
    }
    return;
  }

  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  let content = fs.readFileSync(filePath);

  // For HTML files, inject a script that rewrites velt.dev links to local paths
  if (ext === ".html") {
    const injection = `
<script>
// Rewrite velt.dev navigation to local paths
document.addEventListener('click', function(e) {
  var link = e.target.closest('a');
  if (!link) return;
  var href = link.getAttribute('href') || link.href;
  if (!href) return;
  var match = href.match(/^https?:\\/\\/(?:www\\.)?velt\\.dev(\\/.*)$/);
  if (match) {
    e.preventDefault();
    // Clean the path — strip .html and trailing slash
    var dest = match[1].replace(/\\.html$/, '').replace(/\\/$/, '') || '/';
    window.location.href = dest;
  }
}, true);
</script>
`;
    content = content.toString().replace("</head>", injection + "</head>");
  }

  res.writeHead(200, { "Content-Type": contentType });
  res.end(content);
});

server.listen(PORT, () => {
  console.log("Serving at http://localhost:" + PORT);
});
