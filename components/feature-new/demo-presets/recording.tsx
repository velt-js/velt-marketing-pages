import type { ReactNode } from "react";

import { NotifItem } from "../demos";
import { CrmPipelineBoard } from "./crm-board";
import {
  Av,
  Composer,
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

/**
 * Simulated audio/video waveform strip used inside the recorder Player.
 * @param {{ active?: number }} props Number of leading "played" bars.
 * @returns {JSX.Element} Waveform row.
 */
function Waveform({ active = 6 }: { active?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 28, flex: 1 }}>
      {WAVE_BARS.map((height, index) => (
        <span
          key={`bar-${index}`}
          style={{
            width: 3,
            height,
            borderRadius: 2,
            background: index < active ? "var(--vlp-color-accent)" : "var(--vlp-border-default)",
          }}
        />
      ))}
    </div>
  );
}

/**
 * Orange circular play button used inside voice and video player surfaces.
 * @returns {JSX.Element} Play button circle.
 */
function PlayBtn() {
  return (
    <span
      style={{
        width: 30,
        height: 30,
        borderRadius: "50%",
        background: "var(--vlp-color-accent)",
        display: "grid",
        placeItems: "center",
        flexShrink: 0,
        boxShadow: "0 1px 4px rgba(255,79,0,0.28)",
      }}
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="#fff" aria-hidden="true">
        <path d="M1 0.5 L10 5.5 L1 10.5 Z" />
      </svg>
    </span>
  );
}

/**
 * Compact recorder Player surface: play control, waveform, duration, and an
 * optional transcription line beneath.
 * @param {{ label?: string; duration?: string; transcript?: ReactNode; active?: number }} props Player content.
 * @returns {JSX.Element} Player card.
 */
function Player({
  label = "Voice note",
  duration = "0:40",
  transcript,
  active = 6,
}: {
  label?: string;
  duration?: string;
  transcript?: ReactNode;
  active?: number;
}) {
  return (
    <div
      style={{
        border: "1px solid var(--vlp-border-default)",
        borderRadius: 12,
        background: "var(--vlp-bg-page)",
        padding: 12,
        display: "grid",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <PlayBtn />
        <Waveform active={active} />
        <span style={{ fontSize: 11, fontWeight: 700, color: "var(--vlp-color-text-subtle)", flexShrink: 0 }}>{duration}</span>
      </div>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: 0.3, color: "var(--vlp-color-text-subtle)" }}>{label}</p>
      {transcript ? (
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.45, color: "var(--vlp-color-ink-soft)" }}>{transcript}</p>
      ) : null}
    </div>
  );
}

/**
 * A spreadsheet-cell host that pins a recording to an exact location.
 * @param {{ cell: string; children: ReactNode }} props Cell label and pinned content.
 * @returns {JSX.Element} Pinned-recording surface.
 */
function PinnedCell({ cell, children }: { cell: string; children: ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--vlp-border-default)",
        borderRadius: 12,
        background: "var(--vlp-bg-page)",
        padding: 14,
        display: "grid",
        gap: 10,
      }}
    >
      <p style={{ margin: 0, fontSize: 12, color: "var(--vlp-color-text-muted)" }}>
        Forecast · pinned to{" "}
        <mark style={{ background: "color-mix(in srgb, var(--vlp-color-accent) 22%, transparent)", padding: "1px 5px", borderRadius: 4 }}>
          {cell}
        </mark>
      </p>
      {children}
    </div>
  );
}

/**
 * Simulated video-editor timeline with frame previews, scrubber and trim handles.
 * @returns {JSX.Element} Editor timeline.
 */
function EditorTimeline() {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <div style={{ display: "flex", gap: 4 }}>
        {[0, 1, 2, 3, 4, 5].map((frame) => (
          <span
            key={`frame-${frame}`}
            style={{
              flex: 1,
              height: 30,
              borderRadius: 4,
              background:
                frame === 0 || frame === 5
                  ? "var(--vlp-border-subtle)"
                  : "color-mix(in srgb, var(--vlp-color-accent) 30%, var(--vlp-border-default))",
              border: frame === 2 ? "2px solid var(--vlp-color-accent)" : "1px solid var(--vlp-border-default)",
            }}
          />
        ))}
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <span className="chip chip-pending">trim</span>
        <span className="chip chip-pending">split</span>
        <span className="chip chip-pending">zoom</span>
        <span className="chip chip-pending">delete segment</span>
        <span className="chip chip-pending">retake</span>
      </div>
    </div>
  );
}

/**
 * A video message thumbnail poster: dark rectangle with a play overlay and a
 * recorder avatar + caption badge anchored to the corner.
 * @param {{ duration?: string; caption?: string; recorderImg?: string; recorderInitials?: string }} props Thumbnail content.
 * @returns {JSX.Element} Video thumbnail card.
 */
function VideoThumbnail({
  duration = "0:32",
  caption = "Walkthrough · slide 4",
  recorderImg,
  recorderInitials = "FE",
}: {
  duration?: string;
  caption?: string;
  recorderImg?: string;
  recorderInitials?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        height: 110,
        borderRadius: 12,
        background: "linear-gradient(160deg, var(--vlp-color-ink) 0%, #1a4248 100%)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(11,53,59,0.22)",
      }}
    >
      {/* subtle grid lines for "screen" texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 18px, rgba(255,255,255,0.03) 18px, rgba(255,255,255,0.03) 19px)",
          pointerEvents: "none",
        }}
      />

      {/* centred play button */}
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
          border: "1.5px solid rgba(255,255,255,0.38)",
          display: "grid",
          placeItems: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="#fff" aria-hidden="true">
          <path d="M2 1 L12 6.5 L2 12 Z" />
        </svg>
      </span>

      {/* duration badge top-right */}
      <span
        style={{
          position: "absolute",
          top: 8,
          right: 10,
          fontSize: 10,
          fontWeight: 700,
          color: "#fff",
          background: "rgba(0,0,0,0.5)",
          borderRadius: 4,
          padding: "2px 6px",
          fontFamily: "var(--vlp-font-mono)",
          letterSpacing: "0.04em",
        }}
      >
        {duration}
      </span>

      {/* recorder avatar + caption bottom-left */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "rgba(0,0,0,0.48)",
          borderRadius: 999,
          padding: "3px 8px 3px 3px",
          backdropFilter: "blur(4px)",
        }}
      >
        <Av initials={recorderInitials} img={recorderImg} />
        <span style={{ fontSize: 11, fontWeight: 600, color: "#fff", letterSpacing: 0.2 }}>{caption}</span>
      </div>
    </div>
  );
}

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
  // ── VOICE ──────────────────────────────────────────────────────────────
  "recording/hero/voice": (
    <Frame
      app="FS"
      crumb={<><b>forecast.xlsx</b> <span className="sep">/</span> Q3 · cell C18</>}
      users={[
        { initials: "FE", tone: "a2", img: FACE.fenne },
        { initials: "GA", tone: "a1", img: FACE.gavin },
      ]}
    >
      <PinnedCell cell="C18">
        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 4 }}>
          <Av initials="FE" img={FACE.fenne} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--vlp-color-ink)" }}>Fenne</span>
          <span style={{ fontSize: 10.5, color: "var(--vlp-color-text-subtle)", fontFamily: "var(--vlp-font-mono)", marginLeft: "auto" }}>just now</span>
        </div>
        <Player
          label="Voice note · pinned to this cell"
          duration="0:42"
          active={7}
          transcript={"“The variance is from the vendor rate change — see row 18.”"}
        />
      </PinnedCell>

      <div className="thread cmh-pop">
        <div className="thread-head">
          <Av initials="GA" tone="a1" img={FACE.gavin} />
          <span className="who">Gavin</span>
          <span className="cmh-role">· Finance</span>
          <span className="cmh-when">1m</span>
        </div>
        <p className="thread-body">Got it — I&rsquo;ll update the model and share the revised sheet.</p>
        <div className="cmh-foot">
          <span className="cmh-rx on">👍 2</span>
          <span className="cmh-reply"><IconReply />1 reply</span>
        </div>
      </div>

      <Composer placeholder="Reply to Fenne…" you={FACE.gavin} />
    </Frame>
  ),

  // ── VIDEO ──────────────────────────────────────────────────────────────
  "recording/hero/video": (
    <Frame
      app="PR"
      crumb={<><b>proposal-v3.pdf</b> <span className="sep">/</span> slide 4</>}
      users={[
        { initials: "FE", tone: "a2", img: FACE.fenne },
        { initials: "ET", tone: "a1", img: FACE.ethan },
      ]}
    >
      <VideoThumbnail
        duration="0:32"
        caption="Fenne · pricing"
        recorderImg={FACE.fenne}
        recorderInitials="FE"
      />

      <div className="thread">
        <div className="thread-head">
          <Av initials="FE" img={FACE.fenne} />
          <span className="who">Fenne</span>
          <span className="cmh-role">· Design</span>
          <span className="cmh-when">3m</span>
        </div>
        <p className="thread-body">Recorded a quick walkthrough of slide 4 — the pricing table needs one more row. @Ethan can you confirm the seats number?</p>
        <div className="cmh-foot">
          <span className="cmh-rx on">✅ 1</span>
          <span className="cmh-reply"><IconReply />2 replies</span>
        </div>
      </div>

      <Composer placeholder="Reply to Fenne…" you={FACE.ethan} />
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
      <div
        style={{
          border: "1px solid var(--vlp-border-default)",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--vlp-bg-page)",
        }}
      >
        {/* recording chip header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "var(--vlp-bg-section-alt)",
            borderBottom: "1px solid var(--vlp-border-subtle)",
          }}
        >
          <Av initials="HO" img={FACE.hope} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--vlp-color-ink)" }}>Hope</span>
          <span className="chip chip-pending" style={{ marginLeft: "auto" }}>screen + mic</span>
          <span style={{ fontSize: 10.5, fontFamily: "var(--vlp-font-mono)", color: "var(--vlp-color-text-subtle)" }}>7m</span>
        </div>

        <div style={{ padding: 12 }}>
          <Player
            label="Screen capture · mic narration"
            duration="1:12"
            active={9}
            transcript={"“Here's the filing — walking through it the way I would in person.”"}
          />
        </div>
      </div>

      <div className="thread cmh-pop">
        <div className="thread-head">
          <Av initials="ET" tone="a1" img={FACE.ethan} />
          <span className="who">Ethan</span>
          <span className="cmh-role">· Ops</span>
          <span className="cmh-when">2m</span>
        </div>
        <p className="thread-body">This is exactly what I needed — approving the work order now.</p>
        <div className="cmh-foot">
          <span className="cmh-rx on"><IconCheck />Approved</span>
        </div>
      </div>

      <Composer placeholder="Reply or @mention…" you={FACE.hope} />
    </Frame>
  ),

  // ── EDITOR ─────────────────────────────────────────────────────────────
  "recording/hero/editor": (
    <Frame
      app="VE"
      crumb={<><b>take-3.webm</b> <span className="sep">/</span> editor</>}
      users={[
        { initials: "GA", tone: "a1", img: FACE.gavin },
        { initials: "TA", agent: true },
      ]}
    >
      {/* timeline track */}
      <div
        style={{
          border: "1px solid var(--vlp-border-default)",
          borderRadius: 12,
          background: "var(--vlp-bg-page)",
          padding: 14,
          display: "grid",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Av initials="GA" img={FACE.gavin} />
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--vlp-color-ink)" }}>Gavin</span>
          <span style={{ fontSize: 10.5, fontFamily: "var(--vlp-font-mono)", color: "var(--vlp-color-text-subtle)", marginLeft: "auto" }}>editing</span>
        </div>

        <EditorTimeline />

        {/* scrubber bar */}
        <div
          style={{
            position: "relative",
            height: 4,
            borderRadius: 2,
            background: "var(--vlp-border-default)",
          }}
        >
          <div
            style={{
              width: "38%",
              height: "100%",
              borderRadius: 2,
              background: "var(--vlp-color-accent)",
            }}
          />
          {/* scrubber handle */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "38%",
              transform: "translate(-50%, -50%)",
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "var(--vlp-color-accent)",
              border: "2px solid #fff",
              boxShadow: "0 1px 3px rgba(255,79,0,0.4)",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10.5, fontFamily: "var(--vlp-font-mono)", color: "var(--vlp-color-text-subtle)" }}>0:19 / 0:48</span>
          <span className="chip chip-approved"><IconCheck />saved</span>
        </div>
      </div>

      {/* AI transcript agent finding */}
      <div className="finding cmh-finding">
        <div className="fh">
          <Av initials="TA" agent />
          Transcript Agent
          <span className="chip chip-agent">agent</span>
          <span className="cmh-when">now</span>
        </div>
        <p className="fb">Transcription ready — 98% confidence. 3 filler words detected between 0:14 and 0:19.</p>
        <div className="cmh-acts">
          <button type="button" className="cmh-btn approve"><IconCheck />Accept</button>
          <button type="button" className="cmh-btn reject">Skip</button>
        </div>
      </div>
    </Frame>
  ),

  "recording/what-it-is/scene": (
    <div style={{ display: "grid", gap: 14, padding: 18 }}>
      <PinnedCell cell="Q3 column">
        <Player
          label="Screen recording · human · 0:40"
          duration="0:40"
          active={10}
          transcript={"“The variance comes from the vendor rate change, see row 18.”"}
        />
      </PinnedCell>
      <NotifItem
        avatar={{ initials: "VA", kind: "agent", name: "Variance Agent" }}
        title={<><strong>Variance Agent</strong> replied: &ldquo;Confirmed — the rate change in row 18 explains 92% of the variance. Suggested correction attached.&rdquo;</>}
        meta="judge type AGENT · same thread"
        actions
      />
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
            transcript={<>&ldquo;This number is faster said than typed &mdash; the variance is the vendor rate change.&rdquo;</>}
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
            <span>lands on the cell, the field, the frame — not a separate library</span>
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
              <span className="rcd-cue-x">See row 18 — I&rsquo;ve flagged the cell.</span>
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
        <div className="cmh-cc-body">
          <div className="rcd-timeline">
            <div className="rcd-frames">
              <span className="rcd-frame" />
              <span className="rcd-frame rcd-frame--mid" />
              <span className="rcd-frame rcd-frame--mid rcd-frame--sel" />
              <span className="rcd-frame rcd-frame--mid" />
              <span className="rcd-frame" />
              <span className="rcd-frame" />
            </div>
            <div className="rcd-scrub">
              <span className="rcd-scrub-fill" style={{ width: "38%" }} />
              <span className="rcd-scrub-knob" style={{ left: "38%" }} />
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
              <p className="cmh-cmt-body">Recorded the walkthrough — see the filing steps here.</p>
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
              <p className="rcd-route-min">Only minimal identifiers — <code>recordingId</code>, <code>userId</code>, timestamps — so the media never leaves your storage.</p>
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

  "recording/in-production/sales": <CrmPipelineBoard />,

  "recording/in-production/fintech": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <PinnedCell cell="Q3 cell">
        <Player label="Voice note · transcribed" duration="0:34" transcript={"“The variance is the vendor rate change.”"} />
      </PinnedCell>
      <p className="code-microcopy">months later, the auditor reads what was said, when, and by whom</p>
    </div>
  ),

  "recording/in-production/ops": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <div
        style={{
          height: 96,
          borderRadius: 10,
          background: "var(--ink, #0b353b)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", opacity: 0.85 }}>Damaged shipment · phone · 0:22</span>
      </div>
      <p className="code-microcopy">pinned to the order record · the claim decision happens on evidence</p>
    </div>
  ),

  "recording/in-production/ai": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <Player
        label="Reviewer · why the draft was rejected"
        duration="0:48"
        active={9}
        transcript={"“Rejected — the tone is off for this account.”"}
      />
      <p className="code-microcopy">transcription turns the rationale into text the next reviewer and your agents can read</p>
    </div>
  ),

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
