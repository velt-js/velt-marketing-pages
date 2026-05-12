// /migrate-from-liveblocks-to-velt — legacy SEO landing that renders the
// same Sanity-backed body as /migrate/liveblocks via the shared
// MigrationPageBody. Canonical/OG stay on this URL so search engines can
// rank it for the legacy keyword.

import { MigrationPageBody } from "@/components/migrate/MigrationPageBody";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

export const revalidate = 60;

const PAGE_DESCRIPTION =
  "Move off Liveblocks in days. Velt ships drop-in components for comments, notifications, presence, cursors, multiplayer editing, and recordings — with a free migration plan.";

export const metadata = buildPageMetadata({
  title: "Migrate from Liveblocks to Velt",
  description: PAGE_DESCRIPTION,
  path: "/migrate-from-liveblocks-to-velt",
  ogImage: "/og/migrate-from-liveblocks-to-velt.png",
});

export default function MigrateFromLiveblocksPage() {
  return (
    <MigrationPageBody
      sanitySlug="liveblocks"
      pageUrlPath="migrate-from-liveblocks-to-velt"
    />
  );
}
