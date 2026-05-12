import { Nav } from "@/components/home/Nav";

// Careers reuses the homepage chrome. Mirrors app/features/layout.tsx —
// Nav lives OUTSIDE the page content so its fixed position is viewport-
// relative, not design-width-bound. Footer renders inside the page.
export default function CareersLayout({
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
