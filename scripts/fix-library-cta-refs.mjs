#!/usr/bin/env node
/**
 * Fix wrong signup-attribution refs on the v1 `libraryPage` docs for nivo-charts
 * and yjs, whose hero "Start free" CTA was cloned from the Tiptap page and still
 * carries `?ref=library-tiptap`. See docs/link-sweep-findings-2026-06.md.
 *
 * Auto-applied (guarded, idempotent):
 *   libraryPage-nivo-charts  hero.primaryCta.href  ?ref=library-tiptap -> ?ref=library-nivo-charts
 *   libraryPage-yjs          hero.primaryCta.href  ?ref=library-tiptap -> ?ref=library-yjs
 *
 * NOT auto-applied — flagged for a human (no known-correct value, and pointing a
 * demo iframe at docs risks X-Frame-Options breakage):
 *   libraryPage-nivo-charts  bento.primaryCta.href  -> velt-tiptap-crdt-demo.vercel.app (wrong)
 *   libraryPage-nivo-charts  demoStage.demoUrl      -> velt-reactflow-crdt-demo.vercel.app (wrong)
 * Supply the correct hosted nivo demo URL (or remove the demo stage) and patch
 * those paths the same way.
 *
 * Usage:
 *   DRY_RUN=1 node --env-file=.env.local scripts/fix-library-cta-refs.mjs
 *   node --env-file=.env.local scripts/fix-library-cta-refs.mjs
 */

import { createClient } from "@sanity/client";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN, or DRY_RUN=1 to preview without writing.");
  process.exit(1);
}

const client = createClient({
  projectId: "fk9mezqa",
  dataset: "production",
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const REF_EDITS = [
  {
    id: "libraryPage-nivo-charts",
    path: "hero.primaryCta.href",
    from: "https://console.velt.dev/?ref=library-tiptap",
    to: "https://console.velt.dev/?ref=library-nivo-charts",
  },
  {
    id: "libraryPage-yjs",
    path: "hero.primaryCta.href",
    from: "https://console.velt.dev/?ref=library-tiptap",
    to: "https://console.velt.dev/?ref=library-yjs",
  },
];

// Wrong demo URLs that need a human-supplied correct value — reported, not patched.
const MANUAL_FLAGS = [
  {
    id: "libraryPage-nivo-charts",
    path: "bento.primaryCta.href",
    current: "https://velt-tiptap-crdt-demo.vercel.app/",
    note: "'View Examples' points at the Tiptap demo. Needs the correct nivo example URL.",
  },
  {
    id: "libraryPage-nivo-charts",
    path: "demoStage.demoUrl",
    current: "https://velt-reactflow-crdt-demo.vercel.app/",
    note: "Demo stage embeds the React Flow demo app. Needs the correct nivo demo URL.",
  },
];

function resolvePath(doc, path) {
  return path.split(".").reduce((node, key) => node?.[key], doc);
}

async function main() {
  const ids = [...new Set(REF_EDITS.map((edit) => edit.id))];
  const docs = await client.fetch(`*[_id in $ids]{ _id, hero, bento, demoStage }`, {
    ids,
  });
  const byId = new Map(docs.map((doc) => [doc._id, doc]));

  const tx = client.transaction();
  let planned = 0;

  for (const edit of REF_EDITS) {
    const doc = byId.get(edit.id);
    if (!doc) {
      console.log(`SKIP  ${edit.id} ${edit.path} — document not found`);
      continue;
    }
    const current = resolvePath(doc, edit.path);
    if (current === edit.to) {
      console.log(`OK    ${edit.id} ${edit.path} — already fixed`);
      continue;
    }
    if (current !== edit.from) {
      console.log(
        `SKIP  ${edit.id} ${edit.path} — current did not match expected.\n        current:  ${JSON.stringify(current)}\n        expected: ${JSON.stringify(edit.from)}`,
      );
      continue;
    }
    console.log(`PATCH ${edit.id} ${edit.path}\n        ${edit.from}\n     -> ${edit.to}`);
    tx.patch(edit.id, (p) => p.set({ [edit.path]: edit.to }));
    planned++;
  }

  console.log(`\nPlanned patches: ${planned}`);

  console.log("\n--- MANUAL TODO (needs a correct value, not auto-patched) ---");
  for (const flag of MANUAL_FLAGS) {
    const doc = byId.get(flag.id);
    const current = doc ? resolvePath(doc, flag.path) : "(doc not fetched)";
    console.log(`  ${flag.id} ${flag.path}\n     current: ${JSON.stringify(current)}\n     ${flag.note}`);
  }

  if (DRY_RUN) {
    console.log("\nDRY_RUN=1 — no writes performed.");
    return;
  }
  if (planned === 0) {
    console.log("\nNothing to apply.");
    return;
  }
  await tx.commit();
  console.log(`\nApplied ${planned} patches.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
