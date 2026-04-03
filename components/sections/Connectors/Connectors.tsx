import Image from "next/image";
import styles from "./Connectors.module.css";

/**
 * Each logo carries a size class that maps to the Figma-measured heights:
 *   logoSm  → max-height 42px  (Slack-sized icons)
 *   logoMd  → max-height 55px  (Discord-sized icons)
 *   logoLg  → max-height 65px  (MS Teams-sized icons)
 *   logoWide → max-height 40px, max-width 145px  (wordmark logos)
 *   logoWideLg → max-height 42px, max-width 160px (wider wordmarks)
 */
type LogoSize = "logoSm" | "logoMd" | "logoLg" | "logoWide" | "logoWideLg";

const sizeStyles: Record<LogoSize, React.CSSProperties> = {
  logoSm: { maxHeight: 42 },
  logoMd: { maxHeight: 55 },
  logoLg: { maxHeight: 65 },
  logoWide: { maxHeight: 40, maxWidth: 145 },
  logoWideLg: { maxHeight: 42, maxWidth: 160 },
};

interface Logo {
  name: string;
  src: string;
  size: LogoSize;
  width: number;
  height: number;
}

interface Connector {
  title: string;
  description: string;
  logos: Logo[];
}

const connectors: Connector[] = [
  {
    title: "Messaging",
    description: "Push messages to Discord, Slack and Microsoft Teams",
    logos: [
      { name: "Discord", src: "/images/connectors/discord.svg", size: "logoMd", width: 55, height: 55 },
      { name: "Slack", src: "/images/connectors/slack.svg", size: "logoSm", width: 42, height: 42 },
      { name: "MS Teams", src: "/images/connectors/ms-teams.png", size: "logoLg", width: 65, height: 65 },
    ],
  },
  {
    title: "Storage",
    description: "Store data in your preferred storage S3, Azure or GCP",
    logos: [
      { name: "Google Cloud Storage", src: "/images/connectors/gcp.png", size: "logoMd", width: 55, height: 55 },
      { name: "AWS S3", src: "/images/connectors/aws-s3.png", size: "logoWide", width: 145, height: 40 },
      { name: "Azure Blob Storage", src: "/images/connectors/azure.png", size: "logoMd", width: 55, height: 55 },
    ],
  },
  {
    title: "CRM",
    description: "Trigger notification or messages",
    logos: [
      { name: "HubSpot", src: "/images/connectors/hubspot.svg", size: "logoWideLg", width: 132, height: 40 },
      { name: "Close", src: "/images/connectors/close.svg", size: "logoWideLg", width: 133, height: 40 },
    ],
  },
  {
    title: "Analytics",
    description: "Trigger notification or messages",
    logos: [
      { name: "OpenTelemetry", src: "/images/connectors/opentelemetry.svg", size: "logoWide", width: 145, height: 40 },
      { name: "Datadog", src: "/images/connectors/datadog.svg", size: "logoMd", width: 52, height: 52 },
    ],
  },
  {
    title: "Workflow Automation",
    description: "Trigger notification or messages",
    logos: [
      { name: "Zapier", src: "/images/connectors/zapier.svg", size: "logoWide", width: 139, height: 40 },
      { name: "Inngest", src: "/images/connectors/inngest.png", size: "logoLg", width: 60, height: 60 },
      { name: "Make", src: "/images/connectors/make.svg", size: "logoLg", width: 65, height: 65 },
    ],
  },
  {
    title: "Email",
    description: "Trigger notification or messages",
    logos: [
      { name: "Resend", src: "/images/connectors/resend.svg", size: "logoWide", width: 120, height: 32 },
      { name: "SendGrid", src: "/images/connectors/sendgrid.svg", size: "logoWide", width: 120, height: 32 },
      { name: "Loops", src: "/images/connectors/loops.svg", size: "logoWide", width: 100, height: 32 },
      { name: "SES", src: "/images/connectors/ses.svg", size: "logoSm", width: 42, height: 42 },
    ],
  },
];

export default function Connectors() {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Connect Velt with your Apps</h2>
          <p className={styles.subtitle}>
            Velt provides support across libraries
          </p>
        </div>

        <div className={styles.actions}>
          <a href="#" className={styles.btnSecondary}>
            <svg
              className={styles.btnIcon}
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 4.5C3 3.67157 3.67157 3 4.5 3H8.25V15H4.5C3.67157 15 3 14.3284 3 13.5V4.5Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.25 3H13.5C14.3284 3 15 3.67157 15 4.5V13.5C15 14.3284 14.3284 15 13.5 15H8.25V3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            View Docs
          </a>
          <a href="#" className={styles.btnPrimary}>
            View All Examples
          </a>
        </div>
      </div>

      {/* App Grid */}
      <div className={styles.appGrid}>
        {connectors.map((connector, i) => (
          <div key={i} className={styles.connectorCell}>
            <div className={styles.logoArea}>
              {connector.logos.map((logo, j) => (
                <Image
                  key={j}
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={styles.logoImg}
                  unoptimized={logo.src.endsWith(".svg")}
                  style={{ width: "auto", height: "auto", ...sizeStyles[logo.size] }}
                />
              ))}
            </div>
            <div className={styles.cellInfo}>
              <h3 className={styles.cellTitle}>{connector.title}</h3>
              <p className={styles.cellDesc}>{connector.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
