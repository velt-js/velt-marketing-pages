// The (features) group serves two page generations from one [slug] route:
// v2 (FeaturePageView) renders the new home-new Nav, and legacy v1
// (FeaturePageBody) renders the legacy fixed Nav itself. This layout must NOT
// add a Nav of its own — doing so stacked a second nav on the v2 pages. Kept
// as a pass-through; nav chrome lives in each page body (and the 404).
export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
