import { Nav } from "@/components/home/Nav";

// Library pages reuse the homepage chrome. Nav lives OUTSIDE the
// ScaleWrapper (its position is viewport-relative, not design-width-bound).
// Footer is rendered inside each page's ScaleWrapper so it scales with
// the rest of the content, matching homepage behavior (app/page.tsx:42-85).
export default function LibrariesLayout({
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
