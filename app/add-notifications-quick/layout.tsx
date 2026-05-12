import { Nav } from "@/components/home/Nav";

// /add-notifications-quick reuses the homepage chrome. Mirrors
// app/consult/layout.tsx — Nav lives OUTSIDE the page so its position stays
// viewport-fixed across the dark hero / white body / dark footer transitions.
export default function AddNotificationsQuickLayout({
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
