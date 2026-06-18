/**
 * Passthrough layout for /comparison. The page renders its own editorial
 * `.vlp` Nav + Footer (mirrors /pricing and /blog), so this layout no longer
 * injects the legacy FixedNavLayout chrome.
 * @param props.children The route content.
 * @returns The rendered children.
 */
export default function ComparisonLayout({
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
