// Pure-data list of v10 feature-page demo-preset keys + display titles.
// Mirrors components/feature/uis/keys.ts so the Sanity schema can import the
// dropdown options without pulling React component code into the Studio
// bundle. The keyed React nodes live in ./demo-registry.tsx.
//
// Each demo visual on a v10 feature page (hero tab, What-it-is scene, showcase
// card preview, Make-it-yours preview, In-production visual, Related visual)
// is selected in Sanity by one of these keys. Engineering adds a key here and
// wires the matching node in the registry as new pages are built.

import { MULTIPLAYER_EDITING_DEMO_KEYS } from "./demo-presets/multiplayer-editing.keys";
import { RECORDING_DEMO_KEYS } from "./demo-presets/recording.keys";
import { REVIEW_AGENTS_DEMO_KEYS } from "./demo-presets/review-agents.keys";
import { APPROVAL_FLOWS_DEMO_KEYS } from "./demo-presets/approval-flows.keys";
import { COMMENTS_DEMO_KEYS } from "./demo-presets/comments.keys";
import { HUDDLE_DEMO_KEYS } from "./demo-presets/huddle.keys";
import { SUGGESTIONS_DEMO_KEYS } from "./demo-presets/suggestions.keys";
import { SELF_HOSTING_DEMO_KEYS } from "./demo-presets/self-hosting.keys";
import { SOLUTIONS_SALES_ENABLEMENT_DEMO_KEYS } from "./demo-presets/solutions-sales-enablement.keys";
import { SOLUTIONS_FINTECH_DEMO_KEYS } from "./demo-presets/solutions-fintech.keys";
import { SOLUTIONS_OPERATIONS_DEMO_KEYS } from "./demo-presets/solutions-operations.keys";
import { SOLUTIONS_AI_NATIVE_SAAS_DEMO_KEYS } from "./demo-presets/solutions-ai-native-saas.keys";
import { SOLUTIONS_COMPLIANCE_DEMO_KEYS } from "./demo-presets/solutions-compliance.keys";
import { SOLUTIONS_LEGAL_DEMO_KEYS } from "./demo-presets/solutions-legal.keys";

const BUILT_IN_DEMO_KEYS = [
  // Audit Trail — hero tabs
  "audit-trail/hero/timeline",
  "audit-trail/hero/export",
  "audit-trail/hero/history",
  // Audit Trail — what it is
  "audit-trail/what-it-is/scene",
  // Audit Trail — showcase cards
  "audit-trail/showcase/capture",
  "audit-trail/showcase/attribution",
  "audit-trail/showcase/judgment",
  "audit-trail/showcase/agents",
  "audit-trail/showcase/recording",
  "audit-trail/showcase/query",
  "audit-trail/showcase/decisions",
  "audit-trail/showcase/immutable",
  "audit-trail/showcase/exports",
  "audit-trail/showcase/custom-events",
  // Audit Trail — make it yours
  "audit-trail/make-it-yours/look",
  "audit-trail/make-it-yours/behavior",
  // Audit Trail — in production
  "audit-trail/in-production/sales",
  "audit-trail/in-production/fintech",
  "audit-trail/in-production/operations",
  "audit-trail/in-production/compliance",
  "audit-trail/in-production/legal",
  "audit-trail/in-production/ai",
  // Audit Trail — related primitives
  "audit-trail/related/approval-flows",
  "audit-trail/related/review-agents",
  "audit-trail/related/self-hosting",

  // Memory — hero tabs
  "memory/hero/precedent",
  "memory/hero/grounding",
  // Memory — what it is
  "memory/what-it-is/scene",
  // Memory — showcase cards
  "memory/showcase/precedent",
  "memory/showcase/suggestions",
  "memory/showcase/search",
  "memory/showcase/nl-queries",
  "memory/showcase/knowledge",
  "memory/showcase/checklists",
  "memory/showcase/agents",
  "memory/showcase/drift",
  "memory/showcase/declared",
  "memory/showcase/profiles",
  // Memory — make it yours
  "memory/make-it-yours/look",
  "memory/make-it-yours/behavior",
  // Memory — in production
  "memory/in-production/sales",
  "memory/in-production/fintech",
  "memory/in-production/ops",
  "memory/in-production/compliance",
  "memory/in-production/legal",
  "memory/in-production/ai",
  // Memory — related
  "memory/related/review-agents",
  "memory/related/audit-trail",
  "memory/related/approval-flows",

  // Notifications — hero tabs
  "notifications/hero/inbox",
  "notifications/hero/email",
  "notifications/hero/slack",
  "notifications/hero/preferences",
  // Notifications — what it is
  "notifications/what-it-is/scene",
  // Notifications — showcase cards
  "notifications/showcase/inbox",
  "notifications/showcase/email",
  "notifications/showcase/batching",
  "notifications/showcase/preferences",
  "notifications/showcase/custom",
  "notifications/showcase/webhooks",
  "notifications/showcase/agents",
  "notifications/showcase/permissions",
  "notifications/showcase/self-host",
  // Notifications — make it yours
  "notifications/make-it-yours/look",
  "notifications/make-it-yours/behavior",
  // Notifications — in production
  "notifications/in-production/sales",
  "notifications/in-production/fintech",
  "notifications/in-production/ops",
  "notifications/in-production/compliance",
  "notifications/in-production/legal",
  "notifications/in-production/ai",
  // Notifications — related
  "notifications/related/comments",
  "notifications/related/approval-flows",
  "notifications/related/review-agents",

  // Presence — hero tabs
  "presence/hero/avatars",
  "presence/hero/cursors",
  "presence/hero/selection",
  "presence/hero/follow",
  // Presence — what it is
  "presence/what-it-is/scene",
  // Presence — showcase cards
  "presence/showcase/avatars",
  "presence/showcase/states",
  "presence/showcase/agent",
  "presence/showcase/cursors",
  "presence/showcase/selection",
  "presence/showcase/follow",
  "presence/showcase/location",
  "presence/showcase/data",
  // Presence — make it yours
  "presence/make-it-yours/look",
  "presence/make-it-yours/behavior",
  // Presence — in production
  "presence/in-production/sales",
  "presence/in-production/fintech",
  "presence/in-production/ops",
  "presence/in-production/compliance",
  "presence/in-production/legal",
  "presence/in-production/ai",
  // Presence — related
  "presence/related/comments",
  "presence/related/multiplayer-editing",
  "presence/related/huddle",
] as const;

export type FeatureNewDemoKey = string;

const BUILT_IN_DEMO_TITLES: Record<string, string> = {
  "audit-trail/hero/timeline": "Audit Trail · Hero · Timeline",
  "audit-trail/hero/export": "Audit Trail · Hero · Export",
  "audit-trail/hero/history": "Audit Trail · Hero · Workflow history",
  "audit-trail/what-it-is/scene": "Audit Trail · What it is · Mixed scene",
  "audit-trail/showcase/capture": "Audit Trail · Showcase · Automatic capture",
  "audit-trail/showcase/attribution": "Audit Trail · Showcase · Attribution",
  "audit-trail/showcase/judgment": "Audit Trail · Showcase · Judgment fields",
  "audit-trail/showcase/agents": "Audit Trail · Showcase · Agent actions",
  "audit-trail/showcase/recording": "Audit Trail · Showcase · Recording on by default",
  "audit-trail/showcase/query": "Audit Trail · Showcase · Query API",
  "audit-trail/showcase/decisions": "Audit Trail · Showcase · Decision chains",
  "audit-trail/showcase/immutable": "Audit Trail · Showcase · Immutable records",
  "audit-trail/showcase/exports": "Audit Trail · Showcase · Exports",
  "audit-trail/showcase/custom-events": "Audit Trail · Showcase · Custom events",
  "audit-trail/make-it-yours/look": "Audit Trail · Make it yours · Look",
  "audit-trail/make-it-yours/behavior": "Audit Trail · Make it yours · Behavior",
  "audit-trail/in-production/sales": "Audit Trail · In production · Sales enablement",
  "audit-trail/in-production/fintech": "Audit Trail · In production · Fintech",
  "audit-trail/in-production/operations": "Audit Trail · In production · Operations",
  "audit-trail/in-production/compliance": "Audit Trail · In production · Compliance",
  "audit-trail/in-production/legal": "Audit Trail · In production · Legal",
  "audit-trail/in-production/ai": "Audit Trail · In production · AI-native",
  "audit-trail/related/approval-flows": "Audit Trail · Related · Approval flows",
  "audit-trail/related/review-agents": "Audit Trail · Related · Review agents",
  "audit-trail/related/self-hosting": "Audit Trail · Related · Self-hosting",

  "memory/hero/precedent": "Memory · Hero · Precedent surfacing",
  "memory/hero/grounding": "Memory · Hero · Agent grounding",
  "memory/what-it-is/scene": "Memory · What it is · Mixed scene",
  "memory/showcase/precedent": "Memory · Showcase · Precedent surfacing",
  "memory/showcase/suggestions": "Memory · Showcase · Inline suggestions",
  "memory/showcase/search": "Memory · Showcase · Semantic search",
  "memory/showcase/nl-queries": "Memory · Showcase · Natural-language queries",
  "memory/showcase/knowledge": "Memory · Showcase · Org knowledge",
  "memory/showcase/checklists": "Memory · Showcase · Living checklists",
  "memory/showcase/agents": "Memory · Showcase · Agent grounding",
  "memory/showcase/drift": "Memory · Showcase · Drift detection",
  "memory/showcase/declared": "Memory · Showcase · Declared decisions",
  "memory/showcase/profiles": "Memory · Showcase · Entity profiles",
  "memory/make-it-yours/look": "Memory · Make it yours · Look",
  "memory/make-it-yours/behavior": "Memory · Make it yours · Behavior",
  "memory/in-production/sales": "Memory · In production · Sales enablement",
  "memory/in-production/fintech": "Memory · In production · Fintech",
  "memory/in-production/ops": "Memory · In production · Operations",
  "memory/in-production/compliance": "Memory · In production · Compliance",
  "memory/in-production/legal": "Memory · In production · Legal",
  "memory/in-production/ai": "Memory · In production · AI-native",
  "memory/related/review-agents": "Memory · Related · Review agents",
  "memory/related/audit-trail": "Memory · Related · Audit trail",
  "memory/related/approval-flows": "Memory · Related · Approval flows",

  "notifications/hero/inbox": "Notifications · Hero · In-app inbox",
  "notifications/hero/email": "Notifications · Hero · Email",
  "notifications/hero/slack": "Notifications · Hero · Slack",
  "notifications/hero/preferences": "Notifications · Hero · Preferences",
  "notifications/what-it-is/scene": "Notifications · What it is · Mixed scene",
  "notifications/showcase/inbox": "Notifications · Showcase · In-app inbox",
  "notifications/showcase/email": "Notifications · Showcase · Email notifications",
  "notifications/showcase/batching": "Notifications · Showcase · Batching and digests",
  "notifications/showcase/preferences": "Notifications · Showcase · Per-user preferences",
  "notifications/showcase/custom": "Notifications · Showcase · Custom notifications (REST)",
  "notifications/showcase/webhooks": "Notifications · Showcase · Webhooks to your channels",
  "notifications/showcase/agents": "Notifications · Showcase · Agent activity",
  "notifications/showcase/permissions": "Notifications · Showcase · Permission-scoped feeds",
  "notifications/showcase/self-host": "Notifications · Showcase · Data on your infrastructure",
  "notifications/make-it-yours/look": "Notifications · Make it yours · Look",
  "notifications/make-it-yours/behavior": "Notifications · Make it yours · Behavior",
  "notifications/in-production/sales": "Notifications · In production · Sales enablement",
  "notifications/in-production/fintech": "Notifications · In production · Fintech",
  "notifications/in-production/ops": "Notifications · In production · Operations",
  "notifications/in-production/compliance": "Notifications · In production · Compliance",
  "notifications/in-production/legal": "Notifications · In production · Legal",
  "notifications/in-production/ai": "Notifications · In production · AI-native",
  "notifications/related/comments": "Notifications · Related · Comments",
  "notifications/related/approval-flows": "Notifications · Related · Approval flows",
  "notifications/related/review-agents": "Notifications · Related · Review agents",

  "presence/hero/avatars": "Presence · Hero · Avatars",
  "presence/hero/cursors": "Presence · Hero · Cursors",
  "presence/hero/selection": "Presence · Hero · Selection",
  "presence/hero/follow": "Presence · Hero · Follow mode",
  "presence/what-it-is/scene": "Presence · What it is · Mixed scene",
  "presence/showcase/avatars": "Presence · Showcase · Avatar stack with overflow",
  "presence/showcase/states": "Presence · Showcase · Online, away, offline",
  "presence/showcase/agent": "Presence · Showcase · Agent presence",
  "presence/showcase/cursors": "Presence · Showcase · Live cursors",
  "presence/showcase/selection": "Presence · Showcase · Live selection",
  "presence/showcase/follow": "Presence · Showcase · Follow mode",
  "presence/showcase/location": "Presence · Showcase · Presence by location",
  "presence/showcase/data": "Presence · Showcase · Presence data and events",
  "presence/make-it-yours/look": "Presence · Make it yours · Look",
  "presence/make-it-yours/behavior": "Presence · Make it yours · Behavior",
  "presence/in-production/sales": "Presence · In production · Sales enablement",
  "presence/in-production/fintech": "Presence · In production · Fintech",
  "presence/in-production/ops": "Presence · In production · Operations",
  "presence/in-production/compliance": "Presence · In production · Compliance",
  "presence/in-production/legal": "Presence · In production · Legal",
  "presence/in-production/ai": "Presence · In production · AI-native",
  "presence/related/comments": "Presence · Related · Comments",
  "presence/related/multiplayer-editing": "Presence · Related · Multiplayer editing",
  "presence/related/huddle": "Presence · Related · Huddle",
};

// Demo keys contributed by per-page preset modules (pure-data, Studio-safe).
const PAGE_DEMO_KEYS: string[] = [
  ...MULTIPLAYER_EDITING_DEMO_KEYS,
  ...RECORDING_DEMO_KEYS,
  ...REVIEW_AGENTS_DEMO_KEYS,
  ...APPROVAL_FLOWS_DEMO_KEYS,
  ...COMMENTS_DEMO_KEYS,
  ...HUDDLE_DEMO_KEYS,
  ...SUGGESTIONS_DEMO_KEYS,
  ...SELF_HOSTING_DEMO_KEYS,
  ...SOLUTIONS_SALES_ENABLEMENT_DEMO_KEYS,
  ...SOLUTIONS_FINTECH_DEMO_KEYS,
  ...SOLUTIONS_OPERATIONS_DEMO_KEYS,
  ...SOLUTIONS_AI_NATIVE_SAAS_DEMO_KEYS,
  ...SOLUTIONS_COMPLIANCE_DEMO_KEYS,
  ...SOLUTIONS_LEGAL_DEMO_KEYS,
];

/**
 * Derive a human-readable Studio title from a demo-preset key.
 * e.g. "comments/showcase/mentions" -> "Comments · Showcase · Mentions".
 * @param {string} key The demo-preset key.
 * @returns {string} A title-cased, middot-separated label.
 */
function titleFromKey(key: string): string {
  try {
    return key
      .split("/")
      .map((part) => part.replace(/-/g, " ").replace(/^\w/, (chr) => chr.toUpperCase()))
      .join(" · ");
  } catch {
    return key;
  }
}

// All demo-preset keys (built-in pages + per-page modules), for Studio dropdowns.
export const FEATURE_NEW_DEMO_KEYS: string[] = [...BUILT_IN_DEMO_KEYS, ...PAGE_DEMO_KEYS];

// Titles for every key: explicit for built-in pages, derived for the rest.
export const FEATURE_NEW_DEMO_TITLES: Record<string, string> = {
  ...BUILT_IN_DEMO_TITLES,
  ...Object.fromEntries(PAGE_DEMO_KEYS.map((key) => [key, titleFromKey(key)])),
};

// Icon presets for cards that render a leading icon (Make-it-yours, Related).
export const FEATURE_NEW_ICON_KEYS = ["shield", "velt"] as const;

export type FeatureNewIconKey = (typeof FEATURE_NEW_ICON_KEYS)[number];

export const FEATURE_NEW_ICON_TITLES: Record<FeatureNewIconKey, string> = {
  shield: "Shield (security)",
  velt: "Velt mark",
};
