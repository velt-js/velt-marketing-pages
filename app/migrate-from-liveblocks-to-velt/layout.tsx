import { Nav } from "@/components/home/Nav";

// Legacy SEO landing that mirrors /migrate/liveblocks 1:1. Nav stays
// viewport-fixed across the dark hero / white body / dark footer.
export default function MigrateFromLiveblocksLayout({
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
