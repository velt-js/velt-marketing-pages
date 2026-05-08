import { Nav } from "@/components/home/Nav";

// Mirrors app/use-case/layout.tsx — Nav lives OUTSIDE the
// ScaleWrapper so it stays viewport-relative.
export default function MigrateLayout({
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
