"use client";

import { useState } from "react";

import {
  buildEditorOpenUrl,
  MCP_EDITORS,
  type McpEditorConfig,
  type McpEditorKey,
  type EditorOpenContext,
} from "./mcpEditors";

type OpenInEditorLinkProps = {
  editor: McpEditorConfig;
  prompt: string;
  context?: EditorOpenContext;
  variant?: "light" | "dark";
};

/**
 * Renders the external-link arrow icon for open-in actions.
 * @returns {JSX.Element} Arrow SVG icon
 */
function OpenInEditorArrow() {
  try {
    return (
      <svg
        className="how-open-link-arrow"
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M13.6016 5.59961L5.60156 13.5996M13.6016 12.7996V5.59961H6.40156"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } catch (error) {
    console.error("OpenInEditorArrow failed", error);
    return null;
  }
}

/**
 * Renders an Open in [editor] action — deeplink when supported, clipboard copy otherwise.
 * @param props - Editor config, prompt text, open context, and surface variant
 * @returns {JSX.Element} Open-in link or copy button
 */
export default function OpenInEditorLink({
  editor,
  prompt,
  context = "mcp",
  variant = "dark",
}: OpenInEditorLinkProps) {
  const [copied, setCopied] = useState(false);
  const openHref = buildEditorOpenUrl(editor.key, prompt, context);
  const className = variant === "light" ? "how-open-link how-open-link-light" : "how-open-link";
  const label = copied ? "Copied" : `Open in ${editor.tabLabel}`;
  const ariaLabel = copied ? "Copied" : `Open in ${editor.tabLabel}`;

  /**
   * Copies the editor terminal command when no deeplink is available.
   * @returns {Promise<void>}
   */
  const handleCopyFallback = async () => {
    try {
      const line = `${editor.terminal.prompt} ${editor.terminal.cmd}`.trim();
      await navigator.clipboard?.writeText(line);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("handleCopyFallback failed", error);
    }
  };

  if (openHref) {
    return (
      <a
        href={openHref}
        className={className}
        aria-label={ariaLabel}
        onClick={(event) => {
          try {
            if (editor.key === "copilot") {
              event.preventDefault();
              void handleCopyFallback();
              window.location.href = openHref;
            }
          } catch (clickError) {
            console.error("Open in editor click failed", clickError);
          }
        }}
      >
        <span className="how-open-link-text">{label}</span>
        <OpenInEditorArrow />
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        void handleCopyFallback();
      }}
    >
      <span className="how-open-link-text">{label}</span>
      <OpenInEditorArrow />
    </button>
  );
}

type OpenInEditorRowProps = {
  editors: McpEditorKey[];
  getPrompt: (editorKey: McpEditorKey) => string;
  context?: EditorOpenContext;
  variant?: "light" | "dark";
  className?: string;
};

/**
 * Renders a row of Open in [editor] actions for the given editors.
 * @param props - Editor keys, prompt resolver, context, and styling options
 * @returns {JSX.Element} Row of open-in actions
 */
export function OpenInEditorRow({
  editors,
  getPrompt,
  context = "mcp",
  variant = "dark",
  className = "how-open-row",
}: OpenInEditorRowProps) {
  try {
    return (
      <div className={className}>
        {editors.map((editorKey) => (
          <OpenInEditorLink
            key={editorKey}
            editor={MCP_EDITORS[editorKey]}
            prompt={getPrompt(editorKey)}
            context={context}
            variant={variant}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("OpenInEditorRow failed", error);
    return null;
  }
}
