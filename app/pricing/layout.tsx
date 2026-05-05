import { Nav } from "@/components/home/Nav";

// Pricing page reuses the homepage chrome. Mirrors app/features/layout.tsx
// and app/libraries/layout.tsx — Nav lives OUTSIDE the ScaleWrapper (its
// position is viewport-relative, not design-width-bound). Footer renders
// inside the page's ScaleWrapper.
export default function PricingLayout({
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
