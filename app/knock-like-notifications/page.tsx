// /knock-like-notifications — legacy SEO landing that renders the same
// Sanity-backed body as /notifications via the shared FeaturePageBody.
// Targets the "Knock alternative" keyword while reusing the canonical
// /notifications content. Canonical/OG stay on this URL.

import { FeaturePageBody } from "@/components/feature/FeaturePageBody";

export const revalidate = 60;

const PAGE_DESCRIPTION =
  "Ship Knock-style in-app notifications in days. Velt provides drop-in inbox, bell, grouped notifications, and multi-channel delivery — the same surface that powers /notifications.";

export const metadata = {
  title: "Knock-like notifications",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/knock-like-notifications",
  },
  openGraph: {
    url: "https://velt.dev/knock-like-notifications",
    title: "Knock-like notifications | Velt",
    description: PAGE_DESCRIPTION,
  },
};

export default function KnockLikeNotificationsPage() {
  return (
    <FeaturePageBody
      sanitySlug="notifications"
      pageUrlPath="knock-like-notifications"
    />
  );
}
