// Pure-data list of demo-preset keys for the /new-features/suggestions page.
// No imports: this mirrors the key order of SUGGESTIONS_DEMOS so the Sanity
// schema and seed can reference keys without pulling React component code.
// Must stay in sync with components/feature-new/demo-presets/suggestions.tsx.

export const SUGGESTIONS_DEMO_KEYS: string[] = [
  // Hero tabs
  "suggestions/hero/editor",
  "suggestions/hero/custom",
  "suggestions/hero/agent",
  // What it is
  "suggestions/what-it-is/scene",
  // Showcase cards
  "suggestions/showcase/targets",
  "suggestions/showcase/diff",
  "suggestions/showcase/agents",
  "suggestions/showcase/intent",
  "suggestions/showcase/apply",
  "suggestions/showcase/multi-control",
  "suggestions/showcase/stale",
  "suggestions/showcase/queries",
  // Make it yours
  "suggestions/make-it-yours/look",
  "suggestions/make-it-yours/behavior",
  // In production
  "suggestions/in-production/sales",
  "suggestions/in-production/fintech",
  "suggestions/in-production/ops",
  "suggestions/in-production/ai",
  // Related primitives
  "suggestions/related/comments",
  "suggestions/related/review-agents",
  "suggestions/related/audit-trail",
];
