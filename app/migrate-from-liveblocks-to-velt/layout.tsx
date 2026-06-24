/**
 * Passthrough layout for /migrate-from-liveblocks-to-velt. The page renders
 * its own editorial `.vlp` Nav + Footer (via MigrationPageBodyNew, mirroring
 * /comparison), so this layout no longer injects the legacy FixedNavLayout
 * chrome — which would otherwise double the navigation bar.
 * @param {{ children: React.ReactNode }} props The route content.
 * @returns {JSX.Element} The rendered children.
 */
export default function MigrateFromLiveblocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    return <>{children}</>;
  } catch {
    return <>{children}</>;
  }
}
