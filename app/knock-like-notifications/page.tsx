// /knock-like-notifications — legacy SEO landing that renders the same
// Sanity-backed body as /notifications via the shared FeaturePageBody.
// Targets the "Knock alternative" keyword while reusing the canonical
// /notifications content. H1 is overridden to differentiate from
// /notifications and /add-notifications-quick (which share Sanity copy).

import { FeaturePageBody } from "@/components/feature/FeaturePageBody";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

export const revalidate = 60;

const PAGE_DESCRIPTION =
  "Ship Knock-style in-app notifications in days. Velt provides drop-in inbox, bell, grouped notifications, and multi-channel delivery — the same surface that powers /notifications.";

export const metadata = buildPageMetadata({
  title: "Knock-like notifications",
  description: PAGE_DESCRIPTION,
  path: "/knock-like-notifications",
  ogImage: "/og/knock-like-notifications.png",
});

export default function KnockLikeNotificationsPage() {
  return (
    <FeaturePageBody
      sanitySlug="notifications"
      pageUrlPath="knock-like-notifications"
      heroOverride={{
        heading: "Build Notifications Quickly",
        subheading:
          "The easy-to-integrate notifications solution for your product",
      }}
    />
  );
}
