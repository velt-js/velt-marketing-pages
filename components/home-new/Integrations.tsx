import "./Integrations.css";

type IntegrationItem = {
  name: string;
  logoSrc: string;
  wide?: boolean;
  /** Logo is a wordmark that already contains the brand name, so the text label is hidden. */
  nameInLogo?: boolean;
};

type IntegrationCategory = {
  label: string;
  items: IntegrationItem[];
};

const ICON = "/images/home/nav-icons";
const LOGO = "/images/home";

const integrationCards: IntegrationCategory[][] = [
  [
    {
      label: "EDITORS",
      items: [
        { name: "Lexical", logoSrc: `${ICON}/lexical.svg` },
        { name: "Tiptap", logoSrc: `${ICON}/tiptap.svg` },
        { name: "BlockNote", logoSrc: `${ICON}/blocknote.svg` },
        { name: "Slate", logoSrc: `${ICON}/slatejs.png` },
        { name: "CodeMirror", logoSrc: `${LOGO}/logo-codemirror-icon.svg` },
        { name: "ProseMirror", logoSrc: `${ICON}/prosemirror.svg` },
        { name: "Quill", logoSrc: `${ICON}/quill.svg` },
        { name: "TinyMCE", logoSrc: `${ICON}/tinymce.svg`, wide: true, nameInLogo: true },
        { name: "CKEditor", logoSrc: `${ICON}/ckeditor.svg`, wide: true, nameInLogo: true },
        { name: "Monaco", logoSrc: `${ICON}/monaco.svg` },
        { name: "Ace", logoSrc: `${ICON}/ace.png` },
        { name: "Draft.js", logoSrc: `${ICON}/draftjs.svg` },
        { name: "Apryse", logoSrc: `${ICON}/apryse.svg`, wide: true, nameInLogo: true },
        { name: "Nutrient", logoSrc: `${ICON}/nutrient.svg`, wide: true, nameInLogo: true },
        { name: "SuperDoc", logoSrc: `${ICON}/superdoc.png` },
        { name: "Plate", logoSrc: `${ICON}/plate.svg` },
      ],
    },
  ],
  [
    {
      label: "FRAMEWORKS",
      items: [
        { name: "React", logoSrc: `${ICON}/react.svg` },
        { name: "Next.js", logoSrc: `${ICON}/nextdotjs.svg` },
        { name: "Angular", logoSrc: `${ICON}/angular.svg` },
        { name: "Vue", logoSrc: `${ICON}/vuedotjs.svg` },
      ],
    },
    {
      label: "CANVAS & DATA",
      items: [
        { name: "React Flow", logoSrc: `${ICON}/reactflow.svg` },
        { name: "Chart.js", logoSrc: `${ICON}/chartjs.svg` },
        { name: "Highcharts", logoSrc: `${LOGO}/logo-highcharts-symbol.svg` },
        { name: "Nivo", logoSrc: `${ICON}/nivocharts.svg` },
        { name: "TanStack", logoSrc: `${ICON}/tanstack.svg` },
        { name: "AG Grid", logoSrc: `${ICON}/aggrid.svg` },
      ],
    },
  ],
  [
    {
      label: "NOTIFICATIONS OUT",
      items: [
        { name: "Slack", logoSrc: `${ICON}/slack.svg` },
        { name: "Teams", logoSrc: `${ICON}/microsoftteams.svg` },
        { name: "Discord", logoSrc: `${ICON}/discord.svg` },
        { name: "Resend", logoSrc: `${ICON}/resend.svg` },
        { name: "Customer.io", logoSrc: `${ICON}/customerio.svg` },
        { name: "SendGrid", logoSrc: `${LOGO}/logo-sendgrid.svg` },
      ],
    },
    {
      label: "STORAGE & AUTH · SYNC",
      items: [
        { name: "Firebase", logoSrc: `${ICON}/firebase.svg` },
        { name: "Supabase", logoSrc: `${ICON}/supabase.svg` },
        { name: "Clerk", logoSrc: `${ICON}/clerk.svg` },
        { name: "Auth0", logoSrc: `${ICON}/auth0.svg` },
        { name: "YJS", logoSrc: `${LOGO}/logo-yjs.svg` },
      ],
    },
    {
      label: "CHAT SDK",
      items: [
        { name: "Vercel", logoSrc: `${ICON}/vercel.svg` },
      ],
    },
  ],
];

/**
 * Renders a single integration chip with brand logo and label.
 */
function IntegrationTag({ name, logoSrc, wide, nameInLogo }: IntegrationItem) {
  return (
    <span className="integ-tag">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={wide ? "integ-tag-logo integ-tag-logo-wide" : "integ-tag-logo"}
        src={logoSrc}
        alt={nameInLogo ? name : ""}
      />
      {!nameInLogo && <span className="integ-tag-label">{name}</span>}
    </span>
  );
}

/**
 * Renders one labeled group of integration chips inside a card.
 */
function IntegrationCategoryBlock({
  label,
  items,
  spaced,
}: IntegrationCategory & { spaced?: boolean }) {
  return (
    <>
      <div className={spaced ? "integ-cat-label integ-cat-label-spaced" : "integ-cat-label"}>
        {label}
      </div>
      <div className="integ-tag-row">
        {items.map((item) => (
          <IntegrationTag key={item.name} {...item} />
        ))}
      </div>
    </>
  );
}

export default function Integrations() {
  return (
    <section className="integ-section">
      <div className="integ-header">
        <div className="integ-eyebrow">
          <span className="integ-eyebrow-dot"></span>Integrations
        </div>
        <h2 className="integ-title">Drops into the stack you already have.</h2>
        <p className="integ-desc">
          15+ first-party integrations. SDK works in any framework via web components.
        </p>
      </div>
      <div className="integ-grid">
        {integrationCards.map((categories, cardIndex) => (
          <div className="integ-card" key={cardIndex}>
            {categories.map((category, categoryIndex) => (
              <IntegrationCategoryBlock
                key={category.label}
                {...category}
                spaced={categoryIndex > 0}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
