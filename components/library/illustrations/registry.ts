// Registry mapping CMS illustration keys to their React components.
// The Sanity `libraryPage.bento.cards[].illustrationKey` field is validated
// against ILLUSTRATION_KEYS (in ./keys.ts) so editors pick from a fixed
// dropdown — this keeps the CMS surface narrow while letting the page
// composition (8 cards in a 2×4 grid) be re-ordered or remixed per library.
//
// Adding a new illustration: author the component in ./library.tsx, add
// its key + title in ./keys.ts, then register the component here.

import type { ComponentType } from "react";

import {
  ContextualCommentsIllustration,
  CustomizableCursorsIllustration,
  MultiplayerEditingIllustration,
  NotificationIllustration,
  OfflineStorageIllustration,
  SingleEditorModeIllustration,
  UserMentionsIllustration,
  VersionHistoryIllustration,
} from "./library";
import type { IllustrationKey } from "./keys";

export const illustrationRegistry: Record<IllustrationKey, ComponentType> = {
  multiplayerEditing: MultiplayerEditingIllustration,
  contextualComments: ContextualCommentsIllustration,
  customizableCursors: CustomizableCursorsIllustration,
  userMentions: UserMentionsIllustration,
  notification: NotificationIllustration,
  versionHistory: VersionHistoryIllustration,
  singleEditorMode: SingleEditorModeIllustration,
  offlineStorage: OfflineStorageIllustration,
};

export type { IllustrationKey } from "./keys";
export { ILLUSTRATION_KEYS, ILLUSTRATION_TITLES } from "./keys";
