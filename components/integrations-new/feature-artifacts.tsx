import type { CSSProperties, ReactNode } from "react";

import { resolveDemo } from "@/components/feature-new/demo-registry";
import { AgentFindingCard } from "@/components/feature-new/demo-presets/hero-surface";
import { libraryLogo } from "./library-logos";
import type { ShowcaseCard as ShowcaseCardData } from "@/components/feature-new/content";
import type { FeatureCard } from "./content";

// Supported-editor set shown (with real brand logos) on the Co-editing and
// Single-editor-mode cards, replacing the shared demo's generic dot chips.
const EDITOR_CHIPS = [
  { slug: "tiptap", label: "Tiptap" },
  { slug: "lexical", label: "Lexical" },
  { slug: "codemirror", label: "CodeMirror" },
  { slug: "blocknote", label: "BlockNote" },
  { slug: "react-flow", label: "React Flow" },
];

const editorChipStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  height: 34,
  padding: "0 12px",
  borderRadius: 999,
  border: "1px solid var(--vlp-border-default)",
  background: "var(--vlp-color-white)",
  fontSize: 13.5,
  fontWeight: 500,
  color: "var(--vlp-color-text)",
};

/** @returns {JSX.Element} A row of supported-editor chips with real logos. */
function EditorChipsPreview() {
  return (
    <div style={{ padding: 2 }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        {EDITOR_CHIPS.map((editor) => (
          <span key={editor.slug} style={editorChipStyle}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={libraryLogo(editor.slug)}
              alt=""
              aria-hidden="true"
              style={{ width: 16, height: 16, objectFit: "contain" }}
            />
            {editor.label}
          </span>
        ))}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "var(--vlp-color-text-muted)" }}>
        plus the core library for your own editor, whiteboard, or grid
      </p>
    </div>
  );
}

// Maps each integration feature card (Comments, Co-editing, Agents, ...) to a
// real feature-page demo artifact + a representative code snippet, so the spoke
// feature section renders the same Preview | Code cards the feature pages use
// (components/feature-new/ShowcaseCard). The preview ReactNode is resolved from
// the shared demo registry; unknown keys fail soft to an empty preview.

// `preview` overrides the registry lookup when a card needs a specific
// hand-built artifact (e.g. the brand-agent card from /comments).
type ArtifactSpec = {
  demoKey: string;
  kicker: string;
  code: string;
  preview?: ReactNode;
};

// All keys are SHOWCASE-tier demos (card-sized, designed for the bento grid)
// so heights stay consistent; hero-tier demos are intentionally avoided here
// because they are tall and leave voids next to a short card.
const DEFAULT_SPEC: ArtifactSpec = {
  demoKey: "comments/showcase/mentions",
  kicker: "// velt.tsx",
  code: `import { VeltProvider } from "@veltdev/react";

<VeltProvider apiKey={API_KEY}>
  {/* your surface */}
</VeltProvider>`,
};

// Keyed by the lowercased feature-card title authored in the CMS.
const FEATURE_ARTIFACTS: Record<string, ArtifactSpec> = {
  "agents as first-class users": {
    demoKey: "comments/showcase/agents",
    kicker: "// agents.tsx",
    code: `// An agent posts a suggestion as a first-class user.
await velt.comments().add({ author: agent, suggestion });
// On approve, the change fires through your webhook.`,
  },
  comments: {
    demoKey: "comments/showcase/mentions",
    kicker: "// comments.tsx",
    code: `import { VeltComments } from "@veltdev/react";

<VeltComments textMode />`,
  },
  "co-editing": {
    demoKey: "multiplayer-editing/showcase/editors",
    kicker: "// co-editing.tsx",
    code: `import { useVeltCrdtExtension } from "@veltdev/tiptap-crdt-react";

const extension = useVeltCrdtExtension({ editorId });`,
    preview: <EditorChipsPreview />,
  },
  annotations: {
    demoKey: "comments/showcase/anything",
    kicker: "// annotations.tsx",
    code: `// Anchor shared markup to any region.
<VeltCommentTool />`,
  },
  "presence and cursors": {
    demoKey: "presence/showcase/avatars",
    kicker: "// presence.tsx",
    code: `import { VeltPresence, VeltCursor } from "@veltdev/react";

<VeltPresence />
<VeltCursor />`,
  },
  suggestions: {
    demoKey: "suggestions/showcase/diff",
    kicker: "// suggestions.tsx",
    code: `// Propose changes reviewed like a diff.
<VeltComments suggestionMode />`,
    // Reuse the canonical brand-agent comment card from the /comments page
    // (AgentFindingCard) so the suggestion reads as an agent change a human
    // approves, with the same avatar, diff, and Accept/Reject affordances.
    preview: (
      <AgentFindingCard
        name="Brand Agent"
        time="now"
        body={<>Suggested a tighter figure on the rate line.</>}
        delText="12.0"
        insText="10.5"
        replies={1}
      />
    ),
  },
  notifications: {
    demoKey: "notifications/showcase/inbox",
    kicker: "// notifications.tsx",
    code: `import { VeltNotificationsTool } from "@veltdev/react";

<VeltNotificationsTool />`,
  },
  recording: {
    demoKey: "recording/showcase/pinned",
    kicker: "// recording.tsx",
    code: `import { VeltRecorderControlPanel } from "@veltdev/react";

<VeltRecorderControlPanel />`,
  },
  "version history": {
    demoKey: "multiplayer-editing/showcase/checkpoints",
    kicker: "// version-history.tsx",
    code: `await velt.versions().save({ name: "Draft v3" });
await velt.versions().restore({ id });`,
  },
  "single editor mode": {
    demoKey: "multiplayer-editing/showcase/editors",
    kicker: "// single-editor.tsx",
    code: `<VeltProvider singleEditorMode>
  {/* one editor instance */}
</VeltProvider>`,
    preview: <EditorChipsPreview />,
  },
  "audit trail": {
    demoKey: "audit-trail/showcase/capture",
    kicker: "// audit-trail.tsx",
    code: `const log = await velt.activities().get({ documentId });`,
  },
};

/**
 * Look up the artifact spec for a feature title, defaulting when unmapped.
 * @param {string} title The feature-card title.
 * @returns {ArtifactSpec} The artifact spec.
 */
function specFor(title: string): ArtifactSpec {
  try {
    return FEATURE_ARTIFACTS[title.trim().toLowerCase()] ?? DEFAULT_SPEC;
  } catch (error) {
    console.error("specFor failed", error);
    return DEFAULT_SPEC;
  }
}

/**
 * Convert authored feature cards into Preview | Code ShowcaseCard data.
 * @param {FeatureCard[] | undefined} cards The authored feature cards.
 * @returns {ShowcaseCardData[]} Cards ready for feature-new/ShowcaseCard.
 */
export function toFeatureShowcaseCards(
  cards: FeatureCard[] | undefined,
): ShowcaseCardData[] {
  try {
    return (cards ?? []).map((card, index) => {
      const spec = specFor(card.title);
      return {
        num: String(index + 1).padStart(2, "0"),
        name: card.title,
        codeKicker: spec.kicker,
        headline: card.body ?? "",
        preview: spec.preview ?? resolveDemo(spec.demoKey),
        code: spec.code,
        copyText: spec.code,
      };
    });
  } catch (error) {
    console.error("toFeatureShowcaseCards failed", error);
    return [];
  }
}
