import Image from "next/image";
import styles from "./Hero.module.css";

const useCaseTabs = [
  { label: "Sheets Product", active: true },
  { label: "Documentation Product", active: false },
  { label: "Dashboards", active: false },
  { label: "Website Builder", active: false },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* Background */}
      <div className={styles.background}>
        <img
          className={styles.gridAnimation}
          src="/images/hero/grid-animation.gif"
          alt=""
          aria-hidden="true"
        />
        <div className={styles.overlay} />
      </div>

      {/* Cursor: Sean */}
      <div className={styles.cursorSean}>
        <Image
          className={styles.cursorPointer}
          src="/images/hero/cursor-sean.svg"
          alt=""
          width={20}
          height={20}
        />
        <div className={styles.cursorBadgeWrapper}>
          <span className={`${styles.cursorBadge} ${styles.cursorBadgeSean}`}>
            Sean
          </span>
        </div>
      </div>

      {/* Cursor: Emma */}
      <div className={styles.cursorEmma}>
        <Image
          className={styles.cursorPointer}
          src="/images/hero/cursor-emma.svg"
          alt=""
          width={20}
          height={20}
        />
        <div className={styles.cursorBadgeWrapper}>
          <span className={`${styles.cursorBadge} ${styles.cursorBadgeEmma}`}>
            Emma
          </span>
        </div>
      </div>

      {/* Content (flows naturally, no overlap) */}
      <div className={styles.heroContent}>
        {/* Headline */}
        <div className={styles.headlineWrapper}>
          <div className={styles.textBlock}>
            <h1 className={styles.title}>
              The Complete
              <br />
              Collaboration Toolkit
            </h1>
            <p className={styles.subtitle}>
              Add features like contextual comments, notifications, recordings,
              multiplayer editing &amp; huddles to your product
            </p>
          </div>
          <div className={styles.ctaRow}>
            <a href="#" className={styles.ctaSecondary}>
              Book Demo
            </a>
            <a href="#" className={styles.ctaPrimary}>
              Get Free API Key
            </a>
          </div>
        </div>

        {/* Use Case Panel */}
        <div className={styles.useCase}>
          <div className={styles.glowLine} />
          <div className={styles.tabBar}>
            <div className={styles.tabLabel}>
              <Image
                className={styles.tabLabelIcon}
                src="/images/icons/pointer.svg"
                alt=""
                width={16}
                height={16}
              />
              <span className={styles.tabLabelText}>Use Cases</span>
            </div>
            <div className={styles.tabs}>
              {useCaseTabs.map((tab) => (
                <div
                  key={tab.label}
                  className={`${styles.tab} ${tab.active ? styles.tabActive : ""}`}
                >
                  <span className={styles.tabText}>{tab.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.previewArea}>
            {/* Product screenshot loaded dynamically on live site */}
          </div>

          {/* Bottom left: info button */}
          <div className={styles.panelActionsLeft}>
            <div className={styles.infoBtn}>
              <Image
                className={styles.infoIcon}
                src="/images/icons/info-circle.svg"
                alt="Info"
                width={16}
                height={16}
              />
            </div>
          </div>

          {/* Bottom right: Live Demo + Github */}
          <div className={styles.panelActionsRight}>
            <a href="#" className={styles.panelAction}>
              <Image
                className={styles.panelActionIcon}
                src="/images/icons/pointer-filled.svg"
                alt=""
                width={16}
                height={16}
              />
              <span className={styles.panelActionText}>Live Demo</span>
            </a>
            <a href="#" className={styles.panelAction}>
              <Image
                className={styles.panelActionIcon}
                src="/images/icons/github-filled.svg"
                alt=""
                width={16}
                height={16}
              />
              <span className={styles.panelActionText}>Github</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
