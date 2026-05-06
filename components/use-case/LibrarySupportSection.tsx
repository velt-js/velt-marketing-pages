// "Works seamlessly with your libraries" — Figma 177:57034 (1280×955).
// Light section: heading + optional subheading + responsive grid of
// library logo tiles (each clickable when href is set).

import Link from "next/link";
import Image from "next/image";

export type LibrarySupportLogoData = {
  name: string;
  /** Resolved Sanity image URL (from `logo.asset->url`). */
  logo: string;
  href?: string | null;
};

export type LibrarySupportSectionData = {
  heading: string;
  subheading?: string;
  logos: LibrarySupportLogoData[];
};

export function LibrarySupportSection({
  heading,
  subheading,
  logos,
}: LibrarySupportSectionData) {
  return (
    <section className="flex flex-col items-center w-full" style={{ gap: 52 }}>
      <div
        className="flex flex-col items-center text-center"
        style={{ gap: 12, maxWidth: 820 }}
      >
        <h2
          className="font-urbanist font-bold"
          style={{
            fontSize: 40,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            color: "#111",
            margin: 0,
          }}
        >
          {heading}
        </h2>
        {subheading ? (
          <p
            className="font-urbanist"
            style={{
              fontSize: 18,
              lineHeight: 1.5,
              color: "#3a3a3a",
              margin: 0,
            }}
          >
            {subheading}
          </p>
        ) : null}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: "repeat(4, 280px)",
          gap: 16,
        }}
      >
        {logos.map((entry) => {
          const Tile = (
            <div
              key={entry.name}
              className="flex flex-col items-center justify-center"
              style={{
                width: 280,
                height: 168,
                background: "#f7f7f7",
                borderRadius: 24,
                gap: 12,
                padding: 24,
              }}
            >
              <Image
                src={entry.logo}
                alt={entry.name}
                width={64}
                height={64}
                style={{
                  width: "auto",
                  height: 56,
                  maxWidth: 180,
                  objectFit: "contain",
                  display: "block",
                }}
              />
              <span
                className="font-urbanist font-semibold"
                style={{
                  fontSize: 16,
                  lineHeight: 1.2,
                  color: "#111",
                  whiteSpace: "nowrap",
                }}
              >
                {entry.name}
              </span>
            </div>
          );
          return entry.href ? (
            <Link
              key={entry.name}
              href={entry.href}
              target={entry.href.startsWith("http") ? "_blank" : undefined}
              rel={entry.href.startsWith("http") ? "noopener" : undefined}
              style={{ textDecoration: "none" }}
            >
              {Tile}
            </Link>
          ) : (
            Tile
          );
        })}
      </div>
    </section>
  );
}
