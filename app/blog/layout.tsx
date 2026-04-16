import { BlogNav } from "@/components/BlogNav";
import { BlogFooter } from "@/components/BlogFooter";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <BlogNav />
      <main>{children}</main>
      <BlogFooter />
    </div>
  );
}
