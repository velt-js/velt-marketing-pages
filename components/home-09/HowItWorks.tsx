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
  const [cmdCopied, setCmdCopied] = useState(false);

  /**
   * Copies the active MCP command line to the clipboard.
   * @returns {Promise<void>}
   */
  const handleCopyCmd = async () => {
    try {
      const activeCmd = CMDS[mcp];
      const line = `${activeCmd.prompt} ${activeCmd.cmd}`.trim();
      await navigator.clipboard?.writeText(line);
      setCmdCopied(true);
      window.setTimeout(() => setCmdCopied(false), 1500);
    } catch (error) {
      console.error("Copy command failed", error);
    }
  };

  return (
    <section id="how" className="how-section">
      <div className="how-inner">
        <div className="how-intro">
          <div className="how-eyebrow"><span className="how-eyebrow-dot"></span>How it works</div>
          <h2 className="how-heading">Live in an afternoon.</h2>
          <p className="how-subtext">Drop into the editor or framework you already ship. No new infrastructure.</p>
        </div>
        <div className="how-steps-grid">
          <div className="how-step">
            <div className="how-step-head">
              <span className="how-step-num">01</span>
              <span className="how-step-label">Install</span>
            </div>
            <p className="how-step-text">Add the SDK.</p>
            <div className="how-code"><span className="how-code-prompt">$</span> npm i @veltdev/react</div>
          </div>
          <div className="how-step">
            <div className="how-step-head">
              <span className="how-step-num">02</span>
              <span className="how-step-label">Wrap</span>
            </div>
            <p className="how-step-text">Provide your app.</p>
            <div className="how-code">&lt;VeltProvider apiKey="..."&gt;<br />&nbsp;&nbsp;&#123;children&#125;<br />&lt;/VeltProvider&gt;</div>
          </div>
          <div className="how-step">
            <div className="how-step-head">
              <span className="how-step-num">03</span>
              <span className="how-step-label">Configure</span>
            </div>
            <p className="how-step-text">Mount the review surface.</p>
            <div className="how-code">&lt;VeltComments /&gt;<br />&lt;VeltApprovalSteps /&gt;<br />&lt;VeltNotifications /&gt;</div>
          </div>
        </div>
        <div className="how-comment">// First component live in under 10 minutes.</div>

        <div className="how-mcp-block">
          <div className="how-mcp-layout">
            <div className="how-mcp-copy">
              <div className="how-mcp-eyebrow">MCP · the faster path</div>
              <h3 className="how-mcp-title">Skip the steps. Have your agent set it up.</h3>
              <p className="how-mcp-desc">
                One command. Velt&apos;s MCP server provisions the workspace, installs the SDK, and mounts your first component in the editor you already have open.
              </p>
              <ul className="how-checks-list">
                <li className="how-check-row"><span className="how-check-mark" aria-hidden="true">✓</span> Provisions API key + workspace</li>
                <li className="how-check-row"><span className="how-check-mark" aria-hidden="true">✓</span> Detects React, Next, or Angular</li>
                <li className="how-check-row"><span className="how-check-mark" aria-hidden="true">✓</span> Mounts &lt;VeltComments /&gt;</li>
                <li className="how-check-row"><span className="how-check-mark" aria-hidden="true">✓</span> Wires auth + RBAC scaffolding</li>
              </ul>
            </div>
            <div className="how-mcp-demo">
              <div className="how-tab-row" role="tablist" aria-label="Editor">
                {MCP_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={mcp === tab.key}
                    onClick={() => {
                      setMcp(tab.key);
                      setCmdCopied(false);
                    }}
                    className={mcp === tab.key ? "how-tab how-tab-active" : "how-tab how-tab-inactive"}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="how-terminal" role="tabpanel">
                <div className="how-terminal-scroll">
                  <code className="how-terminal-line">
                    <span className="how-terminal-prompt">{CMDS[mcp].prompt}</span>
                    <span className="how-terminal-cmd">{CMDS[mcp].cmd}</span>
                  </code>
                </div>
                <div className="how-terminal-overlay">
                  <button
                    type="button"
                    className="how-terminal-copy"
                    onClick={handleCopyCmd}
                    aria-label={cmdCopied ? "Copied" : "Copy command"}
                  >
                    {cmdCopied ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4.012 16.737C3.70534 16.5622 3.45027 16.3095 3.27258 16.0045C3.09488 15.6995 3.00085 15.353 3 15V5C3 3.9 3.9 3 5 3H15C15.75 3 16.158 3.385 16.5 4M7 9.667C7 8.95967 7.28099 8.28131 7.78115 7.78115C8.28131 7.28099 8.95967 7 9.667 7H18.333C18.6832 7 19.03 7.06898 19.3536 7.20301C19.6772 7.33704 19.9712 7.53349 20.2189 7.78115C20.4665 8.0288 20.663 8.32281 20.797 8.64638C20.931 8.96996 21 9.31676 21 9.667V18.333C21 18.6832 20.931 19.03 20.797 19.3536C20.663 19.6772 20.4665 19.9712 20.2189 20.2189C19.9712 20.4665 19.6772 20.663 19.3536 20.797C19.03 20.931 18.6832 21 18.333 21H9.667C9.31676 21 8.96996 20.931 8.64638 20.797C8.32281 20.663 8.0288 20.4665 7.78115 20.2189C7.53349 19.9712 7.33704 19.6772 7.20301 19.3536C7.06898 19.03 7 18.6832 7 18.333V9.667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="how-footer-row">
          <span className="how-tagline">Days, not quarters.</span>
          <span className="how-stack">NO CREDIT CARD · REACT · NEXT.JS · VUE · ANGULAR · HTML</span>
          <a href="#cta" className="how-cta hdark">Get Free API Key</a>
        </div>
      </div>
    </section>
  );
}
