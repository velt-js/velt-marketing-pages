import type { ReactNode } from "react";

import { AiNativeBoard } from "./ai-board";
import { ComplianceBoard } from "./compliance-board";
import { DigitalSalesRoom } from "./digital-sales-room";
import { FintechBoard } from "./fintech-board";
import { LegalBoard } from "./legal-board";
import { OperationsBoard } from "./ops-board";
import {
  Av,
  FACES,
  Frame,
  IconArrowRight,
  IconCheck,
  IconReply,
} from "./hero-surface";

import "./recording-showcase.css";

// Simulated-UI demo nodes for the /new-features/recording page. Keys match
// components/feature-new/demo-presets/recording.keys.ts; resolved by
// demo-registry.tsx. Visuals are simulated, not live SDK instances.

// Recording-page personas mapped to shared headshots.
const FACE = {
  fenne: FACES.fenne,
  hope: FACES.hope,
  ethan: FACES.ethan,
  gavin: FACES.gavin,
} as const;

const WAVE_BARS = [6, 12, 20, 14, 9, 18, 26, 16, 8, 13, 22, 11, 7, 17, 24, 12, 6];

// High-res poster for the video + editor recording stages (the local
// recording-thumb.jpg is only 480×320 and blurs when scaled to hero width).
const VIDEO_POSTER =
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1280&h=720&fit=crop&auto=format&q=80";

// ── Showcase artifacts (.rcd-*) ──────────────────────────────────────────
// Modern Capabilities-grid mocks reusing the comments + approval-flows design
// language (apf-card / cmh-cc head + body chrome, chips, Av) with new recording
// patterns namespaced .rcd- in ./recording-showcase.css.

/** @returns {JSX.Element} Solid play triangle for player and pin controls. */
function IconPlaySolid() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 2.5 13 8 4 13.5 Z" />
    </svg>
  );
}

/** @returns {JSX.Element} Microphone glyph for the voice + mic-narration heads. */
function IconMic() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

/** @returns {JSX.Element} Monitor glyph for the screen-capture head. */
function IconMonitor() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Map-pin glyph for the pinned-recordings head + marker. */
function IconPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/** @returns {JSX.Element} Captions glyph for the transcription head. */
function IconCaptions() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M7 11.5a2 2 0 0 0-3 0v1a2 2 0 0 0 3 0M14 11.5a2 2 0 0 0-3 0v1a2 2 0 0 0 3 0" />
    </svg>
  );
}

/** @returns {JSX.Element} Scissors glyph for the built-in editor head. */
function IconScissors() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="6" cy="18" r="2.5" />
      <path d="M8 8l12 8M8 16l12-8" />
    </svg>
  );
}

/** @returns {JSX.Element} Activity-pulse glyph for the lifecycle-events head. */
function IconActivity() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 12h4l2.5 7 5-14L17 12h4" />
    </svg>
  );
}

/** @returns {JSX.Element} Server glyph for the self-hosted storage head. */
function IconServer() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 7.5h.01M7 16.5h.01" />
    </svg>
  );
}

/** @returns {JSX.Element} Lock glyph for the minimal-identifiers lane. */
function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

/** @returns {JSX.Element} Bell glyph for the notifications related teaser. */
function IconBell() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z" />
      <path d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}

/** @returns {JSX.Element} Clock glyph for the @timestamp comment markers. */
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  );
}

/** @returns {JSX.Element} Link glyph for the thread deep-link action. */
function IconLink() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 15l6-6M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1" />
    </svg>
  );
}

/**
 * Showcase waveform strip: evenly spaced bars with the leading `active` bars
 * tinted as "played".
 * @param {{ active?: number; mic?: boolean }} props Played-bar count and a flag for the green mic-level tint.
 * @returns {JSX.Element} Waveform row.
 */
function RcdWave({ active = 6, mic = false }: { active?: number; mic?: boolean }) {
  return (
    <span className={`rcd-wave${mic ? " rcd-wave--mic" : ""}`}>
      {WAVE_BARS.map((height, index) => (
        <span
          key={`rcd-bar-${index}`}
          className={`rcd-wave-bar${index < active ? " rcd-wave-bar--on" : ""}`}
          style={{ height }}
        />
      ))}
    </span>
  );
}

/**
 * Compact media-player surface for the showcase: an orange play control, a
 * waveform, a mono duration, and optional caption + transcript lines.
 * @param {{ active?: number; duration?: string; caption?: string; transcript?: ReactNode }} props Player content.
 * @returns {JSX.Element} Player surface.
 */
function RcdPlayer({
  active = 7,
  duration = "0:18",
  caption,
  transcript,
}: {
  active?: number;
  duration?: string;
  caption?: string;
  transcript?: ReactNode;
}) {
  return (
    <div className="rcd-player">
      <div className="rcd-player-row">
        <span className="rcd-play"><IconPlaySolid /></span>
        <RcdWave active={active} />
        <span className="rcd-dur">{duration}</span>
      </div>
      {caption ? <p className="rcd-player-cap">{caption}</p> : null}
      {transcript ? <p className="rcd-transcript">{transcript}</p> : null}
    </div>
  );
}

export const RECORDING_DEMOS: Record<string, ReactNode> = {
  // ── VOICE (audio) ────────────────────────────────────────────────────────
  // Podcast-style audio player: a two-line transcript over a scrubber that
  // carries the Tone Agent's comment pinned to the exact moment it fired.
  "recording/hero/voice": (
    <Frame
      app="PC"
      crumb={<b>Podcast-ep.03</b>}
      users={[
        { initials: "FE", tone: "a2", img: FACE.fenne },
        { initials: "ET", tone: "a1", img: FACE.ethan },
        { initials: "GA", tone: "a1", img: FACE.gavin },
        { initials: "TA", agent: true },
      ]}
    >
      <div className="rcd-hp">
        <div className="rcd-hp-script">
          <div className="rcd-hp-line">
            <Av initials="ET" img={FACE.ethan} />
            <p>The real shift this quarter is that agents ship alongside the team, not after them.</p>
          </div>
          <div className="rcd-hp-line rcd-hp-line--mute">
            <Av initials="FE" img={FACE.fenne} />
            <p>Right, and that&rsquo;s exactly where recording comes in for async review.</p>
          </div>
        </div>

        <div className="rcd-hp-player">
          <div className="rcd-hp-pop" style={{ left: "30%" }}>
            <Av initials="TA" agent />
            <div className="rcd-hp-pop-main">
              <div className="rcd-hp-pop-head">
                <span className="rcd-hp-pop-name">Tone Agent</span>
                <span className="rcd-hp-pop-time">2m</span>
              </div>
              <p className="rcd-hp-pop-body">This sounds a bit flat &mdash; try a warmer take here.</p>
            </div>
          </div>

          <span className="rcd-hp-play"><IconPlaySolid /></span>
          <div className="rcd-hp-track">
            <span className="rcd-hp-fill" style={{ width: "30%" }} />
            <span className="rcd-hp-marker" style={{ left: "30%" }}><Av initials="TA" agent /></span>
          </div>
          <span className="rcd-hp-dur">0:30 / 1:52</span>
        </div>
      </div>
    </Frame>
  ),

  // ── VIDEO ──────────────────────────────────────────────────────────────
  // Video player: a poster with the player overlaid along the bottom and the
  // Tone Agent's comment pinned to the timeline at the moment it fired.
  "recording/hero/video": (
    <Frame
      app="PC"
      crumb={<b>Podcast-ep.03</b>}
      users={[
        { initials: "FE", tone: "a2", img: FACE.fenne },
        { initials: "ET", tone: "a1", img: FACE.ethan },
        { initials: "GA", tone: "a1", img: FACE.gavin },
        { initials: "TA", agent: true },
      ]}
    >
      <div className="rcd-hp rcd-hp--video">
        <div className="rcd-hp-stage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={VIDEO_POSTER} alt="Recording poster" />

          <div className="rcd-hp-player">
            <div className="rcd-hp-pop" style={{ left: "40%" }}>
              <Av initials="TA" agent />
              <div className="rcd-hp-pop-main">
                <div className="rcd-hp-pop-head">
                  <span className="rcd-hp-pop-name">Tone Agent</span>
                  <span className="rcd-hp-pop-time">2m</span>
                </div>
                <p className="rcd-hp-pop-body">This sounds a bit flat &mdash; try a warmer take here.</p>
              </div>
            </div>

            <span className="rcd-hp-play"><IconPlaySolid /></span>
            <div className="rcd-hp-track">
              <span className="rcd-hp-fill" style={{ width: "40%" }} />
              <span className="rcd-hp-marker" style={{ left: "40%" }}><Av initials="TA" agent /></span>
            </div>
            <span className="rcd-hp-dur">0:30 / 1:52</span>
          </div>
        </div>
      </div>
    </Frame>
  ),

  // ── SCREEN ─────────────────────────────────────────────────────────────
  "recording/hero/screen": (
    <Frame
      app="WO"
      crumb={<><b>work-order.md</b> <span className="sep">/</span> WO-2271</>}
      users={[
        { initials: "HO", tone: "a3", img: FACE.hope },
        { initials: "ET", tone: "a1", img: FACE.ethan },
      ]}
    >
      <div className="rcd-hp">
        <div className="rcd-screen">
          <div className="rcd-screen-bar">
            <span className="rcd-screen-dot" />
            <span className="rcd-screen-dot" />
            <span className="rcd-screen-dot" />
            <span className="rcd-rec"><i />REC 1:12</span>
          </div>
          <div className="rcd-stage">
            <div className="rcd-stage-grid" aria-hidden="true" />
            <span className="rcd-stage-play"><IconPlaySolid /></span>
          </div>
        </div>

        <div className="rcd-hp-player">
          <div className="rcd-hp-pop" style={{ left: "46%" }}>
            <Av initials="ET" tone="a1" img={FACE.ethan} />
            <div className="rcd-hp-pop-main">
              <div className="rcd-hp-pop-head">
                <span className="rcd-hp-pop-name">Ethan</span>
                <span className="rcd-hp-pop-time">2m</span>
              </div>
              <p className="rcd-hp-pop-body">Jump-cut here &mdash; the file dialog stalls for a sec.</p>
            </div>
          </div>

          <span className="rcd-hp-play"><IconPlaySolid /></span>
          <div className="rcd-hp-track">
            <span className="rcd-hp-fill" style={{ width: "46%" }} />
            <span className="rcd-hp-marker" style={{ left: "46%" }}><Av initials="ET" tone="a1" img={FACE.ethan} /></span>
          </div>
          <span className="rcd-hp-dur">0:46 / 1:12</span>
        </div>
      </div>
    </Frame>
  ),

  // ── EDITOR ─────────────────────────────────────────────────────────────
  "recording/hero/editor": (
    <Frame
      app="PC"
      crumb={<b>Podcast-ep.03</b>}
      users={[
        { initials: "FE", tone: "a2", img: FACE.fenne },
        { initials: "ET", tone: "a1", img: FACE.ethan },
        { initials: "GA", tone: "a1", img: FACE.gavin },
        { initials: "TA", agent: true },
      ]}
    >
      <div className="rcd-ed">
        <div className="rcd-ed-frame">
          <div className="rcd-hp-stage">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={VIDEO_POSTER} alt="Recording frame" />
            <span className="rcd-ed-bar"><span className="rcd-ed-fill" style={{ width: "34%" }} /></span>
          </div>

          {/* one agent finding, pinned to the frame it relates to */}
          <div className="rcd-hp-pop rcd-ed-pop">
            <Av initials="TA" agent />
            <div className="rcd-hp-pop-main">
              <div className="rcd-hp-pop-head">
                <span className="rcd-hp-pop-name">Editor Agent</span>
                <span className="rcd-hp-pop-time">2m</span>
              </div>
              <p className="rcd-hp-pop-body">Dead air on this frame &mdash; trim 0:12&ndash;0:15?</p>
            </div>
          </div>
        </div>

        {/* filmstrip with the comment pinned to the selected frame */}
        <div className="rcd-strip">
          <span className="rcd-strip-cell" />
          <span className="rcd-strip-cell" />
          <span className="rcd-strip-cell" />
          <span className="rcd-strip-cell rcd-strip-cell--sel">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={VIDEO_POSTER} alt="Selected frame" />
            <span className="rcd-strip-pin"><Av initials="TA" agent /></span>
          </span>
          <span className="rcd-strip-cell" />
          <span className="rcd-strip-cell" />
        </div>
      </div>
    </Frame>
  ),

  "recording/what-it-is/scene": (
    <div className="rcd-wii">
      <div className="rcd-wii-rec">
        <span className="rcd-anchor">Forecast &middot; pinned to <mark>Q3 column</mark></span>
        <div className="rcd-hp-player">
          <span className="rcd-hp-play"><IconPlaySolid /></span>
          <div className="rcd-hp-track">
            <span className="rcd-hp-fill" style={{ width: "42%" }} />
            <span className="rcd-hp-marker" style={{ left: "42%" }}><Av initials="VA" agent /></span>
          </div>
          <span className="rcd-hp-dur">0:40</span>
        </div>
        <p className="rcd-transcript">&ldquo;The variance comes from the vendor rate change, see row 18.&rdquo;</p>
      </div>

      <div className="cmh-cmt cmh-cmt--plain">
        <Av initials="VA" agent />
        <div className="cmh-cmt-main">
          <div className="cmh-cmt-head">
            <span className="cmh-cmt-name">Variance Agent</span>
            <span className="chip chip-agent">agent</span>
            <span className="cmh-cmt-time">same thread</span>
          </div>
          <p className="cmh-cmt-body">Confirmed: the rate change in row 18 explains 92% of the variance. Suggested correction attached.</p>
          <div className="cmh-cmt-actions">
            <button type="button" className="cmh-btn approve">Approve</button>
            <button type="button" className="cmh-btn reject">Reject</button>
          </div>
        </div>
      </div>

      <p className="code-microcopy">one recording, both actors, the approval visible on the work</p>
    </div>
  ),

  // Voice notes (wide): an audio note pinned to a cell — byline, waveform
  // player, and the transcript beneath.
  "recording/showcase/voice": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconMic />
          Voice note
          <span className="cmh-cc-pill">0:18</span>
        </div>
        <div className="cmh-cc-body" style={{ display: "grid", gap: 12 }}>
          <div className="rcd-byline">
            <Av initials="FE" img={FACE.fenne} />
            <span className="rcd-byline-name">Fenne</span>
            <span className="chip chip-pending">pinned · C18</span>
            <span className="rcd-byline-time">just now</span>
          </div>
          <RcdPlayer
            active={7}
            duration="0:18"
            transcript={<>&ldquo;This number is faster said than typed: the variance is the vendor rate change.&rdquo;</>}
          />
        </div>
      </div>
    </div>
  ),

  // Video messages (narrow): a comment card with a camera-recording thumbnail,
  // reusing the shared cmh-rec-* video card from the comments page.
  "recording/showcase/video": (
    <div className="pv">
      <div className="cmh-rec-card">
        <div className="cmh-cmt cmh-cmt--plain">
          <Av initials="FE" img={FACE.fenne} />
          <div className="cmh-cmt-main">
            <div className="cmh-cmt-head">
              <span className="cmh-cmt-name">Fenne</span>
              <span className="cmh-cmt-time">2m</span>
            </div>
            <p className="cmh-cmt-body">Recorded a quick walkthrough of the pricing slide.</p>
          </div>
        </div>

        <div className="cmh-rec-media">
          <div className="cmh-rec-thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/features/comments/recording-thumb.jpg" alt="Fenne's video message" />
            <span className="cmh-rec-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </span>
            <span className="cmh-rec-bar" aria-hidden="true" />
          </div>

          <div className="cmh-rec-foot">
            <span className="cmh-rec-file">
              <span className="cmh-rec-spin" aria-hidden="true">V</span>
              <span className="cmh-rec-fname">Video message · 0:27</span>
            </span>
            <span className="cmh-rec-icons" aria-hidden="true">
              <svg className="cmh-rec-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 8.5 21 5v14l-6-3.5" />
                <rect x="3" y="6" width="12" height="12" rx="2.5" />
              </svg>
              <svg className="cmh-rec-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z" />
              </svg>
              <svg className="cmh-rec-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="5" r="1.6" />
                <circle cx="12" cy="12" r="1.6" />
                <circle cx="12" cy="19" r="1.6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Screen capture (narrow): a window mock with a live REC pill over a dark
  // stage, plus a mic-narration level row.
  "recording/showcase/screen": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--slate">
          <IconMonitor />
          Screen capture
          <span className="cmh-cc-pill">screen + mic</span>
        </div>
        <div className="cmh-cc-body" style={{ display: "grid", gap: 12 }}>
          <div className="rcd-screen">
            <div className="rcd-screen-bar">
              <span className="rcd-screen-dot" />
              <span className="rcd-screen-dot" />
              <span className="rcd-screen-dot" />
              <span className="rcd-rec"><i />REC 1:04</span>
            </div>
            <div className="rcd-stage">
              <div className="rcd-stage-grid" aria-hidden="true" />
              <span className="rcd-stage-play"><IconPlaySolid /></span>
            </div>
          </div>
          <div className="rcd-player">
            <div className="rcd-player-row">
              <span className="rcd-mic-ic"><IconMic /></span>
              <RcdWave active={9} mic />
              <span className="rcd-dur">1:04</span>
            </div>
            <p className="rcd-player-cap">mic narration</p>
          </div>
        </div>
      </div>
    </div>
  ),

  // Pinned recordings (wide): a Recorder Note pin anchored to a skeleton sheet
  // cell, with the pinned voice player and an "on the work" note.
  "recording/showcase/pinned": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--plum">
          <IconPin />
          Recorder Notes
          <span className="cmh-cc-pill">anchored</span>
        </div>
        <div className="cmh-cc-body rcd-pin-scene">
          <span className="rcd-anchor">forecast.xlsx · pinned to <mark>C18</mark></span>
          <div className="rcd-sheet">
            <span className="rcd-pin"><IconPlaySolid /></span>
            <span className="rcd-sheet-line" style={{ width: "64%" }} />
            <span className="rcd-sheet-line rcd-sheet-line--hl" style={{ width: "40%" }} />
            <span className="rcd-sheet-line" style={{ width: "74%" }} />
          </div>
          <RcdPlayer
            active={8}
            duration="0:42"
            caption="voice note · pinned to this cell"
            transcript={<>&ldquo;The variance comes from the vendor rate change, see row 18.&rdquo;</>}
          />
          <div className="apf-note">
            <span className="chip chip-approved">on the work</span>
            <span>lands on the cell, the field, the frame: not a separate library</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // AI transcription (wide): a dark player stage with a subtitle bar plus a
  // timestamped transcript and an AI-summary note.
  "recording/showcase/transcription": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--teal">
          <IconCaptions />
          Transcription
          <span className="cmh-cc-pill">AI · subtitles</span>
        </div>
        <div className="cmh-cc-body" style={{ display: "grid", gap: 12 }}>
          <div className="rcd-stage">
            <div className="rcd-stage-grid" aria-hidden="true" />
            <span className="rcd-stage-play"><IconPlaySolid /></span>
            <span className="rcd-stage-badge">3:04</span>
            <span className="rcd-stage-sub">&ldquo;…see row 18 for the vendor rate change.&rdquo;</span>
          </div>
          <div className="rcd-cues">
            <div className="rcd-cue">
              <span className="rcd-cue-t">0:00</span>
              <span className="rcd-cue-x">Walking through the Q3 forecast changes.</span>
            </div>
            <div className="rcd-cue rcd-cue--live">
              <span className="rcd-cue-t">0:14</span>
              <span className="rcd-cue-x">The variance comes from the vendor rate change.</span>
            </div>
            <div className="rcd-cue">
              <span className="rcd-cue-t">0:31</span>
              <span className="rcd-cue-x">See row 18: I&rsquo;ve flagged the cell.</span>
            </div>
          </div>
          <div className="apf-note">
            <span className="chip chip-agent">AI summary</span>
            <span>on by default · one prop opts out of the LLM</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Built-in editor (narrow): a frame strip, a scrubber with a knob, and the
  // trim / split / zoom tool chips.
  "recording/showcase/editor": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--ink">
          <IconScissors />
          Video editor
          <span className="cmh-cc-pill">no export</span>
        </div>
        <div className="cmh-cc-body" style={{ display: "grid", gap: 12 }}>
          <div className="rcd-timeline">
            <div className="rcd-frames">
              <span className="rcd-frame" />
              <span className="rcd-frame rcd-frame--mid" />
              <span className="rcd-frame rcd-frame--mid rcd-frame--sel" />
              <span className="rcd-frame rcd-frame--mid" />
              <span className="rcd-frame" />
              <span className="rcd-frame" />
            </div>
            {/* scrubber with comment pins at the timestamps people commented on */}
            <div className="rcd-tl-bar">
              <span className="rcd-tl-fill" style={{ width: "38%" }} />
              <span className="rcd-tl-knob" style={{ left: "38%" }} />
              <span className="rcd-tl-pin rcd-tl-pin--on" style={{ left: "24%" }}>
                <Av initials="HO" tone="a3" img={FACE.hope} />
                <i className="rcd-tl-stem" />
              </span>
              <span className="rcd-tl-pin" style={{ left: "66%" }}>
                <Av initials="GA" tone="a1" img={FACE.gavin} />
                <i className="rcd-tl-stem" />
              </span>
            </div>
            <div className="rcd-edit-foot">
              <span className="rcd-dur">0:19 / 0:48</span>
              <span className="chip chip-approved"><IconCheck />saved</span>
            </div>
            <div className="rcd-tools">
              <span className="int-chip"><i />trim</span>
              <span className="int-chip"><i />split</span>
              <span className="int-chip"><i />zoom</span>
              <span className="int-chip"><i />delete</span>
              <span className="int-chip"><i />retake</span>
            </div>
          </div>
          <div className="rcd-tl-cmt">
            <Av initials="HO" tone="a3" img={FACE.hope} />
            <div className="rcd-tl-cmt-main">
              <div className="rcd-tl-cmt-head">
                <span className="rcd-tl-cmt-name">Hope</span>
                <span className="rcd-tl-at"><IconClock />0:11</span>
                <span className="rcd-tl-cmt-time">just now</span>
              </div>
              <p className="rcd-tl-cmt-body">Cut from here, the intro runs long.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // Recordings in threads (narrow): a comment with a recording attachment and a
  // reply / resolve / deep-link action row.
  "recording/showcase/threads": (
    <div className="pv">
      <div className="apf-card apf-card--narrow">
        <div className="cmh-cc-head apf-head--purple">
          <IconReply />
          In a thread
          <span className="cmh-cc-pill">reply · resolve</span>
        </div>
        <div className="cmh-cc-body" style={{ display: "grid", gap: 12 }}>
          <div className="cmh-cmt cmh-cmt--plain">
            <Av initials="HO" tone="a3" img={FACE.hope} />
            <div className="cmh-cmt-main">
              <div className="cmh-cmt-head">
                <span className="cmh-cmt-name">Hope</span>
                <span className="cmh-cmt-time">2m</span>
              </div>
              <p className="cmh-cmt-body">Recorded the walkthrough: see the filing steps here.</p>
              <div className="rcd-attach">
                <span className="rcd-attach-play"><IconPlaySolid /></span>
                <span className="rcd-attach-main">
                  <span className="rcd-attach-name">work-order-walkthrough.webm</span>
                  <span className="rcd-attach-meta">screen + mic · 1:12</span>
                </span>
              </div>
            </div>
          </div>
          <div className="rcd-thread-foot">
            <span className="rcd-thread-act"><IconReply />2 replies</span>
            <span className="rcd-thread-act"><IconCheck />resolve</span>
            <span className="rcd-thread-act"><IconLink />deep-link</span>
          </div>
        </div>
      </div>
    </div>
  ),

  // Lifecycle events (wide): the SDK event stream rendered as status rows,
  // reusing the apf-evt-* signed-events layout.
  "recording/showcase/events": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--navy">
          <IconActivity />
          Lifecycle events
          <span className="cmh-cc-pill">SDK</span>
        </div>
        <div className="cmh-cc-body apf-evt-body">
          <div className="apf-evt-row">
            <span className="apf-evt-name">recordingStarted</span>
            <span className="apf-evt-seq">capture</span>
            <span className="chip chip-approved" style={{ marginLeft: "auto" }}>fired</span>
          </div>
          <div className="apf-evt-row">
            <span className="apf-evt-name">recordingPaused</span>
            <span className="apf-evt-seq">capture</span>
            <span className="chip chip-pending" style={{ marginLeft: "auto" }}>paused</span>
          </div>
          <div className="apf-evt-row">
            <span className="apf-evt-name">recordingDone</span>
            <span className="apf-evt-seq">media</span>
            <span className="chip chip-approved" style={{ marginLeft: "auto" }}>saved</span>
          </div>
          <div className="apf-evt-row">
            <span className="apf-evt-name">transcriptionDone</span>
            <span className="apf-evt-seq">ai</span>
            <span className="chip chip-agent" style={{ marginLeft: "auto" }}>ready</span>
          </div>
          <div className="apf-evt-row">
            <span className="apf-evt-name">recordingEditDone</span>
            <span className="apf-evt-seq">editor</span>
            <span className="chip chip-approved" style={{ marginLeft: "auto" }}>saved</span>
          </div>
          <div className="apf-evt-foot">
            <IconActivity />
            Drive your own UI, analytics, or audit from <code>velt.on()</code>
          </div>
        </div>
      </div>
    </div>
  ),

  // Self-hosted recording data (wide): two lanes — the heavy media stays on your
  // storage, while Velt keeps only minimal identifiers.
  "recording/showcase/self-host": (
    <div className="pv">
      <div className="apf-card">
        <div className="cmh-cc-head apf-head--slate">
          <IconServer />
          Recorder data provider
          <span className="cmh-cc-pill">your storage</span>
        </div>
        <div className="cmh-cc-body">
          <div className="rcd-route">
            <div className="rcd-route-col">
              <div className="rcd-route-head">
                <span className="rcd-route-ic"><IconServer /></span>
                <span className="rcd-route-titles">
                  <span className="rcd-route-title">Your storage</span>
                  <span className="rcd-route-sub">stays with you</span>
                </span>
              </div>
              <span className="rcd-route-item"><IconCheck />recorded files</span>
              <span className="rcd-route-item"><IconCheck />identity</span>
              <span className="rcd-route-item"><IconCheck />transcription</span>
              <span className="rcd-route-item"><IconCheck />attachment URLs</span>
            </div>
            <div className="rcd-route-col rcd-route-col--velt">
              <div className="rcd-route-head">
                <span className="rcd-route-ic"><IconLock /></span>
                <span className="rcd-route-titles">
                  <span className="rcd-route-title">Velt stores</span>
                  <span className="rcd-route-sub">minimal</span>
                </span>
              </div>
              <p className="rcd-route-min">Only minimal identifiers (<code>recordingId</code>, <code>userId</code>, timestamps), so the media never leaves your storage.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),

  // LOOK — a themed player (play control, waveform, progress, caption) above the
  // theming knobs that recolor and restyle the prebuilt recorder components.
  "recording/make-it-yours/look": (
    <div className="pv rcd-look">
      <div className="rcd-look-player">
        <span className="rcd-look-play"><IconPlaySolid /></span>
        <div className="rcd-look-main">
          <RcdWave active={8} />
          <span className="rcd-look-progress"><span style={{ width: "46%" }} /></span>
        </div>
        <span className="rcd-look-dur">0:42</span>
      </div>
      <p className="rcd-look-cc"><IconCaptions />&ldquo;the variance is the vendor rate change&rdquo;</p>
      <div className="rcd-look-knobs">
        <span className="rcd-look-sw rcd-look-sw--1" aria-hidden="true" />
        <span className="rcd-look-sw rcd-look-sw--2" aria-hidden="true" />
        <span className="rcd-look-sw rcd-look-sw--3" aria-hidden="true" />
        <span className="rcd-look-knob">player</span>
        <span className="rcd-look-knob rcd-look-knob--dark">dark</span>
      </div>
    </div>
  ),

  // BEHAVIOR — the recorder config: capture type, transcription, storage
  // routing, and lifecycle events, as labeled config rows.
  "recording/make-it-yours/behavior": (
    <div className="pv rcd-cfg">
      <div className="rcd-cfg-row">
        <span className="rcd-cfg-ic"><IconMonitor /></span>
        <span className="rcd-cfg-main">
          <span className="rcd-cfg-key">type</span>
          <span className="rcd-cfg-sub">voice · video · screen</span>
        </span>
        <span className="rcd-cfg-seg">
          <span className="rcd-cfg-seg-on">floating</span>
          <span>thread</span>
        </span>
      </div>
      <div className="rcd-cfg-row">
        <span className="rcd-cfg-ic rcd-cfg-ic--cc"><IconCaptions /></span>
        <span className="rcd-cfg-main">
          <span className="rcd-cfg-key">transcription</span>
          <span className="rcd-cfg-sub">AI subtitles · quality · max length</span>
        </span>
        <span className="chip chip-agent">on</span>
      </div>
      <div className="rcd-cfg-row">
        <span className="rcd-cfg-ic rcd-cfg-ic--store"><IconServer /></span>
        <span className="rcd-cfg-main">
          <span className="rcd-cfg-key">recorderDataProvider</span>
          <span className="rcd-cfg-sub">route media to your bucket</span>
        </span>
        <span className="chip chip-approved">your storage</span>
      </div>
      <div className="rcd-cfg-row">
        <span className="rcd-cfg-ic rcd-cfg-ic--evt"><IconActivity /></span>
        <span className="rcd-cfg-main">
          <span className="rcd-cfg-key">velt.on()</span>
          <span className="rcd-cfg-sub">started · done · editDone</span>
        </span>
        <span className="cmh-live"><i />events</span>
      </div>
    </div>
  ),

  "recording/in-production/sales": <DigitalSalesRoom />,

  "recording/in-production/fintech": <FintechBoard />,

  "recording/in-production/ops": <OperationsBoard />,

  "recording/in-production/compliance": <ComplianceBoard />,

  "recording/in-production/legal": <LegalBoard />,

  "recording/in-production/ai": <AiNativeBoard />,

  "recording/related/comments": (
    <div className="pv">
      <div className="rcd-rel">
        <div className="rcd-rel-cmt">
          <Av initials="GA" tone="a1" img={FACE.gavin} />
          <div className="rcd-rel-cmt-main">
            <span className="rcd-rel-top">
              <span className="rcd-rel-name">Gavin</span>
              <span className="rcd-rel-time">1m</span>
            </span>
            <p className="rcd-rel-line">Replied on the pinned recording</p>
            <span className="rcd-rel-tag"><IconPlaySolid />voice note · 0:42</span>
          </div>
        </div>
        <p className="rcd-rel-cap">a recording lives inside a thread <IconArrowRight /> the thread holds the decision</p>
      </div>
    </div>
  ),

  "recording/related/huddle": (
    <div className="pv">
      <div className="rcd-rel">
        <div className="rcd-rel-live">
          <span className="rcd-rel-stack">
            <Av initials="FE" tone="a2" img={FACE.fenne} />
            <Av initials="HO" tone="a3" img={FACE.hope} />
          </span>
          <span className="rcd-rel-livetag"><i />live huddle</span>
        </div>
        <p className="rcd-rel-cap">async recording not enough <IconArrowRight /> go live in the same document</p>
      </div>
    </div>
  ),

  "recording/related/notifications": (
    <div className="pv">
      <div className="rcd-rel">
        <div className="rcd-rel-inbox">
          <span className="rcd-rel-bell"><IconBell /></span>
          <div className="rcd-rel-inbox-main">
            <p className="rcd-rel-line"><strong>Hope</strong> shared a recording</p>
            <div className="rcd-rel-chips">
              <span className="rcd-rel-chip">inbox</span>
              <span className="rcd-rel-chip">email</span>
              <span className="rcd-rel-chip">slack</span>
            </div>
          </div>
        </div>
        <p className="rcd-rel-cap">a recording lands <IconArrowRight /> the reviewer is told</p>
      </div>
    </div>
  ),
};
