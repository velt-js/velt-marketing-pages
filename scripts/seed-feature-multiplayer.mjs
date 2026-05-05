#!/usr/bin/env node
/**
 * Seed the featurePage-multiplayer document in Sanity.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-feature-multiplayer.mjs
 *   # or: SANITY_API_TOKEN=<token> node scripts/seed-feature-multiplayer.mjs
 *   # preview-only: DRY_RUN=1 node scripts/seed-feature-multiplayer.mjs
 *
 * Idempotent: re-runs replace the existing featurePage-multiplayer doc and
 * re-upload the same image assets (Sanity dedupes by SHA-256).
 *
 * Reference: Figma node 219:14621 in HqWIZdR6ISJmaG2n4o3gr8 (Velt Marketing
 * 2026 — Multiplayer page). Sections in order:
 *   1. Hero (chrome — heading "Give Your Product Multiplayer Magic")
 *   2. MultiplayerDemoSidebar (slug-conditional in [slug]/page.tsx — 6
 *      library tabs over an iframe stage)
 *   3. TrustedLogos (chrome)
 *   4. StealFeatures marquee (slug-conditional in [slug]/page.tsx — reuses
 *      the homepage components/home/StealFeatures component)
 *   5. Bento "Create a Truly Collaborative Product" + Linda testimonial
 *      (same layout/design as /libraries/tiptap's "Built for Tiptap" bento;
 *      reuses the 8 illustration components from
 *      components/library/illustrations/library.tsx)
 *   6. CustomerUI "How [X] Leverages Velt" carousel (slug-conditional in
 *      [slug]/page.tsx — reuses the homepage components/home/CustomerUI
 *      component, slotted between the bento and the next image card)
 *   7. MultiplayerYourDataSection (slug-conditional in [slug]/page.tsx —
 *      816-wide narrower layout with two hosting cards + compact rounded
 *      Linda testimonial bar)
 *   8. LibrarySupport (slug-conditional in [slug]/page.tsx — reuses the
 *      homepage components/home/LibrarySupport "Works seamlessly with
 *      your libraries" grid)
 *   9. Security (chrome — showSecurity: true; reuses the homepage
 *      components/home/Security "Enterprise-Grade Security" block)
 *  10. Customer Testimonial Carousel "Our Customers Trust Us" (chrome)
 *  11-13. FAQ + GetStartedSteps + Footer (chrome)
 *
 * showCustomerStories and showSecurity are both false — those page-level
 * blocks would duplicate the dedicated Pendo / Enterprise sections in the
 * sections[] array.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const DRY_RUN = process.env.DRY_RUN === "1";
const token = process.env.SANITY_API_TOKEN;
if (!token && !DRY_RUN) {
  console.error("Set SANITY_API_TOKEN env var, or DRY_RUN=1 to preview without writing.");
  process.exit(1);
}

const client = DRY_RUN
  ? null
  : createClient({
      projectId: "fk9mezqa",
      dataset: "production",
      apiVersion: "2024-01-01",
      token,
      useCdn: false,
    });

const PROJECT_ROOT = resolve(import.meta.dirname, "..");

async function uploadImage(relPath) {
  if (DRY_RUN) return { _type: "image", asset: { _ref: `dry-run-${basename(relPath)}` } };
  const filePath = resolve(PROJECT_ROOT, relPath);
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: basename(filePath),
  });
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
  };
}

async function main() {
  console.log("Uploading multiplayer feature assets...");
  const avatarLinda = await uploadImage("public/images/home/linda-steps.png");
  console.log("  → uploaded.");

  // Standard Linda testimonial reused on the cards that show one in figma.
  const lindaTestimonial = {
    name: "Linda Belcher",
    role: "Product Manager @HeyGen",
    quote:
      "Velt hosts all collaboration functionalities needed to boost engagement at HeyGen",
    accentFragment: "boost engagement",
    accentColor: "#b4b1fa",
    avatar: avatarLinda,
  };

  const doc = {
    _id: "featurePage-multiplayer",
    _type: "featurePage",
    title: "Multiplayer",
    slug: { _type: "slug", current: "multiplayer" },
    category: "Realtime",
    tagline: "Add Google Docs / Figma style live editing to your product.",
    metaTitle: "Multiplayer | Velt",
    metaDescription:
      "Add Google Docs or Figma style collaborative live editing to your product. Built on Yjs CRDT with batteries-included support for Tiptap, BlockNote, CodeMirror, Lexical, and React Flow.",
    hero: {
      heading: "Give Your Product Multiplayer Magic",
      subheading:
        "Add Google Docs or Figma style collaborative live editing to your product. Your users will love it.",
      decorated: true,
      primaryCta: {
        _type: "ctaLink",
        label: "Get Free API Key",
        href: "https://console.velt.dev/",
        newTab: true,
      },
      secondaryCta: {
        _type: "ctaLink",
        label: "Book Demo",
        href: "/book-demo",
      },
    },
    showTrustedLogos: true,
    // Hidden — figma already has dedicated Pendo and Enterprise sections in
    // the body, so the page-level CustomerUI/Security chrome blocks would
    // duplicate them.
    // Security toggle is true — the standard chrome <Security /> from
    // components/home/Security.tsx renders just before the customer
    // testimonial carousel, mirroring the homepage layout and matching
    // the figma's "Enterprise level security" placement.
    showSecurity: true,
    showCustomerStories: false,
    sections: [
      // Note: "Steal Features from Popular Products" is rendered in
      // app/features/[slug]/page.tsx as a slug-conditional <StealFeatures />
      // (the homepage marquee component). It's intentionally NOT in this
      // sections array.
      // Bento section — same layout/design as the "Built for Tiptap"
      // section on /libraries/tiptap (LibraryBento, 2-col × 4-row grid
      // with rounded outer card + dark border + inline illustrations +
      // attached dark testimonial bar). Reuses the 8 illustration
      // components in components/library/illustrations/library.tsx via
      // their registry keys. Titles + descriptions are the multiplayer-
      // specific copy from Figma node 219:15493.
      {
        _type: "featureBentoSection",
        _key: "bento-collaborative",
        heading: "Create a Truly Collaborative Product",
        subheading:
          "Everything you need to transform your product into a real-time, interactive space",
        primaryCta: {
          _type: "ctaLink",
          label: "View All Examples",
          href: "/use-cases",
        },
        cards: [
          {
            _type: "bentoCard",
            _key: "card-multiplayer",
            title: "Multiplayer Editing",
            description:
              "Co-edit documents in real-time and see who is working with you",
            illustrationKey: "multiplayerEditing",
          },
          {
            _type: "bentoCard",
            _key: "card-comments",
            title: "Contextual Comments",
            description:
              "Enable rich conversations with replies, @mentions, and reactions",
            illustrationKey: "contextualComments",
          },
          {
            _type: "bentoCard",
            _key: "card-cursors",
            title: "Customizable Cursors",
            description:
              "Decide how users appear with fully customizable name tags and cursors",
            illustrationKey: "customizableCursors",
          },
          {
            _type: "bentoCard",
            _key: "card-mentions",
            title: "User Mentions",
            description:
              "Enable rich conversations with replies, @mentions, and reactions",
            illustrationKey: "userMentions",
          },
          {
            _type: "bentoCard",
            _key: "card-notification",
            title: "Notification",
            description:
              "See what changes have been made to a shared document with timestamps",
            illustrationKey: "notification",
          },
          {
            _type: "bentoCard",
            _key: "card-history",
            title: "Version History",
            description:
              "See what changes have been made to a shared document with timestamps",
            illustrationKey: "versionHistory",
          },
          {
            _type: "bentoCard",
            _key: "card-single-editor",
            title: "Single Editor Mode",
            description:
              "Limit editing control to one user in collaborative scenarios",
            illustrationKey: "singleEditorMode",
          },
          {
            _type: "bentoCard",
            _key: "card-offline",
            title: "Offline Storage",
            description:
              "Keep working when the connection drops. Data will sync when you reconnect",
            illustrationKey: "offlineStorage",
          },
        ],
        inlineTestimonial: lindaTestimonial,
      },
      // Note: "How [X] Integrates Velt" is rendered in
      // app/features/[slug]/page.tsx as the homepage <CustomerUI />
      // carousel slotted between this bento and the next image card. It's
      // intentionally NOT in this sections array.
      // Note: "Your Data, Your Choice" is rendered in
      // app/features/[slug]/page.tsx as the slug-conditional
      // <MultiplayerYourDataSection /> (narrower 816-wide layout with
      // the file-static body image at public/images/features/multiplayer/
      // card-4-your-data.png + a compact rounded testimonial bar).
      // Intentionally NOT in this sections array.
      // Note: "Works seamlessly with your libraries" is rendered in
      // app/features/[slug]/page.tsx as the slug-conditional homepage
      // <LibrarySupport /> component. Intentionally NOT in this sections
      // array.
      // Note: "Enterprise level security" is rendered by the chrome
      // <Security /> component (showSecurity: true above) which mirrors
      // the homepage components/home/Security.tsx layout. Intentionally
      // NOT in this sections array.
    ],
    getStartedSteps: { step1PackageName: "@veltdev/react" },
    // FAQ left empty — falls back to the 4 sharedFAQ entries from
    // components/library/shared-content.ts.
  };

  if (DRY_RUN) {
    console.log("DRY RUN — document shape:");
    console.log(JSON.stringify(doc, null, 2));
    return;
  }

  await client.createOrReplace(doc);
  console.log(`\nDone! Upserted ${doc._id}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
