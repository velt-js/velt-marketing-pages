"use client";

import { useState } from "react";

const CMDS = {
  cursor: { prompt: "cursor ›", cmd: "@velt install --workspace=acme --component=comments" },
  claude: { prompt: "$", cmd: "claude mcp add velt https://mcp.velt.dev" },
  windsurf: { prompt: "windsurf ›", cmd: "/mcp add @veltdev/mcp" },
  copilot: { prompt: "$", cmd: "gh copilot extension install veltdev/copilot" },
  zed: { prompt: "zed ›", cmd: "assistant: add-server velt-mcp" },
} as const;

type McpKey = keyof typeof CMDS;

const MCP_TABS: { key: McpKey; label: string }[] = [
  { key: "cursor", label: "Cursor" },
  { key: "claude", label: "Claude Code" },
  { key: "windsurf", label: "Windsurf" },
  { key: "copilot", label: "Copilot" },
  { key: "zed", label: "Zed" },
];

const TAB_BASE = {
  fontSize: "13px",
  fontFamily: "JetBrains Mono,monospace",
  padding: "8px 14px",
  borderRadius: "9999px",
  cursor: "pointer",
  transition: "all .15s",
} as const;

const TAB_ACTIVE = { ...TAB_BASE, border: "1px solid #26251e", background: "#26251e", color: "#f7f7f4" };
const TAB_INACTIVE = { ...TAB_BASE, border: "1px solid #d9d5cf", background: "transparent", color: "#7a7974" };

export default function HowItWorks() {
  const [mcp, setMcp] = useState<McpKey>("cursor");

  return (
    <section id="how" style={{ background: "#f7f7f4", borderTop: "1px solid #d9d5cf", borderBottom: "1px solid #d9d5cf" }}>
      <div style={{ maxWidth: "1180px", margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ maxWidth: "640px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase", color: "#7a7974", marginBottom: "20px" }}><span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#26251e" }}></span>How it works</div>
          <h2 style={{ fontSize: "36px", lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "400" }}>Live in an afternoon.</h2>
          <p style={{ fontSize: "16px", lineHeight: "1.55", color: "#7a7974", marginTop: "16px" }}>Drop into the editor or framework you already ship. No new infrastructure.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginTop: "40px" }}>
          <div style={{ background: "#ffffff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.05em", color: "#a1a19f" }}>STEP 01 · INSTALL</div>
            <p style={{ fontSize: "15px", margin: "12px 0" }}>Add the SDK.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f7f7f4", background: "#26251e", padding: "10px 12px", borderRadius: "4px" }}><span style={{ color: "#8f8e89" }}>$</span> npm i @veltdev/react</div>
          </div>
          <div style={{ background: "#ffffff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.05em", color: "#a1a19f" }}>STEP 02 · WRAP</div>
            <p style={{ fontSize: "15px", margin: "12px 0" }}>Provide your app.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11.5px", lineHeight: "1.6", color: "#26251e", background: "#f7f7f4", padding: "10px 12px", borderRadius: "4px", border: "1px solid #d9d5cf" }}>&lt;VeltProvider apiKey="..."&gt;<br />&nbsp;&nbsp;&#123;children&#125;<br />&lt;/VeltProvider&gt;</div>
          </div>
          <div style={{ background: "#ffffff", border: "1px solid #d9d5cf", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.05em", color: "#a1a19f" }}>STEP 03 · CONFIGURE</div>
            <p style={{ fontSize: "15px", margin: "12px 0" }}>Mount the review surface.</p>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11.5px", lineHeight: "1.6", color: "#26251e", background: "#f7f7f4", padding: "10px 12px", borderRadius: "4px", border: "1px solid #d9d5cf" }}>&lt;VeltComments /&gt;<br />&lt;VeltApprovalSteps /&gt;<br />&lt;VeltNotifications /&gt;</div>
          </div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "12px", color: "#f54e00", marginTop: "16px" }}>// First component live in under 10 minutes.</div>

        <div style={{ background: "#26251e", borderRadius: "8px", padding: "32px", marginTop: "32px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "12px" }}>
            <h3 style={{ fontSize: "22px", fontWeight: "400", letterSpacing: "-0.01em", color: "#f7f7f4" }}>MCP · the faster path</h3>
            <span style={{ fontSize: "14px", color: "#a1a19f" }}>Skip the steps. Have your agent set it up.</span>
          </div>
          <p style={{ fontSize: "14.5px", lineHeight: "1.55", color: "#a1a19f", maxWidth: "62ch", marginTop: "12px" }}>One command. Velt's MCP server provisions the workspace, installs the SDK, and mounts your first component in the editor you already have open.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "22px" }}>
            {MCP_TABS.map((tab) => (
              <button key={tab.key} onClick={() => setMcp(tab.key)} style={mcp === tab.key ? TAB_ACTIVE : TAB_INACTIVE}>{tab.label}</button>
            ))}
          </div>
          <div style={{ background: "#141414", border: "1px solid #3a3934", borderRadius: "4px", padding: "14px 16px", marginTop: "16px", fontFamily: "'JetBrains Mono',monospace", fontSize: "13px", color: "#f7f7f4", display: "flex", alignItems: "center", gap: "10px", overflowX: "auto" }}>
            <span style={{ color: "#f54e00" }}>{CMDS[mcp].prompt}</span><span style={{ whiteSpace: "nowrap" }}>{CMDS[mcp].cmd}</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "8px 28px", marginTop: "22px", maxWidth: "620px" }}>
            <div style={{ fontSize: "13px", color: "#e6e5e0" }}><span style={{ color: "#4ade80" }}>✓</span> Provisions API key + workspace</div>
            <div style={{ fontSize: "13px", color: "#e6e5e0" }}><span style={{ color: "#4ade80" }}>✓</span> Detects React, Next, or Angular</div>
            <div style={{ fontSize: "13px", color: "#e6e5e0" }}><span style={{ color: "#4ade80" }}>✓</span> Mounts &lt;VeltComments /&gt;</div>
            <div style={{ fontSize: "13px", color: "#e6e5e0" }}><span style={{ color: "#4ade80" }}>✓</span> Wires auth + RBAC scaffolding</div>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "18px", marginTop: "28px" }}>
          <span style={{ fontFamily: "'EB Garamond',serif", fontStyle: "italic", fontSize: "20px", color: "#26251e" }}>Days, not quarters.</span>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "11px", letterSpacing: "0.04em", color: "#a1a19f" }}>NO CREDIT CARD · REACT · NEXT.JS · VUE · ANGULAR · HTML</span>
          <a href="#cta" style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", whiteSpace: "nowrap", background: "#26251e", color: "#f7f7f4", padding: "11px 20px", borderRadius: "9999px", transition: "background .15s" }} className="hdark">Get Free API Key <span style={{ fontFamily: "'JetBrains Mono',monospace" }}>→</span></a>
        </div>
      </div>
    </section>
  );
}
