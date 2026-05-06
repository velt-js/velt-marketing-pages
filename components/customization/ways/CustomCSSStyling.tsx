// Way 2 — Figma node 294:24407. Two videos, one per tab.
import { CustomizationCard } from "../CustomizationCard";
import { Media } from "../../comparison/Media";

const VIDEO_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
} as const;

export function CustomCSSStyling() {
  return (
    <CustomizationCard
      num={2}
      height={711}
      heading="Custom CSS Styling"
      subheading="Use your own custom css or a library like Tailwind"
      tabs={{
        activeIndex: 0,
        labels: ["Add Custom Styles", "Use Your Design Systems"],
      }}
      visual={[
        <Media
          key="add"
          kind="video"
          src="/videos/customization/add-custom-styles.mp4"
          style={VIDEO_STYLE}
        />,
        <Media
          key="design-systems"
          kind="video"
          src="/videos/customization/use-your-design-systems.mp4"
          style={VIDEO_STYLE}
        />,
      ]}
    />
  );
}
