"use client";

// Hand-composed libraries grid. The XML has this as <Group1707480281
// nodeId="RlE6JZ5B_"> (a Framer group, not a packaged component), so codegen
// can't auto-generate it. The generate-page.mjs TAG_COMPONENT_MAP routes the
// tag to this file, bypassing its children.
//
// Structure from MCP getNodeXml("RlE6JZ5B_"):
//   Row 1 (horizontal 2 cards): Text Editors + Chart Libraries
//   Row 2 (horizontal 1 card):  Canvas Libraries (wide, title-left + link-right)

import Link from "next/link";

type Lib = { label: string; href: string };

const textEditors: Lib[] = [
  { label: "YJS", href: "/libraries/yjs" },
  { label: "CodeMirror", href: "/libraries/codemirror" },
  { label: "Lexical", href: "/libraries/lexical" },
  { label: "BlockNote", href: "/libraries/blocknote" },
  { label: "Tiptap", href: "/libraries/tiptap" },
  { label: "SlateJS", href: "/libraries/slatejs" },
];

const chartLibs: Lib[] = [
  { label: "ChartJS", href: "/libraries/chartjs" },
  { label: "HighCharts", href: "/libraries/highcharts" },
  { label: "Nivo Charts", href: "/libraries/nivo-charts" },
];

const canvasLibs: Lib[] = [{ label: "React Flow", href: "/libraries/react-flow" }];

export function LibrariesGrid() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 820,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: 16, width: "100%" }}>
        <LibraryCard title="Text Editors" subtitle="Commenting & CRDT Support" libs={textEditors} />
        <LibraryCard title="Chart Libraries" subtitle="Commenting Support" libs={chartLibs} />
      </div>
      <LibraryCardWide title="Canvas Libraries" subtitle="CRDT Support" libs={canvasLibs} />
    </div>
  );
}

function LibraryCard({
  title,
  subtitle,
  libs,
}: {
  title: string;
  subtitle: string;
  libs: Lib[];
}) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: 493,
        background: "rgba(247, 247, 247, 1)",
        borderRadius: 24,
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: 8,
        }}
      >
        {libs.map((lib) => (
          <Link
            key={lib.href}
            href={lib.href}
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-block",
              padding: "6px 10px",
              background: "rgb(38, 38, 38)",
              color: "#fff",
              borderRadius: 10,
              fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
              fontWeight: 500,
              fontSize: 14,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            {lib.label}
          </Link>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h3
          style={{
            fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
            fontWeight: 700,
            fontSize: 24,
            lineHeight: "120%",
            margin: 0,
            color: "rgb(0, 0, 0)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "140%",
            margin: 0,
            opacity: 0.52,
            color: "rgb(0, 0, 0)",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

function LibraryCardWide({
  title,
  subtitle,
  libs,
}: {
  title: string;
  subtitle: string;
  libs: Lib[];
}) {
  return (
    <div
      style={{
        width: "100%",
        background: "rgba(247, 247, 247, 1)",
        borderRadius: 24,
        padding: "32px 112px 32px 32px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 305 }}>
        <h3
          style={{
            fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
            fontWeight: 700,
            fontSize: 24,
            lineHeight: "120%",
            margin: 0,
            color: "rgb(0, 0, 0)",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
            fontWeight: 400,
            fontSize: 16,
            lineHeight: "140%",
            margin: 0,
            opacity: 0.52,
            color: "rgb(0, 0, 0)",
          }}
        >
          {subtitle}
        </p>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: 16 }}>
        {libs.map((lib) => (
          <Link
            key={lib.href}
            href={lib.href}
            target="_blank"
            rel="noopener"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 18px",
              background: "rgb(38, 38, 38)",
              color: "#fff",
              borderRadius: 10,
              fontFamily: '"Urbanist", "Urbanist Placeholder", sans-serif',
              fontWeight: 600,
              fontSize: 16,
              textDecoration: "none",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <path d="M27.4 2.7h-7.8a1.6 1.6 0 0 0-1.6 1.6v7.8a1.6 1.6 0 0 0 1.6 1.6h7.8a1.6 1.6 0 0 0 1.6-1.6V4.3a1.6 1.6 0 0 0-1.6-1.6Z" stroke="#fff" strokeWidth="1.6" />
              <path d="M27.4 18.4h-7.8a1.6 1.6 0 0 0-1.6 1.5v7.9a1.6 1.6 0 0 0 1.6 1.5h7.8a1.6 1.6 0 0 0 1.6-1.5v-7.9a1.6 1.6 0 0 0-1.6-1.5Z" stroke="#fff" strokeWidth="1.6" />
              <path d="M11.8 18.4H3.9a1.6 1.6 0 0 0-1.5 1.5v7.9a1.6 1.6 0 0 0 1.5 1.5h7.9a1.6 1.6 0 0 0 1.5-1.5v-7.9a1.6 1.6 0 0 0-1.5-1.5Z" stroke="#fff" strokeWidth="1.6" />
              <path d="M11.8 2.7H3.9a1.6 1.6 0 0 0-1.5 1.6v7.8a1.6 1.6 0 0 0 1.5 1.6h7.9a1.6 1.6 0 0 0 1.5-1.6V4.3a1.6 1.6 0 0 0-1.5-1.6Z" stroke="#fff" strokeWidth="1.6" />
            </svg>
            {lib.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
