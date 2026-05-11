import { Nav } from "@/components/home/Nav";

// Mirrors app/comparison/layout.tsx — Nav lives OUTSIDE the ScaleWrapper so
// it stays viewport-relative. Same theme-switch hooks (data-outcomes /
// data-getstarted) drive Nav color transitions on this page too.
export default function LiveblocksAlternativeLayout({
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
