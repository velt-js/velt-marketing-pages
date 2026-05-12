// /migrate-from-liveblocks-to-velt — legacy SEO landing that renders the
// same Sanity-backed body as /migrate/liveblocks via the shared
// MigrationPageBody. Canonical/OG stay on this URL so search engines can
// rank it for the legacy keyword.

import { MigrationPageBody } from "@/components/migrate/MigrationPageBody";

export const revalidate = 60;

const PAGE_DESCRIPTION =
  "Move off Liveblocks in days. Velt ships drop-in components for comments, notifications, presence, cursors, multiplayer editing, and recordings — with a free migration plan.";

export const metadata = {
  title: "Migrate from Liveblocks to Velt",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/migrate-from-liveblocks-to-velt",
  },
  openGraph: {
    url: "https://velt.dev/migrate-from-liveblocks-to-velt",
    title: "Migrate from Liveblocks to Velt | Velt",
    description: PAGE_DESCRIPTION,
  },
};

export default function MigrateFromLiveblocksPage() {
  return (
    <MigrationPageBody
      sanitySlug="liveblocks"
      pageUrlPath="migrate-from-liveblocks-to-velt"
    />
  );
}
