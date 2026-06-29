// /pricing renders its own chrome (the editorial home-new Nav + Footer)
// inside page.tsx, mirroring the homepage. So this layout is a passthrough
// rather than re-exporting the legacy FixedNavLayout, which would inject a
// second, dark-theme nav above the page.
export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
