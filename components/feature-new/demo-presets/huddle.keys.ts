// Pure-data list of Huddle (v10) feature-page demo-preset keys. Mirrors the
// keys of HUDDLE_DEMOS in ./huddle.tsx, in the same order, with no imports so
// the Sanity schema / seed can reference them without pulling React into the
// Studio bundle.

export const HUDDLE_DEMO_KEYS: string[] = [
  // Hero — guided demo beats
  "huddle/hero/start",
  "huddle/hero/join",
  "huddle/hero/share",
  "huddle/hero/decide",
  // What it is
  "huddle/what-it-is/scene",
  // Showcase cards
  "huddle/showcase/audio",
  "huddle/showcase/video",
  "huddle/showcase/screen-share",
  "huddle/showcase/no-link",
  "huddle/showcase/scoped",
  "huddle/showcase/presence",
  "huddle/showcase/chat",
  "huddle/showcase/webhooks",
  // Make it yours
  "huddle/make-it-yours/look",
  "huddle/make-it-yours/behavior",
  // In production
  "huddle/in-production/sales",
  "huddle/in-production/fintech",
  "huddle/in-production/ops",
  "huddle/in-production/compliance",
  "huddle/in-production/legal",
  "huddle/in-production/ai",
  // Related primitives
  "huddle/related/comments",
  "huddle/related/recording",
  "huddle/related/presence",
];
