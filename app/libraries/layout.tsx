// /libraries serves two generations from one route: v2 (LibraryPageV2 ->
// HubView/SpokeView) renders the new home-new Nav, and legacy v1 (libraryPage)
// renders the legacy fixed Nav itself. This layout must NOT add a Nav of its
// own — that would stack a second nav on the v2 pages. Pass-through; nav chrome
// lives in each page body. Mirrors app/(features)/layout.tsx.
export default function LibrariesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
