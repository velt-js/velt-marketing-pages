"use client";

// Hero — Figma node 8506:102927. Responsive rewrite (post ScaleWrapper):
// vertical flex stack on mobile (title → buttons → npx → demo), with the
// pixel-grid background and cursor badges only on desktop where the
// 651 px design width fits. Below md they'd overlap title text awkwardly,
// so per the responsive plan we hide them entirely on small screens.

import Image from "next/image";
import { useState, useCallback } from "react";

import { UseCaseDemo } from "./UseCaseDemo";

function CursorSean() {
    // 8506:101911 — teal cursor. On lg+ floats near the top-left of the
    // title block. Hidden below lg (decorative, would crowd the title).
    return (
        <div
            className="hidden lg:flex absolute flex-col items-end pointer-events-none"
            style={{ top: 140, left: "13%" }}
            aria-hidden="true"
        >
            <div className="relative" style={{ width: 20, height: 20, transform: "scaleY(-1) rotate(180deg)" }}>
                <Image src="/images/home/cursor-pointer-teal.svg" alt="" width={20} height={20} />
            </div>
            <div style={{ paddingRight: 20 }}>
                <div
                    className="flex items-start font-urbanist font-bold"
                    style={{
                        background: "#8bf2e1",
                        borderRadius: 22.5,
                        padding: "2.5px 10px",
                        color: "#000",
                        fontSize: 13.75,
                        letterSpacing: "0.01em",
                        boxShadow: "0px 1.25px 5px 0px rgba(0,0,0,0.16)",
                        lineHeight: 1.545,
                    }}
                >
                    Sean
                </div>
            </div>
        </div>
    );
}

function CursorEmma() {
    // 8506:101910 — pink cursor. On lg+ floats near the top-right of the
    // title block. Hidden below lg.
    return (
        <div
            className="hidden lg:flex absolute flex-col items-start pointer-events-none"
            style={{ top: 240, right: "14%" }}
            aria-hidden="true"
        >
            <div className="relative" style={{ width: 20, height: 20 }}>
                <Image src="/images/home/cursor-pointer-pink.svg" alt="" width={20} height={20} />
            </div>
            <div style={{ paddingLeft: 20 }}>
                <div
                    className="flex items-start font-urbanist font-bold"
                    style={{
                        background: "#ff74f6",
                        borderRadius: 18,
                        padding: "2.5px 10px",
                        color: "#020202",
                        fontSize: 13.75,
                        letterSpacing: "0.01em",
                        boxShadow: "0px 1.25px 5px 0px rgba(0,0,0,0.16)",
                        lineHeight: 1.545,
                    }}
                >
                    Emma
                </div>
            </div>
        </div>
    );
}

const NPX_COMMAND = "npx skills add velt-js/agent-skills";

/**
 * Copies the npx command to clipboard and shows brief "Copied!" feedback.
 */
function NpxSnippet() {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(() => {
        try {
            navigator.clipboard.writeText(NPX_COMMAND);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            /* clipboard API may be blocked in some environments */
        }
    }, []);

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-center gap-3 cursor-pointer max-w-full"
            style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 10,
                padding: "10px 20px",
            }}
        >
            <code
                className="font-mono text-white truncate"
                style={{
                    fontSize: 15,
                    letterSpacing: "0.01em",
                    lineHeight: 1.4,
                    opacity: 0.85,
                }}
            >
                {NPX_COMMAND}
            </code>
            <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke={copied ? "#5cffce" : "rgba(255,255,255,0.6)"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0, transition: "stroke 0.2s" }}
            >
                {copied ? (
                    <polyline points="20 6 9 17 4 12" />
                ) : (
                    <>
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </>
                )}
            </svg>
        </button>
    );
}

function TitleBlock() {
    return (
        <div className="flex flex-col items-center max-w-[651px] mx-auto w-full">
            <div className="flex flex-col gap-5 text-center w-full">
                <h1 className="text-display-h1 text-white">
                    The Complete
                    <br />
                    Collaboration Toolkit
                </h1>
                <p className="text-body-lg font-medium text-white/80">
                    Add features like contextual Comments, Notifications, Recordings,
                    Multiplayer editing &amp; Huddles to your product.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch w-full gap-3 mt-7 max-w-[400px]">
                <a
                    href="/book-demo"
                    className="flex-1 flex items-center justify-center rounded-lg font-urbanist font-bold text-white"
                    style={{
                        padding: "12px 16px",
                        border: "1.002px solid #625df5",
                        fontSize: 16,
                        letterSpacing: "-0.03em",
                        mixBlendMode: "exclusion",
                        textDecoration: "none",
                    }}
                >
                    Book Demo
                </a>
                <a
                    href="https://console.velt.dev/"
                    target="_blank"
                    rel="noopener"
                    className="flex-1 flex items-center justify-center rounded-lg font-urbanist font-bold text-white"
                    style={{
                        padding: "12px 16px",
                        background: "#625df5",
                        fontSize: 16,
                        letterSpacing: "-0.03em",
                        textDecoration: "none",
                    }}
                >
                    Get Free API Key
                </a>
            </div>
            <div className="flex justify-center w-full mt-5">
                <NpxSnippet />
            </div>
        </div>
    );
}

export function Hero() {
    return (
        <section className="relative w-full bg-black overflow-hidden pt-28 lg:pt-32 pb-12 lg:pb-20">
            {/* Pixel-grid animated background — hidden below md so it doesn't
                crowd the title on phones. Tiles horizontally to fill any
                viewport. */}
            <div
                className="hidden md:block absolute overflow-hidden"
                style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 534,
                    backgroundImage: "url('/images/home/grid-animation.gif')",
                    backgroundRepeat: "repeat-x",
                    backgroundSize: "1440px 740px",
                    backgroundPosition: "top center",
                }}
            />
            {/* Radial-vignette overlay fading grid into black. */}
            <div
                aria-hidden="true"
                className="hidden md:block absolute"
                style={{
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 534,
                    background:
                        "radial-gradient(ellipse 100% 534px at 50% 0%, rgba(0,0,0,0.7) 0%, #000 100%)",
                }}
            />

            <div className="container-page relative z-10 flex flex-col items-center">
                <TitleBlock />
                <div className="w-full mt-12 lg:mt-20">
                    <UseCaseDemo />
                </div>
            </div>

            <CursorSean />
            <CursorEmma />
        </section>
    );
}
