// Placeholder rendered inside each CustomizationCard's visual shelf
// until real images / mp4 animations are dropped in. Renders an empty
// soft-blue panel with a small centered label so the layout is faithful
// without committing to Figma's bespoke per-card mocks.
//
// To swap in a real visual, replace this component in the call site
// with <Media kind="image" src="..." /> or <Media kind="video" src="..." poster="..."/>.

export function VisualPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center w-full h-full"
      style={{
        background:
          "linear-gradient(180deg, #f5f7ff 0%, #eef1fa 100%)",
      }}
    >
      <span
        className="font-urbanist font-medium"
        style={{
          fontSize: 14,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(98,93,245,0.5)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
