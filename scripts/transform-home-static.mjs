#!/usr/bin/env node
// Transform public/pages-html/index.jsx (user's hand-translated HTML->JSX) into
// a proper React function component at app/home-static.jsx.
//
// Fixes applied:
//   1. `var MyClass = React.createClass({ render: function() { return (` → `export default function HomeStatic() { return (`
//   2. Closing `  });` → `); }`
//   3. Style keys like `-borderBottomWidth:` → `"--border-bottom-width":` (CSS custom properties, matching what the HTML originally had before the user's conversion stripped the leading `--`)
//   4. Add "use client" + eslint/ts pragmas at the top

import fs from "fs";
import path from "path";

const SRC = path.join(process.cwd(), "public", "pages-html", "index.jsx");
const DST = path.join(process.cwd(), "app", "home-static.jsx");

let text = fs.readFileSync(SRC, "utf8");

// (1) entry point
text = text.replace(
  /^var MyClass = React\.createClass\(\{\s*render:\s*function\(\)\s*\{\s*return\s*\(/,
  'export default function HomeStatic() {\n  return (',
);

// (2) close: the file tail is:
//       );
//     }       <- closes render function
//   });       <- closes createClass call
// After transformation we need a single `}` to close `export default function HomeStatic()`.
text = text.replace(/\}\s*\}\s*\)\s*;\s*$/, "}");

// (3) normalize style-object keys with a leading dash
// Match keys like `-borderBottomWidth:` that appear right after `{` or `, `
// inside a JSX style={{ ... }} object. They are the residue of CSS custom
// properties whose `--` prefix got collapsed during the user's manual convert.
text = text.replace(
  /([{,]\s*)-([a-zA-Z0-9_][a-zA-Z0-9_]*)(\s*:)/g,
  (_, lead, name, tail) => {
    // camelCase -> kebab-case (digits/underscores left alone)
    const kebab = name.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
    return `${lead}"--${kebab}"${tail}`;
  },
);

// (3b) CSS custom-property names are case-sensitive but the user's original
// HTML→JSX conversion destroyed case in property KEYS (via camelCase) while
// preserving case in VALUES (`var(--variable-reference-voq7jxwFW-PddQpUf5l)`).
// Step (3) lowercased the keys, so references no longer match definitions.
// Fix by lowercasing `var(--...)` names in values too, keeping the chain aligned.
text = text.replace(/var\(\s*--([A-Za-z0-9_-]+)/g, (_, name) => `var(--${name.toLowerCase()}`);

// (4) prepend pragmas
text = `// @ts-nocheck\n/* eslint-disable */\n"use client";\n\n${text}`;

fs.writeFileSync(DST, text);
console.log(`wrote ${DST}`);
console.log(`bytes: ${fs.statSync(DST).size}`);
