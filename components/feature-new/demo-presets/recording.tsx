import type { ReactNode } from "react";

import { AvatarStack, NotifItem, DarkPanel, ProvRow, ProvArrow, Precedent } from "../demos";
import {
  Av,
  Composer,
  FACES,
  Frame,
  IconCheck,
  IconReply,
} from "./hero-surface";

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

  "recording/showcase/voice": (
    <div className="pv">
      <Player label="Voice note · pinned to the cell" duration="0:18" transcript={"“This number is faster said than typed.”"} />
    </div>
  ),

  "recording/showcase/video": (
    <div className="pv">
      <div
        style={{
          height: 96,
          borderRadius: 10,
          background: "var(--ink, #0b353b)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", opacity: 0.85 }}>Video message · 0:27</span>
      </div>
    </div>
  ),

  "recording/showcase/screen": (
    <div className="pv">
      <Player label="Screen capture · mic narration" duration="1:04" active={8} />
    </div>
  ),

  "recording/showcase/pinned": (
    <div className="pv">
      <ProvRow>
        Recorder Notes <ProvArrow /> the cell, the field, the frame
      </ProvRow>
      <ProvRow>
        show-not-tell feedback <ProvArrow /> lands on the work
      </ProvRow>
    </div>
  ),

  "recording/showcase/transcription": (
    <div className="pv">
      <Precedent
        style={{ width: "100%" }}
        heading="AI transcription · subtitles · summary"
        body={"“The variance comes from the vendor rate change, see row 18.”"}
        meta="on by default · one prop opts out of the LLM"
      />
    </div>
  ),

  "recording/showcase/editor": (
    <div className="pv">
      <EditorTimeline />
    </div>
  ),

  "recording/showcase/threads": (
    <div className="pv">
      <ProvRow>
        recording <ProvArrow /> reply, resolve, deep-link
      </ProvRow>
      <ProvRow>
        the walkthrough and the decision <ProvArrow /> one place
      </ProvRow>
    </div>
  ),

  "recording/showcase/events": (
    <div className="pv">
      <DarkPanel>{"recordingStarted → recordingPaused →\nrecordingDone → transcriptionDone →\nrecordingEditDone"}</DarkPanel>
    </div>
  ),

  "recording/showcase/self-host": (
    <div className="pv">
      <ProvRow>
        files · identity · transcription <ProvArrow /> your storage
      </ProvRow>
      <ProvRow>
        Velt stores <ProvArrow /> minimal identifiers
      </ProvRow>
    </div>
  ),

  "recording/make-it-yours/look": (
    <div style={{ padding: 18 }}>
      <ProvRow>Recorder Tool · Control Panel · Player</ProvRow>
      <ProvRow>Video Editor · Subtitles · Transcription</ProvRow>
      <ProvRow>wireframes · template variables · dark mode</ProvRow>
    </div>
  ),

  "recording/make-it-yours/behavior": (
    <div style={{ padding: 18 }}>
      <ProvRow>type · floating vs thread · max length</ProvRow>
      <ProvRow>quality · encoding · transcription toggle</ProvRow>
      <ProvRow>events · data APIs · recorder data provider</ProvRow>
    </div>
  ),

  "recording/in-production/sales": (
    <div style={{ display: "grid", gap: 12, padding: 22 }}>
      <Player label="Walkthrough · pinned to slide 4" duration="1:00" active={11} />
      <p className="code-microcopy">the client watches and replies in the thread; no call scheduled</p>
    </div>
  ),

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
      <ProvRow>
        a recording lives inside a thread <ProvArrow /> the thread holds the decision
      </ProvRow>
    </div>
  ),

  "recording/related/huddle": (
    <div className="pv">
      <AvatarStack users={[{ initials: "MA", kind: "human" }, { initials: "SR", kind: "human" }]} />
      <ProvRow>
        async recording not enough <ProvArrow /> go live in the same document
      </ProvRow>
    </div>
  ),

  "recording/related/notifications": (
    <div className="pv">
      <ProvRow>
        a recording lands <ProvArrow /> the reviewer is told
      </ProvRow>
    </div>
  ),
};
