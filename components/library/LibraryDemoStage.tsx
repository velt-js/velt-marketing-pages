"use client";

// Self-contained demo card — dark chrome with a preview image that swaps
// to a live iframe when the user clicks TRY DEMO. Used directly on per-
// library pages (one library, no tab rail) and indirectly by the multi-
// tab `LibraryDemo` on /libraries (passes a tab rail via `header`).
//
// The component manages its own `showIframe` + `stageHover` state. When
// callers need a state reset (e.g. on tab change), they pass a fresh
// `key` prop to force a remount.

import { useState, type ReactNode } from "react";
import Image from "next/image";

export type LibraryDemoStageProps = {
  demoUrl: string;
  githubUrl: string;
  previewSrc: string;
  label: string;
  /** Optional content rendered in the header row to the left of the
   *  TRY DEMO button (e.g. the multi-tab rail on /libraries). */
  header?: ReactNode;
};

export function LibraryDemoStage({
  demoUrl,
  githubUrl,
  previewSrc,
  label,
  header,
}: LibraryDemoStageProps) {
  const [showIframe, setShowIframe] = useState(false);
  const [stageHover, setStageHover] = useState(false);

  return (
    <div
      className="relative flex flex-col items-start"
      style={{
        width: 1280,
        background: "#1c1d21",
        border: "2px solid #1c1d21",
        borderRadius: 12,
      }}
    >
      {/* Blurred gradient accent bar */}
      <div
        className="absolute"
        style={{
          top: 26,
          left: -2,
          width: 1280,
          height: 26,
          filter: "blur(60px)",
          backgroundImage:
            "linear-gradient(90deg, rgb(159,159,159) 0%, rgb(45,125,255) 25%, rgb(197,93,245) 50%, rgb(45,125,255) 74.519%, rgb(159,159,159) 100%)",
        }}
      />

      {/* Header row: optional tab rail (left) + Try Demo button (right). */}
      <div
        className="flex items-center gap-4 w-full relative"
        style={{ background: "#1c1d21", padding: "6px 16px 4px", zIndex: 2 }}
      >
        {header}

        {!showIframe && (
          <div className="ml-auto relative shrink-0">
            <button
              type="button"
              onClick={() => setShowIframe(true)}
              aria-label={`Try the ${label} demo live`}
              className="flex items-center gap-2 font-firamono uppercase cursor-pointer"
              style={{
                padding: "8px 14px",
                background: "#1c1d21",
                border: "1px solid #b4b1fa",
                borderRadius: 4,
                color: "#b4b1fa",
                fontSize: 14,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
              }}
            >
              <Image
                src="/images/home/icon-pointer.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden
              />
              Try Demo
            </button>
            <div
              className="absolute flex items-end gap-2 pointer-events-none transition-opacity duration-200"
              style={{
                top: "calc(100% + 6px)",
                right: "calc(100% - 48px)",
                opacity: stageHover ? 1 : 0,
              }}
              aria-hidden
            >
              <p
                className="font-urbanist"
                style={{
                  color: "#b4b1fa",
                  fontSize: 16,
                  lineHeight: "1.4em",
                  letterSpacing: "-0.01em",
                  margin: 0,
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                Not just a picture,
                <br />
                Click to try
              </p>
              <Image
                src="/images/home/demos/arrow-try-demo.svg"
                alt=""
                width={38}
                height={50}
              />
            </div>
          </div>
        )}
      </div>

      {/* Stage — preview image by default, iframe once TRY DEMO is clicked. */}
      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setStageHover(true)}
        onMouseLeave={() => setStageHover(false)}
        style={{
          height: 640,
          background: "#000",
          border: "4px solid #1c1d21",
          borderRadius: 12,
        }}
      >
        {showIframe ? (
          <iframe
            src={demoUrl}
            title={`${label} demo`}
            loading="lazy"
            referrerPolicy="no-referrer"
            sandbox="allow-same-origin allow-scripts allow-downloads allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            allowFullScreen
            allow="presentation; fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; clipboard-write"
            className="w-full h-full"
            style={{ border: 0 }}
          />
        ) : (
          <>
            <Image
              src={previewSrc}
              alt={`${label} demo preview`}
              fill
              sizes="1280px"
              style={{ objectFit: "cover", objectPosition: "top left" }}
              priority
            />
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200"
              style={{
                background: "rgba(0, 0, 0, 0.6)",
                opacity: stageHover ? 1 : 0,
              }}
              aria-hidden
            />
          </>
        )}
      </div>

      {/* Bottom-right GitHub pill */}
      <div
        className="absolute flex items-center gap-3"
        style={{
          right: -2,
          bottom: -2,
          background: "#1c1d21",
          padding: 2,
          borderBottomRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5"
        >
          <Image src="/images/home/icon-github.svg" alt="" width={16} height={16} />
          <span
            className="font-firamono uppercase whitespace-nowrap"
            style={{
              color: "rgba(255,255,255,0.52)",
              fontSize: 14,
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            Github
          </span>
        </a>
      </div>

      {/* Bottom-left info icon */}
      <div
        className="absolute flex items-center"
        style={{
          left: -2,
          bottom: -2,
          background: "#1c1d21",
          padding: 2,
          borderTopRightRadius: 10,
        }}
      >
        <div className="flex items-center rounded-lg p-1.5">
          <Image src="/images/home/icon-info.svg" alt="" width={16} height={16} aria-label="More info" />
        </div>
      </div>
    </div>
  );
}
