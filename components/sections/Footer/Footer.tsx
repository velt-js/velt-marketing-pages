import Image from "next/image";
import HipaaBadge from "@/components/ui/HipaaBadge/HipaaBadge";
import styles from "./Footer.module.css";

const asyncFeatures = [
  "Comments",
  "Notifications",
  "Recording",
  "Video Editor",
  "View Analytics",
  "Reactions",
  "Customization",
  "Try Features",
];

const editorLibraries = [
  "YJS",
  "Tiptap",
  "BlockNote",
  "CodeMirror",
  "Lexical",
  "SlateJS",
];

const realtimeFeatures = [
  "Multiplayer Editing",
  "Single Editor",
  "Live State Sync",
  "Live Selection",
  "Huddle",
  "Presence",
  "Cursors",
  "Follow Mode",
  "Customization",
  "Try Features",
];

const chartLibraries = ["ChartJS", "Nivo Charts", "HighCharts"];

const canvasLibraries = ["React Flow"];

const platform = ["Admin Console", "Dev Tools", "MCP", "Webhooks & API"];

const resources = [
  "Blog",
  "Docs",
  "Release Notes",
  "Migrate from Liveblocks",
  "Migrate from Cord",
  "Launch Kit",
  "Themes Playground",
  "Figma UI Kit",
  "Examples",
  "Compare Velt",
  "Compare Velt Implementation",
];

const useCases = [
  "Video Editor",
  "Form Builder",
  "Analytics Product",
  "Task Manager",
  "Sheets Product",
  "Session Replay Tool",
  "CRM Product",
];

const company = [
  "For Enterprise",
  "For YC",
  "Pricing",
  "Customers",
  "Status",
  "Careers",
  "Security",
  "Trust Center",
  "Privacy Policy",
  "Terms",
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        {/* Row 1: Info + Links */}
        <div className={styles.topRow}>
          {/* Info Column (left) */}
          <div className={styles.info}>
            <div className={styles.brandBlock}>
              <a href="/" className={styles.logo}>
                <Image
                  className={styles.logoImage}
                  src="/images/footer/velt-logo.svg"
                  alt="Velt"
                  width={100}
                  height={40}
                />
              </a>
              <p className={styles.tagline}>
                Add powerful collaborative
                <br />
                features ridiculously fast!
              </p>
              <div className={styles.badges}>
                <Image
                  className={styles.badgeImg}
                  src="/images/footer/soc2-badge.png"
                  alt="SOC2"
                  width={52}
                  height={52}
                />
                <HipaaBadge size={52} basePath="/images/footer" />
              </div>
            </div>
            <a href="#" className={styles.apiKeyBtn}>
              Get Free API Key
            </a>
          </div>

          {/* Links Area (right) */}
          <div className={styles.linksArea}>
            {/* Column 1: Async Features */}
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnHeader}>Async Features</span>
              {asyncFeatures.map((link) => (
                <a key={link} href="#" className={styles.linkItem}>
                  {link}
                </a>
              ))}
            </div>

            {/* Column 2: Editor Libraries */}
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnHeader}>Editor Libraries</span>
              {editorLibraries.map((link) => (
                <a key={link} href="#" className={styles.subLink}>
                  {link}
                </a>
              ))}
            </div>

            {/* Column 3: Realtime Features */}
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnHeader}>
                Realtime Features
              </span>
              {realtimeFeatures.map((link) => (
                <a key={link} href="#" className={styles.linkItem}>
                  {link}
                </a>
              ))}
            </div>

            {/* Column 4: Chart Libraries + Canvas Libraries (stacked) */}
            <div className={styles.linkColumn}>
              <div className={styles.stackedGroup}>
                <span className={styles.linkColumnHeader}>Chart Libraries</span>
                {chartLibraries.map((link) => (
                  <a key={link} href="#" className={styles.subLink}>
                    {link}
                  </a>
                ))}
              </div>
              <div className={styles.stackedGroup}>
                <span className={styles.linkColumnHeader}>
                  Canvas Libraries
                </span>
                {canvasLibraries.map((link) => (
                  <a key={link} href="#" className={styles.subLink}>
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 5: Platform */}
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnHeader}>Platform</span>
              {platform.map((link) => (
                <a key={link} href="#" className={styles.linkItem}>
                  {link}
                </a>
              ))}
            </div>

            {/* Column 6: Resources */}
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnHeader}>Resources</span>
              {resources.map((link) => (
                <a key={link} href="#" className={styles.linkItem}>
                  {link}
                </a>
              ))}
            </div>

            {/* Column 7: Use Cases */}
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnHeader}>Use Cases</span>
              {useCases.map((link) => (
                <a key={link} href="#" className={styles.linkItem}>
                  {link}
                </a>
              ))}
              <a href="#" className={styles.linkItem}>
                View All &rarr;
              </a>
            </div>

            {/* Column 8: Company */}
            <div className={styles.linkColumn}>
              <span className={styles.linkColumnHeader}>Company</span>
              {company.map((link) => (
                <a key={link} href="#" className={styles.linkItem}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Gradient Divider */}
        <div className={styles.divider} />

        {/* Row 2: Bottom bar */}
        <div className={styles.bottomBar}>
          <div className={styles.socialLinks}>
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
              <Image
                src="/images/footer/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="X / Twitter">
              <Image
                src="/images/footer/x-twitter.svg"
                alt="X"
                width={24}
                height={24}
              />
            </a>
          </div>
          <span className={styles.copyright}>
            All rights reserved &copy; 2025 Velt
          </span>
          <div className={styles.backedBy}>
            <span className={styles.backedByText}>Backed by</span>
            <Image
              className={styles.ycLogo}
              src="/images/footer/yc-logo.png"
              alt="Y Combinator"
              width={100}
              height={26}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
