// Pure-data list of demo-preset keys for the /new-features/recording page.
// Mirrors Object.keys(RECORDING_DEMOS) in components/feature-new/demo-presets/
// recording.tsx, in the same order. No React/JSX, no imports, so the Sanity
// Studio bundle can read the key list without pulling in component code.

export const RECORDING_DEMO_KEYS: string[] = [
  "recording/hero/voice",
  "recording/hero/video",
  "recording/hero/screen",
  "recording/hero/editor",
  "recording/what-it-is/scene",
  "recording/showcase/voice",
  "recording/showcase/video",
  "recording/showcase/screen",
  "recording/showcase/pinned",
  "recording/showcase/transcription",
  "recording/showcase/editor",
  "recording/showcase/threads",
  "recording/showcase/events",
  "recording/showcase/self-host",
  "recording/make-it-yours/look",
  "recording/make-it-yours/behavior",
  "recording/in-production/sales",
  "recording/in-production/fintech",
  "recording/in-production/ops",
  "recording/in-production/ai",
  "recording/related/comments",
  "recording/related/huddle",
  "recording/related/notifications",
];
