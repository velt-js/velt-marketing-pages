// Footer — Figma node: `footer` (1280 wide, ~1120 tall). Left info column
// (logo, tagline, SOC2 + AICPA badges, Get Free API Key CTA) + 6 right-side
// link-group columns. Horizontal divider + bottom row (socials + copyright +
// "Backed by YC").

type LinkGroup = {
  heading: string;
  links: string[];
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
};

const chartLibraries: LinkGroup = {
  heading: "Chart Libraries",
  links: ["ChartJS"],
};

const canvasLibraries: LinkGroup = {
  heading: "Canvas Libraries",
  links: ["React Flow"],
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

const platform: LinkGroup = {
  heading: "Platform",
  links: ["Admin Console", "Dev Tools", "MCP", "Webhooks & API"],
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
    "View All",
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
  return (
    <div className="flex flex-col gap-5" style={{ width: 229 }}>
      <h3
        className="font-urbanist font-bold text-white"
        style={{ fontSize: 14 }}
      >
        {group.heading}
      </h3>
      <ul className="flex flex-col gap-5">
        {group.links.map((link) => (
          <li
            key={link}
            className="font-urbanist text-white/80"
            style={{ fontSize: 14 }}
          >
            <a href="#" className="hover:text-white">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ label, src }: { label: string; src: string }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex items-center justify-center"
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
        style={{ width: 1280, padding: "64px 0" }}
      >
        <div className="flex justify-between items-start">
          {/* Left info column */}
          <div
            className="flex flex-col justify-between"
            style={{ width: 340, height: 280 }}
          >
            <div className="flex flex-col gap-4">
              {/* Logo */}
              <div className="flex items-center justify-center overflow-hidden" style={{ width: 100, height: 40, padding: "0 3px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/home/velt-logo-footer.svg" alt="Velt" width={93.75} height={40} style={{ objectFit: "contain" }} />
              </div>
              <p className="font-urbanist font-medium text-white" style={{ fontSize: 16, lineHeight: 1.25, width: 232, opacity: 0.4 }}>
                Add powerful collaborative
                <br />
                features ridiculously fast!
              </p>
              <div className="flex items-center" style={{ gap: 16 }}>
                <div className="relative overflow-hidden rounded-full" style={{ width: 52, height: 52 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/home/soc2-badge.png" alt="SOC2 Type II certified" className="absolute inset-0 w-full h-full object-cover" />
                </div>
                {/* AICPA badge — Figma exports only the outer circle; render as a
                    white circle with "AICPA / SOC" text overlay until we have the
                    inner badge artwork. */}
                <div
                  className="relative overflow-hidden rounded-full flex flex-col items-center justify-center text-velt-ink font-urbanist"
                  style={{ width: 52, height: 52, background: "#fff" }}
                  aria-label="AICPA SOC"
                >
                  <span style={{ fontSize: 8, fontWeight: 600, letterSpacing: "0.1em" }}>AICPA</span>
                  <span style={{ fontSize: 10, fontWeight: 700, marginTop: 2 }}>SOC</span>
                </div>
              </div>
            </div>
            <button
              className="rounded-md font-urbanist font-semibold text-white"
              style={{
                padding: "12px 16px",
                border: "1px solid rgb(38,34,145)",
                fontSize: 16,
                width: 160,
              }}
            >
              Get Free API Key
            </button>
          </div>

          {/* Link columns */}
          <div className="flex items-start gap-2">
            <LinkColumn group={asyncFeatures} />
            <div className="flex flex-col gap-10" style={{ width: 229 }}>
              <LinkColumn group={editorLibraries} />
              <LinkColumn group={chartLibraries} />
              <LinkColumn group={canvasLibraries} />
            </div>
            <div className="flex flex-col gap-10" style={{ width: 229 }}>
              <LinkColumn group={realtimeFeatures} />
              <LinkColumn group={platform} />
            </div>
            <LinkColumn group={useCases} />
            <LinkColumn group={company} />
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "100%",
            height: 1,
            background: "rgba(255,255,255,0.08)",
            margin: "64px 0 24px",
          }}
        />

        {/* Bottom row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center" style={{ gap: 32 }}>
            <SocialIcon label="LinkedIn" src="/images/home/icon-linkedin.svg" />
            <SocialIcon label="X (Twitter)" src="/images/home/icon-x-social.svg" />
          </div>
          <p className="font-urbanist font-medium text-white text-center" style={{ fontSize: 16 }}>
            All rights reserved © 2025 Velt
          </p>
          <div className="flex items-center" style={{ gap: 10 }}>
            <span className="font-urbanist font-medium text-white text-right" style={{ fontSize: 16 }}>
              Backed by
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/home/yc-logo.svg" alt="Y Combinator" height={26} style={{ objectFit: "contain" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
