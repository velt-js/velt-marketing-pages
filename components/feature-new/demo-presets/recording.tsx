import type { ReactNode } from "react";

import { AvatarStack, CursorTag, NotifItem, DarkPanel, ProvRow, ProvArrow, Precedent } from "../demos";

// Simulated-UI demo nodes for the /new-features/recording page. Keys match
// components/feature-new/demo-presets/recording.keys.ts; resolved by
// demo-registry.tsx. Visuals are simulated, not live SDK instances.

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
            background: index < active ? "var(--brand, #ff4f00)" : "var(--line, #e7e2d9)",
          }}
        />
      ))}
    </div>
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
        border: "1px solid var(--line, #e7e2d9)",
        borderRadius: 12,
        background: "var(--bg, #fff)",
        padding: 12,
        display: "grid",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "var(--brand, #ff4f00)",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="#fff" aria-hidden="true">
            <path d="M1 0.5 L10 5.5 L1 10.5 Z" />
          </svg>
        </span>
        <Waveform active={active} />
        <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.65, flexShrink: 0 }}>{duration}</span>
      </div>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: 0.3, opacity: 0.55 }}>{label}</p>
      {transcript ? (
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.45, color: "var(--ink, #0b353b)" }}>{transcript}</p>
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
        border: "1px solid var(--line, #e7e2d9)",
        borderRadius: 12,
        background: "var(--bg, #fff)",
        padding: 14,
        display: "grid",
        gap: 10,
      }}
    >
      <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>
        Forecast · pinned to{" "}
        <mark style={{ background: "color-mix(in srgb, var(--brand) 22%, transparent)", padding: "1px 5px", borderRadius: 4 }}>
          {cell}
        </mark>
      </p>
      {children}
    </div>
  );
}

/**
 * Simulated video-editor timeline with frame previews and a trim/split handle.
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
                  ? "var(--line, #e7e2d9)"
                  : "color-mix(in srgb, var(--brand) 30%, var(--line, #e7e2d9))",
              border: frame === 2 ? "2px solid var(--brand, #ff4f00)" : "1px solid var(--line, #e7e2d9)",
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

export const RECORDING_DEMOS: Record<string, ReactNode> = {
  "recording/hero/voice": (
    <div style={{ padding: 18 }}>
      <PinnedCell cell="Q3 · cell C18">
        <Player
          label="Voice note · pinned to the number"
          duration="0:40"
          transcript={"“The variance comes from the vendor rate change, see row 18.”"}
        />
      </PinnedCell>
    </div>
  ),

  "recording/hero/video": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <div
        style={{
          position: "relative",
          height: 120,
          borderRadius: 12,
          background: "var(--ink, #0b353b)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span style={{ fontSize: 12, fontWeight: 700, color: "#fff", opacity: 0.85 }}>Camera · 0:32</span>
        <span style={{ position: "absolute", top: 10, left: 10, display: "inline-flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--brand, #ff4f00)" }} />
          <span style={{ fontSize: 10.5, fontWeight: 800, color: "#fff", letterSpacing: 0.5 }}>REC</span>
        </span>
      </div>
      <p className="code-microcopy">camera recording captured and played back inside the thread</p>
    </div>
  ),

  "recording/hero/screen": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <Player label="Screen capture · with mic narration" duration="1:12" active={9} transcript={"“Here is the filing, walking through it the way I would in person.”"} />
      <ProvRow>
        one button in your UI <ProvArrow /> tab or full-screen recording
      </ProvRow>
    </div>
  ),

  "recording/hero/editor": (
    <div style={{ display: "grid", gap: 12, padding: 18 }}>
      <EditorTimeline />
      <p className="code-microcopy">edit the take where it was made · no export, no third-party tool</p>
    </div>
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
        title={<><strong>Variance Agent</strong> replied: “Confirmed — the rate change in row 18 explains 92% of the variance. Suggested correction attached.”</>}
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
