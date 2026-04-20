// Nav — Figma node 8506:102880. Backdrop-blurred top bar (1440×57), left
// logo + 6 nav links (first 5 with caret), right Sign In / Read Docs /
// Book Demo. All link text is 14px Urbanist Medium at 75% opacity except
// Book Demo which is 14px SemiBold on a solid purple pill.

const navLinks: { label: string; hasCaret: boolean }[] = [
  { label: "Features", hasCaret: true },
  { label: "Use Cases", hasCaret: true },
  { label: "Platforms", hasCaret: true },
  { label: "Resources", hasCaret: true },
  { label: "Compare", hasCaret: true },
  { label: "Pricing", hasCaret: false },
];

export function Nav() {
  return (
    <nav
      className="flex items-center gap-6 w-full"
      style={{
        padding: "12px 80px",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <div className="flex-1 flex items-center" style={{ gap: 16 }}>
        <a href="/" aria-label="Velt home" className="flex items-center shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/velt-logo.svg" alt="Velt" width={24} height={24} />
        </a>
        <ul className="flex items-start" style={{ gap: 12 }}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                className="flex items-center rounded-[4px]"
                style={{ padding: "4px 8px", gap: 4 }}
              >
                <span
                  className="font-urbanist font-medium whitespace-nowrap capitalize"
                  style={{
                    color: "#fff",
                    opacity: 0.75,
                    fontSize: 14,
                    lineHeight: 1.2,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {link.label}
                </span>
                {link.hasCaret && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src="/images/home/icon-chevron-down.svg" alt="" width={14} height={14} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center" style={{ gap: 8 }}>
        <button
          className="flex items-start rounded-lg"
          style={{ padding: "8px 12px 8px 8px", gap: 6 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/icon-login.svg" alt="" width={16} height={16} />
          <span
            className="font-urbanist font-medium whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Sign In
          </span>
        </button>
        <button
          className="flex items-start rounded-lg"
          style={{ padding: "8px 12px 8px 8px", gap: 6 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/home/icon-book-nav.svg" alt="" width={16} height={16} />
          <span
            className="font-urbanist font-medium whitespace-nowrap"
            style={{ color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Read Docs
          </span>
        </button>
        <button
          className="rounded-lg"
          style={{ padding: "8px 12px", background: "#625df5" }}
        >
          <span
            className="font-urbanist font-semibold text-white whitespace-nowrap"
            style={{ fontSize: 14, lineHeight: 1.2, letterSpacing: "-0.03em" }}
          >
            Book Demo
          </span>
        </button>
      </div>
    </nav>
  );
}
