"use client";

import { useState } from "react";

type CopyButtonProps = {
  /** Plain text written to the clipboard when clicked. */
  text: string;
  /** Optional visible label. Defaults to "Copy" / "Copied". */
  label?: string;
};

/**
 * Small copy-to-clipboard button used in code panes and editor chrome.
 * @param {CopyButtonProps} props Text to copy and optional label override.
 * @returns {JSX.Element} The copy button.
 */
export default function CopyButton({ text, label }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  /**
   * Writes the provided text to the clipboard and flashes a "Copied" state.
   * @returns {Promise<void>}
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  return (
    <button type="button" className="pc-copy" onClick={handleCopy} aria-label={copied ? "Copied" : "Copy"}>
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <rect x="4.5" y="4.5" width="8" height="8" rx="1.5" />
        <path d="M9.5 4.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
      </svg>
      <span>{copied ? "Copied" : label ?? "Copy"}</span>
    </button>
  );
}
