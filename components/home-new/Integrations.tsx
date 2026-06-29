import Link from "next/link";

import "./Integrations.css";

type IntegrationItem = {
  name: string;
  logoSrc: string;
  wide?: boolean;
  /** Logo is a wordmark that already contains the brand name, so the text label is hidden. */
  nameInLogo?: boolean;
  /** Internal route to the matching Velt library/integration page, when one exists. */
  href?: string;
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
        { name: "Lexical", logoSrc: `${ICON}/lexical.svg`, href: "/libraries/lexical" },
        { name: "Tiptap", logoSrc: `${ICON}/tiptap.svg`, href: "/libraries/tiptap" },
        { name: "BlockNote", logoSrc: `${ICON}/blocknote.svg`, href: "/libraries/blocknote" },
        { name: "Slate", logoSrc: `${ICON}/slatejs.png`, href: "/libraries/slatejs" },
        { name: "CodeMirror", logoSrc: `${LOGO}/logo-codemirror-icon.svg`, href: "/libraries/codemirror" },
        { name: "ProseMirror", logoSrc: `${ICON}/prosemirror.svg`, href: "/libraries/prosemirror" },
        { name: "Quill", logoSrc: `${ICON}/quill.svg`, href: "/libraries/quill" },
        { name: "TinyMCE", logoSrc: `${ICON}/tinymce.svg`, wide: true, nameInLogo: true, href: "/libraries/tinymce" },
        { name: "CKEditor", logoSrc: `${ICON}/ckeditor.svg`, wide: true, nameInLogo: true, href: "/libraries/ckeditor" },
        { name: "Monaco", logoSrc: `${ICON}/monaco.svg`, href: "/libraries/monaco" },
        { name: "Ace", logoSrc: `${ICON}/ace.png`, href: "/libraries/ace" },
        { name: "Draft.js", logoSrc: `${ICON}/draftjs.svg`, href: "/libraries/draftjs" },
        { name: "Apryse", logoSrc: `${ICON}/apryse.svg`, wide: true, nameInLogo: true, href: "/libraries/apryse" },
        { name: "Nutrient", logoSrc: `${ICON}/nutrient.svg`, wide: true, nameInLogo: true, href: "/libraries/nutrient" },
        { name: "SuperDoc", logoSrc: `${ICON}/superdoc.png`, href: "/libraries/superdoc" },
        { name: "Plate", logoSrc: `${ICON}/plate.svg`, href: "/libraries/platejs" },
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
        { name: "React Flow", logoSrc: `${ICON}/reactflow.svg`, href: "/libraries/react-flow" },
        { name: "Chart.js", logoSrc: `${ICON}/chartjs.svg`, href: "/libraries/chartjs" },
        { name: "Highcharts", logoSrc: `${LOGO}/logo-highcharts-symbol.svg`, href: "/libraries/highcharts" },
        { name: "Nivo", logoSrc: `${ICON}/nivocharts.svg`, href: "/libraries/nivo-charts" },
        { name: "TanStack", logoSrc: `${ICON}/tanstack.svg`, href: "/libraries/tanstack" },
        { name: "AG Grid", logoSrc: `${ICON}/aggrid.svg`, href: "/libraries/ag-grid" },
      ],
    },
  ],
  [
    {
      label: "NOTIFICATIONS OUT",
      items: [
        { name: "Slack", logoSrc: `${ICON}/slack.svg`, href: "/integrations/slack" },
        { name: "Teams", logoSrc: `${ICON}/microsoftteams.svg`, href: "/integrations/microsoft-teams" },
        { name: "Discord", logoSrc: `${ICON}/discord.svg`, href: "/integrations/discord" },
        { name: "Resend", logoSrc: `${ICON}/resend.svg`, href: "/integrations/resend" },
        { name: "Customer.io", logoSrc: `${ICON}/customerio.svg`, href: "/integrations/customer-io" },
        { name: "SendGrid", logoSrc: `${LOGO}/logo-sendgrid.svg`, href: "/integrations/sendgrid" },
      ],
    },
    {
      label: "STORAGE & AUTH · SYNC",
      items: [
        { name: "Firebase", logoSrc: `${ICON}/firebase.svg` },
        { name: "Supabase", logoSrc: `${ICON}/supabase.svg` },
        { name: "Clerk", logoSrc: `${ICON}/clerk.svg` },
        { name: "Auth0", logoSrc: `${ICON}/auth0.svg` },
        { name: "YJS", logoSrc: `${LOGO}/logo-yjs.svg`, href: "/libraries/yjs" },
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
 * Renders a single integration chip with brand logo and label. When `href` is
 * set, the chip links to the matching Velt library/integration page.
 */
function IntegrationTag({ name, logoSrc, wide, nameInLogo, href }: IntegrationItem) {
  const content = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={wide ? "integ-tag-logo integ-tag-logo-wide" : "integ-tag-logo"}
        src={logoSrc}
        alt={nameInLogo ? name : ""}
      />
      {!nameInLogo && <span className="integ-tag-label">{name}</span>}
    </>
  );

  if (href) {
    return (
      <Link className="integ-tag integ-tag-link" href={href}>
        {content}
      </Link>
    );
  }

  return <span className="integ-tag">{content}</span>;
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
