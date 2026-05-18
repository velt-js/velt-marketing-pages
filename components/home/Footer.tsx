// Footer — Figma node 1:20067. Outer container 1280px wide, 64px vertical
// inner padding. Left info column (340px) + 940px link area with 8 link
// groups that flex-wrap into 4 × 2. Chart and Canvas Libraries stack
// inside the same column. Divider + 3-column bottom row below.

type LinkRef = { label: string; href: string; newTab?: boolean };

type LinkGroup = {
  heading: string;
  links: LinkRef[];
  variant?: "default" | "library";
};

const asyncFeatures: LinkGroup = {
  heading: "Async Features",
  links: [
    { label: "Comments", href: "/comments" },
    { label: "Notifications", href: "/notifications" },
    { label: "Recording", href: "/recording" },
    { label: "Video Editor", href: "https://velt.dev/docs/async-collaboration/recorder/setup", newTab: true },
    { label: "View Analytics", href: "https://velt.dev/docs/async-collaboration/view-analytics/overview", newTab: true },
    { label: "Reactions", href: "https://velt.dev/docs/async-collaboration/reactions/overview", newTab: true },
    { label: "Customization", href: "/customization" },
    { label: "Try Features", href: "https://samples.velt.dev/", newTab: true },
  ],
};

const editorLibraries: LinkGroup = {
  heading: "Editor Libraries",
  links: [
    { label: "YJS", href: "/libraries/yjs" },
    { label: "Tiptap", href: "/libraries/tiptap" },
    { label: "BlockNote", href: "/libraries/blocknote" },
    { label: "CodeMirror", href: "/libraries/codemirror" },
    { label: "Lexical", href: "/libraries/lexical" },
    { label: "SlateJS", href: "/libraries/slatejs" },
  ],
  variant: "library",
};

const realtimeFeatures: LinkGroup = {
  heading: "Realtime Features",
  links: [
    { label: "Multiplayer Editing", href: "https://velt.dev/docs/realtime-collaboration/crdt/overview", newTab: true },
    { label: "Single Editor", href: "https://velt.dev/docs/realtime-collaboration/single-editor-mode/overview", newTab: true },
    { label: "Live State Sync", href: "https://velt.dev/docs/realtime-collaboration/live-state-sync/overview", newTab: true },
    { label: "Live Selection", href: "https://velt.dev/docs/realtime-collaboration/live-selection/overview", newTab: true },
    { label: "Huddle", href: "https://velt.dev/docs/realtime-collaboration/huddle/overview", newTab: true },
    { label: "Presence", href: "https://velt.dev/docs/realtime-collaboration/presence/overview", newTab: true },
    { label: "Cursors", href: "https://velt.dev/docs/realtime-collaboration/cursors/overview", newTab: true },
    { label: "Follow Mode", href: "https://velt.dev/docs/realtime-collaboration/flock-mode/overview", newTab: true },
    { label: "Customization", href: "/customization" },
    { label: "Try Features", href: "https://samples.velt.dev/", newTab: true },
  ],
};

const chartLibraries: LinkGroup = {
  heading: "Chart Libraries",
  links: [
    { label: "ChartJS", href: "/libraries/chartjs" },
    { label: "Nivo Charts", href: "/libraries/nivo-charts" },
    { label: "HighCharts", href: "/libraries/highcharts" },
  ],
  variant: "library",
};

const canvasLibraries: LinkGroup = {
  heading: "Canvas Libraries",
  links: [{ label: "React Flow", href: "/libraries/react-flow" }],
  variant: "library",
};

const platform: LinkGroup = {
  heading: "Platform",
  links: [
    { label: "Admin Console", href: "/platform" },
    { label: "Dev Tools", href: "/devtools" },
    { label: "MCP", href: "https://velt.dev/docs/mcp/mcp", newTab: true },
    { label: "Webhooks & API", href: "/webhooks-and-api" },
  ],
};

const resources: LinkGroup = {
  heading: "Resources",
  links: [
    { label: "Blog", href: "/blog" },
    { label: "Docs", href: "https://velt.dev/docs/", newTab: true },
    { label: "Release Notes", href: "https://velt.dev/docs/release-notes/version-4/sdk-changelog", newTab: true },
    { label: "Migrate from Liveblocks", href: "/migrate/liveblocks" },
    { label: "Migrate from Cord", href: "/migrate/cord" },
    { label: "Launch Kit", href: "https://velt.dev/launch-kit", newTab: true },
    { label: "Themes Playground", href: "https://playground.velt.dev/themes", newTab: true },
    { label: "Figma UI Kit", href: "https://www.figma.com/community/file/1402312407969730816/velt-collaboration-kit", newTab: true },
    { label: "Examples", href: "https://samples.velt.dev/", newTab: true },
    { label: "Compare Velt", href: "/comparison" },
    { label: "Compare Velt Implementation", href: "https://velt.dev/implementation-comparison", newTab: true },
  ],
};

// "CRM Product" intentionally omitted — no /use-case/crm internal page.
const useCases: LinkGroup = {
  heading: "Use Cases",
  links: [
    { label: "Video Editor", href: "/use-case/video-editor" },
    { label: "Form Builder", href: "/use-case/form-builder" },
    { label: "Analytics Product", href: "/use-case/analytics" },
    { label: "Task Manager", href: "/use-case/task-manager" },
    { label: "Sheets Product", href: "/use-case/sheets" },
    { label: "Session Replay Tool", href: "/use-case/session-replay-tool" },
  ],
};

const company: LinkGroup = {
  heading: "Company",
  links: [
    { label: "For Enterprise", href: "/enterprise" },
    { label: "For YC", href: "/yc" },
    { label: "Pricing", href: "/pricing" },
    { label: "Customers", href: "/customers" },
    { label: "Status", href: "https://status.velt.dev/", newTab: true },
    { label: "Careers", href: "https://www.ycombinator.com/companies/velt/jobs", newTab: true },
    { label: "Security", href: "https://trust.velt.dev/", newTab: true },
    { label: "Trust Center", href: "https://trust.velt.dev/", newTab: true },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
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
          const { label, href, newTab } = link;
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
      className="w-full flex flex-col items-center bg-black px-6 lg:px-20"
    >
      <div
        className="flex flex-col w-full max-w-[1280px] gap-12 lg:gap-16"
        style={{ padding: "48px 0 32px" }}
      >
        {/* Main content row: info column + link grid. Stacks on mobile. */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-0">
          {/* Left info column — Figma 1:20071 (340×280) */}
          <div
            className="flex flex-col w-full lg:w-[340px] gap-8 lg:gap-16"
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
            <a
              href="https://console.velt.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-md font-urbanist font-semibold text-white"
              style={{
                padding: "8px 16px",
                border: "1px solid var(--color-velt-purple)",
                fontSize: 16,
                width: 160,
                height: 40,
                letterSpacing: "-0.48px",
                textDecoration: "none",
              }}
            >
              Get Free API Key
            </a>
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
                href="/use-case"
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

        {/* Bottom row — stacks centered on mobile, 3 equal cols at lg. */}
        <div className="flex flex-col items-center lg:flex-row lg:items-center gap-6 lg:gap-2">
          <div
            className="flex items-center gap-8 lg:flex-1 lg:min-w-0"
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
            className="flex lg:justify-center lg:flex-1 lg:min-w-0"
            style={{ opacity: 0.4 }}
          >
            <p
              className="font-urbanist font-medium text-white text-center whitespace-nowrap"
              style={{ fontSize: 16, lineHeight: "19.2px" }}
            >
              © 2025 Velt. All rights reserved.
            </p>
          </div>
          <div
            className="flex items-center lg:justify-end lg:flex-1 lg:min-w-0"
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
