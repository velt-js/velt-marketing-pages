#!/usr/bin/env node
// Extract the page-specific Framer handover JSON from an exported Framer HTML
// and emit a TypeScript module that exports the string as a constant.
// Usage:
//   node scripts/extract-framer-handover.mjs <src.html> <dest.ts>

import fs from "fs";
import path from "path";

const [, , srcArg, destArg] = process.argv;
if (!srcArg || !destArg) {
  console.error("Usage: node scripts/extract-framer-handover.mjs <src.html> <dest.ts>");
  process.exit(1);
}

const SRC = path.resolve(process.cwd(), srcArg);
const DST = path.resolve(process.cwd(), destArg);

const html = fs.readFileSync(SRC, "utf8");

// Handover script tag: <script type="framer/handover" id="__framer__handoverData">…JSON…</script>
const match = html.match(
  /<script\s+type="framer\/handover"\s+id="__framer__handoverData"[^>]*>([\s\S]*?)<\/script>/,
);
if (!match) {
  console.error(`No __framer__handoverData script found in ${SRC}`);
  process.exit(1);
}
const json = match[1].trim();

// Also grab the runtime script src (it's stable across pages but read from source
// anyway so this script is self-contained).
const runtimeMatch = html.match(/<script\s+type="module"[^>]*src="(\/framer-runtime\/script_main\.[^"]+\.mjs)"/);
const runtimeSrc = runtimeMatch ? runtimeMatch[1] : "/framer-runtime/script_main.L2sIMFJ0.mjs";

const out = `// Auto-extracted from ${path.relative(process.cwd(), SRC)} — do not edit.
// Framer's runtime reads this via document.getElementById("__framer__handoverData").
export const FRAMER_RUNTIME_SRC = ${JSON.stringify(runtimeSrc)};
export const FRAMER_HANDOVER_JSON = ${JSON.stringify(json)};
`;

fs.mkdirSync(path.dirname(DST), { recursive: true });
fs.writeFileSync(DST, out);
console.log(`wrote ${DST}`);
console.log(`handover bytes: ${json.length}`);
