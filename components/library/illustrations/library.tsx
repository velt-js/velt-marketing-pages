// Bento illustrations rendered from Figma tile screenshots (file
// HqWIZdR6ISJmaG2n4o3gr8, node 1:5573 — "Built for Tiptap"). Each PNG
// is the top portion of a Figma tile node — illustration only, with
// the baked-in title cropped off so the LibraryBento card's CMS title
// overlay below renders at a consistent size across tiles.
//
// Update workflow: re-screenshot the Figma tile node, drop into
// public/images/home/libraries/tiptap/bento/, and crop the bottom ~28%
// (the title area). For Multiplayer Editing, the illustration node is
// structurally a sibling of the tile node — composite them with PIL
// before cropping (see scripts in this folder's README).

const BENTO_DIR = "/images/home/libraries/tiptap/bento";

// Renders an illustration anchored to the top of the LibraryBento card
// at full width with auto height. The bottom of the tile is left clear
// for the React-rendered title + description overlay.
function BentoTile({ src }: { src: string }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "auto",
        }}
      />
    </div>
  );
}

// 1. Multiplayer Editing — Figma 1:5636 (tile bg) composited with
//    1:5644 (illustration, structurally a sibling), then cropped.
export function MultiplayerEditingIllustration() {
  return <BentoTile src={`${BENTO_DIR}/tile-multiplayer.png`} />;
}

// 2. Real-time Cursors & Presence — Figma 1:5595, cropped.
export function CustomizableCursorsIllustration() {
  return <BentoTile src={`${BENTO_DIR}/tile-cursors.png`} />;
}

// 3. Notification — Figma 162:18776, cropped.
export function NotificationIllustration() {
  return <BentoTile src={`${BENTO_DIR}/tile-notification.png`} />;
}

// 4. Single Editor Mode — Figma 162:18995, cropped.
export function SingleEditorModeIllustration() {
  return <BentoTile src={`${BENTO_DIR}/tile-single-editor.png`} />;
}

// 5. Contextual Comments — Figma 1:5619, cropped.
export function ContextualCommentsIllustration() {
  return <BentoTile src={`${BENTO_DIR}/tile-comments.png`} />;
}

// 6. User Mentions — Figma 162:18640, cropped.
export function UserMentionsIllustration() {
  return <BentoTile src={`${BENTO_DIR}/tile-mentions.png`} />;
}

// 7. Version History — Figma 162:18639, cropped.
export function VersionHistoryIllustration() {
  return <BentoTile src={`${BENTO_DIR}/tile-version.png`} />;
}

// 8. Offline Storage — Figma 162:19062, cropped.
export function OfflineStorageIllustration() {
  return <BentoTile src={`${BENTO_DIR}/tile-offline.png`} />;
}
