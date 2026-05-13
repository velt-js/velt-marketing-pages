#!/usr/bin/env node
/**
 * Repoint the `link` field on every useCasePage benefits[].useCases[] chip.
 *
 * Background: chips were authored as absolute `https://www.velt.dev/feature/<slug>`
 * URLs, but (a) this app routes feature pages at the root (e.g. /comments), not
 * under /feature/, and (b) most of the referenced slugs (huddle, presence,
 * flock-mode, …) don't have a featurePage document. We rewrite each chip's
 * link by matching its label to either an internal feature page in this app
 * or the canonical docs.velt.dev overview page for that capability.
 *
 * Usage:
 *   DRY_RUN=1 node --env-file=.env.local scripts/fix-use-case-chip-links.mjs
 *   node --env-file=.env.local scripts/fix-use-case-chip-links.mjs
 */

import { createClient } from "@sanity/client";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error(
    "Set SANITY_API_TOKEN env var, or DRY_RUN=1 to preview without writing.",
  );
  process.exit(1);
}

const client = createClient({
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const DOCS = "https://docs.velt.dev";

// Label → URL. Match is case-insensitive after stripping punctuation. When a
// chip label doesn't match anything here, we leave its `link` untouched so
// editors can decide manually. Entries marked `// doubt` are best-effort —
// no canonical page exists, so they fall back to the closest related page.
const LABEL_MAP = [
  // Internal feature pages -----------------------------------------------
  {
    // `tax` is not a typo on our end — the `docs` use-case in CMS has
    // a chip authored as "Tax Comment" (sic, intended "Text Comment").
    // Keep the alternative so a re-run still maps that chip cleanly.
    match: /^(text|box|pin|pop ?over|page|area|tax) ?comments?$/i,
    url: "/comments",
    confidence: "linked",
  },
  { match: /^comments?$/i, url: "/comments", confidence: "linked" },
  {
    match: /^(voice|video|audio) ?notes?$/i,
    url: "/recording",
    confidence: "linked",
  },
  {
    match: /^(screen )?recordings?$/i,
    url: "/recording",
    confidence: "linked",
  },
  {
    match: /^notifications?$/i,
    url: "/notifications",
    confidence: "linked",
  },
  {
    match: /^(co.?editing|editing)$/i,
    url: "/multiplayer-editing",
    confidence: "linked",
  },

  // docs.velt.dev pages --------------------------------------------------
  {
    match: /^cursors?$/i,
    url: `${DOCS}/realtime-collaboration/cursors/overview`,
    confidence: "linked",
  },
  {
    match: /^huddle$/i,
    url: `${DOCS}/realtime-collaboration/huddle/overview`,
    confidence: "linked",
  },
  {
    match: /^presence$/i,
    url: `${DOCS}/realtime-collaboration/presence/overview`,
    confidence: "linked",
  },
  {
    match: /^(follow mode|flock)$/i,
    url: `${DOCS}/realtime-collaboration/flock-mode/overview`,
    confidence: "linked",
  },
  {
    match: /^single editor mode$/i,
    url: `${DOCS}/realtime-collaboration/single-editor-mode/overview`,
    confidence: "linked",
  },
  {
    match: /^live state sync( icon)?$/i,
    url: `${DOCS}/realtime-collaboration/live-state-sync/overview`,
    confidence: "linked",
  },
  {
    match: /^arrows?$/i,
    url: `${DOCS}/async-collaboration/arrows/overview`,
    confidence: "linked",
  },
  {
    match: /^mentions?$/i,
    url: `${DOCS}/async-collaboration/comments/customize-behavior#@mentions`,
    confidence: "linked",
  },
  {
    match: /^ai co.?pilot$/i,
    url: `${DOCS}/ai/rewriter/overview`,
    confidence: "linked",
  },
  {
    match: /^ai transcription$/i,
    url: `${DOCS}/async-collaboration/recorder/customize-behavior#ai`,
    confidence: "linked",
  },

  // No canonical page — point at the docs root --------------------------
  {
    match: /^live walk ?throughs?$/i,
    url: DOCS,
    confidence: "linked",
  },
  {
    match: /^approvals?( workflows?| flow)?$/i,
    url: DOCS,
    confidence: "linked",
  },
  { match: /^task management$/i, url: DOCS, confidence: "linked" },
  {
    match: /^assign (task|tasks|comment)$/i,
    url: `${DOCS}/async-collaboration/comments/customize-behavior#assignuser`,
    confidence: "linked",
  },
  {
    match: /^(status & priority|priority & status|priority)$/i,
    url: `${DOCS}/async-collaboration/comments/customize-behavior#status-&-priority`,
    confidence: "linked",
  },
];

function pickUrl(label) {
  if (!label) return null;
  const normalized = label.trim();
  for (const entry of LABEL_MAP) {
    if (entry.match.test(normalized)) return entry;
  }
  return null;
}

async function main() {
  const docs = await client.fetch(
    `*[_type == "useCasePage" && defined(slug.current)]{
      _id,
      "slug": slug.current,
      benefits[]{
        _key,
        tag,
        title,
        useCases[]{ _key, name, link }
      }
    }`,
  );

  const changes = []; // for the final report

  for (const doc of docs) {
    const benefits = doc.benefits ?? [];
    for (let bi = 0; bi < benefits.length; bi++) {
      const b = benefits[bi];
      const chips = b.useCases ?? [];
      for (let ci = 0; ci < chips.length; ci++) {
        const chip = chips[ci];
        const decision = pickUrl(chip.name);
        if (!decision) {
          if (chip.link) {
            changes.push({
              doc: doc.slug,
              chip: chip.name,
              from: chip.link,
              to: null,
              action: "no-match (will leave as-is)",
              confidence: "—",
            });
          }
          continue;
        }
        if (chip.link === decision.url) continue; // already correct
        changes.push({
          doc: doc.slug,
          chip: chip.name,
          from: chip.link ?? "(null)",
          to: decision.url,
          action: chip.link ? "rewrite" : "fill",
          confidence: decision.confidence,
          patch: {
            id: doc._id,
            path: `benefits[_key=="${b._key}"].useCases[_key=="${chip._key}"].link`,
          },
        });
      }
    }
  }

  // Summary table by unique label
  const byLabel = new Map();
  for (const c of changes) {
    if (!byLabel.has(c.chip)) byLabel.set(c.chip, { ...c, count: 0 });
    byLabel.get(c.chip).count++;
  }
  console.log("\nLabel → URL (deduped):");
  console.log("chip | url | status");
  for (const [label, info] of [...byLabel.entries()].sort((a, b) =>
    a[0].localeCompare(b[0]),
  )) {
    if (info.action === "no-match (will leave as-is)") {
      console.log(`${label} | (no-match — left as-is) | doubt (${info.count}×)`);
    } else {
      console.log(
        `${label} | ${info.to} | ${info.confidence} (${info.count}×, ${info.action})`,
      );
    }
  }

  console.log(`\nTotal chip rewrites/fills planned: ${changes.filter((c) => c.patch).length}`);
  console.log(`Use-case docs touched: ${new Set(changes.map((c) => c.doc)).size}`);

  if (DRY_RUN) {
    console.log("\nDRY_RUN=1 — no writes performed.");
    return;
  }

  console.log("\nApplying patches…");
  let applied = 0;
  for (const c of changes) {
    if (!c.patch) continue;
    await client.patch(c.patch.id).set({ [c.patch.path]: c.to }).commit();
    applied++;
  }
  console.log(`Applied ${applied} patches.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
