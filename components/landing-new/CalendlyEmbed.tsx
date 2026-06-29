"use client";

import Script from "next/script";

// Light editorial theming for the Calendly inline widget, matching the new
// .vlp palette (cream surface, ink text, orange accent) instead of the legacy
// dark embed. Colors are passed as hex (no leading #) per Calendly's query API.
const CALENDLY_BASE = "https://calendly.com/goyalrakesh/30min";
const CALENDLY_PARAMS = [
  "embed_domain=velt.dev",
  "embed_type=Inline",
  "hide_gdpr_banner=1",
  "background_color=f7f7f4",
  "text_color=26251e",
  "primary_color=f54e00",
  "hide_event_type_details=1",
  "hide_landing_page_details=1",
].join("&");

/** Light-themed Calendly inline scheduling URL shared by /book-demo and /consult. */
export const CALENDLY_URL = `${CALENDLY_BASE}?${CALENDLY_PARAMS}`;

/**
 * Inline Calendly scheduling widget framed in a .vlp card, with a manual link
 * fallback and the Calendly external widget script.
 * @returns {JSX.Element} The Calendly embed.
 */
export default function CalendlyEmbed() {
  return (
    <div className="lp-calendly">
      <div
        className="calendly-inline-widget lp-calendly-frame"
        data-url={CALENDLY_URL}
      />
      <a
        href={CALENDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="lp-calendly-fallback"
      >
        Not loading? Click here
      </a>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
