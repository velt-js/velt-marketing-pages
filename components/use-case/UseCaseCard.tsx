// Single tile in the "Find your Use Case" grid (Figma 178:64311 et al).
// 594×404 #f7f7f7 card with a 16-radius image at the top and a
// label + chevron-right strip at the bottom. The image is wrapped in
// `<Media>` so an mp4 swap is a one-line `kind="video"` flip per tile.

import Link from "next/link";
import Image from "next/image";

import { Media, type MediaProps } from "../comparison/Media";

export type UseCaseCardProps = {
  title: string;
  href: string;
  /** Visual at the top of the card. Image today, video later. */
  media: MediaProps;
};

export function UseCaseCard({ title, href, media }: UseCaseCardProps) {
  return (
    <Link
      href={href}
      className="use-case-card flex flex-col items-center justify-center overflow-hidden w-full"
      style={{
        gap: 12,
        padding: 12,
        background: "#f7f7f7",
        borderRadius: 24,
        textDecoration: "none",
        transition:
          "transform 280ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 220ms ease-out",
        willChange: "transform",
        transformOrigin: "center",
        aspectRatio: "594 / 404",
      }}
    >
      <div
        className="relative w-full"
        style={{ flex: "1 0 0", minHeight: 0, borderRadius: 16, overflow: "hidden" }}
      >
        <Media
          {...media}
          style={{
            ...(media.style ?? {}),
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
      <div
        className="flex items-center justify-center w-full"
        style={{ gap: 10, padding: 12 }}
      >
        <span
          className="font-urbanist font-semibold"
          style={{
            flex: "1 0 0",
            minWidth: 0,
            fontSize: 18,
            lineHeight: 1.2,
            color: "#111",
          }}
        >
          {title}
        </span>
        <Image
          src="/images/use-case/cards/chevron-right.svg"
          alt=""
          width={20}
          height={20}
          aria-hidden
        />
      </div>
      <style>{`
        .use-case-card:hover {
          transform: scale(1.035);
          box-shadow: 0 18px 40px -12px rgba(17, 17, 17, 0.18),
                      0 6px 12px -4px rgba(17, 17, 17, 0.08);
        }
        @media (prefers-reduced-motion: reduce) {
          .use-case-card { transition: none !important; }
          .use-case-card:hover { transform: none; }
        }
      `}</style>
    </Link>
  );
}
