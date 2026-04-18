# Velt marketing site — Framer → Next.js migration log

> Living doc. Update as we go. Keep lean — findings, gotchas, and reusable patterns only. No verbose explanations.
>
> **Canonical location**: `/Users/yoenzhang/Downloads/velt-marketing-pages/MIGRATION.md` (in the repo root under `/Downloads/`). First action on plan approval: write this file there, then keep it updated as we work.

## Status

| # | Template | Route | Pages | Status |
|---|---|---|---|---|
| 1 | Homepage | `/` | 1 | ✅ |
| — | Blog | `/blog`, `/blog/[slug]` | 94 | ✅ (Sanity) |
| 2 | Integrations | `/integrations/*` | 18 | ⏳ next |
| 3 | Use cases | `/use-case/*` | 14 | ⏱ |
| 4 | Libraries | `/libraries/*` | 11 | ⏱ |
| 5 | Simple pages | `/careers`, `/privacy`, `/terms`, `/404`, `/book-demo`, `/consult`, `/thank-you`, `/yc`… | 11 | ⏱ (keep static?) |
| 6 | Examples | `/examples/*` | 9 | ⏱ (keep static?) |
| 7 | Product features | `/comments`, `/recording`, etc. | 6 (up to 15 candidates) | ⏱ (narrow list) |
| 8 | Comparisons / migrations | `/comparison`, `/liveblocks-alternative`, `/migrate-from-*` | 6 | ⏱ |
| 9 | Pricing | `/pricing` | 1 | ⏱ |
| 10 | Enterprise | `/enterprise` | 1 | ⏱ |
| 11 | Customers | `/customers` | 1 | ⏱ |

Everything not ✅ is served by the fallback rewrite in `next.config.ts` → `public/pages-html/<path>/index.html`.

## Key findings

- **Framework**: Next.js 16.2.3 App Router (Turbopack). React 19.
- **Homepage is "React" but not idiomatic**: `app/home-static.jsx` is a ~2 MB auto-generated dump of Framer HTML re-emitted as JSX. It renders through React but is otherwise a Framer artifact. Do **not** replicate this approach for CMS templates — we want prop-driven, hand-authored components.
- **Framer runtime is required for the homepage** to animate and reveal `opacity:0.001` elements. Loaded in `app/layout.tsx` as `script_main.L2sIMFJ0.mjs` + a `framer/handover` JSON island.
- **Integration pages are 17 copies of one template**. Tag-frequency fingerprint across all 17 was *identical* (`<a:157 <div:2856 <h1:2 <h2:12 <img:73 <p:308 <section:1 <ul:1>`), file sizes within 350 bytes. One schema covers all of them; no per-page variants needed. (`opentelemetry` has the most copy by 1 line — good umbrella candidate. `slack` is the flagship live reference.)
- **Sanity env vars must be set in Vercel**: `NEXT_PUBLIC_SANITY_PROJECT_ID=fk9mezqa`, `NEXT_PUBLIC_SANITY_DATASET=production`. Build fails at page-data collection without them.

## What worked

- **Hand-translate HTML→JSX, then run a transformer** (`scripts/transform-home-static.mjs`) to fix style-key casing, re-emit CSS custom properties, and add a `"use client"` + `@ts-nocheck` pragma. Source: `public/pages-html/index.jsx`. Output: `app/home-static.jsx`.
- **Loading Framer's runtime from `<Script strategy="afterInteractive">` in `app/layout.tsx`** — avoids React stripping `<script>` tags inside component trees.
- **`[data-framer-appear-id] { opacity: 1 !important }`** in `app/globals.css` — forces appear-effect wrappers visible even if Framer's hydration doesn't complete.
- **`MutationObserver` for re-injecting the CLI snippet** after Framer re-renders the DOM — more reliable than `setTimeout` retries.
- **Capture-phase `unhandledrejection` listener in `<head>`** with `stopImmediatePropagation()` — short-circuits Next.js's dev overlay for Framer's known-harmless dynamic-import failures (CMS collection/snippet chunks not shipped). Must run before Next's error-handler hook mounts.
- **Declaring `unframer` as a real dep** in `package.json` — Vercel's `npm ci` won't install extraneous packages.

## What didn't work (avoid repeating)

- ❌ **`@ts-expect-error` on the HomeStatic import** — once the transformer adds `@ts-nocheck` to `home-static.jsx`, there's no error to "expect", so tsc fails.
- ❌ **Rendering `<script type="application/ld+json">` JSON as JSX children** (what the hand-translation of index.jsx did by default) — it renders as visible text. Either wrap in `<script dangerouslySetInnerHTML>` or delete (SEO data can go in `layout.tsx` head instead).
- ❌ **Inline-style overrides for button widths** — Framer's hydration re-renders and wipes them. Edit the Framer-generated class rules in the style block directly.
- ❌ **Stub file for missing Framer CMS collection module** — the runtime expects a specific export shape (`s is not a function` when we returned `{}`). Suppress the unhandledrejection instead.
- ❌ **`event.preventDefault()` alone on unhandledrejection** — doesn't stop Next.js's dev overlay. Need `stopImmediatePropagation()` + `capture: true` + register in `<head>` before Next's hook.
- ❌ **`setTimeout` retries at 100/500ms for DOM injection** — races with Framer's async post-hydration re-render. Use `MutationObserver`.
- ❌ **Relying on HTML→JSX converter output for CSS custom property casing** — the converter destroyed case in keys while preserving it in values, breaking lookup. The transformer now lowercases both sides.

## Template recipe (apply per category)

1. **Pick an umbrella page**: one from the category with the richest content (verify via tag-frequency fingerprint — if identical across siblings, any works).
2. **Hand-translate HTML → JSX**: save to `public/pages-html/<category>/_template.jsx` following the homepage's pattern in `index.jsx`.
3. **Diff against 2–3 siblings** to identify varying fields (logo, hero title, one-liner, feature rows, FAQ items) vs. shared chrome (nav, footer, shared CTAs).
4. **Define Sanity schema** at `sanity/schemas/<name>.ts`. Reuse `marketingPage` with a `pageType` discriminator (`"integration"`, `"use-case"`, `"library"`, `"comparison"`) unless the page truly needs a bespoke schema (e.g., `customer` for logo grid).
5. **Add fetchers** in `sanity/lib/queries.ts` (`getXBySlug`, `getAllX`).
6. **Extend the transformer** (or write a sibling) to emit a prop-driven React component from `_template.jsx`.
7. **Route**:
   - Detail: `app/<category>/[slug]/page.tsx` — fetch Sanity doc, pass to template.
   - Index (if applicable): `app/<category>/page.tsx` — list all docs.
8. **Seed Sanity** from existing HTML via an extractor script (reuse patterns from `scripts/transform-home-static.mjs`).
9. **Delete** `public/pages-html/<category>/` after migration so the fallback rewrite no longer shadows the new routes.
10. **Verify**: route works without the static file, fonts/layout/animations match live velt.dev, sitemap still correct.

## Critical files / paths

- `app/layout.tsx` — Framer runtime, handover JSON, unhandledrejection guard.
- `app/page.tsx` — homepage wrapper, CLI snippet injector, console-error suppression.
- `app/home-static.jsx` — **generated, don't edit**.
- `public/pages-html/index.jsx` — hand-translated source for the homepage.
- `scripts/transform-home-static.mjs` — transformer (reusable pattern for future templates).
- `app/globals.css` — opacity override for Framer appear-effect wrappers.
- `sanity/env.ts`, `sanity/client.ts` — Sanity config.
- `next.config.ts` — fallback rewrite to `public/pages-html/:path*/index.html`.

## Open questions

- Narrow Product-features list from 15 candidates → 6 canonical ones?
- Migrate Examples and Simple pages, or leave on static?
- Where should the `_template.jsx` for each category live, and do we want one transformer per category or one generic transformer?

## Bug: black page on `/integrations/opentelemetry` (2026-04-17)

### Symptoms
- Page renders black.
- 4 console errors:
  - 2× `Received true for a non-boolean attribute 'shadows' / 'strokeDasharray'` — React warnings from hand-translated JSX attributes that should be strings.
  - 1× `Failed to fetch`
  - 1× `Fatal error. In case the issue persists, report this to the Framer team... TypeError: Failed to fetch at W.loadModel`
- Moving the `console.error` suppression to `layout.tsx` did **not** silence them, because they fire during React's render pass — before any `<script>` children can mount.

### Diagnosis
- `components/IntegrationTemplate.jsx` and `app/home-static.jsx` are structurally identical (both have `<meta>` tags inside `<div>`, both `"use client"` with `@ts-nocheck`, both come from the same transformer). Homepage works, integration doesn't — so the JSX is not the root cause.
- `layout.tsx` loads the Framer runtime (`script_main.L2sIMFJ0.mjs`) + a `framer/handover` JSON island on **every** route.
- The handover JSON was extracted from the homepage HTML only. It contains homepage-specific hydration data.
- On `/integrations/opentelemetry`, the runtime reads the homepage handover, tries to hydrate the integration DOM, can't find the expected model, calls `W.loadModel` → `Failed to fetch` → fatal error.
- The runtime's error path does aggressive DOM/style tear-down, which is what turns the page black.

### Fix (P0 — unblock rendering)

**Scope the Framer runtime + handover JSON to the homepage only.**

- Remove from `app/layout.tsx`:
  - The `<script type="framer/handover" id="__framer__handoverData">` island.
  - The `<Script type="module" src={FRAMER_RUNTIME_SRC}>` loader.
- Keep in `app/layout.tsx`:
  - `globals.css` import.
  - The inline `<head>` script that patches `console.error` + `unhandledrejection` (still useful for every page, even if some warnings escape).
- Move runtime loading + handover JSON into `app/page.tsx` (Home component), rendered inside the Home JSX as siblings to `<HomeStatic />`.
  - Handover script first (so it's in the DOM before the runtime executes).
  - `<Script type="module" strategy="afterInteractive">` last.

Trade-off: integration pages render statically, no Framer animations. The integration template has only 2 `data-framer-appear-id` attributes (vs. the homepage's many) and 0 inline `opacity:0.001` — so visually the static render should look very close to the live page. Any missing animations can be revisited once per-page handover JSON extraction lands (follow-up).

### Fix (P1 — silence the warnings properly)

The `shadows={true}` and `strokeDasharray={true}` are artifacts of the HTML→JSX conversion (the tool saw `shadows` as a boolean attribute). Clean them in the transformer:

- Add a regex step to `scripts/transform-framer-jsx.mjs` that rewrites `(shadows|strokeDasharray)=\{true\}` → `$1="true"` so React accepts them as string props.
- Re-run the transformer on the opentelemetry JSX to regenerate `components/IntegrationTemplate.jsx`.

This is not a hot fix — the warnings don't break rendering — but worth doing before we ship more templates using this transformer.

### Files to modify
- `app/layout.tsx` — remove handover + runtime script.
- `app/page.tsx` — add handover + runtime script scoped to the homepage.
- `scripts/transform-framer-jsx.mjs` — add string-boolean fix for custom attributes.
- `components/IntegrationTemplate.jsx` — regenerate.
- `MIGRATION.md` — add this finding to "What didn't work".

### Verification
1. `npm run dev`, reload `http://localhost:3000/` — homepage still animates (tabs switch, grid-dot GIF visible, cursors move).
2. Reload `http://localhost:3000/integrations/opentelemetry` — page renders static version of opentelemetry (nav, hero, sections, footer). No fatal error. No `Failed to fetch` from `framer-runtime/`.
3. The `shadows={true}` / `strokeDasharray={true}` warnings should be gone after regenerating the template with the P1 fix.

## Plan: Scale integrations to all 17 (Sanity-driven)

### Done
- [x] Sanity schema `integrationPage` (`sanity/schemas/integrationPage.ts`)
- [x] Hand-translated JSX for opentelemetry (`public/pages-html/integrations/opentelemetry/index.jsx`)
- [x] Generalized transformer (`scripts/transform-framer-jsx.mjs`)
- [x] Generated template (`components/IntegrationTemplate.jsx`) — currently has opentelemetry content hardcoded
- [x] All 17 per-slug handover JSONs extracted (`app/integrations/<slug>/framer-handover.ts`)
- [x] Test route at `app/integrations/opentelemetry/page.tsx` — renders cleanly, Framer runtime works
- [x] Runtime console suppression + handover scoped correctly (see "What didn't work")

### Key new discovery
**Framer's CMS has all 17 integration docs already structured.** Collection ID `Z1rTLexh0` (accessible via `npx unframer mcp getCMSItems --collectionId Z1rTLexh0`). Each item has ~30 structured fields (name, hero title, tagline, description, logo, connect body, payload title/body/image, unified title/body/image, FAQ, steps, code snippets, etc.) keyed by opaque Framer field IDs. **This replaces any HTML-parsing step.**

### Remaining steps

**Step A — Map Framer CMS field IDs to Sanity schema** (read-only, 15 min)
- Dump `getCMSItems` for 2–3 diverse slugs (opentelemetry, slack, sendgrid).
- Compare fields side-by-side to deduce which opaque ID corresponds to which semantic field.
- Write a field-ID → Sanity-field mapping in `scripts/framer-field-map.mjs`.

**Step B — Seed Sanity with 17 docs**
- `scripts/sync-integrations-from-framer-to-sanity.mjs`:
  - Shell out to `npx unframer mcp getCMSItems --collectionId Z1rTLexh0`, parse the YAML/JSON response.
  - Apply the field map from Step A.
  - Upsert to Sanity via `@sanity/client` (write token needed — check with user or use `SANITY_WRITE_TOKEN` env).

**Step C — Parameterize `public/pages-html/integrations/opentelemetry/index.jsx`**
- Identify ~20–30 content points (opentelemetry-specific text strings + image paths).
- Replace each with a `{data.fieldName}` reference where `data` matches the `integrationPage` Sanity schema shape. Template accepts `{ data }: { data: IntegrationPage }` prop.
- Add `data-slot` markers only if simple interpolation doesn't work for a given position.
- Re-run `scripts/transform-framer-jsx.mjs` to regenerate `components/IntegrationTemplate.jsx`.
- Known content-point locations (from diff of opentelemetry vs slack HTML):
  - Hero: title ("Integrate Velt in X"), tagline, logo img
  - Connect section: title-suffix (X name), body, screenshot
  - Payload section: title, body, image
  - Unified section: title, body, image
  - Security section: body + feature cards
  - FAQ: array of Q/A
  - Steps: array of 3 items with title/description/code
  - SEO: title, description, ogImage

**Step D — Dynamic route `app/integrations/[slug]/page.tsx`**
- Fetch Sanity doc by slug (new `getIntegrationBySlug(slug)` in `sanity/queries.ts`).
- Statically map slug → per-slug handover JSON (17 handovers already on disk).
- Render: `<IntegrationTemplate data={doc} />` + `<script type="framer/handover">` + `<Script src={FRAMER_RUNTIME_SRC}>`.
- Handle 404 for unknown slugs via `notFound()` from `next/navigation`.

**Step E — Cleanup**
- Delete `app/integrations/opentelemetry/page.tsx` (test route no longer needed — dynamic route handles it).
- Delete `public/pages-html/integrations/` so fallback rewrite stops shadowing.
- Spot-check opentelemetry, slack, hubspot against live velt.dev.

### Files touched
- `scripts/framer-field-map.mjs` *(new)*
- `scripts/sync-integrations-from-framer-to-sanity.mjs` *(new)*
- `public/pages-html/integrations/opentelemetry/index.jsx` — add prop references
- `components/IntegrationTemplate.jsx` — regenerate
- `sanity/queries.ts` — add `getIntegrationBySlug`, `getAllIntegrations`
- `app/integrations/[slug]/page.tsx` *(new)*
- `app/integrations/opentelemetry/page.tsx` — delete
- `public/pages-html/integrations/` — delete

### Risks
- **Framer CMS write token** may be needed for Sanity. Sanity client ships with `@sanity/client` but writing requires a token in env.
- **Image hosting**: Framer serves images at `framerusercontent.com/...`. Seeding these into Sanity → we either: (a) pass through the URL as a string in the Sanity doc, template renders `<img src={data.heroImage}>` pointing at Framer's CDN, or (b) upload each image to Sanity assets. Path (a) is simpler for now — Framer's CDN is stable.
- **FAQ/steps arrays**: Framer might store these as individual fields (`faq1_q`, `faq1_a`, `faq2_q`...) or as nested collection references. Need to check in Step A.
- **Prop parameterization on a 1.25 MB file**: risky but bounded — ~20–30 targeted Edits.

### Verification
1. Dev server on, visit `/integrations/opentelemetry`, `/integrations/slack`, `/integrations/hubspot`.
2. Compare each against `https://velt.dev/integrations/<slug>` — hero, all 7 sections, FAQ, steps, animations.
3. No console errors, no black page, runtime hydrates cleanly per slug.
4. `/integrations/<unknown>` returns 404 (not the static fallback).
5. Sanity Studio at `/studio` shows 17 editable `Integration Page` docs. Editing one + reloading updates the site.
