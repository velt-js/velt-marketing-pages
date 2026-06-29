# Link sweep findings — homepage integration chips (2026-06-29)

Audit of the 16 destination pages linked from the homepage `Integrations`
section (`components/home-new/Integrations.tsx`), verified against the **live**
`https://velt.dev` site by a 4-agent coordinated sweep plus direct HTML
confirmation.

## Summary

- **Dead links: none.** All 16 chip destinations return 200, and every
  internal/external link on those pages returns 200.
- **Testimonials: clean.** Present only on `/libraries/nivo-charts` and
  `/libraries/yjs`; all carry real names/companies, no placeholders. (Cosmetic:
  Yuri Kleban's quote shows "Senior PM" in one block and "Sr. Product Manager"
  in the carousel.)
- **Copy/content: multiple real bugs**, all pre-existing CMS content (not caused
  by the chip-link change). Root cause for integrations is **duplicate Sanity
  documents**.

---

## 1. Integration pages — duplicate docs, buggy set is live (Sanity)

`getIntegrationPageBySlug` runs `*[_type=="integrationPage" && slug==$s][0]`.
Every integration slug has **two** docs:

- `integration-<slug>` — richer images, but buggy copy/code/links. Sorts first
  by `_id`, so **this is what's live**.
- `integrationPage-<slug>` — clean, correct per-slug copy, `codeSnippet: null`.
  (Also the only set for `loops`, `windmill`, `zapier`.)

Bugs in the live `integration-*` set (all 14 docs):

| Field | Bug | Fix |
|-------|-----|-----|
| `connectBody` | "Go to advance web hook configs and create a new endpoint for **Slack**" on every page | "Go to advanced webhook configs and create a new endpoint for **{Name}**" |
| `codeSnippet` | Wrong editor/chart code (Tiptap CRDT / Slate / Nivo / VeltCommentPin) — irrelevant to a webhook integration | set to `null` (matches canonical clean set; hides the "Add Velt to {name}" code block) |
| `docsUrl` | "View Docs" points at a wrong-product docs page (e.g. `.../crdt/setup/tiptap` on Customer.io) | `https://docs.velt.dev/` |
| `demoUrl` / `githubUrl` | Point at tiptap/reactflow demo + repo (not rendered by the new view, but wrong data) | console.velt.dev / null |

**In scope (homepage chips):** microsoft-teams, discord, resend, customer-io,
sendgrid. **Also affected (fixed for consistency):** aws-s3, close-crm,
google-cloud-storage, hubspot, inngest, microsoft-azure, opentelemetry, segment.

**Fixed by:** `scripts/fix-integration-content.mjs`

### 1a. SendGrid brand casing (Sanity, both doc sets)
`name`, `heroTitle`, `tagline`, `description` read "**Sendgrid**" (34 visible
occurrences incl. `<title>` and meta). Correct brand is "**SendGrid**". Patched
on both `integration-sendgrid` and `integrationPage-sendgrid`.
**Fixed by:** `scripts/fix-integration-content.mjs`

### Structural recommendation (not auto-applied)
The duplicate docs make `[0]` fragile. After the content fix, consider either
deleting the orphaned `integrationPage-<slug>` twins for the 14 slugs that also
have an `integration-*` doc, or adding `order()` to the query to make the winner
deterministic. Left as a decision for the content owner — no destructive deletes
were run.

---

## 2. Library pages — wrong attribution + demo URLs (Sanity, v1 `libraryPage`)

`/libraries/nivo-charts` and `/libraries/yjs` are v1 `libraryPage` docs.

| Page | Path | Bug | Fix |
|------|------|-----|-----|
| nivo-charts | `hero.primaryCta.href` | `…?ref=library-tiptap` (corrupts signup attribution) | `…?ref=library-nivo-charts` |
| yjs | `hero.primaryCta.href` | `…?ref=library-tiptap` | `…?ref=library-yjs` |
| nivo-charts | `bento.primaryCta.href` | "View Examples" → `velt-tiptap-crdt-demo.vercel.app` | needs correct nivo example URL (see below) |
| nivo-charts | `demoStage.demoUrl` | demo stage embeds `velt-reactflow-crdt-demo.vercel.app` | needs correct nivo demo URL (see below) |

The `ref=` fixes are unambiguous and **auto-applied** by
`scripts/fix-library-cta-refs.mjs`.

The two nivo **demo URLs** point at the wrong product's live app. The correct
replacement isn't knowable from the repo (is there a hosted nivo demo?), and
pointing a demo iframe at a docs page risks `X-Frame-Options` breakage — so these
are **flagged, not auto-changed**. The script prints them as a manual TODO.
Supply the right URL (or remove the demo stage) and re-run.

---

## 3. Code-side limitation — shared bento tiles use a tiptap path

`components/library/illustrations/library.tsx:13`
```ts
const BENTO_DIR = "/images/home/libraries/tiptap/bento";
```
All v1 library pages (incl. yjs) render their bento feature tiles from this
Tiptap-foldered image set, so the yjs page shows literal Tiptap screenshots as
its feature illustrations. This is deliberate asset reuse (see the file comment)
and there are no per-library replacement tiles, so it is **not** auto-fixed.
Options: rename the dir to a neutral path (`/images/home/libraries/_shared/bento`)
for honesty, or commission per-library tiles. Cosmetic; low priority.

---

## 4. Lower-severity / cosmetic (not fixed)

- Co-editing feature tab (card 03) on editor/canvas library pages server-renders
  Tiptap's import as the default tab. Almost certainly a JS tab that re-selects
  per page on hydration — needs a real-browser check to confirm it's not a bug.
- Shared demo widgets show off-context copy ("Clause 7 omits a liability cap",
  "Maya editing slide 4") on code/chart pages — boilerplate.
- `/libraries/blocknote` "Related" section omits "Ace Editor" that the sibling
  pages include — trivial.

---

## Fix scripts

```bash
# preview (no writes)
DRY_RUN=1 node --env-file=.env.local scripts/fix-integration-content.mjs
DRY_RUN=1 node --env-file=.env.local scripts/fix-library-cta-refs.mjs

# apply
node --env-file=.env.local scripts/fix-integration-content.mjs
node --env-file=.env.local scripts/fix-library-cta-refs.mjs
```

Both scripts are **guarded** (each edit only applies when the current value still
matches the expected buggy value) and **idempotent** (re-runs are no-ops). Sanity
retains revision history, so changes are reversible.
