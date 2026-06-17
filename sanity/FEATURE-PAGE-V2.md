# Feature Page v2 (v10 template) — authoring model

`featurePageV2` documents drive the new feature pages (Audit Trail, Memory,
Notifications, Presence, ...). They render at **`/new-features/<slug>`** via
[`app/new-features/[slug]/page.tsx`](../app/new-features/%5Bslug%5D/page.tsx)
through the shared `FeaturePageView`. This is separate from the legacy
`featurePage` document (the older bento design at top-level slugs); the two do
not collide because v2 lives under the `/new-features/` prefix.

## Structure

Every page has the same fixed 13 content sections in the same order (nav and
footer are sitewide chrome): Hero, Logo Strip, What It Is, How It Works,
Showcase, Little Big Details, Make It Yours, In Production, Related Primitives,
Enterprise Strip, Testimonial Wall, FAQ, Final CTA. Each is its own object
field on the document — there is no reorderable sections array.

The document shape mirrors `FeaturePageContent` in
[`components/feature-new/content.ts`](../components/feature-new/content.ts) 1:1.

## How content flows

```
Sanity featurePageV2 doc
  -> getFeaturePageV2BySlug (sanity/queries.ts)
  -> toFeaturePageContent  (lib/feature-v2/to-content.tsx)
  -> FeaturePageView       (components/feature-new/FeaturePageView.tsx)
```

## Demo visuals are presets, not data

The live demo visuals (hero tabs, the What-it-is scene, each Showcase card
Preview, Make-it-yours previews, In-production visuals, Related mini-visuals)
are **not** stored as content. Each `*Preset` / `demoPreset` field is a dropdown
of keys defined in
[`components/feature-new/demo-keys.ts`](../components/feature-new/demo-keys.ts).
Each key maps to a React node in
[`components/feature-new/demo-registry.tsx`](../components/feature-new/demo-registry.tsx).

To add a new page's visuals:

1. Add the keys to `demo-keys.ts` (pure data — no React, so the Studio bundle
   stays light).
2. Wire each key to a node in `demo-registry.tsx`.
3. Select those keys in the Sanity document's preset fields.

Everything else is editable in Sanity: all copy, the Preview|Code snippets, FAQ,
testimonials, integration chips, links, and microcopy.

## Fields that are editable copy (not presets)

- **Code blocks** (`code` on How-It-Works steps, Showcase cards, Make-it-yours
  cards) are plain text. The section components syntax-highlight them at render
  (terminal/`.sh` filenames highlight as bash; everything else as TS/JSX).
  `copyText` is an optional override for the copy-to-clipboard button.
- **In Production tabs** prefer an uploaded `screenshot` image (per the
  template); if none is set, the `demoPreset` fallback renders.
- **Integration chips** take a public `icon` path (e.g.
  `/images/home/nav-icons/react.svg`); optional.
- **Card icons** (Make-it-yours, Related) use the `iconKey` enum (`shield`,
  `velt`).
- **Enterprise trust line** is plain text plus an `links` list rendered after it
  as "See a and b.".

## Capability states

- **Beta page:** set the document-level `beta` toggle.
- **Coming soon (item-level):** set `comingSoon` on a Showcase card or `soon` on
  a Little-Big-Details item.

## Seeding

Reference document (reproduces the static `/audit-trail` page as CMS data):

```bash
# preview the document shape without writing
DRY_RUN=1 node scripts/seed-feature-v2-audit-trail.mjs

# write to Sanity (production dataset)
node --env-file=.env.local scripts/seed-feature-v2-audit-trail.mjs
```

It renders at `/new-features/audit-trail`. The static `/audit-trail` route is
unchanged. Copy `scripts/seed-feature-v2-audit-trail.mjs` to seed new pages.
