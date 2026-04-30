// Maps FeatureUiKey → React component used inside feature bento cards
// and feature card-row demos. Imports are eager so the bundle ships all
// previews; if the count grows large we can switch to lazy().

import type { ComponentType } from "react";

import type { FeatureUiKey } from "./keys";

import { MentionDropdownUi } from "./MentionDropdown";
import { TaskStatusPillsUi } from "./TaskStatusPills";
import { AudioRecordingCardUi } from "./AudioRecordingCard";
import { ReactionsRowUi } from "./ReactionsRow";
import { InAppNotificationsPanelUi } from "./InAppNotificationsPanel";
import { EmailNotificationCardUi } from "./EmailNotificationCard";
import { CommentsSidebarUi } from "./CommentsSidebar";
import { MiniMapUi } from "./MiniMap";
import { CustomDataChipUi } from "./CustomDataChip";
import { CustomDropdownDemoUi } from "./CustomDropdownDemo";
import { CustomAutocompleteDemoUi } from "./CustomAutocompleteDemo";

export const featureUiRegistry: Record<FeatureUiKey, ComponentType> = {
  mentionDropdown: MentionDropdownUi,
  taskStatusPills: TaskStatusPillsUi,
  audioRecordingCard: AudioRecordingCardUi,
  reactionsRow: ReactionsRowUi,
  inAppNotificationsPanel: InAppNotificationsPanelUi,
  emailNotificationCard: EmailNotificationCardUi,
  commentsSidebar: CommentsSidebarUi,
  miniMap: MiniMapUi,
  customDataChip: CustomDataChipUi,
  customDropdownDemo: CustomDropdownDemoUi,
  customAutocompleteDemo: CustomAutocompleteDemoUi,
};
