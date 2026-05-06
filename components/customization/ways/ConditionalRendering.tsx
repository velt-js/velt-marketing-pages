// Way 4 — Figma node 294:24472. Single video.
import { CustomizationCard } from "../CustomizationCard";
import { Media } from "../../comparison/Media";

const VIDEO_STYLE = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
} as const;

export function ConditionalRendering() {
  return (
    <CustomizationCard
      num={4}
      height={632}
      heading="Condition Based UI"
      subheading="Render UI differently based on various conditions"
      visual={
        <Media
          kind="video"
          src="/videos/customization/condition-based-ui.mp4"
          style={VIDEO_STYLE}
        />
      }
    />
  );
}
