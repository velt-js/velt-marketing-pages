import { Nav } from "@/components/home/Nav";

// Integrations pages reuse the homepage chrome. Nav lives OUTSIDE any
// ScaleWrapper (its position is viewport-relative, not design-width-bound).
export default function IntegrationsLayout({
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
