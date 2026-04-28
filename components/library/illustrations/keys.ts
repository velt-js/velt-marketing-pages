// Pure-data list of illustration keys + display titles.
// Lives separately from registry.ts so the Sanity schema can import the
// dropdown options without pulling React component code into the Studio
// bundle. Components are wired up in ./registry.ts.

export const ILLUSTRATION_KEYS = [
  "multiplayerEditing",
  "contextualComments",
  "customizableCursors",
  "userMentions",
  "notification",
  "versionHistory",
  "singleEditorMode",
  "offlineStorage",
] as const;

export type IllustrationKey = (typeof ILLUSTRATION_KEYS)[number];

// Human-readable titles surfaced in the Sanity Studio dropdown so editors
// see "Multiplayer Editing" instead of the raw key.
export const ILLUSTRATION_TITLES: Record<IllustrationKey, string> = {
  multiplayerEditing: "Multiplayer Editing",
  contextualComments: "Contextual Comments",
  customizableCursors: "Customizable Cursors",
  userMentions: "User Mentions",
  notification: "Notification",
  versionHistory: "Version History",
  singleEditorMode: "Single Editor Mode",
  offlineStorage: "Offline Storage",
};
