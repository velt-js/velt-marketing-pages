# Feature pages (v10) — pre-launch TODOs

Launch checklist for the `featurePageV2` pages rendered at `/new-features/<slug>`.
Items are split into **Common** (fix once, fixes every page) and **Per-page**.

Legend: `[ ]` open · `[~]` partially done · gate codes (G1, G6, G10…) reference the
intake/calibration gates from the source `.md` specs.

---

## Common (fix once → applies to all pages)

### Links & routes
- [ ] **Replace the generic `https://docs.velt.dev/` fallback** used on most
  "Migration guide" links and several integration chips with real deep links
  (or drop the chip if no docs page exists). See per-page lists for exact spots.
- [ ] **Create or remove the `/compare/<slug>` and `/vs/liveblocks` pages.** Every
  page's logo-strip "Compare" link points at one of these; they 404 until built.
- [ ] **Confirm the shared routes exist:** `/book-demo`, `/examples`,
  `/self-hosting`, `/governance`, and the four verticals `/for/sales-enablement`,
  `/for/fintech`, `/for/operations`, `/for/ai-native-saas`.
- [ ] **Confirm sibling product links resolve** now that all pages live under
  `/new-features/*`. Body/related links currently point at bare paths like
  `/comments`, `/presence`, `/review-agents`, `/audit-trail`, etc. Decide:
  redirect bare paths → `/new-features/*`, or rewrite the links.

### Content & assets
- [ ] **Testimonials are placeholders (G7).** Every page ships 3 metric-led
  placeholder quotes. Replace with approved customer quotes (or one real pilot
  quote) before launch. Never stretch a metric.
- [ ] **In-production tab visuals are simulated (P1).** Swap the demo-preset
  visuals for verified per-vertical customer screenshots once approved.
- [ ] **Logo strip has no logos or stat.** Add approved customer logos (G6) and,
  where a real number exists, a scoped stat line (G14). Do not borrow the
  comments/3M stat onto other pages.
- [ ] **Demo visuals are simulated, not live SDK (G10).** Where a live demo
  exists, replace the simulated registry node or upgrade the support line to the
  live-SDK wording.
- [ ] **MCP commands are generic (G12).** Confirm the real `@veltdev/mcp`
  commands / per-component (`--component=<x>`) scoping before launch.
- [ ] **Engineering sign-off on capability claims (G1/G2).** Anything not
  confirmed shipped must stay in the details wall with `soon: true` (already done
  per spec; re-verify at launch).

### Engineering / platform
- [ ] Icon set is limited to `shield` and `velt`. Add real per-feature icons to
  `resolveIcon()` in `components/feature-new/demo-registry.tsx` if desired.
- [ ] `og:image` is the site default for every page — add per-feature OG images
  if wanted.

---

## Per-page

### Audit trail — `/new-features/audit-trail` (shipped)
- [ ] `/compare/audit-trail` page (logo strip Compare link).
- [x] Migration guide → real docs (`/audit-trail/migrate`).
- [ ] Testimonials + in-production screenshots (Common).

### Memory — `/new-features/memory` (BETA)
- [ ] **Launch gate:** public Memory docs must exist + engineering confirms the
  live subset before launch (spec: no public Memory docs today).
- [ ] `View Docs` currently points at the Activity Logs overview as the nearest
  substrate — repoint to real Memory docs when published.
- [ ] Knowledge-source chips (PDF, CSV, Excel, Plain text) → real docs URLs.
- [ ] `/compare/memory` page.
- [ ] Confirm beta-list access flow wording.

### Notifications — `/new-features/notifications` (shipped)
- [ ] `/compare/notifications` page; Migration guide → real docs.
- [ ] **Slack/Teams claim:** hero secondary + a Slack hero tab assert first-party
  Slack/Teams; docs ground only in-app + email + webhooks. Confirm first-party
  Slack/Teams delivery or soften before launch (conflict flag #1).

### Presence — `/new-features/presence` (shipped)
- [ ] `/vs/liveblocks` compare page.
- [ ] AG Grid integration chip → real docs URL (confirm it covers presence).
- [ ] **Agent cursor / selection / follow:** docs ground agent *presence* only;
  agent-driven cursors/selection/follow are asserted in copy. Confirm mechanism
  or demonstrate via the live demos (conflict flag #2).
- [ ] Lock anchor slugs `#cursors`, `#selection`, `#follow-mode` in the redirect
  map (301s land on them).

### Multiplayer editing — `/new-features/multiplayer-editing` (shipped)
- [ ] `/vs/liveblocks` compare page.
- [ ] Integration chips → real docs: **Live State REST API**, **Broadcast Event
  REST API** (both generic now); confirm editor setup slugs (Tiptap cited;
  ReactFlow / CodeMirror / BlockNote follow the pattern, unverified).
- [ ] Keep "10 other editor libraries" count current (verbatim from spec).

### Recording — `/new-features/recording` (shipped)
- [ ] `/compare/recording` page; Migration guide → real docs.
- [ ] "Self-hosted media" + "APIs and data" chips all point at the recorder
  overview — swap in real self-host-recordings / Get-Recordings REST URLs.
- [ ] Loom appears only as positive analogy (kept); migration line stays neutral.

### Review agents — `/new-features/review-agents` (shipped)
- [ ] `/compare/review-agents` page; Migration guide → real docs.
- [ ] "Where findings anchor" chips (Editor plugins, Charts, HTML canvas, Video,
  Custom components) → real per-surface docs URLs.
- [ ] Confirm named surfaces that lack docs pages today: the prebuilt agents,
  setup assistant, checklist converter, `VeltReviewAgents` component, and the
  `useAgentResults` / `useAgentConfig` / `useAgentAnalytics` hooks.
- [ ] Confirm triggers wording (standalone / workflow node / execution API vs
  "webhook" — spec conflict #3).

### Approval flows — `/new-features/approval-flows` (BETA)
- [ ] **Launch gate:** no live approval-workflow docs page yet — `View Docs`
  links point at docs root.
- [ ] Integration chips → real docs: **Workflow REST API**, **User Groups REST
  API**, **In-app inbox**, **Email** (all generic now).
- [ ] `/compare/approval-flows` page; Migration guide → real docs.

### Comments — `/new-features/comments` (shipped)
- [ ] `/vs/liveblocks` compare page; Migration guide → real docs.
- [ ] "Editors and surfaces" chips → real docs: Tiptap, Lexical, Quill,
  CodeMirror, Charts and canvas, Video and Lottie (all generic, G3/G11).

### Huddle — `/new-features/huddle` (shipped)
- [ ] `/compare/huddle` page; Migration guide → real docs.
- [ ] Verify huddle docs slugs used in copy: `.../huddle/setup`, `.../webhooks`,
  `.../customize-behavior` (only overview is confident).

### Suggestions — `/new-features/suggestions` (BETA)
- [ ] `/vs/liveblocks` compare page; Migration guide → real docs.
- [ ] "Dependencies and events" chips → real docs: **Velt Comments (required)**,
  **SuggestionElement singleton** (generic now).
- [ ] Drift "confirmation prompt" kept out of FAQ and placed in details as
  `soon: true` — promote to shipped once GA.

### Self-hosting — `/new-features/self-hosting` (shipped)
- [ ] `/compare/self-hosting` page.
- [x] Migration guide → real docs (`/self-host-data/overview`).
- [ ] Per-provider chip deep links: MongoDB, AWS S3, MinIO, PostgreSQL, Google
  Cloud Storage, Azure Blob currently fall back to generic self-host-data pages.
- [ ] Verify `self-host-data/field-inventory`, `backend-sdks/node`,
  `backend-sdks/python`, `/governance` slugs.
- [ ] Page intentionally scopes to the shipped per-feature data-provider model
  (no full-stack/VPC/BYOK/CMEK claims) — keep it that way.

---

_Seeds live in `scripts/seed-feature-v2-<slug>.mjs`; re-running a seed is
idempotent (`createOrReplace`). Demo visuals are wired in
`components/feature-new/demo-presets/<slug>.tsx`._
