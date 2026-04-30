import { Nav } from "@/components/home/Nav";

// Feature pages reuse the homepage chrome. Mirrors app/libraries/layout.tsx —
// Nav lives OUTSIDE the ScaleWrapper (its position is viewport-relative,
// not design-width-bound). Footer renders inside each page's ScaleWrapper.
export default function FeaturesLayout({
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
