"use client";

import { useState } from "react";
import Image from "next/image";
import CopyButton from "./CopyButton";
import FlowerAvatar from "./FlowerAvatar";
import "./Collaboration.css";

const CURSOR_POINTER_PURPLE = "/images/home/features/cursor-pointer-purple.svg";
const CURSOR_POINTER_ORANGE = "/images/home/features/cursor-pointer-orange.svg";

// Human faces (Unsplash) used for presence avatars. Agents use FlowerAvatar.
const UNSPLASH_FACE = "?auto=format&fit=crop&crop=faces&w=96&h=96&q=80";
const FACE_ANNA = `https://images.unsplash.com/photo-1438761681033-6461ffad8d80${UNSPLASH_FACE}`;
const FACE_MIKE = `https://images.unsplash.com/photo-1500648767791-00dcc994a43e${UNSPLASH_FACE}`;
const FACE_SARA = `https://images.unsplash.com/photo-1494790108377-be9c29b29330${UNSPLASH_FACE}`;

type CollabCardProps = {
  name: string;
  oneLiner: string;
  /** Optional anchor sub-references for features folded into this family. */
  folds?: { label: string; href: string }[];
  preview: React.ReactNode;
  codeFile: string;
  code: React.ReactNode;
};

/**
 * A single collaboration family card with a Preview | Code toggle (Part 5.4).
 * Both panes stay mounted and stacked so the card height equals the taller
 * pane and switching tabs never reflows the grid, mirroring PrimitiveCard.
 * @param {CollabCardProps} props - card content and its real code snippet.
 * @returns {JSX.Element} the rendered card.
 */
function CollabCard({ name, oneLiner, folds, preview, codeFile, code }: CollabCardProps) {
  const [tab, setTab] = useState<"preview" | "code">("preview");

  return (
    <div className="collab-card">
      <div className="collab-card-head">
        <h3 className="collab-card-h4">{name}</h3>
        <div className="prim-tabs" role="tablist" aria-label={`${name} preview`}>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "preview"}
            onClick={() => setTab("preview")}
            className={tab === "preview" ? "prim-tab prim-tab-active" : "prim-tab prim-tab-inactive"}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "code"}
            onClick={() => setTab("code")}
            className={tab === "code" ? "prim-tab prim-tab-active" : "prim-tab prim-tab-inactive"}
          >
            Code
          </button>
        </div>
      </div>

      {/* Preview and code share one grid cell; switching tabs toggles
          visibility without resizing the card. */}
      <div className="collab-stack">
        <div className={tab === "preview" ? "" : "collab-pane-hidden"}>{preview}</div>
        <div className={tab === "code" ? "collab-code-host" : "collab-code-host collab-pane-hidden"}>
          <div className="prim-code-card">
            <div className="prim-code-header">
              {codeFile}
              <CopyButton />
            </div>
            {code}
          </div>
        </div>
      </div>

      <p className="collab-card-p">{oneLiner}</p>
      {folds ? (
        <p className="collab-card-folds">
          {folds.map((fold, index) => (
            <span key={fold.href}>
              {index > 0 ? " · " : null}
              <a href={fold.href}>{fold.label}</a>
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}

export default function Collaboration() {
  return (
    <section className="collab-section">
      <div className="collab-header">
        <div className="collab-eyebrow"><span className="collab-eyebrow-dot"></span>The collaboration layer</div>
        <h2 className="collab-title">Everything else your users expect.</h2>
        <p className="collab-desc">The multiplayer layer, included. Same SDK, no second vendor, no second contract.</p>
      </div>

      <div className="collab-grid">
        {/* Presence — folds in Live Cursors */}
        <CollabCard
          name="Presence"
          oneLiner="See who is working, live: avatars, cursors, selection, follow mode. Humans and agents."
          folds={[{ label: "Live cursors", href: "/presence#cursors" }]}
          codeFile="App.tsx"
          preview={
            <div className="collab-stage presence-stage">
              <div className="pr-facepile">
                <span className="pr-ava pr-ava-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={FACE_ANNA} alt="Anna" />
                  <i className="pr-dot"></i>
                </span>
                <span className="pr-ava pr-ava-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={FACE_MIKE} alt="Mike" />
                  <i className="pr-dot"></i>
                </span>
                <span className="pr-ava pr-ava-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={FACE_SARA} alt="Sara" />
                </span>
                <FlowerAvatar tone="violet" uid="pr-agent" className="pr-ava pr-ava-flower" />
              </div>
              <div className="cs-strip">
                <div className="cs-anna">
                  <span className="cs-ava" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={FACE_ANNA} alt="" />
                  </span>
                  <Image src={CURSOR_POINTER_PURPLE} alt="" className="cs-pointer cs-pointer-flip" aria-hidden="true" width={34} height={36} unoptimized />
                </div>
                <div className="cs-emma">
                  <Image src={CURSOR_POINTER_ORANGE} alt="" className="cs-pointer" aria-hidden="true" width={34} height={36} unoptimized />
                  <span className="cs-name cs-name-agent">Agent</span>
                </div>
              </div>
            </div>
          }
          code={
            <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltPresence
  participants={users}
  agents
/&gt;` }} />
          }
        />

        {/* Multiplayer editing — folds in Single Editor Mode */}
        <CollabCard
          name="Multiplayer editing"
          oneLiner="Edit together without conflicts: co-editing, single editor mode, state sync. CRDT under the hood."
          folds={[{ label: "Single editor mode", href: "/multiplayer-editing#single-editor" }]}
          codeFile="editor.ts"
          preview={
            <div className="collab-stage multi-stage">
              <div className="ml-line"><span className="ml-fill ml-fill-pink" style={{ width: "46%" }}></span><span className="ml-flag ml-flag-pink">Bob</span></div>
              <div className="ml-line"><span className="ml-fill" style={{ width: "82%" }}></span></div>
              <div className="ml-line"><span className="ml-fill" style={{ width: "64%" }}></span></div>
              <div className="ml-line"><span className="ml-fill ml-fill-green" style={{ width: "70%" }}></span><span className="ml-flag ml-flag-green">Agent</span></div>
              <div className="ml-line"><span className="ml-fill" style={{ width: "88%" }}></span></div>
            </div>
          }
          code={
            <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `<span class="prim-code-kw">const</span> crdt = VeltCrdt.tiptap({
  documentId: id,
  singleEditor: <span class="prim-code-kw">false</span>,
});` }} />
          }
        />

        {/* Recording */}
        <CollabCard
          name="Recording"
          oneLiner="Voice, video, and screen pinned to the work, with a built-in video editor."
          codeFile="App.tsx"
          preview={
            <div className="collab-stage rec-stage">
              <div className="rc-control">
                <span className="rc-screen">
                  <svg className="collab-svg-on-dark" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span className="rc-time">00:42</span>
                <span className="rc-pause"><i></i><i></i></span>
                <span className="rc-stop"></span>
                <span className="rc-close">
                  <svg className="collab-svg-muted" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="rc-cam">
                <span className="rc-ava">D</span>
                <span className="rc-cam-ctrl">
                  <svg className="collab-svg-ink" width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M6 11a6 6 0 0 0 12 0M12 17v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                  </svg>
                  <svg className="collab-svg-ink" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="7" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
                    <path d="M15 11l5-3v8l-5-3" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </div>
          }
          code={
            <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltRecorderControl
  type=<span class="prim-code-str">"all"</span>
  editor
/&gt;` }} />
          }
        />

        {/* Huddle */}
        <CollabCard
          name="Huddle"
          oneLiner="Live audio and video, right inside the document."
          codeFile="App.tsx"
          preview={
            <div className="collab-stage huddle-stage">
              <div className="hd-panel">
                <div className="hd-head">
                  <span className="hd-head-ico">
                    <svg className="collab-svg-green" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M4 13v-1a8 8 0 0 1 16 0v1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                      <rect x="3" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                      <rect x="17" y="13" width="4" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  </span>
                  <span className="hd-head-txt">2 people in Huddle</span>
                  <span className="hd-kebab"><i></i><i></i><i></i></span>
                </div>
                <div className="hd-row">
                  <span className="hd-ava hd-ava-you">Y</span>
                  <span className="hd-name">You</span>
                  <span className="hd-muted">
                    <svg className="collab-svg-kebab" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M5 5l14 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                </div>
                <div className="hd-row">
                  <span className="hd-ava hd-ava-linda">L</span>
                  <span className="hd-name">Linda</span>
                  <span className="hd-bars hd-bars-gold"><i></i><i></i><i></i></span>
                </div>
                <button className="hd-leave">Leave</button>
              </div>
            </div>
          }
          code={
            <pre className="prim-pre" dangerouslySetInnerHTML={{ __html: `&lt;VeltHuddle
  documentId={id}
/&gt;` }} />
          }
        />
      </div>

      <a href="https://velt.dev/docs/realtime-collaboration" target="_blank" rel="noopener" className="collab-link">See the full collaboration layer</a>
    </section>
  );
}
