// Footer — Figma node 1:20067. Outer container 1280px wide, 64px vertical
// inner padding. Left info column (340px) + 940px link area with 8 link
// groups that flex-wrap into 4 × 2. Chart and Canvas Libraries stack
// inside the same column. Divider + 3-column bottom row below.

type LinkRef = { label: string; href: string; newTab?: boolean };

type LinkGroup = {
  heading: string;
  /** Plain strings render as dead `href="#"` placeholders (legacy default).
   *  Pass a `LinkRef` object for any link that should actually route. */
  links: (string | LinkRef)[];
  variant?: "default" | "library";
};

const asyncFeatures: LinkGroup = {
  heading: "Async Features",
  links: [
    "Comments",
    "Notifications",
    "Recording",
    "Video Editor",
    "VIew Analytics",
    "Reactions",
    "Customization",
    "Try Features",
  ],
};

const editorLibraries: LinkGroup = {
  heading: "Editor Libraries",
  links: ["YJS", "Tiptap", "BlockNote", "CodeMirror", "Lexical", "SlateJS"],
  variant: "library",
};

const realtimeFeatures: LinkGroup = {
  heading: "Realtime Features",
  links: [
    "Multiplayer Editing",
    "Single Editor",
    "Live State Sync",
    "Live Selection",
    "Huddle",
    "Presence",
    "Cursors",
    "Follow Mode",
    "Customization",
    "Try Features",
  ],
};

const chartLibraries: LinkGroup = {
  heading: "Chart Libraries",
  links: ["ChartJS", "Nivo Charts", "HighCharts"],
  variant: "library",
};

const canvasLibraries: LinkGroup = {
  heading: "Canvas Libraries",
  links: ["React Flow"],
  variant: "library",
};

const platform: LinkGroup = {
  heading: "Platform",
  links: ["Admin Console", "Dev Tools", "MCP", "Webhooks & API"],
};

const resources: LinkGroup = {
  heading: "Resources",
  links: [
    "Blog",
    "Docs",
    "Release Notes",
    { label: "Migrate from Liveblocks", href: "/migrate/liveblocks" },
    { label: "Migrate from Cord", href: "/migrate/cord" },
    "Launch Kit",
    "Themes Playground",
    "Figma UI Kit",
    "Examples",
    "Compare Velt",
    "Compare Velt Implementation",
  ],
};

const useCases: LinkGroup = {
  heading: "Use Cases",
  links: [
    "Video Editor",
    "Form Builder",
    "Analytics Product",
    "Task Manager",
    "Sheets Product",
    "Session Replay Tool",
    "CRM Product",
  ],
};

const company: LinkGroup = {
  heading: "Company",
  links: [
    "For Enterprise",
    "For YC",
    "Pricing",
    "Customers",
    "Status",
    "Careers",
    "Security",
    "Trust Center",
    "Privacy Policy",
    "Terms",
  ],
};

function LinkColumn({ group }: { group: LinkGroup }) {
  const linkColor =
    group.variant === "library" ? "var(--color-velt-link-muted)" : "rgba(255,255,255,0.52)";
  const linkWeight = group.variant === "library" ? 300 : 400;
  return (
    <div className="flex flex-col" style={{ gap: 20, minWidth: 0 }}>
      <h3
        className="font-urbanist font-bold text-white"
        style={{ fontSize: 14, lineHeight: "15.4px" }}
      >
        {group.heading}
      </h3>
      <ul className="flex flex-col" style={{ gap: 20 }}>
        {group.links.map((link) => {
          const label = typeof link === "string" ? link : link.label;
          const href = typeof link === "string" ? "#" : link.href;
          const newTab = typeof link === "string" ? false : link.newTab;
          return (
            <li
              key={label}
              className="font-urbanist"
              style={{
                fontSize: 14,
                lineHeight: "15.4px",
                color: linkColor,
                fontWeight: linkWeight,
              }}
            >
              <a
                href={href}
                target={newTab ? "_blank" : undefined}
                rel={newTab ? "noopener" : undefined}
                className="hover:text-white whitespace-nowrap"
              >
                {label}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SocialIcon({ label, src, href }: { label: string; src: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={label}
      className="flex items-center justify-center opacity-40 hover:opacity-100"
      style={{ width: 24, height: 24 }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={label} width={24} height={24} />
    </a>
  );
}

export function Footer() {
  return (
    <footer
      className="w-full flex flex-col items-center bg-black"
      style={{ padding: "80px 80px 0" }}
    >
      <div
        className="flex flex-col"
        style={{ width: 1280, padding: "64px 0", gap: 64 }}
      >
        {/* Main content row: info column + link grid */}
        <div className="flex items-start justify-between">
          {/* Left info column — Figma 1:20071 (340×280) */}
          <div
            className="flex flex-col"
            style={{ width: 340, gap: 64 }}
          >
            <div className="flex flex-col" style={{ gap: 24 }}>
              <div className="flex flex-col" style={{ gap: 16 }}>
                {/* Logo */}
                <div
                  className="flex items-center justify-center overflow-hidden"
                  style={{ width: 100, height: 40, padding: "0 3.125px" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/home/velt-logo-footer.svg"
                    alt="Velt"
                    width={93.75}
                    height={40}
                    style={{ display: "block", objectFit: "contain" }}
                  />
                </div>
                {/* Tagline */}
                <p
                  className="font-urbanist font-medium text-white"
                  style={{
                    fontSize: 16,
                    lineHeight: "20px",
                    width: 232,
                    opacity: 0.4,
                  }}
                >
                  Add powerful collaborative
                  <br />
                  features ridiculously fast!
                </p>
              </div>
              {/* Badges — match live velt.dev/libraries footer (SOC2 + HIPAA, 52×52). */}
              <div className="flex items-center" style={{ gap: 16 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/security/badge-soc2-footer.png"
                  alt="AICPA SOC"
                  width={52}
                  height={52}
                  style={{ display: "block", objectFit: "contain" }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/security/badge-hipaa-footer.svg"
                  alt="HIPAA"
                  width={52}
                  height={52}
                  style={{ display: "block", objectFit: "contain", filter: "grayscale(1)" }}
                />
              </div>
            </div>
            {/* Button */}
            <button
              className="rounded-md font-urbanist font-semibold text-white"
              style={{
                padding: "8px 16px",
                border: "1px solid var(--color-velt-purple)",
                fontSize: 16,
                width: 160,
                letterSpacing: "-0.48px",
              }}
            >
              Get Free API Key
            </button>
          </div>

          {/* Link grid — Figma 1:20109 (940 wide, flex-wrap 4 × 2) */}
          <div
            className="flex flex-wrap content-start items-start"
            style={{ flex: "1 0 0", minWidth: 0, rowGap: 36, columnGap: 8 }}
          >
            <div style={{ flex: "1 0 0", minWidth: 220 }}>
              <LinkColumn group={asyncFeatures} />
            </div>
            <div style={{ flex: "1 0 0", minWidth: 220 }}>
              <LinkColumn group={editorLibraries} />
            </div>
            <div style={{ flex: "1 0 0", minWidth: 220 }}>
              <LinkColumn group={realtimeFeatures} />
            </div>
            {/* Chart + Canvas stacked in one column — Figma 1:20195 */}
            <div
              style={{ flex: "1 0 0", minWidth: 220 }}
              className="flex flex-col"
            >
              <LinkColumn group={chartLibraries} />
              <div style={{ height: 36 }} />
              <LinkColumn group={canvasLibraries} />
            </div>
            <div style={{ flex: "1 0 0", minWidth: 220 }}>
              <LinkColumn group={platform} />
            </div>
            <div style={{ flex: "1 0 0", minWidth: 220 }}>
              <LinkColumn group={resources} />
            </div>
            <div
              style={{ flex: "1 0 0", minWidth: 220 }}
              className="flex flex-col"
            >
              <LinkColumn group={useCases} />
              <a
                href="#"
                className="mt-5 inline-flex items-center gap-[10px] font-urbanist whitespace-nowrap"
                style={{
                  fontSize: 14,
                  lineHeight: "15.4px",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                View All
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 6 H9.5 M6.5 3 L9.5 6 L6.5 9"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
            <div style={{ flex: "1 0 0", minWidth: 220 }}>
              <LinkColumn group={company} />
            </div>
          </div>
        </div>

        {/* Divider — Figma 1:20343. Radial white gradient, 20% opacity. */}
        <div
          style={{
            width: "100%",
            height: 1,
            opacity: 0.2,
            background:
              "radial-gradient(ellipse 50% 100% at 50% 50%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
        />

        {/* Bottom row — Figma 1:20344. 3 equal columns, 24px tall. */}
        <div className="flex items-center" style={{ height: 24, gap: 10 }}>
          <div
            className="flex items-center"
            style={{ flex: "1 0 0", minWidth: 0, gap: 32 }}
          >
            <SocialIcon
              label="LinkedIn"
              src="/images/home/icon-linkedin.svg"
              href="https://www.linkedin.com/company/veltjs"
            />
            <SocialIcon
              label="X (Twitter)"
              src="/images/home/icon-x-social.svg"
              href="https://x.com/veltjs"
            />
          </div>
          <div
            className="flex justify-center"
            style={{ flex: "1 0 0", minWidth: 0, opacity: 0.4 }}
          >
            <p
              className="font-urbanist font-medium text-white text-center whitespace-nowrap"
              style={{ fontSize: 16, lineHeight: "19.2px" }}
            >
              All rights reserved © 2025 Velt
            </p>
          </div>
          <div
            className="flex items-center justify-end"
            style={{ flex: "1 0 0", minWidth: 0 }}
          >
            <a
              href="https://www.ycombinator.com/companies/velt"
              target="_blank"
              rel="noopener"
              className="flex items-center"
              style={{ gap: 10 }}
            >
              <span
                className="font-urbanist font-medium text-white whitespace-nowrap"
                style={{ fontSize: 16, lineHeight: "19.2px", opacity: 0.4 }}
              >
                Backed by
              </span>
              <div style={{ width: 100, height: 26, opacity: 0.3 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/home/yc-logo.png"
                  alt="Y Combinator"
                  width={100}
                  height={26}
                  style={{
                    display: "block",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
