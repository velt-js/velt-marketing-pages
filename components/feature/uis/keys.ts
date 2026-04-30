// Pure-data list of feature-page UI component keys + display titles.
// Mirrors components/library/illustrations/keys.ts so the Sanity schema
// can import the dropdown options without pulling React component code
// into the Studio bundle. Components are wired up in ./registry.ts.

export const FEATURE_UI_KEYS = [
  // Bento — "Powerful and Beautiful Commenting"
  "mentionDropdown",
  "taskStatusPills",
  "audioRecordingCard",
  "reactionsRow",
  // Bento — "More Than Just Commenting"
  "inAppNotificationsPanel",
  "emailNotificationCard",
  "commentsSidebar",
  "miniMap",
  // Card row — "Extend the Capabilities"
  "customDataChip",
  "customDropdownDemo",
  "customAutocompleteDemo",
] as const;

export type FeatureUiKey = (typeof FEATURE_UI_KEYS)[number];

export const FEATURE_UI_TITLES: Record<FeatureUiKey, string> = {
  mentionDropdown: "@mentions dropdown",
  taskStatusPills: "Task status pills",
  audioRecordingCard: "Audio recording card",
  reactionsRow: "Reactions row",
  inAppNotificationsPanel: "In-app notifications panel",
  emailNotificationCard: "Email notification card",
  commentsSidebar: "Comments sidebar",
  miniMap: "Mini map",
  customDataChip: "Custom data chip",
  customDropdownDemo: "Custom dropdown demo",
  customAutocompleteDemo: "Custom autocomplete demo",
};
