# Velt Marketing Site — Migration Status

**Audience:** CEO, engineering team
**Last updated:** 2026-04-17

---

## TL;DR

We're moving velt.dev off Framer onto our own Next.js app with Sanity as the CMS. The site already runs fully on our own infrastructure (no runtime calls to Framer) and content editors have a real CMS for the blog. Homepage and blog are done. Integration pages (17 of them) are in progress and currently blocked on a design decision around how to template them.

---

## Why we're doing this

The marketing site used to be published straight from Framer. That gave us three problems:

1. **Framer was a runtime dependency.** The live site pulled JavaScript, fonts, images, and analytics from Framer's servers. If Framer had an outage or changed their CDN, velt.dev broke.
2. **No real CMS for the team.** The blog and marketing pages could only be edited in Framer's editor, which is designer-oriented. Writing or publishing required a Framer seat and Framer's workflow.
3. **We couldn't ship product inside marketing pages.** Features like live code demos, embedded product widgets, or A/B tests needed real React — not a Framer page with a widget crammed inside an iframe.

The goal: own the site end-to-end, keep the Framer design, give editors a proper CMS (Sanity), and unblock richer React-driven pages.

---

## What's live today

| Area | Status | How it's rendered |
|---|---|---|
| Homepage (`/`) | Done | React component, real Next.js page |
| Blog (`/blog`, `/blog/[slug]`, 94 posts) | Done | Content in Sanity, rendered by React |
| Integrations (17 pages) | In progress | Currently served as static HTML fallback |
| Everything else (use cases, libraries, pricing, enterprise, etc. — ~50 pages) | Not started | Served as static HTML fallback |

"Static HTML fallback" means: for any route we haven't built a React page for, Next.js serves the original Framer-exported HTML from disk. The site never breaks — worst case a page just isn't editable in Sanity yet.

---

## How the stack works, in plain terms

- **Next.js 16** is the web framework. This is the standard React framework used by most production sites.
- **Sanity** is the CMS. Editors log in, write content, click publish, and the site updates. No code deploy needed for content changes.
- **Vercel** hosts the site. Deploys happen automatically from the `main` branch on GitHub.
- **Framer assets are vendored.** We copied the JavaScript, fonts, and images that Framer generated into our own repo, and we serve them from our domain. The site no longer talks to Framer at runtime.

### The homepage specifically

The homepage is more than static HTML — it has animations, reveal effects, the tab-switcher, the cursor demo, etc. Those animations are driven by a piece of JavaScript Framer generated at export time. We copied that script into our repo and load it ourselves. We did **not** rewrite every animation by hand, because that would have taken weeks for no user-visible benefit.

So the homepage is:
- Our own React page
- Rendering markup that was originally exported by Framer
- Using a vendored animation script that was originally built by Framer
- Served entirely from our own infrastructure

This is the pragmatic middle ground: it looks and behaves identical to the old site, it's fully self-hosted, and it's easy to replace piece by piece later.

#### How the homepage routes, in code

Four files cooperate to render `/`. Each exists for a reason.

**1. `next.config.ts` — routes we haven't built yet fall through to static HTML.**
```ts
async rewrites() {
  return {
    fallback: [
      { source: "/:path*", destination: "/pages-html/:path*/index.html" },
    ],
  };
}
```
This is why unmigrated pages (use cases, pricing, etc.) keep working — Next serves the original exported HTML for any route that isn't a real React page.

**2. `app/layout.tsx` — runs on every route.** Loads our shared CSS and installs a small `<head>` script that silences known-harmless Framer runtime warnings (the runtime tries to fetch a few old CMS chunks we intentionally didn't ship; we swallow those errors so the browser console stays clean).
```tsx
<html lang="en" suppressHydrationWarning>
  <head>
    <script dangerouslySetInnerHTML={{ __html: /* warning-suppression IIFE */ }} />
  </head>
  <body>{children}</body>
</html>
```

**3. `app/page.tsx` — the homepage itself.** Three siblings in a specific order: hydration data, markup, animation runtime.
```tsx
"use client";
import Script from "next/script";
import "./framer.css";
import HomeStatic from "./home-static";
import { FRAMER_HANDOVER_JSON, FRAMER_RUNTIME_SRC } from "./framer-handover";

export default function Home() {
  return (
    <>
      <script
        type="framer/handover"
        id="__framer__handoverData"
        dangerouslySetInnerHTML={{ __html: FRAMER_HANDOVER_JSON }}
      />
      <HomeStatic />
      <Script type="module" src={FRAMER_RUNTIME_SRC} strategy="afterInteractive" />
    </>
  );
}
```
Order matters. The handover JSON has to be in the DOM before the runtime script executes, and the runtime has to load *after* React hydration so the two don't fight over the same nodes.

**4. `app/home-static.jsx` — the markup.** A ~2 MB generated JSX file (hand-translated from the Framer HTML export, then run through a transformer for CSS-variable casing and pragmas). Nothing in this file hits Framer's servers — all font/image URLs were rewritten to our own domain.

**5. `app/framer-handover.ts` — opaque hydration data.** A ~15 KB string extracted once from the original Framer HTML. The runtime reads it via `document.getElementById("__framer__handoverData")` and uses it to bind the animation timeline to the rendered markup.
```ts
export const FRAMER_RUNTIME_SRC = "/framer-runtime/script_main.L2sIMFJ0.mjs";
export const FRAMER_HANDOVER_JSON = "…"; // ~15 KB opaque string
```
Both URLs are same-origin — the runtime JS lives in `/public/framer-runtime/`, not on Framer's CDN.

**Why not collapse all of this into one file?** `layout.tsx` wraps *every* route, so the homepage-specific hydration and runtime can't live there (other routes would load homepage data and break). `home-static.jsx` is generated and gets overwritten, so hand-written logic can't live inside it. And the handover JSON is opaque data, not code — keeping it in its own file lets us use the same pattern for per-slug integration pages (`app/integrations/<slug>/framer-handover.ts`).

### The blog

The blog is built from scratch. Editors write posts in Sanity Studio (available at `/studio`). The Next.js app fetches posts from Sanity at request time and renders them with our own components. 94 posts were imported from the old site. Any new post goes through Sanity.

**Why the blog looks different from the old Framer blog.** The old blog's layout was drawn in Framer — every visual detail (spacing, typography, list styling, callouts) was hand-placed on a Framer canvas. When we moved the content into Sanity, we did **not** bring that Framer layout with it. Instead, the blog now renders through Sanity's standard post layout: a clean article template built on top of Sanity's Portable Text format. This is intentional:

- **Content is portable.** A post in Sanity is structured data (headings, paragraphs, code blocks, images), not Framer markup. That's what makes it editable by non-designers and reusable across surfaces.
- **Layout is owned by us, not Framer.** Styling the blog is now a CSS change in our repo — no Framer round-trip, no export step.
- **The look is close but not pixel-identical.** Fonts, max-width, and colors match the rest of the site, but fine details like exact heading sizes, inline-code styling, or callout blocks may differ from the Framer version. If we want to match the old design more precisely, it's a styling pass on our own components — not a migration problem.

In short: the blog switched from a Framer-drawn layout to a Sanity-driven layout, and that trade is what makes it a real CMS instead of a copy of the Framer page.

---

## The integrations problem (current work)

We have 17 integration pages — one per product Velt integrates with (Slack, HubSpot, OpenTelemetry, etc.). In Framer they are 17 copies of one template with different content.

**What's done:**
- Sanity schema for integration pages exists.
- All 17 integrations' content was pulled from Framer's CMS and seeded into Sanity as editable documents.
- One integration (OpenTelemetry) renders end-to-end as a real React page with real animations.

**What's blocking:**
The template is a ~1.25 MB file of generated JSX. Turning it into a reusable React template (where content gets passed in as props) is tedious and error-prone. The naive approach — take the OpenTelemetry template, swap in Slack's content — produces a broken page because the animation runtime expects the content and the animation metadata to match exactly.

**Options on the table:**

1. **Generate one React file per integration.** Run the conversion pipeline 17 times, one per integration, producing 17 self-contained page files. Content still lives in Sanity for future edits; the generated files are the initial state. Downside: 17 large generated files in the repo, and changes to copy require a regeneration step.
2. **Keep the 16 non-OpenTelemetry pages as static HTML (current fallback).** Editors keep editing in Framer, which republishes static HTML we then sync. Simplest, but it means integrations skip Sanity entirely — not the direction we want long-term.
3. **Hybrid.** Serve static HTML but inject Sanity content on top of it at render time. Works but is fragile.
4. **Simpler rewrite.** Rebuild the integration template from scratch as a small, clean React component. Loses the exact Framer animations but gives us a template we actually own. Probably a 1–2 day task.

Our recommendation is **option 4**: the integration template is simple (hero, a few content sections, FAQ, CTA) and rewriting it cleanly now pays off across all 17 pages and every new integration we add later. Option 1 is the fallback if we want to preserve the exact Framer look.

---

## What's left after integrations

Roughly in priority order:

1. **Pricing** (1 page) — high traffic, worth owning.
2. **Enterprise** (1 page) — sales-driven, needs frequent edits.
3. **Product feature pages** (~6 pages) — e.g. Comments, Recording. These are likely to gain interactive product demos, so they're worth being real React.
4. **Use cases** (14 pages) — same template applied 14 times, like integrations.
5. **Libraries** (11 pages) — same pattern.
6. **Comparisons & migration pages** (6 pages) — SEO-driven, rarely updated.
7. **Customers** (1 page) — logo grid, straightforward.
8. **Simple pages** (careers, privacy, terms, 404, etc.) — low-change; fine to leave as static HTML unless we want them in Sanity.
9. **Examples** (9 pages) — decide whether to keep as static or migrate.

Anything we don't migrate keeps working on the static HTML fallback indefinitely. There's no pressure to convert everything.
