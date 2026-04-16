import Link from "next/link";

export function BlogFooter() {
  return (
    <footer className="border-t border-white/5 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-sm text-white/30">
          © {new Date().getFullYear()} Velt. All rights reserved.
        </div>
        <div className="flex gap-6">
          <Link href="/" className="text-sm text-white/40 hover:text-white transition-colors">Home</Link>
          <Link href="/blog" className="text-sm text-white/40 hover:text-white transition-colors">Blog</Link>
          <Link href="https://docs.velt.dev/" className="text-sm text-white/40 hover:text-white transition-colors">Docs</Link>
          <Link href="/pricing" className="text-sm text-white/40 hover:text-white transition-colors">Pricing</Link>
          <Link href="/privacy" className="text-sm text-white/40 hover:text-white transition-colors">Privacy</Link>
        </div>
      </div>
    </footer>
  );
}
