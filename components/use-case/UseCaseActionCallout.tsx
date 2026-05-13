// Closing 3-line callout. Mirrors Framer `action__text_1/2/3`. Renders
// the three lines stacked, big and bold, centered. Skips rendering when
// all three are the legacy Build/Review/Approve placeholders (Nathan
// filled the field with eyebrow values on most ports — those aren't
// meaningful CTA copy, so we hide the section in that case).

export type UseCaseActionCalloutProps = {
  text1?: string | null;
  text2?: string | null;
  text3?: string | null;
};

const PLACEHOLDER_TRIPLE = new Set(["Build", "Review", "Approve"]);

export function UseCaseActionCallout({
  text1,
  text2,
  text3,
}: UseCaseActionCalloutProps) {
  const lines = [text1, text2, text3].filter(
    (t): t is string => typeof t === "string" && t.length > 0
  );
  if (lines.length === 0) return null;

  // Bail out when the field is just the Build/Review/Approve placeholder
  // copy — not actually a meaningful closing line.
  if (
    lines.length === 3 &&
    lines.every((t) => PLACEHOLDER_TRIPLE.has(t))
  ) {
    return null;
  }

  return (
    <section
      className="w-full flex flex-col items-center"
      style={{ padding: "80px 20px" }}
    >
      <div
        className="w-full flex flex-col items-center text-center"
        style={{ maxWidth: 1080, gap: 12 }}
      >
        {lines.map((line, i) => (
          <p
            key={`action-${i}`}
            className="font-urbanist font-bold"
            style={{
              fontSize: "clamp(28px, 4.6vw, 56px)",
              lineHeight: 1.1,
              letterSpacing: "-1.68px",
              color: i === 0 ? "#111" : "rgba(0,0,0,0.45)",
              margin: 0,
            }}
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
