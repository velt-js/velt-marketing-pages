#!/usr/bin/env node
/**
 * Seed the NEW integrations collection in Sanity:
 *   - one `integrationLibrary` document per spoke (28 surfaces/plugins/agents)
 *     from scripts/integration-libraries-content.json
 *   - the `integrationsHubPage` singleton from
 *     scripts/integrations-hub-content.json
 *
 * This is entirely additive. It NEVER touches the legacy `integrationPage`
 * documents (Slack/Discord/etc.) — different _type, different _id prefix.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-integration-libraries.mjs
 *   # preview only: DRY_RUN=1 node scripts/seed-integration-libraries.mjs
 *   # one spoke:    ONLY=tiptap node --env-file=.env.local scripts/seed-integration-libraries.mjs
 *   # hub only:     ONLY=hub node --env-file=.env.local scripts/seed-integration-libraries.mjs
 *
 * Logos are intentionally NOT seeded — the grid renders library names as HTML
 * text chips (the source spec requires names in HTML, never only an image), so
 * a missing logo degrades gracefully. Add a `logo` later in the Studio if you
 * have brand assets.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const DRY_RUN = process.env.DRY_RUN === "1";
const ONLY = process.env.ONLY?.trim() || null;
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error(
    "Set SANITY_API_TOKEN env var, or DRY_RUN=1 to preview without writing.",
  );
  process.exit(1);
}

const PROJECT_ROOT = resolve(import.meta.dirname, "..");
const SPOKES_PATH = resolve(
  PROJECT_ROOT,
  "scripts/integration-libraries-content.json",
);
const HUB_PATH = resolve(
  PROJECT_ROOT,
  "scripts/integrations-hub-content.json",
);

const HUB_ID = "librariesHubPage";

const client = DRY_RUN
  ? null
  : createClient({
      projectId: "fk9mezqa",
      dataset: "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

/**
 * Build the integrationLibrary document for one spoke content entry.
 * @param {object} entry The spoke content object.
 * @returns {object} A Sanity document ready for createOrReplace.
 */
function buildSpokeDoc(entry) {
  const doc = {
    _id: `libraryPageV2-${entry.slug}`,
    _type: "libraryPageV2",
    name: entry.name,
    slug: { _type: "slug", current: entry.slug },
    kind: entry.kind,
    category: entry.category,
    beta: entry.beta ?? false,
    order: entry.order ?? 0,
    heroTitle: entry.heroTitle,
    heroSecondary: entry.heroSecondary,
    heroDemoKey: entry.heroDemoKey || undefined,
  };

  if (entry.kind === "surface") {
    doc.capabilities = entry.capabilities
      ? { _type: "integrationCapabilities", ...entry.capabilities }
      : undefined;
    doc.problemHeader = entry.problemHeader;
    doc.problemBody = entry.problemBody;
    doc.builtForLine = entry.builtForLine;
    doc.featureCards = (entry.featureCards ?? []).map((card, index) => ({
      _type: "integrationFeatureCard",
      _key: `card-${index}`,
      title: card.title,
      body: card.body,
      featureHref: card.featureHref,
    }));
    doc.agentsCardBody = entry.agentsCardBody;
    doc.setupPackages = entry.setupPackages;
    doc.migrateLine = entry.migrateLine;
  } else {
    doc.valueProps = entry.valueProps ?? [];
    doc.setupNote = entry.setupNote;
  }

  doc.faq = (entry.faq ?? []).map((item, index) => ({
    _type: "faqItem",
    _key: `faq-${index}`,
    question: item.question,
    answer: item.answer,
  }));

  if (entry.metaTitle) doc.metaTitle = entry.metaTitle;
  if (entry.metaDescription) doc.metaDescription = entry.metaDescription;

  return doc;
}

/**
 * Add `_type` and `_key` markers to nested object/array fields on the hub doc
 * so Sanity accepts the singleton.
 * @param {object} hub The raw hub content object.
 * @returns {object} The hub Sanity document.
 */
function buildHubDoc(hub) {
  /**
   * Tag an array of objects with stable _key + _type markers.
   * @param {Array} arr The source array.
   * @param {string} type The Sanity object type name.
   * @param {string} prefix The _key prefix.
   * @returns {Array} The tagged array.
   */
  const tag = (arr, type, prefix) =>
    (arr ?? []).map((item, index) => ({
      _type: type,
      _key: `${prefix}-${index}`,
      ...item,
    }));

  const cta = (value) =>
    value ? { _type: "ctaLink", ...value } : undefined;

  return {
    _id: HUB_ID,
    _type: "librariesHubPage",
    hero: hub.hero
      ? {
          _type: "integrationsHubHero",
          kicker: hub.hero.kicker,
          title: hub.hero.title,
          secondary: hub.hero.secondary,
          microcopy: hub.hero.microcopy,
          primaryCta: cta(hub.hero.primaryCta),
          secondaryCta: cta(hub.hero.secondaryCta),
          demoKey: hub.hero.demoKey || undefined,
        }
      : undefined,
    logoStripLabel: hub.logoStripLabel,
    whatItIsHeader: hub.whatItIsHeader,
    whatItIsBody: hub.whatItIsBody,
    whatItIsCards: tag(hub.whatItIsCards, "integrationFeatureCard", "wic"),
    howItWorksHeader: hub.howItWorksHeader,
    howItWorksSteps: tag(
      hub.howItWorksSteps,
      "integrationsHowItWorksStep",
      "step",
    ),
    mcpBanner: hub.mcpBanner,
    buildVsBuy: hub.buildVsBuy,
    gridHeader: hub.gridHeader,
    gridSupportLine: hub.gridSupportLine,
    surfacesSubheader: hub.surfacesSubheader,
    matrixSubheader: hub.matrixSubheader,
    matrixCaption: hub.matrixCaption,
    buildWithIntro: hub.buildWithIntro,
    agentsInsideIntro: hub.agentsInsideIntro,
    stackLabel: hub.stackLabel,
    stackLinks: tag(hub.stackLinks, "integrationsStackLink", "stack"),
    byosHeader: hub.byosHeader,
    byosBody: hub.byosBody,
    verticalsHeader: hub.verticalsHeader,
    verticals: tag(hub.verticals, "integrationsVertical", "vert"),
    relatedHeader: hub.relatedHeader,
    relatedPrimitives: tag(
      hub.relatedPrimitives,
      "integrationFeatureCard",
      "rel",
    ),
    enterpriseLine: hub.enterpriseLine,
    faq: tag(hub.faq, "faqItem", "faq"),
    finalCta: hub.finalCta
      ? {
          _type: "integrationsFinalCta",
          title: hub.finalCta.title,
          secondary: hub.finalCta.secondary,
          microcopy: hub.finalCta.microcopy,
          primaryCta: cta(hub.finalCta.primaryCta),
          secondaryCta: cta(hub.finalCta.secondaryCta),
        }
      : undefined,
    metaTitle: hub.metaTitle,
    metaDescription: hub.metaDescription,
  };
}

async function main() {
  const spokes = JSON.parse(readFileSync(SPOKES_PATH, "utf8"));
  const hub = JSON.parse(readFileSync(HUB_PATH, "utf8"));

  const seedHub = !ONLY || ONLY === "hub";
  const spokeTargets =
    ONLY && ONLY !== "hub"
      ? spokes.filter((entry) => entry.slug === ONLY)
      : ONLY === "hub"
        ? []
        : spokes;

  if (ONLY && ONLY !== "hub" && spokeTargets.length === 0) {
    console.error(`No spoke matching slug "${ONLY}" in the content file.`);
    process.exit(1);
  }

  console.log(
    `${DRY_RUN ? "[DRY RUN] " : ""}Seeding ${spokeTargets.length} spoke(s)` +
      `${seedHub ? " + hub singleton" : ""}...`,
  );

  for (const entry of spokeTargets) {
    const doc = buildSpokeDoc(entry);
    if (DRY_RUN) {
      console.log(`  [dry-run] would createOrReplace ${doc._id} (${doc.kind})`);
      continue;
    }
    await client.createOrReplace(doc);
    console.log(`  ✓ wrote ${doc._id}`);
  }

  if (seedHub) {
    const hubDoc = buildHubDoc(hub);
    if (DRY_RUN) {
      console.log(`  [dry-run] would createOrReplace ${hubDoc._id}`);
    } else {
      await client.createOrReplace(hubDoc);
      console.log(`  ✓ wrote ${hubDoc._id}`);
    }
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
