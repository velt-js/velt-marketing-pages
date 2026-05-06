// Way 1 — Figma node 294:24383. Three videos, one per tab.
import { CustomizationCard } from "../CustomizationCard";
import { Media } from "../../comparison/Media";

const VIDEO_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
} as const;

export function LayoutCustomization() {
  return (
    <CustomizationCard
      num={1}
      height={740}
      heading="Layout Customization"
      subheading={[
        "Add your own UI components",
        "and build wireframes the way you want",
      ]}
      tabs={{
        activeIndex: 0,
        labels: ["Add / Remove Components", "Custom Components", "Reorder Components"],
      }}
      visual={[
        <Media
          key="add-remove"
          kind="video"
          src="/videos/customization/add-remove-components.mp4"
          style={VIDEO_STYLE}
        />,
        <Media
          key="custom"
          kind="video"
          src="/videos/customization/custom-components.mp4"
          style={VIDEO_STYLE}
        />,
        <Media
          key="reorder"
          kind="video"
          src="/videos/customization/reorder-components.mp4"
          style={VIDEO_STYLE}
        />,
      ]}
    />
  );
}
