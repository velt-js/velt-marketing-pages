// Maps Framer CMS field IDs → our Sanity `integrationPage` schema fields.
// Field IDs discovered by dumping `npx unframer mcp getCMSItems --collectionId Z1rTLexh0`
// and comparing values across opentelemetry, slack, sendgrid, microsoft-teams.
//
// Each entry: framerFieldId → { sanityField, type, transform? }
//   - type: "string" | "text" | "link" | "image" | "enum"
//   - transform (optional): function(value) to reshape the raw CMS value
//
// Notes:
//   - `bPo7DuReu` is ignored (contains stale "Connect Discord..." text across all
//     slugs; the live page derives its heading from `name`).
//   - FAQ, security, and Get-Started-Steps sections are NOT per-slug in Framer's
//     CMS — they live in shared components, so we do not surface them in the
//     integration schema.
//   - The code snippet (`RAQ1Ki8_E`) is per-slug and populates the Get-Started
//     code block.

export const FRAMER_FIELD_MAP = {
  RAsd8Zr0l: { sanity: "name", type: "string" },
  dCamU91Hh: { sanity: "heroTitle", type: "string" },
  A1M36_wF7: { sanity: "tagline", type: "string" },
  AUvuAZKG6: { sanity: "description", type: "text" },
  rNkNL1QT6: { sanity: "category", type: "enum" },
  QPdQ7nnME: { sanity: "logo", type: "image" },
  bDGj1zhPG: { sanity: "demoUrl", type: "link" },
  sxTkt7WdT: { sanity: "githubUrl", type: "link" },
  wbGwryVFD: { sanity: "docsUrl", type: "link" },
  RAQ1Ki8_E: { sanity: "codeSnippet", type: "text" },
  QU_JfS62O: { sanity: "connectBody", type: "text" },
  uoNRv8HSL: { sanity: "connectImage", type: "image" },
  Y20U6vsqH: { sanity: "payloadBody", type: "text" },
  NA3gG2xfZ: { sanity: "payloadImage", type: "image" },
  nlVlJRdFe: { sanity: "unifiedBody", type: "text" },
  ZlVUV9pZw: { sanity: "unifiedImage", type: "image" },
};

// Ignored field IDs (seen in CMS but unused in rendered pages or redundant).
export const IGNORED_FIELDS = new Set([
  "bPo7DuReu", // "Connect Discord..." — stale placeholder, live uses {name}
  "X2j9Ni0zk", // "In-built payload transformation" — fixed template title
  "Obfhk6LhL", // "Provide a unified customer experience" — fixed template title
]);
