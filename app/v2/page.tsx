"use client";

// /v2 — renders the "unraveled" homepage:
// 1. The HTML blob at app/home-static.jsx, mechanically cleaned by
//    scripts/unravel.mjs → app/v2/unraveled.tsx + app/v2/unraveled.css.
//    The blob provides pixel-perfect structure, dimensions, fonts, and
//    SVGs but without the Framer runtime dependency.
// 2. Targeted live React overlays (swap-ins) for regions that need
//    scripted behaviour: tickers/marquees the Framer runtime would have
//    animated in, hero cursor bubbles, etc.
//
// To refresh after a new Framer export:
//   1. Update app/home-static.jsx (and app/framer-handover.ts if chrome
//      changes) with a fresh Framer capture.
//   2. Run `node scripts/unravel.mjs` to regenerate unraveled.{tsx,css}.
//   3. This page picks up the new output automatically.
//
// /preview and /generated are preserved as rollbacks.

import "../../framer-components/styles.css";
import "../globals.css";
import "./unraveled.css";

import Unraveled from "./unraveled";

export default function V2() {
  return <Unraveled />;
}
