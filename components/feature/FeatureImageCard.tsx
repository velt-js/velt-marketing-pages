import {
    FeatureSectionShell,
    type FeatureSectionShellTestimonial,
    type ShellCtaLink,
} from "./FeatureSectionShell";

export type FeatureImageCardProps = {
    eyebrow?: string;
    heading: string;
    subheading?: string;
    viewDocsCta?: ShellCtaLink;
    primaryCta?: ShellCtaLink;
    imageSrc: string;
    imageAlt?: string;
    imageWidth: number;
    imageHeight: number;
    imageBottomOffset?: number;
    /** When true, the image scrolls horizontally in an infinite marquee. */
    marquee?: boolean;
    /** Local SVG path used instead of imageSrc when marquee is enabled. */
    marqueeSvgSrc?: string;
    /** Local video path; when set, renders a looping video instead of an image. */
    videoSrc?: string;
    testimonial?: FeatureSectionShellTestimonial;
    topAccent?: boolean;
};

const MARQUEE_DURATION = "30s";

export function FeatureImageCard({
    eyebrow,
    heading,
    subheading,
    viewDocsCta,
    primaryCta,
    imageSrc,
    imageAlt = "",
    imageWidth,
    imageHeight,
    imageBottomOffset = 0,
    marquee = false,
    marqueeSvgSrc,
    videoSrc,
    testimonial,
    topAccent = false,
}: FeatureImageCardProps) {
    const bodyHeight = imageHeight + Math.max(0, -imageBottomOffset);
    const effectiveSrc = marquee && marqueeSvgSrc ? marqueeSvgSrc : imageSrc;

    return (
        <FeatureSectionShell
            eyebrow={eyebrow}
            heading={heading}
            subheading={subheading}
            viewDocsCta={viewDocsCta}
            primaryCta={primaryCta}
            testimonial={testimonial}
            topAccent={topAccent}
        >
        {videoSrc ? (
          <div
            className="relative overflow-hidden"
            style={{ width: "100%", height: bodyHeight, borderRadius: 12 }}
          >
                    <video
                        src={videoSrc}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="pointer-events-none select-none"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
                    />
                </div>
        ) : marquee ? (
          <div className="overflow-hidden" style={{ width: "100%" }}>
            <div
              style={{
                width: "100%",
                paddingTop: 24,
                paddingBottom: 60,
                transform: "scale(1.25)",
                transformOrigin: "center",
              }}
            >
                    <style>{`
              @keyframes marquee-scroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
            `}</style>
                    <div
                        className="pointer-events-none select-none flex items-center"
                        style={{
                            gap: 48,
                            animation: `marquee-scroll ${MARQUEE_DURATION} linear infinite`,
                            willChange: "transform",
                        }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={effectiveSrc}
                            alt={imageAlt}
                            style={{ height: "auto", width: "auto", flexShrink: 0 }}
                        />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={effectiveSrc}
                            alt=""
                            aria-hidden
                            style={{ height: "auto", width: "auto", flexShrink: 0 }}
                        />
              </div>
            </div>
          </div>
        ) : (
                <div
                    className="relative overflow-hidden"
                    style={{ width: "100%", height: bodyHeight }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        width={imageWidth}
                        height={imageHeight}
                        className="absolute pointer-events-none select-none"
                        style={{
                            left: "50%",
                            transform: "translateX(-50%)",
                            bottom: imageBottomOffset,
                            width: imageWidth,
                            height: imageHeight,
                            maxWidth: "none",
                            objectFit: "cover",
                        }}
                    />
                </div>
            )}
        </FeatureSectionShell>
    );
}
