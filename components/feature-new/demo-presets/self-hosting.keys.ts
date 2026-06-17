// Pure-data list of demo-preset keys for the /new-features/self-hosting page.
// Must stay identical (same keys, same order) to Object.keys(SELF_HOSTING_DEMOS)
// in ./self-hosting.tsx. No imports: this file is safe to read from data-only
// contexts (e.g. the Sanity Studio bundle).

export const SELF_HOSTING_DEMO_KEYS: string[] = [
  // Self-hosting — hero tabs
  "self-hosting/hero/architecture",
  "self-hosting/hero/data-flow",
  "self-hosting/hero/field-inventory",
  // Self-hosting — what it is
  "self-hosting/what-it-is/scene",
  // Self-hosting — showcase cards
  "self-hosting/showcase/comments",
  "self-hosting/showcase/recordings",
  "self-hosting/showcase/notifications",
  "self-hosting/showcase/activity",
  "self-hosting/showcase/attachments",
  "self-hosting/showcase/users",
  "self-hosting/showcase/field-inventory",
  "self-hosting/showcase/backend-sdks",
  // Self-hosting — make it yours
  "self-hosting/make-it-yours/look",
  "self-hosting/make-it-yours/behavior",
  // Self-hosting — in production
  "self-hosting/in-production/sales",
  "self-hosting/in-production/fintech",
  "self-hosting/in-production/ops",
  "self-hosting/in-production/ai",
  // Self-hosting — related primitives
  "self-hosting/related/comments",
  "self-hosting/related/audit-trail",
  "self-hosting/related/notifications",
];
