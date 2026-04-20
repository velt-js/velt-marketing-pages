// TrustedLogos — Figma node 8506:105840 (1440×216). 3-row grid of 160×72
// tiles, each with a 0.9px border. Row 2 replaces a cell with a 320-wide
// "TRUSTED BY TOP TEAMS" label so the pattern is 8/7/8 = 23 tiles total.
// Brand logos are downloaded into /public/images/logos.

type Tile =
  | { kind: "logo"; src: string; alt: string; w: number; h: number; opacity?: number }
  | { kind: "label" };

// Order taken from Figma left-to-right, top-to-bottom (node 8506:105540).
const tiles: Tile[] = [
  { kind: "logo", src: "/images/logos/google.svg",      alt: "Google",      w: 92,   h: 27 },
  { kind: "logo", src: "/images/logos/varonis.svg",     alt: "Varonis",     w: 130,  h: 22, opacity: 0.5 },
  { kind: "logo", src: "/images/logos/pendo.svg",       alt: "Pendo",       w: 95,   h: 22 },
  { kind: "logo", src: "/images/logos/heygen.svg",      alt: "HeyGen",      w: 91,   h: 25, opacity: 0.5 },
  { kind: "logo", src: "/images/logos/flyr.svg",        alt: "FLYR",        w: 99,   h: 24, opacity: 0.5 },
  { kind: "logo", src: "/images/logos/bigtincan.svg",   alt: "Bigtincan",   w: 101,  h: 30 },
  { kind: "logo", src: "/images/logos/runway.svg",      alt: "Runway",      w: 77,   h: 15 },
  { kind: "logo", src: "/images/logos/lambdatest.svg",  alt: "LambdaTest",  w: 138,  h: 24, opacity: 0.45 },

  { kind: "logo", src: "/images/logos/datarails.svg",   alt: "Datarails",   w: 85,   h: 19 },
  { kind: "logo", src: "/images/logos/firehydrant.svg", alt: "FireHydrant", w: 101,  h: 27 },
  { kind: "logo", src: "/images/logos/leadpages.svg",   alt: "Leadpages",   w: 142,  h: 27, opacity: 0.45 },
  { kind: "label" },
  { kind: "logo", src: "/images/logos/vellum.svg",      alt: "Vellum",      w: 111,  h: 22, opacity: 0.5 },
  { kind: "logo", src: "/images/logos/safetykit.png",   alt: "SafetyKit",   w: 58,   h: 25 },
  { kind: "logo", src: "/images/logos/qloo.png",        alt: "Qloo",        w: 129,  h: 12, opacity: 0.52 },

  { kind: "logo", src: "/images/logos/lacoustics.png",  alt: "L-Acoustics", w: 122,  h: 23, opacity: 0.4 },
  { kind: "logo", src: "/images/logos/cloudfactory.svg",alt: "CloudFactory",w: 117,  h: 20, opacity: 0.5 },
  { kind: "logo", src: "/images/logos/trumpet.svg",     alt: "Trumpet",     w: 117,  h: 24, opacity: 0.5 },
  { kind: "logo", src: "/images/logos/cofactr.svg",     alt: "Cofactr",     w: 113,  h: 41 },
  { kind: "logo", src: "/images/logos/classwallet.png", alt: "ClassWallet", w: 146,  h: 22 },
  { kind: "logo", src: "/images/logos/colossyan.svg",   alt: "Colossyan",   w: 118,  h: 24 },
  { kind: "logo", src: "/images/logos/openenvoy.svg",   alt: "OpenEnvoy",   w: 119,  h: 28, opacity: 0.52 },
];

export function TrustedLogos() {
  return (
    <section
      className="flex flex-col items-center justify-center w-full bg-black"
      style={{ padding: "0 80px" }}
    >
      {/* Inner grid locked to 1280 px (Figma content width) so the
          8/7/8 tile pattern doesn't reflow inside ScaleWrapper. */}
      <div
        className="flex flex-wrap items-center justify-center content-center"
        style={{ width: 1280 }}
      >
        {tiles.map((tile, i) =>
          tile.kind === "label" ? (
            <div
              key={`label-${i}`}
              className="flex items-center justify-center shrink-0 font-urbanist font-bold uppercase whitespace-nowrap"
              style={{
                width: 320,
                height: 72,
                padding: 21.6,
                border: "0.9px solid #171717",
                fontSize: 12.6,
                letterSpacing: "1.89px",
                lineHeight: 1.2,
                color: "#fff",
              }}
            >
              Trusted By&nbsp;
              <span style={{ color: "#b3b0fb" }}>Top Teams</span>
            </div>
          ) : (
            <div
              key={`${tile.alt}-${i}`}
              className="relative shrink-0 flex items-center justify-center"
              style={{
                width: 160,
                height: 72,
                border: "0.9px solid #171717",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tile.src}
                alt={tile.alt}
                width={tile.w}
                height={tile.h}
                style={{
                  width: tile.w,
                  height: tile.h,
                  opacity: tile.opacity ?? 1,
                  objectFit: "contain",
                }}
              />
            </div>
          ),
        )}
      </div>
    </section>
  );
}
