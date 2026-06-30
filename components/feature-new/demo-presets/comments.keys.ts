// Pure-data list of demo-preset keys for the /new-features/comments page.
// No imports: this mirrors Object.keys(COMMENTS_DEMOS) in ./comments.tsx, in
// the same order, so the seed script and Sanity schema can reference keys
// without pulling React component code into non-React bundles.

export const COMMENTS_DEMO_KEYS: string[] = [
  // Comments — hero tabs
  "comments/hero/freestyle",
  "comments/hero/popover",
  "comments/hero/text",
  "comments/hero/page",
  // Comments — what it is
  "comments/what-it-is/scene",
  // Comments — showcase cards
  "comments/showcase/anything",
  "comments/showcase/agents",
  "comments/showcase/private",
  "comments/showcase/mentions",
  "comments/showcase/status",
  "comments/showcase/attachments",
  "comments/showcase/recordings",
  "comments/showcase/webhooks",
  // Comments — make it yours
  "comments/make-it-yours/look",
  "comments/make-it-yours/behavior",
  // Comments — in production (mirrors the Solutions nav, AI-native last)
  "comments/in-production/sales",
  "comments/in-production/fintech",
  "comments/in-production/ops",
  "comments/in-production/compliance",
  "comments/in-production/legal",
  "comments/in-production/ai",
  // Comments — related primitives
  "comments/related/suggestions",
  "comments/related/review-agents",
  "comments/related/notifications",
];
