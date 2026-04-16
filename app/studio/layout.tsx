export const metadata = {
  title: "Velt Marketing — Sanity Studio",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100vh" }}>{children}</div>
  );
}
