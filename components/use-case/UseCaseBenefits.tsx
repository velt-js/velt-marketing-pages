// Stack of benefit blocks. Each block: tag pill + heading + description
// + big visual + grid of sub-use-cases (image + name, optionally linked).
// Mirrors Framer `benefit__N__*` (up to 4 blocks × up to 4 sub-cases).
// Image positions alternate left/right per block for rhythm.

import { Media } from "../comparison/Media";

export type UseCaseBenefitSubCase = {
  _key?: string;
  imageSrc?: string | null;
  name?: string | null;
  link?: string | null;
};

export type UseCaseBenefit = {
  _key?: string;
  tag?: string | null;
  title?: string | null;
  description?: string | null;
  imageSrc?: string | null;
  useCases?: UseCaseBenefitSubCase[] | null;
};

export function UseCaseBenefits({ benefits }: { benefits?: UseCaseBenefit[] | null }) {
  const cleanBenefits = (benefits ?? []).filter(
    (b) => b?.title || b?.description || b?.imageSrc || (b?.useCases?.length ?? 0) > 0
  );
  if (cleanBenefits.length === 0) return null;

  return (
    <section
      className="w-full flex flex-col items-center"
      style={{ padding: "60px 20px", gap: 80 }}
    >
      {cleanBenefits.map((benefit, i) => (
        <BenefitBlock
          key={benefit._key ?? `benefit-${i}`}
          benefit={benefit}
          imagePosition={i % 2 === 0 ? "right" : "left"}
        />
      ))}
    </section>
  );
}

function BenefitBlock({
  benefit,
  imagePosition,
}: {
  benefit: UseCaseBenefit;
  imagePosition: "left" | "right";
}) {
  const subCases = (benefit.useCases ?? []).filter(
    (uc) => uc?.name || uc?.imageSrc
  );

  const text = (
    <div className="flex flex-col w-full lg:flex-1 lg:min-w-0" style={{ gap: 16 }}>
      {benefit.tag ? (
        <span
          className="font-urbanist font-bold uppercase"
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            alignItems: "center",
            background: "rgba(98,93,245,0.12)",
            color: "#625df5",
            fontSize: 14,
            lineHeight: 1.2,
            letterSpacing: "2.1px",
            padding: "10px 16px",
            borderRadius: 32,
          }}
        >
          {benefit.tag}
        </span>
      ) : null}
      {benefit.title ? (
        <h3
          className="font-urbanist font-bold"
          style={{
            fontSize: "clamp(24px, 3.4vw, 40px)",
            lineHeight: 1.2,
            letterSpacing: "-1.2px",
            color: "#111",
            margin: 0,
          }}
        >
          {benefit.title}
        </h3>
      ) : null}
      {benefit.description ? (
        <p
          className="font-urbanist"
          style={{
            fontSize: "clamp(16px, 1.4vw, 18px)",
            lineHeight: 1.4,
            color: "rgba(0,0,0,0.7)",
            margin: 0,
          }}
        >
          {benefit.description}
        </p>
      ) : null}
    </div>
  );

  const visual = (
    <div
      className="relative w-full lg:flex-1 lg:min-w-0 overflow-hidden"
      style={{
        aspectRatio: "16/10",
        borderRadius: 16,
        border: "1px solid #e5e5e5",
        background: "#f7f7f7",
      }}
    >
      {benefit.imageSrc ? (
        <Media
          kind="image"
          src={benefit.imageSrc}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : null}
    </div>
  );

  return (
    <div className="w-full" style={{ maxWidth: 1280, display: "flex", flexDirection: "column", gap: 32 }}>
      <div
        className="w-full flex flex-col lg:flex-row items-start lg:items-center"
        style={{ gap: 40 }}
      >
        {imagePosition === "left" ? (
          <>
            {visual}
            {text}
          </>
        ) : (
          <>
            {text}
            {visual}
          </>
        )}
      </div>

      {subCases.length > 0 ? (
        <div
          className="w-full grid grid-cols-2 md:grid-cols-4"
          style={{ gap: 16 }}
        >
          {subCases.map((uc, j) => (
            <SubCaseCard key={uc._key ?? `subcase-${j}`} subCase={uc} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function SubCaseCard({ subCase }: { subCase: UseCaseBenefitSubCase }) {
  const card = (
    <article
      className="flex flex-col overflow-hidden h-full"
      style={{
        border: "1px solid #e5e5e5",
        borderRadius: 12,
        background: "#fff",
      }}
    >
      <div
        className="relative w-full"
        style={{ aspectRatio: "1/1", background: "#f7f7f7" }}
      >
        {subCase.imageSrc ? (
          <Media
            kind="image"
            src={subCase.imageSrc}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : null}
      </div>
      {subCase.name ? (
        <p
          className="font-urbanist font-semibold"
          style={{
            fontSize: 14,
            lineHeight: 1.3,
            color: "#111",
            margin: 0,
            padding: "12px 16px 16px",
          }}
        >
          {subCase.name}
        </p>
      ) : null}
    </article>
  );

  if (!subCase.link) return card;
  return (
    <a
      href={subCase.link}
      target={subCase.link.startsWith("http") ? "_blank" : undefined}
      rel={subCase.link.startsWith("http") ? "noopener" : undefined}
      className="no-underline"
      style={{ color: "inherit" }}
    >
      {card}
    </a>
  );
}
