// /add-notifications-quick — SEO landing that mirrors /notifications 1:1.
// Both routes render the same Sanity-backed FeaturePageBody. Each keeps
// its own canonical/OG metadata so search engines can rank them for their
// respective intents (feature page vs. "add notifications quickly" keyword).

import { FeaturePageBody } from "@/components/feature/FeaturePageBody";

export const revalidate = 60;

const PAGE_DESCRIPTION =
  "Add in-app notifications to your product in days, not months. Velt ships a drop-in inbox, bell, grouped notifications, and multi-channel delivery — the same surface that powers /notifications.";

export const metadata = {
  title: "Add notifications quickly",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/add-notifications-quick",
  },
  openGraph: {
    url: "https://velt.dev/add-notifications-quick",
    title: "Add notifications quickly | Velt",
    description: PAGE_DESCRIPTION,
  },
};

export default function AddNotificationsQuickPage() {
  return (
    <FeaturePageBody
      sanitySlug="notifications"
      pageUrlPath="add-notifications-quick"
    />
  );
}
