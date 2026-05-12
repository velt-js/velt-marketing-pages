// /migrate-from-cord-to-velt — legacy SEO landing that renders the same
// Sanity-backed body as /migrate/cord via the shared MigrationPageBody.
// Canonical/OG stay on this URL so search engines can rank it for the
// legacy keyword.

import { MigrationPageBody } from "@/components/migrate/MigrationPageBody";

export const revalidate = 60;

const PAGE_DESCRIPTION =
  "Cord shut down. Move to Velt in days — same comments, presence, mentions, notifications, plus a free migration plan and a modern SDK that keeps shipping.";

export const metadata = {
  title: "Migrate from Cord to Velt",
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/migrate-from-cord-to-velt",
  },
  openGraph: {
    url: "https://velt.dev/migrate-from-cord-to-velt",
    title: "Migrate from Cord to Velt | Velt",
    description: PAGE_DESCRIPTION,
  },
};

export default function MigrateFromCordPage() {
  return (
    <MigrationPageBody
      sanitySlug="cord"
      pageUrlPath="migrate-from-cord-to-velt"
    />
  );
}
