import { Nav } from "@/components/home/Nav";

// /add-recording-quick reuses the homepage chrome. Mirrors app/consult/layout.tsx —
// Nav lives OUTSIDE the page so its position stays viewport-fixed.
export default function AddRecordingQuickLayout({
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
