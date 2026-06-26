// /migrate-from-liveblocks-to-velt — legacy SEO landing that renders the
// same Sanity-backed content as /migrate/liveblocks, reskinned on the
// editorial home-new (`.vlp`) design system via the shared MigrationNewBody
// (also used by /migrate-from-cord-to-velt). Canonical/OG stay on this URL so
// search engines can rank it for the legacy keyword. (The dynamic
// /migrate/[slug] route still uses the legacy dark MigrationPageBody, so this
// reskin is scoped to the two top-level SEO landings only.)

import { MigrationNewBody } from "@/components/migrate-new/MigrationNewBody";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

export const revalidate = 60;

const PAGE_DESCRIPTION =
  "Move off Liveblocks in days. Velt ships drop-in components for comments, notifications, presence, cursors, multiplayer editing, and recordings, with a free migration plan.";

export const metadata = buildPageMetadata({
  title: "Migrate from Liveblocks to Velt",
  description: PAGE_DESCRIPTION,
  path: "/migrate-from-liveblocks-to-velt",
  ogImage: "/og/migrate-from-liveblocks-to-velt.png",
});

export default function MigrateFromLiveblocksPage() {
  return (
    <MigrationNewBody
      sanitySlug="liveblocks"
      pageUrlPath="migrate-from-liveblocks-to-velt"
    />
  );
}
