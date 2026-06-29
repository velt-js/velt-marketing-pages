// The reskinned /integrations pages (hub + detail) render the new home-new Nav
// themselves inside their .vlp/.vfp shell, so this layout must NOT add a Nav of
// its own (that would stack a second nav). Pass-through; nav chrome lives in
// each page body. Mirrors app/(features)/layout.tsx and app/libraries/layout.tsx.
export default function IntegrationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
