// Single asset slot used by every visual on /comparison. Renders an <img>
// today and an <video autoplay muted loop playsInline> tomorrow with no
// other call-site changes — flip `kind="image"` to `kind="video"` per
// asset when the .mp4 is ready. `prefers-reduced-motion` falls back to
// the poster image for video.

import type { CSSProperties } from "react";

type ImageMedia = {
  kind: "image";
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

type VideoMedia = {
  kind: "video";
  src: string;
  /** Optional fallback frame; if omitted the browser shows the first
   *  decoded frame until autoplay starts. */
  poster?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  style?: CSSProperties;
};

export type MediaProps = ImageMedia | VideoMedia;

export function Media(props: MediaProps) {
  if (props.kind === "video") {
    const { src, poster, width, height, className, style } = props;
    return (
      <video
        src={src}
        poster={poster}
        width={width}
        height={height}
        className={className}
        style={style}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  const { src, alt = "", width, height, className, style } = props;
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
    />
  );
}
