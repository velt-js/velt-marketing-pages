import { Nav } from "@/components/home/Nav";

// /yc reuses the homepage chrome. Mirrors app/consult/layout.tsx and
// app/careers/layout.tsx — Nav lives OUTSIDE the page so its fixed
// position is viewport-relative. Footer renders inside the page.
export default function YcLayout({
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
