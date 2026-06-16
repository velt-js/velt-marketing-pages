"use client";

import { useState } from "react";

/**
 * Copy-to-clipboard button for the primitive code cards. Reads the rendered
 * text of the sibling `.prim-pre` inside the enclosing `.prim-code-card`, so
 * the same component works for every card without passing the snippet twice.
 */
export default function CopyButton() {
  const [copied, setCopied] = useState(false);

  /**
   * Copies the code card's snippet to the clipboard and flips the icon to a
   * checkmark for brief visual feedback.
   * @param {React.MouseEvent<HTMLButtonElement>} event - the click event.
   * @returns {Promise<void>}
   */
  const handleCopy = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const card = event.currentTarget?.closest(".prim-code-card");
      const snippet = card?.querySelector(".prim-pre")?.textContent ?? "";
      if (!snippet) {
        return;
      }
      await navigator.clipboard?.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy code failed", error);
    }
  };

  return (
    <button
      type="button"
      className="prim-code-copy"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M4.012 16.737C3.70534 16.5622 3.45027 16.3095 3.27258 16.0045C3.09488 15.6995 3.00085 15.353 3 15V5C3 3.9 3.9 3 5 3H15C15.75 3 16.158 3.385 16.5 4M7 9.667C7 8.95967 7.28099 8.28131 7.78115 7.78115C8.28131 7.28099 8.95967 7 9.667 7H18.333C18.6832 7 19.03 7.06898 19.3536 7.20301C19.6772 7.33704 19.9712 7.53349 20.2189 7.78115C20.4665 8.0288 20.663 8.32281 20.797 8.64638C20.931 8.96996 21 9.31676 21 9.667V18.333C21 18.6832 20.931 19.03 20.797 19.3536C20.663 19.6772 20.4665 19.9712 20.2189 20.2189C19.9712 20.4665 19.6772 20.663 19.3536 20.797C19.03 20.931 18.6832 21 18.333 21H9.667C9.31676 21 8.96996 20.931 8.64638 20.797C8.32281 20.663 8.0288 20.4665 7.78115 20.2189C7.53349 19.9712 7.33704 19.6772 7.20301 19.3536C7.06898 19.03 7 18.6832 7 18.333V9.667Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
