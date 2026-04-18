#!/usr/bin/env node
// Generalized transformer for hand-translated Framer HTML→JSX.
// Replaces the legacy `transform-home-static.mjs` for the homepage and
// new Framer-page translations (e.g. integration templates).
//
// Usage:
//   node scripts/transform-framer-jsx.mjs <src> <dest> <componentName>
//
// Fixes applied (same as the homepage-specific version):
//   1. `var MyClass = React.createClass({ render: function() { return (` →
//      `export default function <ComponentName>() { return (`
//   2. Closing `  });` → `); }`
//   3. Style keys like `-borderBottomWidth:` → `"--border-bottom-width":`
//      (CSS custom properties whose `--` prefix got collapsed during the
//      manual HTML→JSX conversion).
//   4. `var(--XxxYyy)` references get lowercased so they match the lowercased
//      keys from step 3.
//   5. Prepends `@ts-nocheck` + `eslint-disable` + `"use client"` pragmas.

import fs from "fs";
import path from "path";

const [, , srcArg, destArg, componentNameArg] = process.argv;
if (!srcArg || !destArg || !componentNameArg) {
  console.error(
    "Usage: node scripts/transform-framer-jsx.mjs <src> <dest> <componentName>",
  );
  process.exit(1);
}

const SRC = path.resolve(process.cwd(), srcArg);
const DST = path.resolve(process.cwd(), destArg);
const COMPONENT = componentNameArg;

if (!/^[A-Z][A-Za-z0-9_]*$/.test(COMPONENT)) {
  console.error(`componentName must be PascalCase identifier, got: ${COMPONENT}`);
  process.exit(1);
}

let text = fs.readFileSync(SRC, "utf8");

// (1) entry point
text = text.replace(
  /^var MyClass = React\.createClass\(\{\s*render:\s*function\(\)\s*\{\s*return\s*\(/,
  `export default function ${COMPONENT}() {\n  return (`,
);

// (2) close: tail is `);\n    }\n  });`
text = text.replace(/\}\s*\}\s*\)\s*;\s*$/, "}");

// (3) normalize style-object keys with a leading dash
text = text.replace(
  /([{,]\s*)-([a-zA-Z0-9_][a-zA-Z0-9_]*)(\s*:)/g,
  (_, lead, name, tail) => {
    const kebab = name.replace(/[A-Z]/g, (c) => "-" + c.toLowerCase());
    return `${lead}"--${kebab}"${tail}`;
  },
);

// (3b) lowercase `var(--...)` references so they match the lowercased keys
text = text.replace(
  /var\(\s*--([A-Za-z0-9_-]+)/g,
  (_, name) => `var(--${name.toLowerCase()}`,
);

// (3c) Drop bare `shadows` / `strokeDasharray` attributes that come out of
// the hand HTML→JSX conversion. In JSX a bare attribute is implicit `={true}`
// and React warns at render time because neither is a boolean-valued DOM
// attribute. The homepage and integration templates use the bare form with no
// value; removing them is safe (the live exported HTML ignores them too).
// Valid `strokeDasharray="8,8"` etc. are untouched (negative lookahead on `=`).
text = text.replace(
  /\s+(?:shadows|strokeDasharray)(?=\s|\/|>)/g,
  "",
);

// (4) prepend pragmas
text = `// @ts-nocheck\n/* eslint-disable */\n"use client";\n\n${text}`;

fs.mkdirSync(path.dirname(DST), { recursive: true });
fs.writeFileSync(DST, text);
console.log(`wrote ${DST}`);
console.log(`bytes: ${fs.statSync(DST).size}`);
