#!/usr/bin/env node
/**
 * Copy fixes for /use-case/sheets and /use-case/task-manager.
 *
 * Each edit is guarded: the patch is only applied when the current value at the
 * path still matches the expected "from" string, so a re-run (or drifted copy)
 * never clobbers unrelated edits.
 *
 * Usage:
 *   DRY_RUN=1 node --env-file=.env.local scripts/fix-use-case-copy.mjs
 *   node --env-file=.env.local scripts/fix-use-case-copy.mjs
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

const EDITS = [
  {
    slug: "sheets",
    path: 'benefits[_key=="b52335fb4b24"].description',
    find: "cells, pages and @teammates",
    replaceWith: "cells, pages, and @teammates",
  },
  {
    slug: "sheets",
    path: 'benefits[_key=="b52335fb4b24"].title',
    from: "Users can leave feedback on each cell, row or page",
    to: "Users can leave feedback on each cell, row, or page",
  },
  {
    slug: "sheets",
    path: 'benefits[_key=="7925a127de51"].description',
    from: "Users can see and edit changes in realtime.",
    to: "Users can see and edit changes in real time.",
  },
  {
    slug: "task-manager",
    path: 'benefits[_key=="b9a541629938"].description',
    from: "Your users can do live stand ups with others and sync on tasks.",
    to: "Your users can do live stand-ups with others and sync on tasks.",
  },
  {
    slug: "task-manager",
    path: 'benefits[_key=="7925a127de51"].description',
    from: "Your users can record screen, audio or video to bring the context into the task.",
    to: "Your users can record their screen, audio or video to bring the context into the task.",
  },
  {
    slug: "task-manager",
    path: 'benefits[_key=="b52335fb4b24"].description',
    from: "User can directly comment on top of files and @teammates.",
    to: "Users can directly comment on top of files and @teammates.",
  },
];

function resolvePath(doc, path) {
  const parts = path.split(".");
  let node = doc;
  for (const part of parts) {
    const match = part.match(/^(.+?)\[_key=="(.+)"\]$/);
    if (match) {
      const [, field, key] = match;
      const arr = node?.[field];
      node = Array.isArray(arr)
        ? arr.find((item) => item?._key === key)
        : undefined;
    } else {
      node = node?.[part];
    }
    if (node === undefined) return undefined;
  }
  return node;
}

async function main() {
  const slugs = [...new Set(EDITS.map((edit) => edit.slug))];
  const docs = await client.fetch(
    `*[_type == "useCasePage" && slug.current in $slugs]{ _id, "slug": slug.current, benefits }`,
    { slugs },
  );
  const bySlug = new Map(docs.map((doc) => [doc.slug, doc]));

  const planned = [];
  for (const edit of EDITS) {
    const doc = bySlug.get(edit.slug);
    if (!doc) {
      console.log(`SKIP  ${edit.slug} ${edit.path} — document not found`);
      continue;
    }
    const current = resolvePath(doc, edit.path);

    let from;
    let to;
    if (edit.find !== undefined) {
      if (typeof current === "string" && current.includes(edit.replaceWith)) {
        console.log(`OK    ${edit.slug} ${edit.path} — already fixed`);
        continue;
      }
      if (typeof current !== "string" || !current.includes(edit.find)) {
        console.log(
          `SKIP  ${edit.slug} ${edit.path} — substring not found.\n        current: ${JSON.stringify(current)}\n        find:    ${JSON.stringify(edit.find)}`,
        );
        continue;
      }
      from = current;
      to = current.replace(edit.find, edit.replaceWith);
    } else {
      if (current === edit.to) {
        console.log(`OK    ${edit.slug} ${edit.path} — already fixed`);
        continue;
      }
      if (current !== edit.from) {
        console.log(
          `SKIP  ${edit.slug} ${edit.path} — current value did not match expected.\n        current: ${JSON.stringify(current)}\n        expected: ${JSON.stringify(edit.from)}`,
        );
        continue;
      }
      from = edit.from;
      to = edit.to;
    }

    console.log(`PATCH ${edit.slug} ${edit.path}\n        from: ${JSON.stringify(from)}\n        to:   ${JSON.stringify(to)}`);
    planned.push({ id: doc._id, path: edit.path, to });
  }

  console.log(`\nPlanned patches: ${planned.length}`);
  if (DRY_RUN) {
    console.log("DRY_RUN=1 — no writes performed.");
    return;
  }

  let applied = 0;
  for (const patch of planned) {
    await client
      .patch(patch.id)
      .set({ [patch.path]: patch.to })
      .commit();
    applied++;
  }
  console.log(`Applied ${applied} patches.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
