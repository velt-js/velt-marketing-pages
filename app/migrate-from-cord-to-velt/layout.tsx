/**
 * Passthrough layout for /migrate-from-cord-to-velt. The page renders its own
 * editorial `.vlp` Nav + Footer (via the shared MigrationNewBody, mirroring
 * /comparison and the sibling liveblocks landing), so this layout no longer
 * injects the legacy FixedNavLayout chrome — which would otherwise double the
 * navigation bar.
 * @param {{ children: React.ReactNode }} props The route content.
 * @returns {JSX.Element} The rendered children.
 */
export default function MigrateFromCordLayout({
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
