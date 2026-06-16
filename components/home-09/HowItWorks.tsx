"use client";
import "./HowItWorks.css";

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

export default function HowItWorks() {
  const [mcp, setMcp] = useState<McpKey>("cursor");

  return (
    <section id="how" className="how-section">
      <div className="how-inner">
        <div className="how-intro">
          <div className="how-eyebrow"><span className="how-eyebrow-dot"></span>How it works</div>
          <h2 className="how-heading">Live in an afternoon.</h2>
          <p className="how-subtext">Drop into the editor or framework you already ship. No new infrastructure.</p>
        </div>
        <div className="how-steps-grid">
          <div className="how-step-card">
            <div className="how-step-label">STEP 01 · INSTALL</div>
            <p className="how-step-text">Add the SDK.</p>
            <div className="how-code-dark"><span className="how-code-dark-prompt">$</span> npm i @veltdev/react</div>
          </div>
          <div className="how-step-card">
            <div className="how-step-label">STEP 02 · WRAP</div>
            <p className="how-step-text">Provide your app.</p>
            <div className="how-code-light">&lt;VeltProvider apiKey="..."&gt;<br />&nbsp;&nbsp;&#123;children&#125;<br />&lt;/VeltProvider&gt;</div>
          </div>
          <div className="how-step-card">
            <div className="how-step-label">STEP 03 · CONFIGURE</div>
            <p className="how-step-text">Mount the review surface.</p>
            <div className="how-code-light">&lt;VeltComments /&gt;<br />&lt;VeltApprovalSteps /&gt;<br />&lt;VeltNotifications /&gt;</div>
          </div>
        </div>
        <div className="how-comment">// First component live in under 10 minutes.</div>

        <div className="how-mcp-block">
          <div className="how-mcp-header">
            <h3 className="how-mcp-title">MCP · the faster path</h3>
            <span className="how-mcp-subtitle">Skip the steps. Have your agent set it up.</span>
          </div>
          <p className="how-mcp-desc">One command. Velt's MCP server provisions the workspace, installs the SDK, and mounts your first component in the editor you already have open.</p>
          <div className="how-tab-row">
            {MCP_TABS.map((tab) => (
              <button key={tab.key} onClick={() => setMcp(tab.key)} className={mcp === tab.key ? "how-tab how-tab-active" : "how-tab how-tab-inactive"}>{tab.label}</button>
            ))}
          </div>
          <div className="how-terminal">
            <span className="how-terminal-prompt">{CMDS[mcp].prompt}</span><span className="how-terminal-cmd">{CMDS[mcp].cmd}</span>
          </div>
          <div className="how-checks-grid">
            <div className="how-check-row"><span className="how-check-mark">✓</span> Provisions API key + workspace</div>
            <div className="how-check-row"><span className="how-check-mark">✓</span> Detects React, Next, or Angular</div>
            <div className="how-check-row"><span className="how-check-mark">✓</span> Mounts &lt;VeltComments /&gt;</div>
            <div className="how-check-row"><span className="how-check-mark">✓</span> Wires auth + RBAC scaffolding</div>
          </div>
        </div>
        <div className="how-footer-row">
          <span className="how-tagline">Days, not quarters.</span>
          <span className="how-stack">NO CREDIT CARD · REACT · NEXT.JS · VUE · ANGULAR · HTML</span>
          <a href="#cta" className="how-cta hdark">Get Free API Key <span className="how-cta-arrow">→</span></a>
        </div>
      </div>
    </section>
  );
}
