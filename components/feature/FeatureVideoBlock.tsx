// Two-column feature row with autoplaying video, used on the video-heavy
// SEO landings (/notion-like-comments, /tiptap-editor-comments). Layout
// alternates text-left/video-right or text-right/video-left based on the
// `reverse` flag, matching the live Framer composition.

export type FeatureVideoBlockProps = {
  title: string;
  body: string;
  videoSrc: string;
  videoPoster: string;
  reverse?: boolean;
};

export function FeatureVideoBlock({
  title,
  body,
  videoSrc,
  videoPoster,
  reverse,
}: FeatureVideoBlockProps) {
  return (
    <article
      className={
        "flex flex-col items-center gap-8 lg:gap-12 " +
        (reverse ? "lg:flex-row-reverse" : "lg:flex-row")
      }
      style={{ width: "100%" }}
    >
      <div
        className="flex flex-col items-start"
        style={{ flex: "1 1 0%", gap: 16, maxWidth: 480 }}
      >
        <h3
          className="font-urbanist font-bold"
          style={{
            color: "#111",
            fontSize: "clamp(24px, 3vw, 36px)",
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
          }}
        >
          {title}
        </h3>
        <p
          className="font-urbanist"
          style={{
            color: "#111",
            opacity: 0.7,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            lineHeight: 1.5,
          }}
        >
          {body}
        </p>
        <a
          href="https://docs.velt.dev/"
          target="_blank"
          rel="noopener"
          className="font-urbanist font-semibold"
          style={{
            color: "#625df5",
            fontSize: 16,
            letterSpacing: "-0.03em",
            textDecoration: "none",
          }}
        >
          Learn more in Docs →
        </a>
      </div>
      <div
        className="relative overflow-hidden"
        style={{
          flex: "1 1 0%",
          width: "100%",
          background: "#f7f7f7",
          borderRadius: 24,
          padding: 16,
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster={videoPoster}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 12,
            objectFit: "cover",
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      </div>
    </article>
  );
}
