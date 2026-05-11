import { Nav } from "@/components/home/Nav";

// Mirrors app/privacy/layout.tsx — Nav lives OUTSIDE the ScaleWrapper
// so it stays viewport-relative and isn't clipped by the scale transform.
export default function EnterpriseLayout({
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
