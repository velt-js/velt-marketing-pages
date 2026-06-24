"use client";

import { useState } from "react";

import SectionSplitHeader from "./SectionSplitHeader";
import CtaBanner from "./CtaBanner";
import CopyButton from "./CopyButton";
import InstallTimeline, { type InstallStep } from "@/components/home-new/InstallTimeline";
import { highlightCode, langForFilename } from "./highlight";
import type { HowItWorksContent, HowItWorksStep } from "./content";

import "./HowItWorks.css";

type HowItWorksProps = {
  content: HowItWorksContent;
};

const ICON_BASE = "/images/home/nav-icons";

// Fallback brand icons keyed by integration-chip label. Used when the CMS
// document does not supply an explicit `icon` for a chip, so the chips render
// recognizable logos instead of the generic dot.
const ICON_BY_LABEL: Record<string, string> = {
  "react": `${ICON_BASE}/react.svg`,
  "next.js": `${ICON_BASE}/nextdotjs.svg`,
  "angular": `${ICON_BASE}/angular.svg`,
  "vue": `${ICON_BASE}/vuedotjs.svg`,
  "html": `${ICON_BASE}/html5.svg`,
  "mongodb": `${ICON_BASE}/mongodb.svg`,
  "postgresql": `${ICON_BASE}/postgresql.svg`,
  "aws s3": `${ICON_BASE}/amazons3.svg`,
  "minio": `${ICON_BASE}/minio.svg`,
  "google cloud storage": `${ICON_BASE}/googlecloud.svg`,
  "azure blob": `${ICON_BASE}/microsoftazure.svg`,
  "node sdk": `${ICON_BASE}/nodedotjs.svg`,
  "python sdk": `${ICON_BASE}/python.svg`,
};

/**
 * Resolve the icon path for an integration chip: prefer the CMS-provided icon,
 * otherwise fall back to a brand logo matched by label (case-insensitive).
 * @param {string} [label] Chip label.
 * @param {string} [icon] Explicit icon path from the CMS, if any.
 * @returns {string | undefined} Icon path, or undefined when none matches.
 */
function resolveChipIcon(label?: string, icon?: string): string | undefined {
  try {
    if (icon) {
      return icon;
    }
    const key = label?.trim().toLowerCase();
    return key ? ICON_BY_LABEL[key] : undefined;
  } catch (error) {
    console.error("resolveChipIcon failed", error);
    return icon;
  }
}

/**
 * Map the feature content steps onto the shared InstallTimeline shape: derive a
 * padded number badge and a short label (the text after "·" in the kicker, e.g.
 * "Step 1 · Install" -> "Install").
 * @param {HowItWorksStep[]} steps Feature how-it-works steps.
 * @returns {InstallStep[]} Steps for the shared install timeline.
 */
function toInstallSteps(steps: HowItWorksStep[]): InstallStep[] {
  try {
    return steps.map((step, index) => {
      const labelFromKicker = step.kicker.includes("·")
        ? step.kicker.split("·").pop()?.trim()
        : undefined;
      return {
        num: String(index + 1).padStart(2, "0"),
        label: labelFromKicker || step.title,
        tab: step.filename,
        code: highlightCode(step.code, langForFilename(step.filename)),
      };
    });
  } catch (error) {
    console.error("toInstallSteps failed", error);
    return [];
  }
}

/**
 * "How it works" section: 3 step cards with editor chrome, the mechanics +
 * build-vs-buy strip, a tool-tabbed MCP install banner, the feature-scoped
 * integration strip, and CTA banner #1.
 * @param {HowItWorksProps} props Section content.
 * @returns {JSX.Element} The How It Works section.
 */
export default function HowItWorks({ content }: HowItWorksProps) {
  const [mcpTab, setMcpTab] = useState(content.mcp.tabs[0]?.id ?? "");

  const activeCommand = content.mcp.tabs.find((tab) => tab.id === mcpTab)?.command ?? "";

  return (
    <section className="band" id="how-it-works" data-section="how-it-works">
      <div className="wrap">
        <SectionSplitHeader kicker={content.kicker} heading={content.heading} support={content.support} />

        <div style={{ marginTop: 48 }}>
          <InstallTimeline steps={toInstallSteps(content.steps)} chromeDots={false} />
        </div>

        <div className="mech-grid">
          <div className="mech-card">
            <span className="mech-eyebrow"><span className="mech-dot" />With Velt</span>
            <h3>{content.mechanics.heading}</h3>
            <p>{content.mechanics.body}</p>
            {content.mechanics.microcopy ? (
              <p className="code-microcopy">{content.mechanics.microcopy}</p>
            ) : null}
          </div>
          <div className="bvb-card">
            <span className="bvb-eyebrow">Build it yourself</span>
            <h3>{content.buildVsBuy.heading}</h3>
            <ul className="bvb-list">
              {content.buildVsBuy.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="bvb-close">{content.buildVsBuy.close}</p>
          </div>
        </div>

        <div className="mcp-banner">
          <div className="mcp-bar">
            <div>
              <h3>{content.mcp.heading}</h3>
              <p className="sub">{content.mcp.sub}</p>
            </div>
            <div className="pc-tabs" role="tablist">
              {content.mcp.tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  className="pc-tab"
                  aria-selected={mcpTab === tab.id}
                  onClick={() => setMcpTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mcp-cmdrow">
            {content.mcp.tabs.map((tab) => (
              <pre className="pc-pane" key={tab.id} hidden={mcpTab !== tab.id}>
                {tab.command}
              </pre>
            ))}
            <CopyButton text={activeCommand} />
          </div>
        </div>

        <div className="int-rows" style={{ marginTop: 48 }}>
          {content.integrations.map((row) => (
            <div className="int-row" key={row.label}>
              <p className="int-label">{row.label}</p>
              <div className="int-chips">
                {row.chips.map((chip) => {
                  const chipIcon = resolveChipIcon(chip.label, chip.icon);
                  return (
                    <a className="int-chip" key={chip.label} href={chip.href} target={chip.newTab ? "_blank" : undefined} rel={chip.newTab ? "noreferrer" : undefined}>
                      {chipIcon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img className="int-chip-logo" src={chipIcon} alt="" />
                      ) : (
                        <i />
                      )}
                      {chip.label}
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <CtaBanner banner={content.ctaBanner} style={{ marginTop: 56 }} />
      </div>
    </section>
  );
}
