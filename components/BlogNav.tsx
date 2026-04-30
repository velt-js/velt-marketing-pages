import Link from "next/link";

export function BlogNav() {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/vCF2hcxqRxsOmGcdO72Zk3CMbU.svg"
            alt="Velt"
            width={24}
            height={24}
          />
          <span className="font-semibold text-lg text-white">Velt</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/blog"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Blog
          </Link>
          <Link
            href="https://docs.velt.dev/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Docs
          </Link>
          <Link
            href="/book-demo"
            className="bg-velt-purple hover:bg-velt-purple/90 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            Book Demo
          </Link>
        </div>
      </nav>
    </header>
  );
}
