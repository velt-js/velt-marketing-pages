import { Nav } from "@/components/home/Nav";

// Top-level feature slug pages reuse the homepage chrome. Mirrors
// app/features/layout.tsx — Nav lives OUTSIDE the ScaleWrapper (its position is
// viewport-relative, not design-width-bound). Footer renders inside each page's
// ScaleWrapper. The (features) route group keeps these pages organized in one
// folder while serving them at root-level URLs (e.g. /comments, /recordings).
export default function FeatureSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
        }}
      >
        <Nav />
      </div>
      {children}
    </>
  );
}
