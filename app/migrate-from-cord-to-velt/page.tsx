// /migrate-from-cord-to-velt — legacy SEO landing that renders the same
// Sanity-backed body as /migrate/cord, reskinned onto the editorial
// home-new design system via MigrationNewBody. Canonical/OG stay on this
// URL so search engines can rank it for the legacy keyword.

import { MigrationNewBody } from "@/components/migrate-new/MigrationNewBody";
import { buildPageMetadata } from "@/app/_seo/page-metadata";

export const revalidate = 60;

const PAGE_DESCRIPTION =
  "Cord shut down. Move to Velt in days — same comments, presence, mentions, notifications, plus a free migration plan and a modern SDK that keeps shipping.";

export const metadata = buildPageMetadata({
  title: "Migrate from Cord to Velt: Free Migration Plan",
  description: PAGE_DESCRIPTION,
  path: "/migrate-from-cord-to-velt",
  ogImage: "/og/migrate-from-cord-to-velt.png",
});

export default function MigrateFromCordPage() {
  return (
    <MigrationNewBody
      sanitySlug="cord"
      pageUrlPath="migrate-from-cord-to-velt"
    />
  );
}
